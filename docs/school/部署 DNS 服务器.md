# 部署 DNS 服务器

## 前言

域名系统（DNS）将人类可读的域名（例如，[www.github.com](https://www.github.com)）转换为机器可读的 IP 地址（例如，192.168.1.1）。

在校园网中，自建 DNS 服务器可以在校园网内解析校内独有的服务器域名。

## 安装

```shell
sudo apt install bind9
```

## 配置

### 全局配置

`bind9` 的全局配置文件位于 `/etc/bind` 目录下。

先修改主要配置文件 `named.conf.options`。

- `directory` 规定配置文件的存放文件夹，默认即可。
- `listen-on` 参数规定 DNS 服务器生效的网段，我们设置 `any` 以允许所有网段生效。
- 在默认情况下，`bind9` 只允许本地访问服务，我们将 `allow-query` 设置为 `any` 以允许所有来源访问服务。
- `forwards` 规定当无法查询到域名后，请求将会被重定向于的 DNS 服务器。

```conf
options {
        directory "/var/cache/bind";

        forwarders {
                8.8.8.8;
        };

        allow-query {
                any;
        };

        recursion no;

        dnssec-validation auto;

        listen-on { any; };
        listen-on-v6 { any; };
};
```

### 添加域名

在 `named.conf.local` 中，加入域名。在这里，我加入了 `huang.foo` 作为域名，`type` 设置为 `master`，并且配置文件 `file` 指向 `/etc/bind/db.huang.foo`。

```conf
zone "huang.foo" {
        type master;
        file "/etc/bind/db.huang.foo";
}
```

创建指定的配置文件 `db.huang.foo`。这里我指定 A 记录 `www` 为 `192.168.43.128`。具体的域名解析配置，请自行查询，此处不再扩展。

```conf
$TTL    86400
@       IN      SOA     localhost. root.localhost. (
                              1         ; Serial
                         604800         ; Refresh
                          86400         ; Retry
                        2419200         ; Expire
                          86400 )       ; Negative Cache TTL
;
@       IN      NS      localhost.
www     IN      A       192.168.43.128
```

### 验证配置

配置完成后，可以使用 `sudo named-checkconf` 来测试配置文件是否正确。如果没有错误输出，那么可以重启服务来使配置生效。

```shell
sudo systemctl restart bind9.service
```

查看服务状态：

```shell
sudo systemctl status bind9.service
```

通过 `dig` 命令查看 DNS 服务是否生效：

```shell
dig www.huang.foo @127.0.0.1
```

![](/images/20220608201224.png)

可以看到，DNS 服务已经生效。查询到域名 `www.huang.foo` 对应的 IP 为 `192.168.43.128`。
