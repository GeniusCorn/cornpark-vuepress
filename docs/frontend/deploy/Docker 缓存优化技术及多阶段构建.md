# Docker 缓存优化技术及多阶段构建

部署完一个简单页面后，对整个构建部署过程有了更加深刻的理解。下面我们尝试更加接近实际生产项目，即将 Vue 项目部署。

## 最简 Vue 项目

我们初始化一个最简的 Vue 项目，所有配置默认即可。

```shell
# 初始化
npm init vue@latest

# 安装依赖
yarn

# 资源构建
yarn build
```

同样地，不要忘了我们使用 `serve` 来服务化。

## Dockerfile

先来一个 Dockerfile。

```dockerfile
FROM node:alpine

WORKDIR /code

ADD . /code
RUN yarn && yarn build

CMD npx serve -s dist
EXPOSE 3000
```

构建镜像。

```shell
docker build -t simple-deploy -f dockerfile .
```

运行容器，这样我们的服务就成功运行在 `3000` 端口。

```shell
docker run --rm -p 3000:3000 simple-deploy
```

![](/images/2022-06-24_10-46-48.png)

查看镜像的体积。

```shell
$ docker images
REPOSITORY      TAG       IMAGE ID       CREATED              SIZE
simple-deploy   latest    6e4fb003ebf5   About a minute ago   519MB
```

目前，还可以对以下两点进行优化：

1. 缩短构建时间。
2. 减小镜像体积。

## 缩短构建时间

我们注意到，该项目构建时主要耗时在：

1. 安装依赖：`yarn`；
2. 构建项目：`yarn build`。

在本地环境中，如果没有新的依赖被加入，那就不需要重新安装依赖。

在 Docker 同样可以做到这一点。在 Dockerfile 里，`ADD` 指令添加文件内容的 `checksum` 没有发生变化，就可以利用构建缓存。在前端项目中决定依赖构建的为 `package.json` 和 `yarn.lock`。那么我们将这两个文件事先置于镜像中，安装依赖时就可以获得缓存的优化。

```dockerfile
FROM node:alpine

WORKDIR /code

ADD package.json yarn.lock /code/

ADD . /code

RUN yarn && yarn build

CMD npx serve -s dist

EXPOSE 3000
```

我们通过查看 docker compose 的输出来验证缓存的效果。

```yml
version: '3.9'
services:
  simple-deploy:
    build:
      context: .
      dockerfile: dockerfile
    ports:
      - 3000:3000
```

如果输出中有 `CACHED` 的标记，说明构建利用了缓存。

```shell
docker compose up --build
```

## 减小镜像体积

如上文所说，我们的目标是提供静态资源服务，而并不需要 `node` 环境进行服务化。我们只需要 `node` 来进行构建，构建完成后 `node` 的继续存在就对资源造成了浪费。

因此，我们考虑使用多阶段构建。先使用 `node` 的镜像构建并生成资源，后使用 `nginx` 镜像对生成的静态资源进行服务化。启动容器，再通过浏览器成功访问部署服务。

```dockerfile
# 一阶段的 node 镜像
FROM node:alpine as builder

WORKDIR /code

# 单独分离 package.json，为了安装依赖可最大化依赖缓存
ADD package.json yarn.lock /code/

ADD . /code

RUN yarn && yarn build

# 二阶段的 nginx 镜像
FROM nginx:alpine

# 把一阶段中部署好的资源传入二阶段的部署目录
COPY --from=builder code/dist /usr/share/nginx/html
```

再次查看镜像体积大小，和前文的镜像体积大小作比较。

```shell
$ docker images
REPOSITORY                  TAG       IMAGE ID       CREATED              SIZE
vue-project_simple-deploy   latest    b8b43f35882e   About a minute ago   23.5MB
```

至此，我们完成了减小镜像体积和优化构建时间的两个任务。
