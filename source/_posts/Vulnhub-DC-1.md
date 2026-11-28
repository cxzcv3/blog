---
title: Vulnhub DC-1 靶机渗透记录
date: 2026-11-28 00:37:23
description: Vulnhub DC-1 的完整渗透过程记录：信息收集、Drupal 漏洞利用、提权到 root。
categories: 靶场
tags:
  - Vulnhub
  - 渗透测试
  - Drupal
top_img: false
---

> 靶机环境仅用于本地学习，请勿对未授权目标测试。

## 一、环境准备

| 项目 | 说明 |
|---|---|
| 靶机 | DC-1 (Vulnhub)，IP `192.168.109.158` |
| 攻击机 | Kali Linux，IP `192.168.109.128` |
| 网络模式 | NAT / 仅主机 |

导入靶机后先确认同网段有哪些主机：

```bash
sudo arp-scan -l
```

![arp-scan 结果](/img/vulnhub-dc1/01-arp-scan.png)

扫到 4 个地址：`.1`、`.2`、`.158`、`.254`，其中 `.158` 是靶机。

## 二、信息收集

### 2.1 端口扫描

```bash
nmap -sS -sV -p- 192.168.109.158
```

![nmap 扫描结果](/img/vulnhub-dc1/02-nmap-full.png)

开放的端口：

| 端口 | 服务 | 版本 |
|---|---|---|
| 22/tcp | ssh | OpenSSH 6.0p1 Debian 4+deb7u7 |
| 80/tcp | http | Apache 2.2.22 (Debian) |
| 111/tcp | rpcbind | RPC #100000 |

111 端口的 RPC 信息：

![rpcbind 信息](/img/vulnhub-dc1/03-nmap-rpc.png)

### 2.2 Web 探测

访问 `http://192.168.109.158`，是一个默认安装的 Drupal 站点，`nmap` 的 `http-generator` 已经明确标出 **Drupal 7**：

![Drupal 首页](/img/vulnhub-dc1/04-drupal.png)

## 三、漏洞利用

（Drupal 7 存在 Drupalgeddon 系列漏洞，如 CVE-2014-3704；记录实际使用的 EXP、拿到的 shell 和低权用户）

## 四、提权

（记录 `find / -perm -4000` 找到的 SUID 文件、可利用的系统命令，以及最终拿到 root 的过程）

## 五、小结

- 关键点：
- 学到的：
