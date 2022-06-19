# Linux 综合服务器搭建

## 在 VMware Workstation 上安装 Linux 系统

在 VMware Worstation 中安装 Linux 系统，系统镜像选择 ubuntu-20.04-live-server。安装过程中，配置均为默认。用户名为 huang，密码为 huang。

系统安装完成后，使用 lsb_release -a 命令查看系统内核信息。

![](/images/20220617131047.png)

## 配置 Linux 系统的网络使其可以和外部操作系统进行通信

使用 ip 命令查看虚拟机的 IP 地址，ens33 网卡为连接到 NAT 网络的网卡。

![](/images/20220617131644.png)

使用 ping 命令验证本机与虚拟机的通信。数据包发送 4 接收 4，通信正常。

![](/images/20220617131703.png)

## 安装 Apache 服务器、MySQL 数据库及 PHP 开发环境

### 安装 Apache

使用 apt update 命令更新软件包。

![](/images/20220617132101.png)

使用 apt install apache2 安装 Apache 服务。

![](/images/20220617132720.png)

安装完成后，Apache 自动运行在后台。打开浏览器访问虚拟机 IP 地址，成功访问网页。Apache 服务安装成功。

![](/images/20220617132845.png)

### 安装 MySQL

使用 apt install mysql-server 安装 MySQL 服务。

![](/images/20220617133032.png)

安装完成后，MySQL 自动运行在后台。使用 mysql --version 查看已安装的 MySQL 版本，验证安装成功。

![](/images/20220617133442.png)

### 安装 PHP

使用 apt install php libapache2-mod-php php-mysql 命令安装 PHP 及其配套服务。

![](/images/20220617133904.png)

安装完成后，使用 php -v 命令查看 PHP 版本，验证安装成功。

![](/images/20220617133953.png)

## 配置 Apache 服务器、MySQL 数据库

### 配置 Apache 服务器

在默认情况下向服务器请求页面时，Apache 会首先选择发送名称为 index.html 的文件。而配置 PHP 服务器，需要让 Apache 优先发送以 .php 为后缀的文件。Apache 的配置文件位于 /etc/apache2，编辑配置文件 dir.conf 来达到这个目的。

使用 vim /etc/apache2/mods-enabled/dir.conf 命令编辑配置。

![](/images/20220617134420.png)

将 index.php 的优先级调整到第一。

![](/images/20220617134525.png)

保存后，使用 systemctl restart apache2.service 命令重启 Apache 服务以应用新配置。

![](/images/20220617134635.png)

使用 systemctl status apache2.service 命令查看 Apache 服务的运行状态。如果服务正常运行，那么新配置应用成功。

![](/images/20220617134809.png)

Apache 默认的网站文件存放于 /var/www/html。可以看到，该文件夹下已经有一个默认 index.html 文件。使用 touch index.php 命令创建一个 PHP 文件。

![](/images/20220617135034.png)

简单地编写一个 PHP 文件，使其输出 PHP 版本。

![](/images/20220617135058.png)

保存退出后，使用浏览器访问网站。由于先前调整了文件优先级，成功传送了 PHP 文件。

![](/images/20220617135225.png)

### 配置 MySQL

在未配置 MySQL 的情况下，使用 sudo mysql 命令进入 MySQL 服务。

![](/images/20220617135434.png)

使用 CREATE DATABASE test 命令新建一个测试数据库。

![](/images/20220617135701.png)

使用 CREATE USER 'test'@'localhost' IDENTIFIED BY 'test' 命令新建一个用户名为 test，密码为 test 的用户。

![](/images/20220617135928.png)

使用 GRANT ALL PRIVILEGES ON test.\* TO 'test'@'localhost' 命令向 test 用户授予 test 数据库的所有权限。

![](/images/20220617140037.png)

使用 FLUSH PRIVILEGES 命令刷新 MySQL 权限。

![](/images/20220617140147.png)

退出 MySQL，使用 mysql -u test -p 命令换用 test 身份进入 MySQL。

![](/images/20220617140234.png)

使用 SHOW DATABASES 命令查看该用户下的数据库。

![](/images/20220617140311.png)

使用 USE test 命令进入 test 数据库。

![](/images/20220617140331.png)

使用 CREATE TABLE test(id INT NOT NULL AUTO_INCREMENT, title VARCHAR(100), PRIMARY KEY (id)) ENGINE=InnoDB DEFAULT CHARSET=utf8 命令创建 test 表。

![](/images/20220617140628.png)

使用 INSERT INTO test (title) VALUES ('test') 命令向 test 表中插入一条数据。为了方便测试，可以自行添加更多的测试数据。

![](/images/20220617140800.png)

使用 SELECT \* FROM test 命令查看 test 表中的数据。

![](/images/20220617140814.png)

## PHP 连接 MySQL 数据库并获取数据库中的数据

回到存放网站文件处，使用 vim index.php 编辑 PHP 文件，使其可以连接 test 数据库，并从 test 表中获取数据。

![](/images/20220617141545.png)

网页的代码如下。

![](/images/20220617141608.png)

## 测试网站页面

使用浏览器访问网站，网页成功获取到 test 表中的数据。

![](/images/20220617141633.png)

## 安装并配置 DNS 服务

使用 apt install bind9 安装 bind9。

![](/images/20220617142015.png)

bind9 的配置文件位于 /etc/bind 下。使用 vim named.conf.options 命令修改主配置文件 named.conf.options。原文件中含有多行注释，如不需要可以自行删除。

![](/images/20220617142231.png)

使用 vim named.conf.local 命令添加域名。此处添加 huang.foo。注意，配置文件指向最好设置为绝对路径。

![](/images/20220617142444.png)

使用 touch db.huang.foo 在 /etc/bind 下创建配置文件 db.huang.foo，在其中添加域名解析。

![](/images/20220617142553.png)

![](/images/20220617143758.png)

保存后，使用 named-checkconf 命令检查配置文件是否出错。若无错误输出，则配置正确。

![](/images/20220617142922.png)

使用 systemctl restart bind9.service 命令重启 bind9 服务。

![](/images/20220617143002.png)

使用 systemctl status bind9.service 命令查看 bind9 服务运行状态。

![](/images/20220617143015.png)

使用 dig www.huang.foo @127.0.0.1 验证 DNS 服务器配置。

![](/images/20220617143740.png)
