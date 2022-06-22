# 使用 nginx 镜像构建容器

如前文所言，对于仅仅提供静态资源服务的前端，由于种种原因 `Node.js` 不作为生产环境。在实际生产环境中，我们更多地选择 `nginx` 来部署。

通过 `docker images` 命令查看镜像体积，可以发现同样使用 `alpine` 构建的 `nginx` 和 `node` 镜像体积大小相差接近八倍。

```shell
$ docker images nginx
REPOSITORY   TAG       IMAGE ID       CREATED       SIZE
nginx        alpine    b1c3acb28882   5 weeks ago   23.4MB
```

```shell
$ docker images node
REPOSITORY   TAG       IMAGE ID       CREATED      SIZE
node         alpine    515db77e67c7   5 days ago   174MB
```

## nginx 镜像

以前学习过程中，我是使用 Linux 虚拟机来学习如何使用 `nginx`。虽然 `nginx` 也可以部署在 Windows 端，但实际生产中 `nginx` 都部署在 Linux 服务器。现在有了 `docker`，就可以直接将 nginx 容器化从而在本地来学习 `nginx` 。这种方式既可以模拟 Linux 环境、也可以学习 `docker` 和 `nginx`，可谓一石三鸟。

通过 `docker run` 命令可以进入 `nginx` 容器中，了解 `nginx` 的目录配置。

```shell
# -i 以交互模式运行容器，通常与 -t 同时使用
# -t 为容器分配一个伪输入终端，通常与 -i 同时使用
# --rm 当容器停止运行时自动删除容器
# sh 打开 shell
$ docker run -it --rm nginx:alpine sh

# nginx 的配置文件位于 /etc/nginx
# cd /etc/nginx

# 退出容器
# exit
```

通过以下命令可以将 `nginx` 服务映射到本机 `3000` 端口。

```shell
docker run -it --rm -p 3000:80 nginx:alpine
```

![](/images/2022-06-22_11-09-04.png)

## 初步了解 nginx 配置

进入 `nginx` 容器中，在其中配置 nginx。默认配置文件位于 `/etc/nginx/conf.d/default.conf`中。值得关注的配置有：

1. 监听 80 端口。
2. 指定网站目录为 `/usr/share/nginx/html`，网页文件的优先级为 `index.html index.htm`。

```shell
/etc/nginx/conf.d # cat default.conf
server {
    listen       80;
    server_name  localhost;

    #access_log  /var/log/nginx/host.access.log  main;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }

    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    #    proxy_pass   http://127.0.0.1;
    #}

    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ \.php$ {
    #    root           html;
    #    fastcgi_pass   127.0.0.1:9000;
    #    fastcgi_index  index.php;
    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    #    include        fastcgi_params;
    #}

    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #    deny  all;
    #}
}
```

既然如此，我们只需要将前端资源部署于 `/usr/share/nginx/html` 中即可。下面来尝试将配置文件和前端资源添加到镜像之中。

## 构建镜像

新建一个 `nginx.dockerfile` 来把示例项目跑起来。由于 `nginx` 默认暴露 `80` 端口，因此我们不用再暴露端口。

```dockerfile
FROM nginx:alpine

ADD index.html /usr/share/nginx/html/
```

继续完善 `docker-compose.yml` 并创建新的容器。

```dockerfile
  nginx:
    build:
      context: .
      dockerfile: nginx.dockerfile
    ports:
      - 4000:80
```

运行容器。

```shell
docker compose up nginx
```

此时访问 `4000` 端口，服务成功部署。查看响应头，发现 `nginx` 的字样。

![](/images/2022-06-22_11-21-47.png)

![](/images/2022-06-22_11-21-55.png)

## 基于 node 和 nginx 镜像进行体积对比

经过 `node` 和 `nginx` 的配置，完整的 `docker-compose.yml` 文件如下。

```yml
version: '3.9'
services:
  simple-deploy:
    # 选取当前路径
    build:
      context: .
      dockerfile: node.dockerfile
    # 映射端口
    ports:
      - 3000:3000
  nginx:
    build:
      context: .
      dockerfile: nginx.dockerfile
    ports:
      - 4000:80
```

通过 `docker compose images` 命令可以查看该配置文件中所有镜像的体积。再次对比 `node` 和 `nginx` 的镜像体积。不难发现，由于体积更小，在生产环境中选择 `nginx` 部署是必然的。

```shell
$ docker compose images
Container              Repository           Tag                 Image Id            Size
test-nginx-1           test_nginx           latest              d02e1f9684d6        23.4MB
test-simple-deploy-1   test_simple-deploy   latest              d0025e933735        194MB
```
