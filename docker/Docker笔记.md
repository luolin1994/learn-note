Docker的常用命令

![img](/root/gitproject/learn-note/docker/Docker笔记.assets/timg)

## 帮助命令

```shell
docker version     #显示docker的版本信息
docker info       #显示docker的系统信息，包括镜像和容器的数量
docker  命令 --help  #万能命令
```

帮助文档的地址：https://docs.docker.com/reference/



## 镜像命令

docker images  查看所有本地的主机上的镜像

```shell
[root@localhost ~]# docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
tomcat              latest              d5eef28cf41d        5 days ago          647MB
centos              centos7             7e6257c9f8d8        3 weeks ago         203MB
mysql               latest              0d64f46acfd1        4 weeks ago         544MB
hello-world         latest              bf756fb1ae65        8 months ago        13.3kB
node                8.4                 386940f92d24        2 years ago         672MB

#解释
REPOSITORY   镜像的仓库源
TAG                镜像的标签
IMAGE ID        镜像的id
CREATED        镜像的创建时间
SIZE               镜像的大小

#可选项
 -a, --all               列出所有的镜像
      --digests         Show digests
  -f, --filter filter   Filter output based on conditions provided
      --format string   Pretty-print images using a Go template
      --no-trunc        Don't truncate output
  -q, --quiet           只显示镜像的id
```

docker search  搜索镜像

```shell
[root@localhost ~]# docker search mysql
NAME                              DESCRIPTION                                     STARS               OFFICIAL            AUTOMATED
mysql                             MySQL is a widely used, open-source relation…   9934                [OK]                
mariadb                           MariaDB is a community-developed fork of MyS…   3634                [OK]                
mysql/mysql-server                Optimized MySQL Server Docker images. Create…   724                                     [OK]

#可选项，通过收藏来过滤
 --filter=STARS=3000    搜索出来的收藏量大与3000
 [root@localhost ~]# docker search mysql --filter=STARS=3000
NAME                DESCRIPTION                                     STARS               OFFICIAL            AUTOMATED
mysql               MySQL is a widely used, open-source relation…   9934                [OK]                
mariadb             MariaDB is a community-developed fork of MyS…   3634                [OK]                
```

docker pull      下载镜像

```shell
#下载镜像  docker pull 镜像名[:tag]
[root@localhost ~]# docker pull mysql
Using default tag: latest         #如果不写tag,则默认是latest
latest: Pulling from library/mysql
bf5952930446: Pull complete 
8254623a9871: Pull complete 
938e3e06dac4: Pull complete 
ea28ebf28884: Pull complete 
f3cef38785c2: Pull complete 
894f9792565a: Pull complete 
1d8a57523420: Pull complete 
6c676912929f: Pull complete 
3cdd8ff735c9: Pull complete 
4c70cbe51682: Pull complete 
e21cf0cb4dc3: Pull complete 
28c36cd3abcc: Pull complete 
Digest: sha256:6ded54eb1e5d048d8310321ba7b92587e9eadc83b519165b70bbe47e4046e76a    #签名
Status: Downloaded newer image for mysql:latest
docker.io/library/mysql:latest     #真实地址

#等价于
 docker pull mysql
  docker pull docker.io/library/mysql:latest
#指定版本下载
[root@localhost ~]# docker pull mysql:5.7
5.7: Pulling from library/mysql
bf5952930446: Already exists 
8254623a9871: Already exists 
938e3e06dac4: Already exists 
ea28ebf28884: Already exists 
f3cef38785c2: Already exists 
894f9792565a: Already exists 
1d8a57523420: Already exists 
5f09bf1d31c1: Pull complete 
1591b28581e8: Pull complete 
96ef942f7603: Pull complete 
2e009731422e: Pull complete 
Digest: sha256:1a83136153b238b659b0887ceb4e08275473af1eab2e67de4c22b37c5f4130cd
Status: Downloaded newer image for mysql:5.7
docker.io/library/mysql:5.7
#Docker核心技术，联合文件系统
```

docker rmi       删除镜像

```shell
docker rmi -f 容器id    #删除指定的镜像
docker rmi -f 容器id 容器id 容器id 容器id   #删除多个镜像
docker rmi -f $(docker images -aq)  #删除全部的镜像
```

## 容器命令

说明：有了镜像才可以创建容器，linux，下载一个centos镜像来学习

```shell
docker pull centos
```

新建容器并启动

```shell
docker run [可选参数]  image [COMMAND] [ARG...]

#参数说明
--name="Name"   容器名字，用来区分容器
-d                        后台方式运行
-it                        使用交互方式运行，进入容器查看内容
-p                        指定容器的端口       -p 8080:8080
           -p ip：主机端口：容器端口
           -p 主机端口：容器端口（常用）
           -p 容器端口
           容器端口
-P                        随机指定端口

#测试，启动并进入容器
[root@localhost ~]# docker run -it centos /bin/bash 
[root@722593ffe38b /]# ls           #查看容器内的centos，基础版本，很多命令都是不完善的
bin  dev  etc  home  lib  lib64  lost+found  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
#退出容器返回主机
[root@722593ffe38b /]# exit
exit
```

列出所有运行的容器

```shell
#docker ps 命令
             #列出当前在运行的容器
  -a        #列出当前在运行的容器+带出历史运行过的容器
  -n=?    #显示最近运行过的几个容器，可指定个数
  -q        #只显示容器的id
[root@localhost ~]# docker ps
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
[root@localhost ~]# docker ps -a
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS                     PORTS               NAMES
722593ffe38b        centos              "/bin/bash"         5 minutes ago       Exited (0) 2 minutes ago                       lucid_wiles
54d04b0640f6        centos              "/bin/bash"         8 minutes ago       Exited (0) 8 minutes ago                       wizardly_meitner
f764f680f9eb        centos:centos7      "/bin/bash"         6 days ago          Exited (137) 6 days ago                        centos-test
13aaa438d5d2        hello-world         "/hello"            12 days ago         Exited (0) 12 days ago                         boring_jennings

```

**退出容器**

```shell
exit                #容器停止并退出
ctrl + P + Q     #容器不停止并退出
```

删除容器

```shell
docker rm 容器id                           #删除指定的容器，不能删除正在运行的容器，如果强制删除 rm -f
docker rm -f $(docker ps -aq)         #删除所有容器
docker ps -a -q | xargs docker rm    #删除所有容器，通过linux的管道命令
```

启动和停止容器的操作

```shell
docker start 容器id              #启动容器
docker restart 容器id           #重启容器
docker stop 容器id              #停止当前运行的容器
docker kill 容器id                #强制停止当前容器
```



## 常用的其它命令

后台启动容器

```shell
#命令 docker run -d 镜像名
[root@localhost ~]# docker run -d centos

#问题docker ps 发现 centos 停止了

#常见的坑，docker容器使用后台运行，就必须要有一个前台进程，docker发现没有应用，就会自动停止
#nginx，容器启动后，发现自己没有提供服务，就会立刻停止，就是没有程序了
```

查看日志

```shell
docker logs -f -t --tail 10 容器，没有日志

#自己编写一段shell脚本
[root@localhost ~]# docker run -d centos /bin/bash -c "while true;do echo java; sleep 1; done"

#显示日志
-tf                   #显示日志
--tail  number               #显示日志的条数
[root@localhost ~]# docker logs -tf --tail 10 9c7232739cfb
```

查看容器中的进程信息

```shell
#命令 docker top 容器id
[root@localhost ~]# docker top 9c7232739cfb
UID                 PID                 PPID                C                   STIME               TTY                 TIME                CMD
root                538                 27212               0                   18:05               ?                   00:00:00            /usr/bin/coreutils --coreutils-prog-shebang=sleep /usr/bin/sleep 1
root                27212               27194               0                   16:41               ?                   00:00:02            /bin/bash -c while true;do echo java; sleep 1; done
```

查看镜像的元数据

```shell
#命令
docker inspect  容器id

#测试
[root@localhost ~]# docker inspect 9c7232739cfb
[
    {
        "Id": "9c7232739cfb49a2cac20d4af51309d31800f5f2c0e679856d022d1c4283293b",
        "Created": "2020-09-07T08:41:33.636256404Z",
        "Path": "/bin/bash",
        "Args": [
            "-c",
            "while true;do echo java; sleep 1; done"
        ],
        "State": {
            "Status": "running",
            "Running": true,
            "Paused": false,
            "Restarting": false,
            "OOMKilled": false,
            "Dead": false,
            "Pid": 27212,
            "ExitCode": 0,
            "Error": "",
            "StartedAt": "2020-09-07T08:41:35.666421622Z",
            "FinishedAt": "0001-01-01T00:00:00Z"
        },
        "Image": "sha256:0d120b6ccaa8c5e149176798b3501d4dd1885f961922497cd0abef155c869566",
        "ResolvConfPath": "/var/lib/docker/containers/9c7232739cfb49a2cac20d4af51309d31800f5f2c0e679856d022d1c4283293b/resolv.conf",
        "HostnamePath": "/var/lib/docker/containers/9c7232739cfb49a2cac20d4af51309d31800f5f2c0e679856d022d1c4283293b/hostname",
        "HostsPath": "/var/lib/docker/containers/9c7232739cfb49a2cac20d4af51309d31800f5f2c0e679856d022d1c4283293b/hosts",
        "LogPath": "/var/lib/docker/containers/9c7232739cfb49a2cac20d4af51309d31800f5f2c0e679856d022d1c4283293b/9c7232739cfb49a2cac20d4af51309d31800f5f2c0e679856d022d1c4283293b-json.log",
        "Name": "/intelligent_pascal",
        "RestartCount": 0,
        "Driver": "devicemapper",
        "Platform": "linux",
        "MountLabel": "",
        "ProcessLabel": "",
        "AppArmorProfile": "",
        "ExecIDs": null,
        "HostConfig": {
            "Binds": null,
            "ContainerIDFile": "",
            "LogConfig": {
                "Type": "json-file",
                "Config": {}
            },
            "NetworkMode": "default",
            "PortBindings": {},
            "RestartPolicy": {
                "Name": "no",
                "MaximumRetryCount": 0
            },
            "AutoRemove": false,
            "VolumeDriver": "",
            "VolumesFrom": null,
            "CapAdd": null,
            "CapDrop": null,
            "Capabilities": null,
            "Dns": [],
            "DnsOptions": [],
            "DnsSearch": [],
            "ExtraHosts": null,
            "GroupAdd": null,
            "IpcMode": "private",
            "Cgroup": "",
            "Links": null,
            "OomScoreAdj": 0,
            "PidMode": "",
            "Privileged": false,
            "PublishAllPorts": false,
            "ReadonlyRootfs": false,
            "SecurityOpt": null,
            "UTSMode": "",
            "UsernsMode": "",
            "ShmSize": 67108864,
            "Runtime": "runc",
            "ConsoleSize": [
                0,
                0
            ],
            "Isolation": "",
            "CpuShares": 0,
            "Memory": 0,
            "NanoCpus": 0,
            "CgroupParent": "",
            "BlkioWeight": 0,
            "BlkioWeightDevice": [],
            "BlkioDeviceReadBps": null,
            "BlkioDeviceWriteBps": null,
            "BlkioDeviceReadIOps": null,
            "BlkioDeviceWriteIOps": null,
            "CpuPeriod": 0,
            "CpuQuota": 0,
            "CpuRealtimePeriod": 0,
            "CpuRealtimeRuntime": 0,
            "CpusetCpus": "",
            "CpusetMems": "",
            "Devices": [],
            "DeviceCgroupRules": null,
            "DeviceRequests": null,
            "KernelMemory": 0,
            "KernelMemoryTCP": 0,
            "MemoryReservation": 0,
            "MemorySwap": 0,
            "MemorySwappiness": null,
            "OomKillDisable": false,
            "PidsLimit": null,
            "Ulimits": null,
            "CpuCount": 0,
            "CpuPercent": 0,
            "IOMaximumIOps": 0,
            "IOMaximumBandwidth": 0,
            "MaskedPaths": [
                "/proc/asound",
                "/proc/acpi",
                "/proc/kcore",
                "/proc/keys",
                "/proc/latency_stats",
                "/proc/timer_list",
                "/proc/timer_stats",
                "/proc/sched_debug",
                "/proc/scsi",
                "/sys/firmware"
            ],
            "ReadonlyPaths": [
                "/proc/bus",
                "/proc/fs",
                "/proc/irq",
                "/proc/sys",
                "/proc/sysrq-trigger"
            ]
        },
        "GraphDriver": {
            "Data": {
                "DeviceId": "77",
                "DeviceName": "docker-8:3-11806540-3d99f1aab1fc70231e4a33bf3d090f4c39ebda096ecb0a67895f63e051765ea8",
                "DeviceSize": "10737418240"
            },
            "Name": "devicemapper"
        },
        "Mounts": [],
        "Config": {
            "Hostname": "9c7232739cfb",
            "Domainname": "",
            "User": "",
            "AttachStdin": false,
            "AttachStdout": false,
            "AttachStderr": false,
            "Tty": false,
            "OpenStdin": false,
            "StdinOnce": false,
            "Env": [
                "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
            ],
            "Cmd": [
                "/bin/bash",
                "-c",
                "while true;do echo java; sleep 1; done"
            ],
            "Image": "centos",
            "Volumes": null,
            "WorkingDir": "",
            "Entrypoint": null,
            "OnBuild": null,
            "Labels": {
                "org.label-schema.build-date": "20200809",
                "org.label-schema.license": "GPLv2",
                "org.label-schema.name": "CentOS Base Image",
                "org.label-schema.schema-version": "1.0",
                "org.label-schema.vendor": "CentOS"
            }
        },
        "NetworkSettings": {
            "Bridge": "",
            "SandboxID": "82e105fb992f04d14632d699568650740e724c7f9e82d90ae89529625d98a607",
            "HairpinMode": false,
            "LinkLocalIPv6Address": "",
            "LinkLocalIPv6PrefixLen": 0,
            "Ports": {},
            "SandboxKey": "/var/run/docker/netns/82e105fb992f",
            "SecondaryIPAddresses": null,
            "SecondaryIPv6Addresses": null,
            "EndpointID": "2135a107159d4400438f942e37316c7293dad4eb780f5bbb1ebda878696133ab",
            "Gateway": "172.17.0.1",
            "GlobalIPv6Address": "",
            "GlobalIPv6PrefixLen": 0,
            "IPAddress": "172.17.0.2",
            "IPPrefixLen": 16,
            "IPv6Gateway": "",
            "MacAddress": "02:42:ac:11:00:02",
            "Networks": {
                "bridge": {
                    "IPAMConfig": null,
                    "Links": null,
                    "Aliases": null,
                    "NetworkID": "8062ea7342acc912252c237e375035eadce0a9c56c55518a3279ee5a482e8cb8",
                    "EndpointID": "2135a107159d4400438f942e37316c7293dad4eb780f5bbb1ebda878696133ab",
                    "Gateway": "172.17.0.1",
                    "IPAddress": "172.17.0.2",
                    "IPPrefixLen": 16,
                    "IPv6Gateway": "",
                    "GlobalIPv6Address": "",
                    "GlobalIPv6PrefixLen": 0,
                    "MacAddress": "02:42:ac:11:00:02",
                    "DriverOpts": null
                }
            }
        }
    }
]
```

进入当前正在运行的容器

```shell
# 我们通常容器都是使用后台方式运行的，需要进入容器，修改一些配置

#命令
docker exec -it 容器id   bashShell

#测试
[root@localhost ~]# docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS               NAMES
9c7232739cfb        centos              "/bin/bash -c 'while…"   2 hours ago         Up 2 hours                              intelligent_pascal
[root@localhost ~]# docker exec -it 9c7232739cfb /bin/bash
[root@9c7232739cfb /]# ps -ef
UID        PID  PPID  C STIME TTY          TIME CMD
root         1     0  0 08:41 ?        00:00:02 /bin/bash -c while true;do echo java; sleep 1; done
root      5464     0  0 10:12 pts/0    00:00:00 /bin/bash
root      5481     1  0 10:12 ?        00:00:00 /usr/bin/coreutils --coreutils-prog-shebang=sleep /usr/bin/sleep 1
root      5482  5464  0 10:12 pts/0    00:00:00 ps -ef

# 方式二
docker attach 容器id
#测试
[root@localhost ~]# docker attach  9c7232739cfb
正在执行的当前代码...

#docker exec      #进入容器后开启一个新的终端，可以在里面操作（常用）
#docker attach    # 进入容器正在执行的终端，不会启动新的进程
```

从容器内拷贝文件到主机上

```shell
#命令
docker cp 容器id:容器内路径   主机目的地路径

#测试
#进入容器内部
[root@localhost ~]# docker run -it centos /bin/bash
[root@2800f5126ece /]# cd /home
[root@2800f5126ece home]# ls
#在容器内新建文件
[root@2800f5126ece home]# touch test.java
[root@2800f5126ece home]# ls
test.java
[root@2800f5126ece home]# exit
exit
[root@localhost ~]# docker ps -a
CONTAINER ID        IMAGE               COMMAND             CREATED              STATUS                          PORTS               NAMES
2800f5126ece        centos              "/bin/bash"         36 seconds ago       Exited (0) 10 seconds ago                           condescending_goldstine
14bab504d960        centos              "/bin/bash"         About a minute ago   Exited (0) About a minute ago                       boring_mendeleev
a0793f968d25        centos              "/bin/bash"         2 hours ago          Exited (0) 2 hours ago                              confident_golick
e524d24dadfb        centos              "/bin/bash"         2 hours ago          Exited (0) 2 hours ago                              reverent_boyd
#将文件拷贝出来到主机上
[root@localhost ~]# docker cp 2800f5126ece:/home/test.java  ./
[root@localhost ~]# ls
anaconda-ks.cfg       bmdwxt.sql     expect5.45.tar.gz  IedaThemes  nacos                    PycharmProjects  SunloginRemote  yarn-site.xml  视频  音乐
apache-maven-3.6.1    CentOS 64-bit  gitproject         ll-test     node-v12.16.1-linux-x64  rar              tcl8.4.11       yuqing         图片  桌面
apache-tomcat-8.5.43  code1          hdpsec             logs        Postman                  register         test.java       公共           文档
bmdwxt                expect5.45     hiveceshi.sh       M18327.lck  pycharm-2019.2           software         vmware          模板

#拷贝是一个手动过程，未来我们使用 -V卷技术，可以实现自动同步
```

## 小结

```shell
#命令总结
```



## 作业练习

> Docker安装Nginx

```shell
#1. 搜索镜像  search   (docker hub)
#2. 下载镜像  pull
#3. 运行测试

#运行容器
[root@localhost ~]# docker run -d --name nginx01 -p 8080:80 nginx
#查看网页
[root@localhost ~]# curl localhost:8080

#进入容器
[root@localhost ~]# docker run -d --name nginx01 -p 80:80 nginx
0f68404e85da9b9804aeaf5e4c208eea6a25d2212708de029f902c1abc93d1f4
[root@localhost ~]# docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                NAMES
0f68404e85da        nginx               "/docker-entrypoint.…"   9 seconds ago       Up 7 seconds        0.0.0.0:80->80/tcp   nginx01
[root@localhost ~]# docker exec -it nginx01 /bin/bash
root@0f68404e85da:/# whereis nginx
nginx: /usr/sbin/nginx /usr/lib/nginx /etc/nginx /usr/share/nginx
root@0f68404e85da:/# cd /etc/nginx/
root@0f68404e85da:/etc/nginx# ls
conf.d	fastcgi_params	koi-utf  koi-win  mime.types  modules  nginx.conf  scgi_params	uwsgi_params  win-utf
root@0f68404e85da:/etc/nginx# 
```

**遇到的问题**

```shell
#遇到问题：http://localhost:8080无法连接
[root@localhost ~]# curl localhost:8080
curl: (56) Recv failure: Connection reset by peer
```

**问题查找步骤**

```shell
#首先查找本机的8080端口，发现是在监听状态
[root@localhost ~]# netstat -anp | grep 8080
tcp6       0      0 :::8080                 :::*                    LISTEN      7144/docker-proxy   
unix  3      [ ]         STREAM     CONNECTED     38080    4398/abrt-applet     
#检查防火墙状态，发现已关闭
[root@localhost ~]# firewall-cmd --state
not running
#ipv4转发也已开启
[root@localhost log]# sysctl net.ipv4.ip_forward
net.ipv4.ip_forward = 1

#查找容器的ip地址，并ping，发现无法ping通，但可以ping通网关
[root@localhost log]# docker inspect 571df4a44571 | grep IPAddress
            "SecondaryIPAddresses": null,
            "IPAddress": "172.17.0.2",
                    "IPAddress": "172.17.0.2",
[root@localhost log]# ping 172.17.0.2
PING 172.17.0.2 (172.17.0.2) 56(84) bytes of data.
From 172.17.0.1 icmp_seq=1 Destination Host Unreachable
From 172.17.0.1 icmp_seq=2 Destination Host Unreachable
[root@localhost log]# ping 172.17.0.1
PING 172.17.0.1 (172.17.0.1) 56(84) bytes of data.
64 bytes from 172.17.0.1: icmp_seq=1 ttl=64 time=0.099 ms
64 bytes from 172.17.0.1: icmp_seq=2 ttl=64 time=0.065 ms
64 bytes from 172.17.0.1: icmp_seq=3 ttl=64 time=0.066 ms
64 bytes from 172.17.0.1: icmp_seq=4 ttl=64 time=0.067 ms
```

**解决方法**

```shell
#centos7 docker 宿主机不能访问容器问题解决
#解决方法：重新设置网卡
#停止docker
systemctl stop docker
#docker0
ip link set dev docker0 down
#删除docker0网桥
brctl delbr docker0
#防火墙设置,后来发现这一步不用执行可以
iptables -t nat -F POSTROUTING
#增加docker0 网桥
brctl addbr docker0
#增加网卡
ip addr add 172.16.10.1/24 dev docker0
#启用网卡
ip link set dev docker0 up
#重启docker服务
systemctl restart docker

#可以正常访问
[root@localhost log]# curl localhost:8080



<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>Apache Tomcat/8.5.57</title>
        <link href="favicon.ico" rel="icon" type="image/x-icon" />
        <link href="favicon.ico" rel="shortcut icon" type="image/x-icon" />
        <link href="tomcat.css" rel="stylesheet" type="text/css" />
    </head>

[root@localhost log]# ping 172.17.0.2
PING 172.17.0.2 (172.17.0.2) 56(84) bytes of data.
64 bytes from 172.17.0.2: icmp_seq=1 ttl=64 time=0.111 ms
64 bytes from 172.17.0.2: icmp_seq=2 ttl=64 time=0.052 ms

#配置前的网卡
docker0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 172.17.0.1  netmask 255.255.0.0  broadcast 172.17.255.255
        inet6 fe80::42:87ff:fea9:b4fd  prefixlen 64  scopeid 0x20<link>
        ether 02:42:87:a9:b4:fd  txqueuelen 0  (Ethernet)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 220  bytes 38797 (37.8 KiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
   
  #重新配置后的网卡
 docker0: flags=4099<UP,BROADCAST,MULTICAST>  mtu 1500
        inet 172.17.0.1  netmask 255.255.0.0  broadcast 172.17.255.255
        inet6 fe80::50fb:a3ff:febf:848e  prefixlen 64  scopeid 0x20<link>
        ether 00:00:00:00:00:00  txqueuelen 0  (Ethernet)
        RX packets 59  bytes 127834 (124.8 KiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 197  bytes 31610 (30.8 KiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0




```

**端口暴露的概念**

思考问题：每次改动nginx配置文件，都需要进入容器内部，十分麻烦，要是可以在容器外部提供一个映射路径，达到在容器外部修改文件名，容器内部就可以自动修改？ -v数据卷技术



> Docker安装Tomcat

```shell
# 官方的使用
$ docker run -it --rm tomcat:9.0

#我们之前的启动都是后台，停止了容器之后，容器还是可以查到  docker run -it --rm，一般用来测试，用完就删除

#下载再启动
docker pull tomcat

#启动运行
docker run -d -p 8080:8080  --name tomcat01 tomcat

#测试访问没有问题
#进入容器
[root@localhost ~]# docker exec -it tomcat01 /bin/bash
root@08c84b024563:/usr/local/tomcat# ls
BUILDING.txt	 LICENSE  README.md	 RUNNING.txt  conf  logs	    temp     webapps.dist
CONTRIBUTING.md  NOTICE   RELEASE-NOTES  bin	      lib   native-jni-lib  webapps  work
root@08c84b024563:/usr/local/tomcat# cd webapps
root@08c84b024563:/usr/local/tomcat/webapps# ls
root@08c84b024563:/usr/local/tomcat/webapps# 

#发现问题：1. linux命令少了   2. 没有webapps。阿里云镜像的原因，默认是最小的镜像，所有不必要的都剔除掉
#保证最小可运行的环境。
root@08c84b024563:/usr/local/tomcat# cp -r webapps.dist/* webapps
```

思考问题：以后部署项目，如果每次都要进入容器是否十分麻烦？要是可以再容器外部提供一个映射路径，再外部防止项目，就可以自动同步到内部！



> 部署es+kibana

```shell
#es 暴露的端口很多！
#es十分耗内存
#es的数据一般需要放置在安全目录
#  --net somenetwork  网络配置

#启动elasticsearch
docker run -d --name elasticsearch  -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" elasticsearch:7.6.2

#启动后 linux就卡住了  docker stats 查看cpu的状态

#es是十分耗内存的， 1.xG

#查看  docker stats 查看cpu的状态
[root@localhost ~]# docker stats
CONTAINER ID        NAME                CPU %               MEM USAGE / LIMIT    MEM %               NET I/O             BLOCK I/O           PIDS
87479d5ab093        elasticsearch       0.23%               1.227GiB / 15.4GiB   7.96%               4.33kB / 0B         0B / 0B             0
#测试一下es是否成功
[root@localhost ~]# curl localhost:9200
{
  "name" : "87479d5ab093",
  "cluster_name" : "docker-cluster",
  "cluster_uuid" : "qGsz2AzoQI26vrAhNv4bUg",
  "version" : {
    "number" : "7.6.2",
    "build_flavor" : "default",
    "build_type" : "docker",
    "build_hash" : "ef48eb35cf30adf4db14086e8aabd07ef6fb113f",
    "build_date" : "2020-03-26T06:34:37.794943Z",
    "build_snapshot" : false,
    "lucene_version" : "8.4.0",
    "minimum_wire_compatibility_version" : "6.8.0",
    "minimum_index_compatibility_version" : "6.0.0-beta1"
  },
  "tagline" : "You Know, for Search"
}

#赶紧关闭，增加内存的限制，修改配置文件 -e 环境配置修改
docker run -d --name elasticsearch02  -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node"  -e ES_JAVA_OPTS="-Xms64m -Xmx512m"  elasticsearch:7.6.2
#查看cpu状态
CONTAINER ID        NAME                CPU %               MEM USAGE / LIMIT    MEM %               NET I/O             BLOCK I/O           PIDS
9b2539553d6b        elasticsearch02     0.46%               392.3MiB / 15.4GiB   2.49%               3.01kB / 0B         0B / 0B             0
#测试是否成功
[root@localhost ~]# curl localhost:9200
{
  "name" : "9b2539553d6b",
  "cluster_name" : "docker-cluster",
  "cluster_uuid" : "-TbOV2ccQEWsnVL6jsnX-g",
  "version" : {
    "number" : "7.6.2",
    "build_flavor" : "default",
    "build_type" : "docker",
    "build_hash" : "ef48eb35cf30adf4db14086e8aabd07ef6fb113f",
    "build_date" : "2020-03-26T06:34:37.794943Z",
    "build_snapshot" : false,
    "lucene_version" : "8.4.0",
    "minimum_wire_compatibility_version" : "6.8.0",
    "minimum_index_compatibility_version" : "6.0.0-beta1"
  },
  "tagline" : "You Know, for Search"
}

```

作业：使用kibana连接es？思考网络如何连接过去

![](/root/gitproject/learn-note/docker/Docker笔记.assets/image-20200908183233581.png)



## 可视化

+ portainer(先用着)

  ```shell
  
  ```

+ Rancher(CI/CD再用)



**什么是portainer？**

Docker图形化界面管理工具，提供一个后台面板供我们操作

```shell
docker run -d -p 9000:9000  \
--restart=always  -v  /var/run/docker.sock:/var/run/docker.sock   --privileged=true   --name dev-portainer portainer/portainer
```

访问测试： http://localhost:9000

![image-20200908184542068](/root/gitproject/learn-note/docker/Docker笔记.assets/image-20200908184542068.png)

选择本地

![image-20200908184709745](/root/gitproject/learn-note/docker/Docker笔记.assets/image-20200908184709745.png)

进入之后的面板

![image-20200908185039944](/root/gitproject/learn-note/docker/Docker笔记.assets/image-20200908185039944.png)



# Docker镜像讲解

## 镜像是什么

镜像是一种轻量级，可执行的独立软件包，用来打包软件运行环境和基于运行环境开发的软件，它包含运行某个软件所需的所有内容，包括代码/运行时/库/环境变量和配置文件。

所有的应用，直接打包docker镜像，就可以直接跑起来！

如何得到镜像：

+ 从远程仓库下载
+ 朋友拷贝
+ 自己制作一个镜像DockerFile



## Docker镜像加载原理

> UnionFs（联合文件系统）

联合文件系统（[UnionFS](https://en.wikipedia.org/wiki/UnionFS)）是一种分层、轻量级并且高性能的文件系统，它支持对文件系统的修改作为一次提交来一层层的叠加，同时可以将不同目录挂载到同一个虚拟文件系统下（unite several directories into a single virtual filesystem）。Union文件系统是Docker镜像的基础。镜像可以通过分层来进行继承，基于基础镜像（没有父镜像），可以制作各种具体的镜像。

特性：一次同时加载多个文件系统，但从外面看起来，只能看到一个文件系统，联合加载会把各层文件系统叠加起来，这样最终的文件系统会包含所有底层的文件和目录。

> Docker镜像加载原理

docker 的镜像实际上由一层一层的文件系统组成，这种层级的文件系统UnionFS。

bootfs(boot file system) 主要包含bootloader和kernel，bootloader 主要是引导加载kernel，Linux刚启动时会加载bootfs文件系统，在Docker镜像的最底层是bootfs。这一层与我们典型的Linux/Unix系统是一样的，包含boot加载器和内核。当boot加载完成之后整个内核就存在内存中了，此时内存的使用权已由bootfs转交给内核，此时系统也会卸载bootfs。

roorfs （root file system），在bootfs之上。包含的就是典型Linux系统中的 /dev ，/proc，/bin ，/etx 等标准的目录和文件。rootfs就是各种不同的操作系统发行版。比如Ubuntu，Centos等等。

![img](/root/gitproject/learn-note/docker/Docker笔记.assets/12180844322018196a29c55c8de4a2.png)

平时安装的centos有几个G，而docker中只有几百兆

```shell
[root@localhost ~]# docker images centos
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
centos              centos7             7e6257c9f8d8        4 weeks ago         203MB
centos              latest              0d120b6ccaa8        4 weeks ago         215MB

```

对于一个精简的OS，rootfs可以很小，只需要包括最基本的命令、工具和程序库就可以了，因为底层直接用Host（宿主机）的kernel，自己只需要提供rootfs就行了，由此可见对于不同的Linux发行版，bootfs基本是一致的，rootfs会有差别，因此不同的发行版可以公用bootfs。

虚拟机是分钟级别，容器为秒级启动的。

## 分层理解

> 分层的镜像

下载一个镜像，观察下载的日志输出，可以看到是一层一层的下载

```shell
[root@localhost ~]# docker pull redis
Using default tag: latest
latest: Pulling from library/redis
bf5952930446: Already exists 
911b8422b695: Pull complete 
093b947e0ade: Pull complete 
c7616728f575: Pull complete 
61a55f107028: Pull complete 
0ee3e0cb4e07: Pull complete 
Digest: sha256:933c6c01829165885ea8468d87f71127b1cb76a711311e6c63708097e92ee3d1
Status: Downloaded newer image for redis:latest
docker.io/library/redis:latest

```

思考：为什么Docker镜像要采用这种分层的结构？

最大的好出，莫过于资源共享。比如有多个镜像从相同的Base镜像构建而来，那么宿主机只需要在磁盘中保存存一份Base镜像，同时内存中也只需要保存一份Base镜像，这样就可以为所有的容器服务，而且镜像的每一层都可以被共享。

查看镜像分层的方式可以通过docker image inspect 命令

```shell
[root@localhost ~]# docker image inspect redis:latest
[
       // ......
        "RootFS": {
            "Type": "layers",
            "Layers": [
                "sha256:d0f104dc0a1f9c744b65b23b3fd4d4d3236b4656e67f776fe13f8ad8423b955c",
                "sha256:09b6608896c0a00497d9e9c1b045f0c906203555740dee64473db943244059c2",
                "sha256:ab0653e928a7c1d4b2f1c8e527d735aa0ea8dcb8c50e7cefc7680cf09cf6f985",
                "sha256:023f5e28d8dc0a58f308c1b8149ff653dd885f0604b381a3f3933eaab579d139",
                "sha256:400f8c62882a9f6bfffdf3aeb62a3722c0288f7d384442b2a5a9e70414e19f3c",
                "sha256:ffb955c9fac4b5bde9318240fad879f3bd472fcc44d2249f8b09049f0468691a"
            ]
        },
        "Metadata": {
            "LastTagTime": "0001-01-01T00:00:00Z"
        }
    }
]
```

**理解：**

所有的Docker镜像都起始于一个基础镜像层，当进行修改或者增加新的内容时，就会在当前镜像层之上，创建新的镜像层。

举一个简单的例子，假如基于 Ubuntu Linux16.04创建一个新的镜像，这就是新镜像的第一层；如果在该镜像中添加 Python包，
就会在基础镜像层之上创建第二个镜像层；如果继续添加一个安全补丁，就会创健第三个镜像层该像当前已经包含3个镜像层，如下图所示（这只是一个用于演示的很简单的例子）。

![image-20200909105754579](/root/gitproject/learn-note/docker/Docker笔记.assets/image-20200909105754579.png)

在添加额外的镜像层的同时，镜像始终保持是当前所有镜像的组合，理解这一点非常重要。下图中举了一个简单的例子，每个镜像层包含3个文件，而镜像包含了来自两个镜像层的6个文件。

![image-20200909111548369](/root/gitproject/learn-note/docker/Docker笔记.assets/image-20200909111548369.png)

 上图中的镜像层跟之前图中的略有区別，主要目的是便于展示文件
下图中展示了一个稍微复杂的三层镜像，在外部看来整个镜像只有6个文件，这是因为最上层中的文件7是文件5的一个更新版

![image-20200909110842291](/root/gitproject/learn-note/docker/Docker笔记.assets/image-20200909110842291.png)

 这种情況下，上层镜像层中的文件覆盖了底层镜像层中的文件。这样就使得文件的更新版本作为一个新镜像层添加到镜像当中

Docker通过存储引擎（新版本采用快照机制）的方式来实现镜像层堆栈，并保证多镜像层对外展示为统一的文件系统

Linux上可用的存储引撃有AUFS、 Overlay2、 Device Mapper、Btrfs以及ZFS。顾名思义，每种存储引擎都基于 Linux中对应的件系统或者块设备技术，井且每种存储引擎都有其独有的性能特点。

Docker在 Windows上仅支持 windowsfilter 一种存储引擎，该引擎基于NTFS文件系统之上实现了分层和CoW [1]。

下图展示了与系统显示相同的三层镜像。所有镜像层堆并合井，对外提供统一的视图

![image-20200909105849943](/root/gitproject/learn-note/docker/Docker笔记.assets/image-20200909105849943.png)

> 特点

**Docker 镜像都是只读的**，当容器启动时，一个新的可写层加载到镜像的顶部！

这一层就是我们通常说的容器层，容器之下的都叫镜像层！

![img](/root/gitproject/learn-note/docker/Docker笔记.assets/292888-20200628131301116-1158117121.png)

![img](/root/gitproject/learn-note/docker/Docker笔记.assets/292888-20200628131829534-730198032.png)

![image-20200909110249966](/root/gitproject/learn-note/docker/Docker笔记.assets/image-20200909110249966.png)

## commit镜像

```shell
docker commit 提交容器成为一个新的副本

docker commit -m="描述信息" -a="作者" 容器id 目标镜像名:[TAG]
```

**实战测试**

```shell
# 1、启动一个默认的tomcat
docker run -d -p 8080:8080 tomcat

# 2、发现这个默认的tomcat 是没有webapps应用，官方的镜像默认webapps下面是没有文件的！
docker exec -it 容器id  /bin/bash

# 3、拷贝文件进去

# 4、将操作过的容器通过commit提交为一个镜像！我们以后就使用我们修改过的镜像即可，这就是我们自己的一个修改的镜像。
docker commit -m="描述信息" -a="作者" 容器id 目标镜像名:[TAG]
docker commit -m "update tomcat" -a "luolin" 08c84b024563 tomcat01:1.0
```

![image-20200909111929990](/root/.config/Typora/typora-user-images/image-20200909111929990.png)

如果你想要保存当前容器的状态，就可以通过commit来提交，获得一个镜像，就好比我们我们使用虚拟机的快照。



# 容器数据卷

## 什么是容器数据卷

**docker的理念回顾**

将应用和环境打包成一个镜像！

数据？如果数据都在容器中，那么我们容器删除，数据就会丢失！需求：数据可以持久化

MySQL，容器删除了，删库跑路！需求：MySQL数据可以存储在本地！

容器之间可以有一个数据共享的技术！Docker容器中产生的数据，同步到本地！

这就是卷技术！目录的挂载，将我们容器内的目录，挂载到Linux上面！

![image-20200909141032977](/root/gitproject/learn-note/docker/Docker笔记.assets/image-20200909141032977.png)

**总结一句话：容器的持久化和同步操作！容器间也是可以数据共享的！**

## 使用数据卷

> 方式一：直接使用命令来挂载  -v

```shell
docker run -it -v 主机目录:容器内目录

# 测试
[root@localhost home]# docker run -it -v /home/ceshi:/home centos /bin/bash

#通过 docker inspect 容器id 查看
[root@localhost home]# docker inspect ed588a065c49
[
    //......
    "Mounts": [          挂载 -v卷
            {
                "Type": "bind",
                "Source": "/home/ceshi",       主机内地址
                "Destination": "/home",          docker容器内的地址
                "Mode": "",
                "RW": true,
                "Propagation": "rprivate"
            }
        ],
    //......
  ]
```

**测试文件的同步**

```shell
#docker容器内
[root@ed588a065c49 /]# cd /home
[root@ed588a065c49 home]# ls             
[root@ed588a065c49 home]# touch test.java
[root@ed588a065c49 home]# ls
test.java

#主机
[root@localhost ceshi]# ls
[root@localhost ceshi]# ls
test.java
```

再来测试

1. 停止容器

2. 宿主机上修改文件

3. 容器启动

   ```shell
   docker attach 容器id
   ```

4. 容器内的数据依旧是同步的

好处：我们以后修改只需要在本地修改即可，容器内会自动同步！

## 实战：安装Mysql

思考：MySQL的数据持久化问题

```shell
# 获取镜像
[root@localhost ~]# docker pull mysql:5.7

# 运行容器,需要做数据挂载！ # 安装启动mysql, 需要配置密码的，这是要注意的点！
# 参考官网hub 
docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:tag
 
#启动我们的mysql
-d 后台运行
-p 端口映射
-v 卷挂载
-e 环境配置
--name 容器名字
[root@localhost ~]# docker run -d -p 3310:3306 -v /home/mysql/conf:/etc/mysql/conf.d -v /home/mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 --name mysql01 mysql:5.7

# 启动成功之后，我们使用命令行连接测试
[root@localhost mysql]# mysql -uroot -p123456 -h127.0.0.1 -P3310
# 在本地测试创建一个数据库，查看一下我们映射的路径是否ok！

```

假设我们将容器删除，发现，我们挂载到本地的数据卷依旧没有丢失，这就实现了容器数据持久化功能。



## 具名和匿名挂载

```shell
# 匿名挂载
-v 容器内路径!
docker run -d -P --name nginx01 -v /etc/nginx nginx

# 查看所有的volume的情况
[root@localhost home]# docker volume ls
DRIVER              VOLUME NAME
local               7a9aca3de66c35ad409bdc57d7a16fcc7d8af414c3e8c315f5dfa0b6a6f053b8
local               743c882bb28b96b9eb53dc2c62c0090703aeea80d2a38fa1324d73c5f84efeec
# 这里发现，这种就是匿名挂载，我们在 -v只写了容器内的路径，没有写容器外的路径！

#具名挂载，有具体的名字
[root@localhost home]# docker run -d -P --name nginx02 -v juming-nginx:/etc/nginx nginx
d3ed03aa848f85914c0c8ae939a4ca7c3b79928a73df6a3ea38124ba3251e2bb
[root@localhost home]# docker volume ls
DRIVER              VOLUME NAME
local               7a9aca3de66c35ad409bdc57d7a16fcc7d8af414c3e8c315f5dfa0b6a6f053b8
local               743c882bb28b96b9eb53dc2c62c0090703aeea80d2a38fa1324d73c5f84efeec
local               juming-nginx
# 通过 -v 卷名：容器内路径
# 查看一下这个卷
[root@localhost home]# docker volume inspect juming-nginx
[
    {
        "CreatedAt": "2020-09-09T15:08:06+08:00",
        "Driver": "local",
        "Labels": null,
        "Mountpoint": "/var/lib/docker/volumes/juming-nginx/_data",
        "Name": "juming-nginx",
        "Options": null,
        "Scope": "local"
    }
]
```

所有的docker容器内的卷，没有指定目录的情况下都是在`/var/lib/docker/volumes/xxxx/_data`下；

我们可以通过具名挂载方便的找到一个卷，大多情况下在使用具名挂载

```shell
#如何确定挂载类型
# 三种挂载： 匿名挂载、具名挂载、指定路径挂载
-v 容器内路径			#匿名挂载
-v 卷名：容器内路径		#具名挂载
-v /宿主机路径：容器内路径 #指定路径挂载 docker volume ls 是查看不到的
```

**拓展**

```shell
# 通过 -v 容器内路径： ro rw 改变读写权限
ro #readonly 只读
rw #readwrite 可读可写

#一旦这个设置了容器权限，容器对我们挂载出来的内容就有限定
docker run -d -P --name nginx05 -v juming:/etc/nginx:ro nginx
docker run -d -P --name nginx05 -v juming:/etc/nginx:rw nginx

# ro 只要看到ro就说明这个路径只能通过宿主机来操作，容器内部是无法操作！
```



## 初识DockerFile

Dockerfile 就是用来构建 docker 镜像的构建文件！命令脚本！先体验一下！

通过这个脚本可以生成镜像，镜像是一层一层的，脚本是一个个的命令，每个命令都是一层！

```shell
# 创建一个dockerfile文件，名字可以随便 建议Dockerfile
# 文件中的内容 指令(大写) 参数
  1 FROM centos
  2 
  3 VOLUME ["volume01","volume02"]
  4 
  5 CMD echo "----end----"
  6 CMD /bin/bash
 #这里的每个命令，就是镜像的一层！                 
```

测试

```shell
[root@localhost docker-test-column]# docker build -f /home/docker-test-column/dockerfile1 -t luolin/centos:1.0 .
Sending build context to Docker daemon  2.048kB
Step 1/4 : FROM centos
 ---> 0d120b6ccaa8
Step 2/4 : VOLUME ["volume01","volume02"]
 ---> Running in 2213f8fd835a
Removing intermediate container 2213f8fd835a
 ---> 0ceac8381c70
Step 3/4 : CMD echo "----end----"
 ---> Running in ad20a70f05d2
Removing intermediate container ad20a70f05d2
 ---> d9aebc87cea1
Step 4/4 : CMD /bin/bash
 ---> Running in 3f292389dbf4
Removing intermediate container 3f292389dbf4
 ---> 1f19ce17a456
Successfully built 1f19ce17a456
Successfully tagged luolin/centos:1.0
[root@localhost docker-test-column]# docker images
REPOSITORY            TAG                              IMAGE ID            CREATED             SIZE
luolin/centos         1.0                              1f19ce17a456        14 seconds ago      215MB
tomcat01              1.0                              aa74bf3c4ad7        4 hours ago         652MB
mysql                 5.7                              d589ea3123e0        4 days ago          448MB
mysql                 latest                           3646af3dc14a        4 days ago          544MB
redis                 latest                           41de2cc0b30e        7 days ago          104MB

```

```shell
#启动自己的镜像
[root@localhost docker-test-column]# docker run -it 1f19ce17a456  /bin/bash
[root@8eed12caa93f /]# ls -l
total 16
lrwxrwxrwx   1 root root    7 May 11  2019 bin -> usr/bin
drwxr-xr-x   5 root root  360 Sep  9 07:36 dev
drwxr-xr-x  51 root root 4096 Sep  9 07:36 etc
drwxr-xr-x   2 root root    6 May 11  2019 home
lrwxrwxrwx   1 root root    7 May 11  2019 lib -> usr/lib
lrwxrwxrwx   1 root root    9 May 11  2019 lib64 -> usr/lib64
drwx------   2 root root    6 Aug  9 21:40 lost+found
drwxr-xr-x   2 root root    6 May 11  2019 media
drwxr-xr-x   2 root root    6 May 11  2019 mnt
drwxr-xr-x   2 root root    6 May 11  2019 opt
dr-xr-xr-x 310 root root    0 Sep  9 07:36 proc
dr-xr-x---   2 root root 4096 Aug  9 21:40 root
drwxr-xr-x  11 root root 4096 Aug  9 21:40 run
lrwxrwxrwx   1 root root    8 May 11  2019 sbin -> usr/sbin
drwxr-xr-x   2 root root    6 May 11  2019 srv
dr-xr-xr-x  13 root root    0 Sep  9 07:36 sys
drwxrwxrwt   7 root root  145 Aug  9 21:40 tmp
drwxr-xr-x  12 root root  144 Aug  9 21:40 usr
drwxr-xr-x  20 root root 4096 Aug  9 21:40 var
drwxr-xr-x   2 root root    6 Sep  9 07:36 volume01    这两个目录就是我们生成镜像的时候自动挂载
drwxr-xr-x   2 root root    6 Sep  9 07:36 volume02    的，就是数据卷目录

```

这个卷和外部一定有一个同步的目录！该挂载方式为匿名挂载

```shell
#查看一下卷挂载的路径
[root@localhost docker-test-column]# docker inspect 285c2838869b
[
    //......
    "Mounts": [
            {
                "Type": "volume",
                "Name": "109c4db75dca84be601bc2bbfec822c7829b91d9791c8faddc921cf8d8e47938",
                "Source": "/var/lib/docker/volumes/109c4db75dca84be601bc2bbfec822c7829b91d9791c8faddc921cf8d8e47938/_data",
                "Destination": "volume01",
                "Driver": "local",
                "Mode": "",
                "RW": true,
                "Propagation": ""
            },
            {
                "Type": "volume",
                "Name": "2bb9542517afa35c0928cc9211abb2a36e4e0af5f08b428b66d63b236a61aac7",
                "Source": "/var/lib/docker/volumes/2bb9542517afa35c0928cc9211abb2a36e4e0af5f08b428b66d63b236a61aac7/_data",
                "Destination": "volume02",
                "Driver": "local",
                "Mode": "",
                "RW": true,
                "Propagation": ""
            }
        ],
   //......
 ]
```

测试一下刚才的文件是否同步出去了！

这种方式使用的十分多，因为我们通常会构建自己的镜像！

假设构建镜像时候没有挂载卷，要手动镜像挂载 -v 卷名：容器内路径！



## 数据卷容器

多个mysql同步数据！通过 --volumes-from 即可实现

![image-20200909160804618](/root/gitproject/learn-note/docker/Docker笔记.assets/image-20200909160804618.png)

```shell
#启动三个容器，通过我们刚才自己的写镜像启动
#容器1
[root@localhost _data]# docker run -it --name docker01 1f19ce17a456 /bin/bash
[root@12e6bda3661a /]# ls -l
total 16
lrwxrwxrwx   1 root root    7 May 11  2019 bin -> usr/bin
drwxr-xr-x   5 root root  360 Sep  9 07:59 dev
drwxr-xr-x  51 root root 4096 Sep  9 07:59 etc
drwxr-xr-x   2 root root    6 May 11  2019 home
lrwxrwxrwx   1 root root    7 May 11  2019 lib -> usr/lib
lrwxrwxrwx   1 root root    9 May 11  2019 lib64 -> usr/lib64
drwx------   2 root root    6 Aug  9 21:40 lost+found
drwxr-xr-x   2 root root    6 May 11  2019 media
drwxr-xr-x   2 root root    6 May 11  2019 mnt
drwxr-xr-x   2 root root    6 May 11  2019 opt
dr-xr-xr-x 315 root root    0 Sep  9 07:59 proc
dr-xr-x---   2 root root 4096 Aug  9 21:40 root
drwxr-xr-x  11 root root 4096 Aug  9 21:40 run
lrwxrwxrwx   1 root root    8 May 11  2019 sbin -> usr/sbin
drwxr-xr-x   2 root root    6 May 11  2019 srv
dr-xr-xr-x  13 root root    0 Sep  9 07:59 sys
drwxrwxrwt   7 root root  145 Aug  9 21:40 tmp
drwxr-xr-x  12 root root  144 Aug  9 21:40 usr
drwxr-xr-x  20 root root 4096 Aug  9 21:40 var
drwxr-xr-x   2 root root    6 Sep  9 07:59 volume01
drwxr-xr-x   2 root root    6 Sep  9 07:59 volume02

#创建容器2
#类似于docker02继承于docker01
#docker01就是数据卷容器
[root@localhost _data]# docker run -it --name docker02  --volumes-from docker01 1f19ce17a456
[root@bbc7c87192f7 /]# ls -l
total 16
lrwxrwxrwx   1 root root    7 May 11  2019 bin -> usr/bin
drwxr-xr-x   5 root root  360 Sep  9 08:02 dev
drwxr-xr-x  51 root root 4096 Sep  9 08:02 etc
drwxr-xr-x   2 root root    6 May 11  2019 home
lrwxrwxrwx   1 root root    7 May 11  2019 lib -> usr/lib
lrwxrwxrwx   1 root root    9 May 11  2019 lib64 -> usr/lib64
drwx------   2 root root    6 Aug  9 21:40 lost+found
drwxr-xr-x   2 root root    6 May 11  2019 media
drwxr-xr-x   2 root root    6 May 11  2019 mnt
drwxr-xr-x   2 root root    6 May 11  2019 opt
dr-xr-xr-x 327 root root    0 Sep  9 08:02 proc
dr-xr-x---   2 root root 4096 Aug  9 21:40 root
drwxr-xr-x  11 root root 4096 Aug  9 21:40 run
lrwxrwxrwx   1 root root    8 May 11  2019 sbin -> usr/sbin
drwxr-xr-x   2 root root    6 May 11  2019 srv
dr-xr-xr-x  13 root root    0 Sep  9 08:02 sys
drwxrwxrwt   7 root root  145 Aug  9 21:40 tmp
drwxr-xr-x  12 root root  144 Aug  9 21:40 usr
drwxr-xr-x  20 root root 4096 Aug  9 21:40 var
drwxr-xr-x   2 root root    6 Sep  9 07:59 volume01
drwxr-xr-x   2 root root    6 Sep  9 07:59 volume02
```

```shell
#在容器docker01的volume01中创建文件，同步到了docker02的volume01中
[root@localhost _data]# docker attach docker01
[root@12e6bda3661a /]# cd volume01
[root@12e6bda3661a volume01]# touch docker01
[root@12e6bda3661a volume01]# ls
docker01

[root@localhost _data]# docker attach docker02
[root@bbc7c87192f7 /]# cd volume01
[root@bbc7c87192f7 volume01]# ls
docker01
```

```shell
# 测试：可以删除docker01，查看一下docker02和docker03是否可以访问这个文件
# 测试依旧可以访问,并且docker01和docker02之间还可以同步
```

![image-20200909180147137](/root/gitproject/learn-note/docker/Docker笔记.assets/image-20200909180147137.png)

多个mysql实现数据共享

```shell
➜  ~ docker run -d -p 3306:3306 -v /home/mysql/conf:/etc/mysql/conf.d -v /home/mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 --name mysql01 mysql:5.7
➜  ~ docker run -d -p 3307:3306 -e MYSQL_ROOT_PASSWORD=123456 --name mysql02 --volumes-from mysql01  mysql:5.7
# 这个时候，可以实现两个容器数据同步！
```

**结论：**

容器之间的配置信息的传递，数据卷容器的生命周期一直持续到没有容器使用为止。

但是一旦你持久化到了本地，这个时候，本地的数据是不会删除的！

# DockerFile

## DockerFile介绍

dockerfile是用来构建docker镜像的文件！命令参数脚本！

构建步骤：

+ 编写一个dockerfile文件
+ docker build 构建称为一个镜像
+ docker run运行镜像
+ docker push发布镜像（DockerHub 、阿里云仓库)

**查看一下官方是怎么做的？**

![image-20200909180323932](/root/gitproject/learn-note/docker/Docker笔记.assets/image-20200909180323932.png)



![image-20200909180405460](/root/gitproject/learn-note/docker/Docker笔记.assets/image-20200909180405460.png)

很多官方镜像都是基础包，很多功能没有，我们通常会自己搭建自己的镜像！

官方既然可以制作镜像，那我们也可以！



## DockerFile构建过程

**基础知识：**

1. 每个保留关键字（指令）都必须是大写字母
2. 执行从上到下顺序执行
3. /# 表示注释
4. 每一个指令都会创建提交一个新的镜像层，并提交！

![img](file:///root/gitproject/learn-note/docker/Docker笔记.assets/292888-20200628131301116-1158117121.png?lastModify=1600935740)

dockerfile是面向开发的，我们以后要发布项目，做镜像，就需要编写dockerfile文件，这个文件十分简单！

Docker镜像逐渐成为企业交付的标准，必须要掌握！

> 步骤：开发，部署，运维

DockerFile : 构建文件，定义了一切的步骤，源代码

DockerImages ： 通过DokerFile构建生成的镜像，是最终发布和运行的产品

Docker容器：容器就是镜像运行起来提供服务器



## DockerFile的指令

以前我们使用别人的，现在我们知道了这些指令之后，我们来练习自己写一个镜像！

```shell
FROM         # 基础镜像，一切从这里开始构建  centos
MAINTAINER   # 镜像是谁运行的，姓名+邮箱
RUN          # 镜像构建的时候需要运行的命令
ADD          # 步骤：tomcat镜像，这个tomcat的压缩包 ！ 添加内容
WORKDIR      # 镜像的工作目录  
VOLUME       # 挂载的目录
EXPOSE       # 暴露端口配置
CMD          # 指定这个容器启动的时候要运行的命令，只有最后一个会生效，可被取代
ENTRYPOINT   # 指定这个容器启动的时候要运行的命令，可以追加命令
ONBUILD      # 当构建一个被继承DockFile 这个时候就会运行 ONBUILD 的指令，触发指令
COPY         # 类似ADD，将我们文件拷贝到镜像中
ENV          # 构建的时候设置环境变量
```



![img](/root/gitproject/learn-note/docker/Docker笔记.assets/u=268974649,2607019911&fm=26&gp=0.jpg)

## 实战测试

Docker Hub中99%镜像都是从这个基础镜像过来的FROM scratch，然后配置需要的软件和配置来进行构建

![image-20200910135448087](/root/gitproject/learn-note/docker/Docker笔记.assets/image-20200910135448087.png)

> 创建一个自己的centos

```shell
# 1.编写Dockerfile的文件
FROM centos
MAINTAINER dainel<dlgnjupt@qq.com>

ENV MYPATH /usr/local
WORKDIR $MYPATH

RUN yum -y install vim
RUN yum -y install net-tools

EXPOSE 80

CMD echo $MYPATH
CMD echo "-----end----"
CMD /bin/bash

# 2.通过这个文件构建镜像
# 命令 docker build -f 文件路径 -t 镜像名:[tag] . 
docker build -f mydockerfile-centos -t mycentos:0.1 .

Successfully built e0faeaa39b39
Successfully tagged mycentos:0.1

#3.测试运行

```

对比: 之前的原生的centos

```shell
[root@localhost dockerfile]# docker run -it centos
[root@4900e7219cb1 /]# pwd
/
[root@4900e7219cb1 /]# vim
bash: vim: command not found
[root@4900e7219cb1 /]# ifconfig
bash: ifconfig: command not found

```

自己创建的增加后的镜像

```shell
[root@localhost dockerfile]# docker run -it mycentos:0.1
[root@446af94a3ab4 local]# pwd
/usr/local
[root@446af94a3ab4 local]# ifconfig
eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 172.17.0.2  netmask 255.255.0.0  broadcast 172.17.255.255
        ether 02:42:ac:11:00:02  txqueuelen 0  (Ethernet)
        RX packets 21  bytes 2631 (2.5 KiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        loop  txqueuelen 0  (Local Loopback)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
```

我们可以列出本地进行的变更历史

docker history 容器id

```shell
[root@localhost dockerfile]# docker history e0faeaa39b39
IMAGE               CREATED             CREATED BY                                      SIZE                COMMENT
e0faeaa39b39        2 hours ago         /bin/sh -c #(nop)  CMD ["/bin/sh" "-c" "/bin…   0B                  
bf622ef490d5        2 hours ago         /bin/sh -c #(nop)  CMD ["/bin/sh" "-c" "echo…   0B                  
e742ef1584d8        2 hours ago         /bin/sh -c #(nop)  CMD ["/bin/sh" "-c" "echo…   0B                  
3e0545ca16b5        2 hours ago         /bin/sh -c #(nop)  EXPOSE 80                    0B                  
4dffcaa1af55        2 hours ago         /bin/sh -c yum -y install net-tools             14.4MB              
0178287ac252        2 hours ago         /bin/sh -c yum -y install vim                   57.3MB              
3c76e75c5ae4        2 hours ago         /bin/sh -c #(nop) WORKDIR /usr/local            0B                  
9dcb37b2f8de        2 hours ago         /bin/sh -c #(nop)  ENV MYPATH=/usr/local        0B                  
59b434c86183        2 hours ago         /bin/sh -c #(nop)  MAINTAINER dainel<hfdjfgh…   0B                  
0d120b6ccaa8        4 weeks ago         /bin/sh -c #(nop)  CMD ["/bin/bash"]            0B                  
<missing>           4 weeks ago         /bin/sh -c #(nop)  LABEL org.label-schema.sc…   0B                  
<missing>           4 weeks ago         /bin/sh -c #(nop) ADD file:538afc0c5c964ce0d…   215MB               

```

平时拿到一个镜像,可以研究一下这是怎么做的?



> CMD 和 ENTRYPOINT区别

```shell
CMD          # 指定这个容器启动的时候要运行的命令，只有最后一个会生效，可被取代
ENTRYPOINT   # 指定这个容器启动的时候要运行的命令，可以追加命令
```

测试CMD

```shell
# 编写dockerfile文件
[root@localhost dockerfile]# vim dockerfile-cmd-test
   FROM centos
   CMD ["ls","-a"]

# 构建镜像
[root@localhost dockerfile]# docker build -f dockerfile-cmd-test  -t cmdtest .
Sending build context to Docker daemon  3.072kB
Step 1/2 : FROM centos
 ---> 0d120b6ccaa8
Step 2/2 : CMD ["ls","-a"]
 ---> Running in 47aa556ed978
Removing intermediate container 47aa556ed978
 ---> 95c32cdcf4d3
Successfully built 95c32cdcf4d3
Successfully tagged cmdtest:latest

# @run运行, ls -a命令生效
[root@localhost dockerfile]# docker run 95c32cdcf4d3
.
..
.dockerenv
bin
dev
etc
home
lib
lib64
lost+found
media
mnt
opt
proc
root
run
sbin
srv
sys
tmp
usr
var

# 想追加一个命令 -l   ls -al
[root@localhost dockerfile]# docker run 95c32cdcf4d3 -l
docker: Error response from daemon: OCI runtime create failed: container_linux.go:349: starting container process caused "exec: \"-l\": executable file not found in $PATH": unknown.

# cmd的情景下  -l 替换了 CMD ["ls","-a"] 命令, -l 不是命令,所以报错
[root@localhost dockerfile]# docker run 95c32cdcf4d3 ls -al
total 24
drwxr-xr-x  17 root root 4096 Sep 10 10:06 .
drwxr-xr-x  17 root root 4096 Sep 10 10:06 ..
-rwxr-xr-x   1 root root    0 Sep 10 10:06 .dockerenv
lrwxrwxrwx   1 root root    7 May 11  2019 bin -> usr/bin
drwxr-xr-x   5 root root  340 Sep 10 10:06 dev

```

测试ENTRYPOINT

```shell
[root@localhost dockerfile]# vim dockerfile-cmd-entrypoint
   FROM centos
   ENTRYPOINT ["ls","-a"]

[root@localhost dockerfile]# docker build -f dockerfile-cmd-entrypoint -t entrypointtest .
Sending build context to Docker daemon  4.096kB
Step 1/2 : FROM centos
 ---> 0d120b6ccaa8
Step 2/2 : ENTRYPOINT ["ls","-a"]
 ---> Running in 8daca5306290
Removing intermediate container 8daca5306290
 ---> 6dba5dde1ca0
Successfully built 6dba5dde1ca0
Successfully tagged entrypointtest:latest
[root@localhost dockerfile]# docker run 6dba5dde1ca0
.
..
.dockerenv
bin
dev
etc
home
lib
lib64
lost+found
media
mnt
opt
proc
root
run
sbin
srv
sys
tmp
usr
var

#我们追加的命令是直接拼接在ENTRYPOINT命令的后面的
[root@localhost dockerfile]# docker run 6dba5dde1ca0 -l
total 24
drwxr-xr-x  17 root root 4096 Sep 10 10:09 .
drwxr-xr-x  17 root root 4096 Sep 10 10:09 ..
-rwxr-xr-x   1 root root    0 Sep 10 10:09 .dockerenv
lrwxrwxrwx   1 root root    7 May 11  2019 bin -> usr/bin
drwxr-xr-x   5 root root  340 Sep 10 10:09 dev
drwxr-xr-x  51 root root 4096 Sep 10 10:09 etc
drwxr-xr-x   2 root root    6 May 11  2019 home
lrwxrwxrwx   1 root root    7 May 11  2019 lib -> usr/lib
lrwxrwxrwx   1 root root    9 May 11  2019 lib64 -> usr/lib64
drwx------   2 root root    6 Aug  9 21:40 lost+found
drwxr-xr-x   2 root root    6 May 11  2019 media
drwxr-xr-x   2 root root    6 May 11  2019 mnt
drwxr-xr-x   2 root root    6 May 11  2019 opt
dr-xr-xr-x 347 root root    0 Sep 10 10:09 proc
dr-xr-x---   2 root root 4096 Aug  9 21:40 root
drwxr-xr-x  11 root root 4096 Aug  9 21:40 run
lrwxrwxrwx   1 root root    8 May 11  2019 sbin -> usr/sbin
drwxr-xr-x   2 root root    6 May 11  2019 srv
dr-xr-xr-x  13 root root    0 Sep 10 10:09 sys
drwxrwxrwt   7 root root  145 Aug  9 21:40 tmp
drwxr-xr-x  12 root root  144 Aug  9 21:40 usr
drwxr-xr-x  20 root root 4096 Aug  9 21:40 var

```

Dockerfile中很多命令都十分相似,需要了解他们的区别,最好的学习方式是对比并进行测试



## 实战: Tomcat镜像

1. 准备镜像文件 tomcat压缩包, jdk的压缩包

   ```shell
   [root@localhost tomcat]# ll
   总用量 195256
   -rw-r--r-- 1 root root   5894559 9月  10 18:15 apache-tomcat-9.0.37-src.tar.gz
   -rw-r--r-- 1 root root 194042837 9月  10 18:17 jdk-8u202-linux-x64.tar.gz
   ```

   

2. 编写dockerfile文件,官方命名 Dockerfile, build会自动寻找这个文件,就不需要-f指定了!

```shell
FROM centos
MAINTAINER luolin<924294166@qq.com>

COPY readme.txt /usr/local/readme.txt

ADD jdk-8u202-linux-x64.tar.gz /usr/local/
ADD apache-tomcat-9.0.37.tar.gz /usr/local/

RUN yum -y install vim 

ENV MYPATH /usr/local
WORKDIR $MYPATH

ENV JAVA_HOME /usr/local/jdk1.8.0_202
ENV CLASSPATH $JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
ENV CATALINA_HOME /usr/local/apache-tomcat-9.0.37
ENV CATALINA_BASE /usr/local/apache-tomcat-9.0.37
ENV PATH $PATH:$JAVA_HOME/bin:$CATALINA_HOME/lib:$CATALINA_HOME/bin

EXPOSE 8080

CMD /usr/local/apache-tomcat-9.0.37/bin/startup.sh && tail -f /usr/local/apache-tomcat-9.0.37/logs/catalina.out
```

**带注释**

```shell
FROM centos   # 
MAINTAINER luolin<924294166@qq.com>
COPY readme.txt /usr/local/readme.txt   #复制文件
ADD jdk-8u202-linux-x64.tar.gz /usr/local/    #复制解压
ADD apache-tomcat-9.0.37.tar.gz /usr/local/   #复制解压
RUN yum -y install vim 
ENV MYPATH /usr/local     # 设置环境变量
WORKDIR $MYPATH           # 设置工作目录
ENV JAVA_HOME /usr/local/jdk1.8.0_202      # 设置环境变量
ENV CLASSPATH $JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar 
ENV CATALINA_HOME /usr/local/apache-tomcat-9.0.37
ENV CATALINA_BASE /usr/local/apache-tomcat-9.0.37
ENV PATH $PATH:$JAVA_HOME/bin:$CATALINA_HOME/lib:$CATALINA_HOME/bin
EXPOSE 8080    # 设置暴露的端口
CMD /usr/local/apache-tomcat-9.0.37/bin/startup.sh && tail -f /usr/local/apache-tomcat-9.0.37/logs/catalina.out    # 设置默认的命令

```

3. 构建镜像

```shell
# 因为dockerfile命令使用默认命名 因此不用使用 -f 指定文件
[root@localhost tomcat]# docker build -t diytomcat .
```

4. run镜像

```shell
[root@localhost tomcat]# docker run -d -p 9090:8080 -v /home/luolin/build/tomcat/test/:/usr/local/apache-tomcat-9.0.37/webapps/  -v /home/luolin/build/tomcat/tomcatlogs:/usr/local/apache-tomcat-9.0.37/logs diytomcat
```

遇到的问题：

```shell
# 1.容器运行之后马上停止，查看docker logs 容器id 
[root@localhost tomcat]# docker logs 57084ab70777
/bin/sh: /usr/local/apache-tomcat-9.0.37/bin/startup.sh: No such file or directory
# 原因：apache-tomcat-9.0.37-src.tar.gz解压后的文件名为apache-tomcat-9.0.37-src

# 2.容器运行之后马上停止，查看docker logs 容器id 
[root@localhost tomcat]# docker logs e3222df4656f72
/bin/sh: /usr/local/apache-tomcat-9.0.37/bin/startup.sh: Permission denied
# 原因：没有运行权限
# 解决方法： 在dockerfile中加上 RUN chmod 777 /usr/local/apache-tomcat-9.0.37/bin/*.sh

# 3.容器运行之后马上停止，查看docker logs 容器id 
[root@localhost tomcat]# docker logs f0a63ccbe15
/usr/local/apache-tomcat-9.0.37/bin/startup.sh: line 24: uname: command not found
/usr/local/apache-tomcat-9.0.37/bin/startup.sh: line 41: dirname: command not found
Cannot find /catalina.sh
The file is absent or does not have execute permission
This file is needed to run this program
# 原因：设置ENV PATH $PATN;$JAVA_HOME/bin;$CATALINA_HOME/lib;$CATALINA_HOME/bin，把$PATH写成$PATN，导致找不到命令

# 4.页面无法连接
[root@localhost tomcat]# docker logs 6f41cc139eb
Tomcat started.
Error: Could not find or load main class org.apache.catalina.startup.Bootstrap
# 原因：tomcat的软件包下错，下成了src版本
# 解决：下载正确软件包apache-tomcat-9.0.37.tar.gz，此时不会再出现权限的问题，因此问题1不存在

# 5.页面找不到 not found 404
[root@localhost tomcat]# curl localhost:9090
<!doctype html><html lang="en"><head><title>HTTP Status 404 – Not Found</title><style type="text/css">body {font-family:Tahoma,Arial,sans-serif;} h1, h2, h3, b {color:white;background-color:#525D76;} h1 {font-size:22px;} h2 {font-size:16px;} h3 {font-size:14px;} p {font-size:12px;} a {color:black;} .line {height:1px;background-color:#525D76;border:none;}</style></head><body><h1>HTTP Status 404 – Not Found</h1><hr class="line" /><p><b>Type</b> Status Report</p><p><b>Description</b> The origin server did not find a current representation for the target resource or is not willing to disclose that one exists.</p><hr class="line" /><h3>Apache Tomcat/9.0.37</h3></body></html>[root@localhost tomcat]# docker attach 93353c2f6bd4
# 原因：在运行的时候将webapps挂载在本地，本地新建文件夹/home/luolin/build/tomcat/test，致使webapps里面的内容消失。 /home/luolin/build/tomcat/test:/usr/local/apache-tomcat-9.0.37/webapps
# 解决：/home/luolin/build/tomcat/test:/usr/local/apache-tomcat-9.0.37/webapps/test
```



5. 访问测试

6. 发布项目(由于做了卷挂载，直接在本地编写项目就可以发布了)

```xml
<?xml version="1.0" encoding="UTF-8"?>    # 注意：该行的前面以东不能有空格，否则报错
  <web-app xmlns="http://java.sun.com/xml/ns/javaee"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xsi:schemaLocation="http://java.sun.com/xml/ns/javaee
                               http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd"
           version="2.5">

  </web-app>
```



```jsp
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>hello,run test</title>
</head>
<body>
Hello World!<br/>
<%
System.out.println("-----my test web logs-----------");
%>
</body>
</html>
```



发现：部署项目成功，可以直接访问

我们以后开发的步骤：需要掌握Dockerfile的编写，之后的一切都是使用docker镜像来发布运行



## 发布自己的镜像

> Dockerhub

1、地址 https://hub.docker.com/

2、确定这个账号可以登录

3、登录

```shell
[root@localhost tomcat]# docker login --help

Usage:	docker login [OPTIONS] [SERVER]

Log in to a Docker registry.
If no server is specified, the default is defined by the daemon.

Options:
  -p, --password string   Password
      --password-stdin    Take the password from stdin
  -u, --username string   Username
  
[root@localhost tomcat]# docker login -u luolin1994
Password: 
WARNING! Your password will be stored unencrypted in /root/.docker/config.json.
Configure a credential helper to remove this warning. See
https://docs.docker.com/engine/reference/commandline/login/#credentials-store

Login Succeeded
```

4、提交 push镜像 ，docker push

```shell
# 会发现push不上去，因为如果没有前缀的话默认是push到 官方的library
[root@localhost tomcat]# docker push diytomcat5
The push refers to repository [docker.io/library/diytomcat5]
9b02ce96c9f3: Preparing 
98713c8c3705: Preparing 
aebf8a8db582: Preparing 
c0f18abec7ac: Preparing 
291f6e44771a: Preparing 
denied: requested access to the resource is denied

# 解决方法
# 第一种 build的时候添加你的dockerhub用户名，然后在push就可以放到自己的仓库了
$ docker build -t chengcoder/mytomcat:0.1 .
# 第二种 使用docker tag #然后再次push
$ docker tag 容器id chengcoder/mytomcat:1.0 #然后再次push
```

提交的时候也是按照镜像的层级来进行提交的。



> 阿里云镜像

1. 看官网 很详细https://cr.console.aliyun.com/repository/登录阿里云
2. 找到容器镜像服务
3. 创建命名空间
4. 创建容器镜像
5. 浏览阿里云



## 小结



![image-20200914182220037](/root/gitproject/learn-note/docker/Docker笔记.assets/image-20200914182220037.png)



# Docker网络

## 理解Docker0

清空所有环境

> 测试

```shell
[root@localhost tomcat]# ip addr
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN 
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo                    # 本机回环地址
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host 
       valid_lft forever preferred_lft forever
2: enp0s31f6: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP qlen 1000
    link/ether 18:66:da:48:93:56 brd ff:ff:ff:ff:ff:ff
    inet 192.168.1.100/24 brd 192.168.1.255 scope global enp0s31f6
       valid_lft forever preferred_lft forever
    inet6 fe80::1a66:daff:fe48:9356/64 scope link 
       valid_lft forever preferred_lft forever
10: docker0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc noqueue state DOWN 
    link/ether 00:00:00:00:00:00 brd ff:ff:ff:ff:ff:ff
    inet 172.17.0.1/16 brd 172.17.255.255 scope global docker0    #docker地址
       valid_lft forever preferred_lft forever
    inet6 fe80::50fb:a3ff:febf:848e/64 scope link 
       valid_lft forever preferred_lft forever
```

三个网络

```shell
# 问题，docker是如何处理容器网络访问的
```

![image-20200914183511870](/root/gitproject/learn-note/docker/Docker笔记.assets/image-20200914183511870.png)

```shell
[root@localhost tomcat]# docker run -d -P --name tomcat01 tomcat

# 查看容器的内部网络地址 ip addr, 发现容器启动的时候会得到一个eth0@if172 ip地址，docker分配的
[root@localhost tomcat]# docker exec -it tomcat01 ip addr
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default 
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
171: eth0@if172: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default 
    link/ether 02:42:ac:11:00:02 brd ff:ff:ff:ff:ff:ff link-netnsid 0
    inet 172.17.0.2/16 brd 172.17.255.255 scope global eth0
       valid_lft forever preferred_lft forever

# 思考，linux能不能 ping 通容器内部
[root@localhost tomcat]# ping 172.17.0.2
PING 172.17.0.2 (172.17.0.2) 56(84) bytes of data.
64 bytes from 172.17.0.2: icmp_seq=1 ttl=64 time=0.106 ms
64 bytes from 172.17.0.2: icmp_seq=2 ttl=64 time=0.032 ms
64 bytes from 172.17.0.2: icmp_seq=3 ttl=64 time=0.040 ms
64 bytes from 172.17.0.2: icmp_seq=4 ttl=64 time=0.052 ms
64 bytes from 172.17.0.2: icmp_seq=5 ttl=64 time=0.052 ms

# linux 可以 ping 通 docker 容器内部
```



> 原理

1 我们每启动一个docker容器,docker就会给docker容器分配一个ip, 我们只要安装了docker,就会有一个网卡docker0

桥接模式, 使用的技术是evth-pair技术!

再次测试 ip addr

```shell
[root@localhost tomcat]# ip addr
# 多了以下内容
172: veth13c2c91@if171: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue master docker0 state UP 
    link/ether 3a:4e:a8:b0:0d:2c brd ff:ff:ff:ff:ff:ff link-netnsid 0
    inet6 fe80::384e:a8ff:feb0:d2c/64 scope link 
       valid_lft forever preferred_lft forever

```

2 再启动一个容器测试,发现又多了一对网卡

```shell
[root@localhost tomcat]# docker run -d -P --name tomcat02 tomcat
[root@localhost tomcat]# ip addr
# 多了以下内容

172: veth13c2c91@if171: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue master docker0 state UP 
    link/ether 3a:4e:a8:b0:0d:2c brd ff:ff:ff:ff:ff:ff link-netnsid 0
    inet6 fe80::384e:a8ff:feb0:d2c/64 scope link 
       valid_lft forever preferred_lft forever
174: veth8e16992@if173: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue master docker0 state UP 
    link/ether 86:61:d4:fa:91:74 brd ff:ff:ff:ff:ff:ff link-netnsid 1
    inet6 fe80::8461:d4ff:fefa:9174/64 scope link 
       valid_lft forever preferred_lft forever
```

```shell
[root@localhost tomcat]# docker exec -it tomcat02 ip addr
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default 
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
173: eth0@if174: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default 
    link/ether 02:42:ac:11:00:03 brd ff:ff:ff:ff:ff:ff link-netnsid 0
    inet 172.17.0.3/16 brd 172.17.255.255 scope global eth0
       valid_lft forever preferred_lft forever

```

```shell
# 发现容器带来的网卡都是一对一对的
# veth-pair 就是一对的虚拟设备接口,他们都是成对出现的,一端连着协议,一端彼此相连
# 整因为有这个特性, veth-pair充当一个桥梁,连接各种虚拟网络设备的
# openstack, docker容器之间的连接, ovs的连接,都是使用veth-pair技术
```

3 我们来测试一下 tomcat1 和 tomcat2 是否可以ping 通

```shell
[root@localhost tomcat]# docker exec -it tomcat01 ping 172.17.0.3
PING 172.17.0.3 (172.17.0.3) 56(84) bytes of data.
64 bytes from 172.17.0.3: icmp_seq=1 ttl=64 time=0.067 ms
64 bytes from 172.17.0.3: icmp_seq=2 ttl=64 time=0.032 ms
64 bytes from 172.17.0.3: icmp_seq=3 ttl=64 time=0.032 ms

# 结论：容器和容器之间是可以ping通的
```

![image-20200915141641682](/root/gitproject/learn-note/docker/Docker笔记.assets/image-20200915141641682.png)

**结论**:

1. tomcat01 和 tomcat02 是公用一个路由器，docker0。

2. 所有的容器不指定网络的情况下，都是通过docker0路由的，docker会给我们的容器分配一个默认的可用IP



> 小结

Docker使用的是Linux的桥接，宿主机是一个Docker容器的网桥 docker0

![image-20200915142234649](/root/gitproject/learn-note/docker/Docker笔记.assets/image-20200915142234649.png)

Docker中所有网络接口都是虚拟的，虚拟的转发效率高（内网传递文件）。

只要容器删除，对应的网桥一对就没了！



## --link

> 思考一个场景：我们编写了一个微服务，database url=ip: 项目不重启，数据ip换了，我们希望可以处理这个问题，可以通过名字来进行访问容器？

```shell
[root@localhost tomcat]# docker exec -it tomcat02 ping tomcat01
ping: tomcat01: Name or service not known
# ping不通

# 如何解决呢？
# 通过 --link 就可以解决网络连通问题
[root@localhost tomcat]# docker run -d -P --name tomcat03 --link tomcat02 tomcat
b20853a22abbe643baa8b93fa0d3c5eca17905a84daf6dfdf37f1352d9866904
[root@localhost tomcat]# docker exec -it tomcat03 ping tomcat02
PING tomcat02 (172.17.0.3) 56(84) bytes of data.
64 bytes from tomcat02 (172.17.0.3): icmp_seq=1 ttl=64 time=0.065 ms
64 bytes from tomcat02 (172.17.0.3): icmp_seq=2 ttl=64 time=0.034 ms
64 bytes from tomcat02 (172.17.0.3): icmp_seq=3 ttl=64 time=0.038 ms

# 反向可以ping通吗
[root@localhost tomcat]# docker exec -it tomcat02 ping tomcat03
ping: tomcat03: Temporary failure in name resolution
[root@localhost tomcat]# docker network ls
NETWORK ID          NAME                DRIVER              SCOPE
0e817499335f        bridge              bridge              local
6a61413d537c        host                host                local
5785a59eaf52        none                null                local

[root@localhost tomcat]# docker network inspect 0e817499335f
[
    {
        "Name": "bridge",
        "Id": "0e817499335fb4db896e83d35946dc7d8b0c3373b1c6998ff9458e4d0fd82a6f",
        "Created": "2020-09-08T15:14:50.416538234+08:00",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": null,
            "Config": [
                {
                    "Subnet": "172.17.0.0/16",
                    "Gateway": "172.17.0.1"      # docker0
                }
            ]
        },
        //....
         "Containers": {
            "88ac51d1f3e7cc6e32c3185a1c85bb707e7e62ba2442d8c396fa9ef6037c8e5d": {
                "Name": "tomcat02",
                "EndpointID": "76383af89ac4f28c226b09f7def258584c0967fb53860647e1a1a759a2540525",
                "MacAddress": "02:42:ac:11:00:03",
                "IPv4Address": "172.17.0.3/16",
                "IPv6Address": ""
            },
            "b20853a22abbe643baa8b93fa0d3c5eca17905a84daf6dfdf37f1352d9866904": {
                "Name": "tomcat03",
                "EndpointID": "8e46738899d5957260ce96f1dfe19a417440fabd54d016ba722ee982eac1eb04",
                "MacAddress": "02:42:ac:11:00:04",
                "IPv4Address": "172.17.0.4/16",
                "IPv6Address": ""
            },
            "f1c967e296baf327bfffc0d5922e17241ed93ce7a5ae9f96361acb634d930935": {
                "Name": "tomcat01",
                "EndpointID": "4021a56d4093a8bdb2f10fd45986d2648edc5c258f6657f8ee23b6d6ab87c5fb",
                "MacAddress": "02:42:ac:11:00:02",
                "IPv4Address": "172.17.0.2/16",
                "IPv6Address": ""
            }
        },
]

```

查看tomcat03就是在本地配置了tomcat02的配置

```shell
# 查看hosts 配置，在这里原理发现
[root@localhost tomcat]# docker exec -it tomcat03 cat /etc/hosts
127.0.0.1	localhost
::1	localhost ip6-localhost ip6-loopback
fe00::0	ip6-localnet
ff00::0	ip6-mcastprefix
ff02::1	ip6-allnodes
ff02::2	ip6-allrouters
172.17.0.3	tomcat02 88ac51d1f3e7
172.17.0.4	b20853a22abb
```

本质探究: –link 本质就是在hosts配置中添加映射

****现在使用Docker已经不建议使用–link了！****

自定义网络! 不使用docker0!

docker0问题：不支持容器名连接访问！docker0问题：不支持容器名连接访问！



## 自定义网络

> 查看所有的docker网络

```shell
[root@localhost tomcat]# docker network ls
NETWORK ID          NAME                DRIVER              SCOPE
0e817499335f        bridge              bridge              local
6a61413d537c        host                host                local
5785a59eaf52        none                null                local

```

**网络模式**

bridge ：桥接 docker（默认，自己创建也是用bridge模式）

none ：不配置网络，一般不用none ：不配置网络，一般不用

host ：和宿主机共享网络

container ：容器网络连通（用得少！局限很大）

**测试**

```shell
# 我们直接启动的命令
docker run -d -P --name tomcat01 tomcat
docker run -d -P --name tomcat01 --net bridge tomcat

# docker0特点：默认，域名不能访问，--link可以打通连接

# 我们可以自定义一个网络
# --driver bridge 
# --subnet 192.168.0.0/16    子网
# --gateway 192.168.0.1      网关

[root@localhost tomcat]# docker network create --driver bridge --subnet 192.178.0.0/16 --gateway 192.178.0.1 mynet
ffd9ff4b06c3b7713b1adf4c3346a318674262ddbe89c73bf4b92d4554c1dca4
[root@localhost tomcat]# docker network ls
NETWORK ID          NAME                DRIVER              SCOPE
0e817499335f        bridge              bridge              local
6a61413d537c        host                host                local
ffd9ff4b06c3        mynet               bridge              local
5785a59eaf52        none                null                local
```

自己的网络就创建好了

```shell
[root@localhost tomcat]# docker network inspect mynet
[
    {
        "Name": "mynet",
        "Id": "ffd9ff4b06c3b7713b1adf4c3346a318674262ddbe89c73bf4b92d4554c1dca4",
        "Created": "2020-09-15T14:57:06.833751339+08:00",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": {},
            "Config": [
                {
                    "Subnet": "192.178.0.0/16",
                    "Gateway": "192.178.0.1"
                }
            ]
        },
        "Internal": false,
        "Attachable": false,
        "Ingress": false,
        "ConfigFrom": {
            "Network": ""
        },
        "ConfigOnly": false,
        "Containers": {},
        "Options": {},
        "Labels": {}
    }
]

```

```shell
[root@localhost tomcat]# docker run -d -P --name tomcat-net-01 --net mynet tomcat
7f0c72c9ef4aa987a3508c83b66172d3fbf54ed7cdab971a2b51fd310f2d5f56
[root@localhost tomcat]# docker run -d -P --name tomcat-net-02 --net mynet tomcat
380027a25f37bd6d76c0bd4fb6e425a0684daa2e7275e0aaf4a64bd4e74e4bb5
[root@localhost tomcat]# docker network inspect mynet
[
    {
        "Name": "mynet",
        "Id": "ffd9ff4b06c3b7713b1adf4c3346a318674262ddbe89c73bf4b92d4554c1dca4",
        "Created": "2020-09-15T14:57:06.833751339+08:00",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": {},
            "Config": [
                {
                    "Subnet": "192.178.0.0/16",
                    "Gateway": "192.178.0.1"
                }
            ]
        },
        "Internal": false,
        "Attachable": false,
        "Ingress": false,
        "ConfigFrom": {
            "Network": ""
        },
        "ConfigOnly": false,
        "Containers": {
            "380027a25f37bd6d76c0bd4fb6e425a0684daa2e7275e0aaf4a64bd4e74e4bb5": {
                "Name": "tomcat-net-02",
                "EndpointID": "4beed2a70a428f531dd9a316177bfaedd8512a7f838668af242828a56593e144",
                "MacAddress": "02:42:c0:b2:00:03",
                "IPv4Address": "192.178.0.3/16",
                "IPv6Address": ""
            },
            "7f0c72c9ef4aa987a3508c83b66172d3fbf54ed7cdab971a2b51fd310f2d5f56": {
                "Name": "tomcat-net-01",
                "EndpointID": "47f4a7c49aa49532e776f6ea1464fe4025d1c01a229bda2b7828e65c98b2c9ad",
                "MacAddress": "02:42:c0:b2:00:02",
                "IPv4Address": "192.178.0.2/16",
                "IPv6Address": ""
            }
        },
        "Options": {},
        "Labels": {}
    }
]


# 再次测试ping连接 ， 现在不使用 --link 也可以ping名字了
[root@localhost tomcat]# docker exec -it tomcat-net-01 ping tomcat-net-02
PING tomcat-net-02 (192.178.0.3) 56(84) bytes of data.
64 bytes from tomcat-net-02.mynet (192.178.0.3): icmp_seq=1 ttl=64 time=0.054 ms
64 bytes from tomcat-net-02.mynet (192.178.0.3): icmp_seq=2 ttl=64 time=0.033 ms
64 bytes from tomcat-net-02.mynet (192.178.0.3): icmp_seq=3 ttl=64 time=0.033 ms
64 bytes from tomcat-net-02.mynet (192.178.0.3): icmp_seq=4 ttl=64 time=0.031 ms

```

我们自定义的网络docker当我们维护好了对应的关系，推荐我们平时这样使用网络！



好处：

redis - 不同的集群使用不同的网络，保证集群是健康和安全的

mysql - 不同的集群使用不同的网络，保证集群是健康安全的

![image-20200915150423515](/root/gitproject/learn-note/docker/Docker笔记.assets/image-20200915150423515.png)

## 网络连通

![image-20200915151253622](/root/gitproject/learn-note/docker/Docker笔记.assets/image-20200915151253622.png)

![image-20200915151515672](/root/gitproject/learn-note/docker/Docker笔记.assets/image-20200915151515672.png)

```shell
# 测试打通 tomcat - mynet
[root@localhost tomcat]# docker network connect  mynet tomcat01

# 连通之后就是将 tomcat01 放到了 mynet 网络下

# 一个容器两个ip地址
# 阿里云服务：公网ip  私网ip
```

![image-20200915151704365](/root/.config/Typora/typora-user-images/image-20200915151704365.png)

```shell
# 01连通ok
[root@localhost tomcat]# docker exec -it tomcat01 ping tomcat-net-01
PING tomcat-net-01 (192.178.0.2) 56(84) bytes of data.
64 bytes from tomcat-net-01.mynet (192.178.0.2): icmp_seq=1 ttl=64 time=0.071 ms
64 bytes from tomcat-net-01.mynet (192.178.0.2): icmp_seq=2 ttl=64 time=0.043 ms
64 bytes from tomcat-net-01.mynet (192.178.0.2): icmp_seq=3 ttl=64 time=0.047 ms

# 02依旧是打不通的
[root@localhost tomcat]# docker exec -it tomcat02 ping tomcat-net-01
ping: tomcat-net-01: Temporary failure in name resolution

```

结论：假设要跨网络操作别人，就需要使用docker network connect 连通！



## 实战：部署Redis集群



```shell
# 创建网卡
docker network create redis --subnet 172.38.0.0/16
# 通过脚本创建六个redis配置
for port in $(seq 1 6);\
do \
mkdir -p /mydata/redis/node-${port}/conf
touch /mydata/redis/node-${port}/conf/redis.conf
cat << EOF >> /mydata/redis/node-${port}/conf/redis.conf
port 6379
bind 0.0.0.0
cluster-enabled yes
cluster-config-file nodes.conf
cluster-node-timeout 5000
cluster-announce-ip 172.38.0.1${port}
cluster-announce-port 6379
cluster-announce-bus-port 16379
appendonly yes
EOF
done

# 通过脚本运行六个redis
for port in $(seq 1 6);\
docker run -p 637${port}:6379 -p 1667${port}:16379 --name redis-${port} \
-v /mydata/redis/node-${port}/data:/data \
-v /mydata/redis/node-${port}/conf/redis.conf:/etc/redis/redis.conf \
-d --net redis --ip 172.38.0.1${port} redis:5.0.9-alpine3.11 redis-server /etc/redis/redis.conf
docker exec -it redis-1 /bin/sh #redis默认没有bash
redis-cli --cluster create 172.38.0.11:6379 172.38.0.12:6379 172.38.0.13:6379 172.38.0.14:6379 172.38.0.15:6379 172.38.0.16:6379  --cluster-replicas 1
```

docker搭建redis集群完成！



我们使用了Docker之后，所有的技术都会变得简单起来！我们使用了Docker之后，所有的技术都会变得简单起来！



# SpringBoot微服务打包Docker镜像

1. 架构springboot项目
2. 打包应用
3. 编写dockerfile
4. 构建镜像
5. 发布运行



# Docker Compose



# Docker Swarm





# CI/CD之Jenkins