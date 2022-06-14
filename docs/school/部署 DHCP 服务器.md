# 部署 DHCP 服务器

## 前言

Dyanmic Host Configuration Protocol（DHCP）是动态主机设置协议，是一个用于 IP 网络的网络协议。其主要有两个用途：

1. 用于内部网或网络服务供应商自动分配 IP 地址给用户；
2. 用于内部网管理员对所有电脑作中央管理。

大多数路由器都有内置 DHCP 服务器，但是我们也可以自行搭建 DHCP 服务器。在校园网中，部署 DHCP 服务器可以方便上网用户接入网络，减少网络管理员为各设备配置 IP 地址的麻烦。

## DHCP 如何工作

当一个设备启动时，它并没有 IP 地址。它会发送一个被称为 `DHCP Discover` 的广播包，而 DHCP 服务器可以来接收这类广播包。然后，它们会发送被称为 `DHCP Offer` 单播包返回相应的客户端。`DHCP Offer` 中包含了分配给该设备的 IP 地址、默认网关地址以及 DNS 服务器地址。

客户端接收后，再发送 `DHCP Request` 返回给服务器，告知已经接收这些信息。

同时，DHCP 服务器将记录已经分配出去的 IP 地址以防止相同的 IP 地址再次分配给其他客户端。

由于 DHCP 服务器需要响应广播包，因此它必须在本地网络且只能有一台。

### DHCP 的分配方法

DHCP 服务器分配地址的方式有两种：

1. 手动。IP 地址基于 MAC 地址被分配。这确保特定的设备可以获取到基于其 MAC 地址绑定的 IP 地址。DHCP 服务器将发送一个持久的配置给客户端。
2. 自动。IP 地址将从地址池中分配给第一次接入网络的客户端。在这种情况下，DHCP 使用了租约的概念，或称为 IP 地址的有效期。租用时间是不定的，取决于用户在某地连接 Internet 需要多久。当租约过期时，DHCP 服务器释放该 IP 地址。通过较短的租期，DHCP 能够在一个设备比可用 IP 地址多的环境中动态地重新配置网络。

## 安装

我们使用 [ISC DHCP Server](https://www.isc.org/dhcp/) 来部署 DHCP 服务器。

### 安装 DHCP 服务器

执行命令安装：

```shell
sudo apt install isc-dhcp-server
```

### 配置 DHCP 服务器

`ISC DHCP Server` 的配置文件位于 `/etc/dhcp/dhcpd.conf`。在正式操作之前可以备份配置文件：

```shell
sudo cp dhcpd.conf dhcpd.conf.bak
```

默认的情况下，我们选择自动分配 IP 地址。最简单的配置文件如下：

```conf
default-lease-time 600;
max-lease-time 7200;
authoritative;

subnet 192.168.43.0 netmask 255.255.255.0 {
  range 192.168.43.100 192.168.43.200;
  option routers 192.168.43.254;
  option domain-name-servers 192.168.43.2;
}
```

配置中：

- 默认租约时间为 `600s`，最大租约时间为 `7200s`；
- `authoritative` 指定该 DHCP 服务器为默认；
- 指定子网为 `192.168.43.0` 网段，子网掩码为 `255.255.255.0`；
- IP 地址池为 `192.168.43.100` 至 `192.168.43.200`。
- 默认网关为 `192.168.43.254`；
- DNS 服务器为 `192.168.43.2`。

我们需要绑定 DHCP 服务器至一个网卡接口上。通过 `ip a` 命令查看网络接口状态，得知 `ens33` 是我们需要绑定的网络接口。：

![](/images/20220607144622.png)

如果系统运行在虚拟机中，将虚拟机网卡配置为 `仅主机模式`，并且自行设定网卡的静态 IP 地址。网卡的配置文件位于 `/etc/netplan/00-installer-config.yaml`。将网卡静态 IP 地址配置为 `192.168.43.2`，`dhcp` 设置为 `no`，网关和 DNS 服务器设为自身 IP 地址。

```yaml
network:
  ethernets:
    ens33:
      dhcp4: no
      addresses:
        - 192.168.43.2/24
      gateway4: 192.168.43.2
      nameservers:
        addresses:
          - 192.168.43.2
  version: 2
```

网络接口的配置文件位于 `/etc/default/isc-dhcp-server`，将接口生效的网卡配置为先前查看的网卡名称。

![](/images/20220607145158.png)

配置完成后，重启服务：

```shell
sudo systemctl restart isc-dhcp-server.service
```

查看服务状态，验证是否配置成功：

```shell
sudo systemctl status isc-dhcp-server.service
```

![](/images/20220607145322.png)

如果显示 `active` 则表示服务正常运行。
