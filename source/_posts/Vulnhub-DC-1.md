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
| 靶机 | DC-1 (Vulnhub) |
| 攻击机 | Kali |
| 网络模式 | NAT / 仅主机 |

```bash
# 导入靶机后先确认同网段主机
arp-scan -l
# 或者
netdiscover -r 192.168.1.0/24
```

## 二、信息收集

### 2.1 端口扫描

```bash
nmap -sS -sV -p- 192.168.1.x
```

结果待补充……

### 2.2 Web 目录探测

```bash
dirb http://192.168.1.x
```

## 三、漏洞利用

（记录 Drupal 版本、CVE 编号与利用过程）

## 四、提权

（记录提权方式和关键命令）

## 五、小结

- 关键点：
- 学到的：aaa
