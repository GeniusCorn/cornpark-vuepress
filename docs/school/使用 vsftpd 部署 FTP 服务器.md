# 使用 vsftpd 部署 FTP 服务器

## 前言

FTP（File Transfer Protocol）是一个用于在计算机网络上客户端和服务器之间传输的应用层协议。FTP 服务器则可以让文件从某台设备传输到另一台装置。FTP 通常用于处理大量文件。例如在变更网站内容时，可以使用 FTP 来新增音视频文件，以及移动网站文件等；同理，IT 人员也可能使用 FTP 在封闭的系统内传输大批量的文件。而在校园网应用中，FTP 服务器经常作为老师同学之间交换文件的介质，用于上传学生作业、下载老师的课程文件等等。

这篇文章记录在 Ubuntu 20.04.4 LTS 上安装 `vsftpd` 开启 FTP 服务器的过程。`vsftpd` （very secure FTP daemon，意为非常安全的 FTP 守护进程）是一个在类 Unix 系统以及 Linux 上的 FTP 服务器软件。

## 安装

我们可以直接安装 `vsftpd`。

```shell
sudo apt update
sudo apt install vsftpd
```

当安装完成后，FTP 服务会自动运行在后台。我们可以手动查看服务的状态：

```shell
sudo systemctl status vsftpd.service
```

![](/images/20220601145243.png)

输出显示 `vsftpd` 服务正常运行中。

## 配置

`vsftpd` 的配置文件位于 `/etc/vsftpd.conf`。我们接下来的配置都会在这个文件中处理。

### FTP 权限

我们只允许本地 Linux 用户访问 FTP 服务器，因此将 `anonymous_enable` 设为 `NO`，将 `local_enable` 设为 `YES`。

```shell
anonymous_enable=NO
local_enable=YES
```

### 开启上传

默认状态下，上传功能关闭。将 `write_enable` 设置为 `YES` 来允许上传或者删除文件。

```shell
write_enable=YES
```

### 阻止访问

为了不让用户访问其用户文件夹之外的文件夹，将 `chroot_local_user` 设置为 `YES`。

```shell
chroot_local_user=YES
```

### 重启服务

配置完成后，需要重启服务以应用配置。

```shell
sudo systemctl restart vsftpd.service
```

## 使用

现在来测试一下 FTP 是否运行正常，使用本地的 Linux 账户进行登录。

![](/images/20220601150138.png)

![](/images/20220601150150.png)

在文件夹内成功上传、下载文件。

至此，FTP 服务器搭建成功。
