# 在 docker-compose 中容器可以通过 service name 直接访问其他容器服务，这个过程中是如何实现 dns 解析的

首先，在配置文件中将两个容器分配给同一个网桥网络。

```yml
version: '3.9'

services:
  web:
    image: nginx:alpine
    ports:
      - '8000:80'
    networks:
      - test

  db:
    image: mysql:latest
    ports:
      - '8001:3306'
    environment:
      MYSQL_ALLOW_EMPTY_PASSWORD: yes
    networks:
      - test

networks:
  test:
    driver: bridge
```

启动服务，使用 `docker network ls` 命令，查看该网络名称为 `test_test`。使用 `docker network inspect` 命令查看网络详细配置，发现 `Containers` 下已经将各个容器设置好了名称、IP 地址等。

![](images/2022-07-02_12-36-54.png)

进入 `alpine` 容器，测试对另一容器的连通性。使用 `ping test-db-1` 命令测试，结果连通正常且 IP 地址解析为 `172.22.0.2`，与 `inspect` 中的内容一致。

![](images/2022-07-02_12-40-36.png)

猜测一：docker 在容器中本地解析 DNS

使用 `cat /etc/hosts` 查看该容器下的 `hosts` 文件，发现仅配置了本机的域名指向。

```shell
127.0.0.1       localhost
::1     localhost ip6-localhost ip6-loopback
fe00::0 ip6-localnet
ff00::0 ip6-mcastprefix
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters
172.22.0.3      d8f6fa73ce94
```

猜测二：docker 使用 DNS 服务器进行解析

使用 `cat /etc/resolv.conf` 查看该容器的 DNS 服务器，配置为 `127.0.0.11`。

```shell
nameserver 127.0.0.11
```

使用 `nslookup test-db-1` 查看 `test-db-1` 的解析服务器，也是 `127.0.0.11`。

```shell
Server:         127.0.0.11
Address:        127.0.0.11:53

Non-authoritative answer:

Non-authoritative answer:
Name:   test-db-1
Address: 172.22.0.2
```

结论：

docker 将同一个网络下的所有容器根据其容器名称自动在 `127.0.0.11` 的 DNS 服务器上配置了解析。因此，我们可以在容器中直接通过 `service name` 来访问其他容器服务。