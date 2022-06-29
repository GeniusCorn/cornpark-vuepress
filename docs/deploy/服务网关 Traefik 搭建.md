# 服务网关 Traefik 搭建

想象我们已经成功部署了许多容器，不过都是通过 localhost 访问。现在我们想要用户通过域名来访问我们的服务，那就需要一个反向代理服务。

[Traefik](https://doc.traefik.io/traefik/)（发音同 traffic）是一个用于部署微服务的 HTTP 反向代理与负载均衡服务器。传统的反向代理需要我们为每个服务自行配置正确的路由和子域名。在线上环境中，服务的添加、移除、升级或扩展都有可能花费大量的时间。而 Traefik 可以自动监听服务的 API 并且生成路由，使得服务能马上被外界访问。在这个过程中，运维人员并不需要做很多复杂的配置。除此之外，Traefik 还能帮助管理容器、了解服务运行状态及路由。

## 搭建 Traefik

Traefik 很容易地能和 Docker 集成在一起使用，每当 Docker 容器部署成功，便可以在网络上访问。由于需要在网络上访问验证配置，以下操作推荐在拥有公网 IP 和域名的服务器上进行。

先在 docker compose 上跑一个 Traefik 服务。

```yml
version: '3.9'

services:
  traefik:
    image: traefik:latest
    command: --api.insecure=true --providers.docker
    ports:
      - '80:80'
      - '8080:8080'
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
```

Traefik 服务运行后，会默认新建一个 `network`。通过 `docker network ls` 来查看服务的默认网络名称。在此处为 `traefik_default`。

```shell
$ docker network ls
NETWORK ID     NAME              DRIVER    SCOPE
9eb109e72be8   traefik_default   bridge    local
```

此时，可以访问服务器的 `8080` 端口，可以看到 Traefik 的 dashboard 页面。

## 启动任意一个服务

启动一个 [whoami](https://hub.docker.com/r/containous/whoami) 的简易版 Web 服务，来验证 Traefik 是否自动部署服务。

使用 `whoami` 服务做什么：

1. 暴露一个 `http` 服务，输出一些 `http` 请求信息；
2. 配置容器的 `labels`，设置服务的 `Host` 为自己的域名，给 Traefik 提供标记。

```yml
version: '3.9'

services:
  whoami:
    image: containous/whoami
    labels:
      # 设置 Host 为自己的域名进行访问
      - traefik.http.routers.whoami.rule=Host(`deploy.nicecorn.com`)

# 使用已存在的 traefik 的 network
networks:
  default:
    name: traefik_default
```

启动服务后，可以通过该域名访问 `whoami` 服务。同时，也可以在 dashboard 里看到服务正常运行。

![](/images/2022-06-28_10-42-09.png)

## 深入配置 Traefik

以上只是最简单地运行 Traefik。更多更详尽的配置，例如管理路由、服务、证书等，需要在配置文件中体现。在 docker compose 启动 Traefik 时，先挂载其配置文件。Traefik 的配置文件为 `traefik.toml`，可以根据官方提供的[基本配置文件](https://raw.githubusercontent.com/containous/traefik/master/traefik.sample.toml)来进行配置。

```yml
version: '3.9'

services:
  traefik:
    image: traefik:latest
    ports:
      - '80:80'
      - '8080:8080'
    volumes:
      # 导入配置
      - ./traefik.toml:/etc/traefik/traefik.toml
      - /var/run/docker.sock:/var/run/docker.sock
    labels:
      - traefik.http.routers.api.rule=Host(`traefik.nicecorn.com`)
      - traefik.http.routers.api.service=api@internal
```

下面根据基本配置文件配置 `traefik.toml`。

### 全局设置

Traefik 的全局配置，默认即可。

```toml
[global]
  checkNewVersion = true
  sendAnonymousUsage = true
```

### Entrypoints

Traefik 向外提供的入口，网站为 `80` 端口，SSL 为 `443` 端口。

```toml
[entryPoints]
  [entryPoints.web]
    address = ":80"

  [entryPoints.websecure]
    address = ":443"
```

### 日志

日志极为重要。当 Traefik 中某个服务运行失败，可以通过日志排错。

```toml
[log]
  filePath = "log/traefik.log"
  format = "json"
```

### 请求日志

同上。

```toml
[accessLog]
  filePath = "/path/to/log/log.txt"
  format = "json"
```

### api

开启 dashboard 功能。

```toml
[api]
  dashboard = true
```

### docker

设置服务提供为 `Docker`。如果没有配置 `Rule`，默认以 `<Name>.nicecorn.com` 的方式创建路由。

```toml
[providers.docker]
  endpoint = "unix:///var/run/docker.sock"
  defaultRule = "Host(`{{ normalize .Name }}.nicecorn.com`)"
```

配置完成，再次启动 Traefik。可以成功地通过配置的域名 `traefik.nicecorn.com` 访问 dashboard。

## 配置 dashboard 的简单认证

成功部署了网关，但现在人人都能访问 dashboard，这显然是不合常理的。我们只希望运维人员能够访问 dashboard。Traefik 给我们提供了 [BasicAuth](https://doc.traefik.io/traefik/middlewares/http/basicauth/) 的中间件，可以限制非认证的用户访问服务。

### 中间件

中间件，即 [Middlewares](https://doc.traefik.io/traefik/middlewares/overview/)。请求在通过路由后，会经过中间件的处理才会被发送到服务。Traefik 自带了多种中间件，有些可以修改 `request`、`headers`，有些可以进行重定向，有些可以添加认证功能。BasicAuth 就是其中之一，它提供了一个基本的认证功能。

### 配置 BasicAuth

我们想要在用户访问 dashboard 前进行认证，就在 `api` 服务前部署简单认证的中间件。在 `users` 中配置用户名和密码，格式为 `user:password`。密码必须先转换为 `MD5`、`SHA1` 或 `BCrypt`。下为官方示例，配置的用户名和密码均为 `test`。

```yml
labels:
  - traefik.http.middlewares.basic-auth.basicauth.users=test:$$apr1$$H6uskkkW$$IgXLP6ewTrSuBkTrqE8wj/,test2:$$apr1$$d9hr9HBB$$4HxwgUir3HP4EsggP/QNo0
  - traefik.http.routers.api.middlewares=basic-auth@docker
```

重启服务，重新访问 dashboard。此时需要填入用户名和密码才可访问服务。

![](/images/2022-06-28_23-52-26.png)

## 配置 HTTPS

Traefik 同样支持 HTTPS/TLS。借助 `ACME` 的帮助下配置也十分简单。

首先配置 HTTP 重定向至 HTTPS。在 `traefik.toml` 下，将 `80` 端口的访问全部重定向至 `443` 端口。

```toml
[entryPoints]
  [entryPoints.web]
    address = ":80"
  [entryPoints.web.http.redirections]
    [entryPoints.web.http.redirections.entryPoint]
      to = "websecure"

  [entryPoints.websecure]
    address = ":443"
```

配置 `ACME`。我在 `FreeSSL` 上申请的 `ACME v2` 证书，可以自行查看[教程](https://blog.freessl.cn/acme-quick-start/)申请。

```toml
[certificatesResolvers.myresolver.acme]
  email = "email"
  storage = "acme.json"
  [certificatesResolvers.myresolver.acme.httpChallenge]
    entryPoint = "web"
```

在需要配置 TLS 的服务中添加路由，此处依然以 `whoami` 为例。

```yml
labels:
  # 设置 Host 为 whoami.nicecorn.com 进行域名访问
  - traefik.http.routers.whoami.rule=Host(`whoami.nicecorn.com`)
  - traefik.http.routers.whoami.tls=true
  - traefik.http.routers.whoami.tls.certresolver=myresolver
```

再次访问服务，就能看到 URL 旁有证书提示。

![](/images/2022-06-29_10-31-03.png)
