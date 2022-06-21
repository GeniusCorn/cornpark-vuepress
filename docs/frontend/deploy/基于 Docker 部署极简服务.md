# 基于 Docker 部署极简服务

上文我们部署了一个简单的静态资源服务器。前端流行的部署方案都是使用 `Docker` 进行部署。这篇文章我们就使用 Docker 将该服务容器化。

## 将资源服务化

先借助一个工具 `serve` 将静态资源服务化。

```shell
pnpm add serve
```

通过 `npm scripts` 把 `serve` 命令封装成 `npm start`。

```json
"scripts": {
    "start": "serve ."
  }
```

执行 `pnpm start`，`serve` 服务默认运行在 `3000` 端口，打开浏览器验证服务正常运行。

## Dockerfile

一般来说，根据以下步骤可以将脚本命令转化为 Dockerfile。

1. 选择一个基础镜像。在 [Docker Hub](https://hub.docker.com) 中查找我们需要的镜像。我们的服务基于 `node` 部署，因此我们选择 `node:18-alpine3.15` 作为基础镜像。该镜像基于 `alpine` 制作，内置了 `node`、`npm`、`yarn` 等运行环境。
2. 将以上的脚本命令放在 `RUN` 命令中。
3. 启动服务命令放在 `CMD` 命令中。

`node.dockerfile` 文件如下：

```dockerfile
# 选择一个基础镜像
FROM node:18-alpine

# 设置工作目录，以下 RUN/CMD 命令都在该目录下执行
WORKDIR /code

# 把根目录下的文件置于镜像中
ADD . /code

# 安装依赖
RUN yarn

# 开放端口为 3000
EXPOSE 3000

# 启动 node 服务
CMD npm start
```

## 构建镜像

接下来使用 `docker build` 命令基于 `dockerfile` 构建镜像。

```shell
# 构建一个名为 simple-deploy 的镜像
# -t 指定镜像名称
# -f 指定 dockerfile
# . 为该目录
docker build -t simple-deploy -f node.dockerfile .
```

稍作等待镜像构建成功。从控制台输出的信息得知，本次构建时长为 `55.8s`。通过 `docker images` 可知镜像体积为 `194MB`。留意这个数字，以后优化镜像体积时用得到。

## 运行容器

我们可以基于镜像运行若干个容器，接下来要启动的容器是我们最终要提供的静态服务。

```shell
# 使用该镜像运行容器
# -d 在后台运行
# --rm 当容器停止运行时自动删除容器
# -p 3000:3000 将容器中的 3000 端口映射到宿主机的 3000 端口
docker run --rm -p 3000:3000 simple-deploy
```

此时使用 `docker ps` 命令可以查看正在运行的容器及其信息。

![](/images/2022-06-20_23-54-08.png)

此时，在宿主机访问 `3000` 端口成功访问服务。

## Docker Compose

然而，通过命令行方式来构建容器，进行管理端口、存储变量的操作始终不便且不易维护。

`Docker Compose` 是一个定义并运行多容器的 Docker 应用。我们使用其将 Docker Cli 部分翻译为使用 `YML` 的后缀文件作为 `Docker Compose` 的配置文件。

该服务的 `docker-compose.yml` 文件如下。

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
```

配置完成，可以通过一行 `docker compose up` 来启动容器。

```shell
# --build 每次启动容器前构建镜像
docker compose up --build
```

此时在浏览器访问 `3000` 端口，服务正常运行。

至此，我们使用 `Docker` 和 `Docker Compose` 部署了极简服务。
