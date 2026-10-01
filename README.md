# 我的博客

**liuxing.icu** —— 记数学、记折腾、记生活里的碎片

[![在线访问](https://img.shields.io/badge/%E5%9C%A8%E7%BA%BF%E8%AE%BF%E9%97%AE-liuxing.icu-2ea44f?style=flat-square)](https://liuxing.icu) [![仓库](https://img.shields.io/badge/GitHub-xuemoli%2FPersonal__Blog-181717?style=flat-square&logo=github)](https://github.com/xuemoli/Personal_Blog) [![部署](https://img.shields.io/badge/%E6%89%98%E7%AE%A1-Netlify-00C7B7?style=flat-square&logo=netlify&logoColor=white)](https://liuxing.icu) [![Astro](https://img.shields.io/badge/Astro-7.3.2-FF5D01?style=flat-square&logo=astro&logoColor=white)](https://astro.build) [![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](./LICENSE)

![首页](./docs/screenshots/home-light.webp)

> **说明**：这个仓库是**我自己的博客源码**，不是主题模板。文章、配置、壁纸、音乐、部署参数都躺在这份代码里。
> 博客主题是 [CuteLeaf/Firefly](https://github.com/CuteLeaf/Firefly)（在 [saicaca/fuwari](https://github.com/saicaca/fuwari) 基础上二次开发），我在它之上做了个人化改造——换成自己的颜色、壁纸、导航与内容结构，并补上了 Netlify 部署配置。

---

## 📌 站点一览

| 项目 | 内容 |
| --- | --- |
| 站点名称 | 我的博客 / 我的个人博客 |
| 线上地址 | <https://liuxing.icu> |
| 源码仓库 | GitHub [xuemoli/Personal_Blog](https://github.com/xuemoli/Personal_Blog)，主分支 `master` |
| 托管方式 | Netlify 静态托管；域名注册与 DNS 在西部数码 |
| 框架版本 | Astro **7.3.2** + Svelte 5 岛屿 + Tailwind CSS 4 + TypeScript |
| 主题版本 | Firefly **6.16.8** |
| 运行环境 | Node.js ≥ 22.23、pnpm 11 |
| 构建产物 | `pnpm build` → `dist/`（预渲染 HTML + Pagefind 搜索索引） |
| 当前规模 | 20 篇文章 · 5 条动态 · 4 个分类 · 28 个标签 · 约 2.9 万字 |

## 🖼️ 界面速览

下面这些图都是把项目在本地跑起来（`pnpm build` + `pnpm preview`）之后实机截的，没有用主题作者的演示图。

**首页 · 暗色** —— 壁纸与主题色跟随「亮色 / 暗色 / 跟随系统」切换

![首页（暗色）](./docs/screenshots/home-dark.webp)

**文章页** —— KaTeX 公式、所属系列、右侧悬浮目录

![文章页 · 不定积分公式](./docs/screenshots/post-math.webp)

**归档页** —— 时间轴 + 分类筛选

![归档页](./docs/screenshots/archive.webp)

**动态页** —— 随手记，支持搜索与按年筛选

![动态页](./docs/screenshots/dynamic.webp)

**相册页** —— 分相册浏览，支持给单个相册加密

![相册页](./docs/screenshots/gallery.webp)

**移动端首页** —— 导航收成抽屉，文章列表自动切单列

![移动端首页](./docs/screenshots/mobile-home.webp)

壁纸文件放在 `public/assets/images/DesktopWallpaper/`，刷新时会按配置随机抽取，所以每张截图里的背景都不一样。

## 🗂️ 站里都有什么

| 板块 | 路径 | 说明 |
| --- | --- | --- |
| 首页 | `/` | 置顶文章 + 分类导航 + 侧边栏（资料 / 公告 / 音乐 / 最新动态 / 站点统计） |
| 文章 | `/archive/`、`/categories/`、`/tags/`、`/series/` | 归档时间轴、分类与标签聚合、系列连载 |
| 动态 | `/dynamic/` | 短内容，按年份筛选，可置顶 |
| 相册 | `/gallery/` | 多相册，支持给单个相册加密 |
| 项目 | `/projects/` | 项目卡片展示 |
| 书签导航 | `/booknav/` | 常用站点收藏夹 |
| 社交 | `/friends/`、`/guestbook/` | 友链与留言板 |
| 关于 | `/about/`、`/sponsor/` | 自我介绍与打赏页 |
| 搜索 | `/search/` | Pagefind 全文搜索（构建时生成索引） |
| 订阅 | `/rss/`、`/atom/` | RSS 与 Atom 输出 |

内容上目前主要分四类：

- **高等数学**（6 篇）：求导公式大全、不定积分公式、三角函数公式大全、洛必达法则、定积分奇偶性判断、极限等价代换公式，统一归在「高等数学笔记」系列里；
- **速查手册**：Git 命令使用教程这类可以随时翻的备忘；
- **博客指南**：Firefly 布局系统、Wiki Link 用法等折腾记录；
- **文章示例**：Markdown、代码块、Mermaid、PlantUML、KaTeX 的写法样例，方便以后照抄。

## 🛠️ 技术实现

- **Astro 岛屿架构**：页面全部静态输出，只有搜索、设置面板、分页、归档这类交互组件才以 Svelte 岛屿加载。
- **Swup 无刷新跳转**：页面切换带动画，需要重新初始化的脚本挂到 Swup 事件上。
- **Pagefind 全文搜索**：构建时生成索引，纯客户端检索，不依赖任何后端。
- **数学与图表**：KaTeX 渲染公式，Mermaid / PlantUML 画图，Expressive Code 负责代码块（行号、折叠、语言标签）。
- **图片处理**：封面图用 Sharp 生成 LQIP 占位，避免加载时闪白块；字体按实际用字做子集化。
- **音乐播放器**：`musicConfig` 使用 `local` 模式，音频自托管在 `public/assets/music/`，不依赖第三方外链，线上不会突然放不出来。
- **看板娘**：Live2D / Spine 两套都留着，当前配置里是关闭状态（`src/config/pioConfig.ts`）。

构建是一条 8 步流水线，`pnpm build` 一次走完：

```text
GitHub 卡片数据 → LQIP 占位图 → VNDB 封面 → astro build
→ 看板娘资源裁剪 → 字体子集化 → 内联脚本压缩 → Pagefind 索引
```

## 🚀 本地跑起来

需要 Node.js ≥ 22.23 和 pnpm 11（`preinstall` 会强制使用 pnpm）：

```bash
git clone https://github.com/xuemoli/Personal_Blog.git
cd Personal_Blog
pnpm install
pnpm dev          # http://localhost:4321
```

常用命令：

| 命令 | 作用 |
| --- | --- |
| `pnpm dev` | 启动开发服务器（4321 端口） |
| `pnpm build` | 完整生产构建，输出到 `dist/` |
| `pnpm preview` | 预览构建产物（本页截图就是这么跑的） |
| `pnpm check` | Astro 诊断 |
| `pnpm type-check` | TypeScript 类型检查 |
| `pnpm lint` / `pnpm format` | Biome 检查 / 格式化（只覆盖 `src` 与 `scripts`） |
| `pnpm new-post <文件名>` | 按模板新建文章 |
| `pnpm new-d <内容>` | 新建一条动态 |
| `pnpm lqips` | 重新生成 LQIP 占位数据 |

## ✍️ 写一篇新内容

文章放在 `src/content/posts/`，可以用脚手架生成，也可以直接新建文件：

```bash
pnpm new-post 我的新文章
```

frontmatter 按需填：

```yaml
---
title: 不定积分公式
published: 2026-09-23
description: 基本积分公式表，以及换元法、分部积分法的完整梳理。
category: 高等数学
tags: [高等数学, 不定积分]
series: 高等数学笔记
draft: false
comment: false
---
```

正文里可以直接写 LaTeX 公式（行内 `$...$`、块级 `$$...$$`）、Mermaid 流程图、PlantUML 图，以及 GitHub / Obsidian / VitePress / Docusaurus 四种风格的提示块。

动态放在 `src/content/dynamic/`，一条 Markdown 对应一条动态：

```bash
pnpm new-d 今天把积分公式重新整理了一遍
```

## ⚙️ 我改过哪些配置

站点设置全部集中在 `src/config/`，改完重新构建即可生效：

| 配置文件 | 我在这里改了什么 |
| --- | --- |
| `siteConfig.ts` | 站名、副标题、域名、主题色相 165、页宽、导航栏模式（下滑隐藏）、分类导航样式、文章列表布局、页面开关 |
| `profileConfig.ts` | 头像、昵称、签名与个人链接 |
| `navBarConfig.ts` | 导航结构：主页 / 文章 / 社交 / 我的 / 链接 |
| `backgroundWallpaper.ts` | 桌面壁纸池、横幅文案、壁纸模式与转场 |
| `musicConfig.ts` | `local` 模式播放列表（《海底》《茶汤》），导航栏与侧边栏播放器 |
| `galleryConfig.ts` | 相册列表与加密相册 |
| `sponsorConfig.ts` | 打赏页收款码与说明 |
| `commentConfig.ts` | 评论系统开关（当前 `type: "none"`，留言板暂未接后端） |
| `analyticsConfig.ts` | 统计脚本（当前留空） |

页面开关集中在 `siteConfig.ts` 的 `pages` 字段里：友链、留言板、动态、项目、相册、书签导航、打赏为开；Bilibili、Bangumi、VNDB、MyAnimeList 关掉后不只是隐藏菜单，对应路由也会直接返回 404。

## 🚢 部署

站点托管在 Netlify，构建参数没有写在网页后台，而是固化在仓库的 `netlify.toml` 里，换账号或重新关联仓库都不会丢：

```toml
[build]
  command = "pnpm build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "22"
```

文件里同时配置了 `/_astro/*` 的长缓存和几个安全响应头。推送 `master` 分支即触发自动构建部署。

**踩过的坑（写在这里省得再踩一遍）**：Netlify 站点必须关联到 `xuemoli/Personal_Blog`，而不是上游模板仓库。曾经因为关联错仓库，域名、证书、CDN 全都正常、页面也能打开，但线上跑的是主题作者的演示站——`title` 变成了 “Firefly - Demo site”，canonical 和 sitemap 里全是 `firefly.cuteleaf.cn`。改完仓库关联后记得勾选 **Clear cache and deploy site**，否则可能复用旧产物。

域名侧：`@` 记录指向 Netlify 的 A 记录，`www` 做 CNAME，HTTPS 证书由平台自动签发与续期。

## 📁 目录结构

```text
├── public/                 # 直接对外服务的静态文件（壁纸、音乐、头像、图标）
├── scripts/                # 构建脚本：LQIP、字体子集、Pagefind、脚手架等
├── src/
│   ├── assets/             # 走构建优化的图片资源
│   ├── components/         # Astro / Svelte 组件，按领域分目录
│   ├── config/             # 全部站点配置（见上一节）
│   ├── content/            # 文章 / 动态 / 项目 / 关于页
│   │   ├── posts/          #   文章，含 math/、guide/ 子目录
│   │   ├── dynamic/        #   动态
│   │   └── projects/       #   项目卡片
│   ├── layouts/            # 页面骨架
│   ├── pages/              # 基于文件的路由
│   ├── plugins/            # remark / rehype 插件（公式、图表、卡片等）
│   ├── styles/             # 按页拆分的样式
│   └── utils/              # 日期、排序、加密、滚动等工具函数
├── docs/screenshots/       # 上面那些实机截图
├── netlify.toml            # Netlify 构建与响应头配置
└── astro.config.mjs        # Astro 与插件装配
```

## 🙏 致谢与许可

这个站点能跑起来，靠的是前人的工作：

- [saicaca/fuwari](https://github.com/saicaca/fuwari)：最初的主题模板；
- [CuteLeaf/Firefly](https://github.com/CuteLeaf/Firefly)：本仓库直接使用的主题，布局系统、组件与构建脚本大多来自这里；
- 站内流萤相关图片素材版权归 [《崩坏：星穹铁道》](https://sr.mihoyo.com/) 及其开发商 [米哈游](https://www.mihoyo.com/) 所有。

项目按 [MIT License](./LICENSE) 开源：

- Copyright (c) 2024 [saicaca](https://github.com/saicaca) — fuwari
- Copyright (c) 2025 [CuteLeaf](https://github.com/CuteLeaf) — Firefly

保留上述版权声明即可自由使用、修改与分发。
