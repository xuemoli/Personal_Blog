# 仓库指南

## 项目结构与模块组织

Firefly 是一个基于 Astro 7 的站点，使用 Svelte 岛屿架构和 TypeScript 配置。主要源代码位于 `src/`：路由在 `src/pages`，布局在 `src/layouts`，可复用 UI 在 `src/components`，样式在 `src/styles`，内容在 `src/content`，辅助函数在 `src/utils`，Markdown/HTML 插件在 `src/plugins`。站点配置分布在 `src/config` 中，对应的类型定义在 `src/types` 中；如可用，优先从 `@/config` 导入。直接对外服务的静态文件放在 `public`，源码管理的图片放在 `src/assets`，文档放在 `docs` 和 `Firefly-Docs`，自动化脚本放在 `scripts`。

## 构建、测试与开发命令

使用 `pnpm`；`preinstall` 脚本会强制执行此要求。

- `pnpm dev` 或 `pnpm start`：运行本地 Astro 开发服务器。
- `pnpm check`：运行 Astro 诊断。
- `pnpm type-check`：运行 TypeScript `--noEmit` 类型检查。
- `pnpm format`：使用 Biome 格式化 `src`。
- `pnpm lint`：运行 Biome 检查并对 `src` 执行安全修复。
- `pnpm build`：生成图标、LQIP、Astro 构建、字体子集，并在 `dist` 中生成 Pagefind 搜索输出。
- `pnpm preview`：本地预览生产构建。
- `pnpm new-post`：创建新的内容文章脚手架。

## 代码风格与命名规范

Biome 是格式化工具和代码检查工具。缩进使用制表符，JavaScript/TypeScript 字符串使用双引号。Astro 和 Svelte 组件使用 `PascalCase` 命名（如 `PostCard.astro`、`Search.svelte`），配置模块使用以 `Config.ts` 结尾的 `camelCase` 命名，工具函数使用描述性的 kebab-case 命名（如 `date-utils.ts`）。保持 `src/types` 与 `src/config` 一致。避免无关的格式化改动。

## 测试指南

项目未配置专门的单元测试框架。提交涉及渲染、内容或生成资源的更改前，请运行 `pnpm check`、`pnpm type-check` 和 `pnpm build`。对于视觉或交互性更改，请使用 `pnpm dev` 或 `pnpm preview` 验证，并在 PR 中附上截图。未来新增测试时，请将其放在所覆盖功能的附近，并以所在文件名作为测试文件名主干。

## 提交与拉取请求指南

使用 Conventional Commits 规范，与当前提交历史保持一致：`feat: ...`、`fix: ...`、`chore: ...`。提交和 PR 应聚焦于单一关注点。PR 应包含简明摘要、相关联的 issue（如有）、已运行的验证命令，以及 UI 更改的截图。在实现重大功能或设计变更之前，请先在 issue 或讨论区中沟通。

## 安全与配置提示

请勿在配置文件中提交密钥、令牌或服务凭证。将部署相关的设置保留在目标平台的环境变量中，并在提交前审查生成的文件，如 `dist`、`src/constants/lqips.json` 和 `src/constants/icons.ts`。
