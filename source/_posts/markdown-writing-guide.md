---
title: 写作示例：Markdown 常用语法
date: 2026-11-28 00:30:00
updated: 2026-11-28 00:30:00
description: 一篇用来演示 Hexo + Butterfly 文章写法的示例，包含 front-matter、标题、代码块、表格、引用等常用语法。
categories: 折腾
tags:
  - Hexo
  - Markdown
top_img: false
---

这是一篇示例文章，用来演示这个博客的文章怎么写。写完这一篇你就知道套路了。

<!-- more -->

## 一、标题

用 `##` 到 `######` 表示二级到六级标题，`#` 留给文章标题本身一般不用。

## 二、文字样式

**加粗**、*斜体*、~~删除线~~、`行内代码`，还有 [超链接](https://hexo.io)。

## 三、列表

无序列表：

- 第一项
- 第二项
  - 嵌套一项

有序列表：

1. 先装依赖
2. 再写配置
3. 最后部署

## 四、代码块

行内代码用反引号，多行代码用三个反引号并标注语言，Butterfly 会渲染成带语言标签和复制按钮的卡片：

```bash
cd /d/blog
hexo new post "文章标题"
git add -A && git commit -m "post: 新文章" && git push
```

```javascript
function hello(name) {
  console.log(`你好，${name}`);
}
hello('znyue');
```

## 五、表格

| 字段 | 作用 | 是否必填 |
|---|---|---|
| `title` | 文章标题 | 是 |
| `date` | 发布时间 | 是 |
| `categories` | 分类 | 否 |
| `tags` | 标签 | 否 |

## 六、引用

> 引用块适合放摘录或者强调的话。
> Butterfly 会自动加一条紫色竖线。

## 七、分隔线

---

## 八、图片

图片放到 `source/img/` 目录，然后这样引用：

```markdown
![描述](/img/你的图片.png)
```

---

写文章其实就三步：`hexo new post "标题"` 生成文件 → 用 Markdown 写内容 → `git push` 自动部署。
