# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository is the source for a **personal blog** (liuxing.icu) — content, config, wallpapers, and deploy settings all live here, so treat it as a site, not a reusable theme template. The underlying theme is [CuteLeaf/Firefly](https://github.com/CuteLeaf/Firefly) (itself built on [Fuwari](https://github.com/saicaca/fuwari)), a feature-rich static blog built on **Astro 7** with **Svelte 5** for interactive components. Primary language is Chinese (Simplified) with i18n for en, zh_CN, zh_TW, ja, ko, ru.

`README.md` (Chinese) documents the live site, hosting, and feature screenshots (`docs/screenshots/`); `README.en.md` plus `docs/README.{ja,ko,zh-TW}.md` are translations. Screenshots are real captures from `pnpm build` + `pnpm preview`.

## Commands

| Command | Purpose |
|---|---|
| `pnpm dev` | Dev server at `localhost:4321` |
| `pnpm build` | Production build (GitHub card data → LQIPs → VNDB covers → Astro build → pio asset pruning → font subsetting → inline script minification → Pagefind indexing) |
| `pnpm preview` | Preview production build |
| `pnpm check` | `astro check` for type/error checking |
| `pnpm type-check` | `tsc --noEmit --isolatedDeclarations` (covers `src/` and `scripts/`) |
| `pnpm lint` | Biome check + auto-fix (`./src ./scripts`) |
| `pnpm format` | Biome format (`./src ./scripts`) |
| `pnpm new-post <filename>` | Scaffold a new blog post |
| `pnpm new-dynamic` (`new-d`) | Scaffold a new dynamic (microblog) entry |
| `pnpm lqips` | Regenerate LQIP data into `src/constants/lqips.json` |
| `pnpm github-cards` | Regenerate `src/constants/github-card-data.json` |

Package manager is **pnpm** (enforced by `preinstall`). Node.js >= 22.23 required.

There is no test framework. Before committing changes that affect rendering, content, or generated assets, run `pnpm check`, `pnpm type-check`, and `pnpm build`; verify visual/interactive changes with `pnpm dev` or `pnpm preview`.

`AGENTS.md` (Chinese) is the sibling agent guide — keep it in sync when changing build commands, conventions, or generated-file expectations.

### CI (`.github/workflows/`)

- `build.yml` — on push/PR to `master`, matrix over Node 22 and 23: `pnpm install --frozen-lockfile`, then `pnpm astro check` (job `check`) and `pnpm astro build` (job `build`). Note it runs bare `astro build`, **not** `pnpm build`, so the pre/post-build scripts (LQIP, font subsetting, Pagefind) do not run in CI.
- `biome.yml` — `biome ci ./src` (lint gate on `src/` only).

## Architecture

### Astro + Svelte Hybrid

- `.astro` components for static content and layouts
- `.svelte` components for interactive UI (search, settings, pagination, archive) — mounted with `client:load` or `client:visible`
- Swup.js handles SPA-like page transitions; its containers are declared in `astro.config.mjs` (`#swup-container`, sidebar dynamic containers, banner overlays, floating TOC wrapper) — scripts that must re-init on navigation hook into Swup events
- Some heavy animation runs off the main thread: `src/workers/sakura.worker.ts` draws the sakura effect on an OffscreenCanvas in a Dedicated Worker (protocol in `src/types/sakura-worker.ts`)
- `astro.config.mjs` sets `base: "/"` and `trailingSlash: "always"` — routes are emitted with a trailing slash (e.g. `/posts/foo/`), so internal links and redirects must match

### Configuration-Driven

All features are toggled/configured via TypeScript files in `src/config/`, exported through the barrel at `src/config/index.ts`. Key configs:

- `siteConfig.ts` — core site settings, page switches (`siteConfig.pages.*` gate routes and the sitemap filter in `astro.config.mjs`), theme, pagination
- `sidebarConfig.ts` — sidebar layout (left/right/both, widget ordering)
- `commentConfig.ts`, `analyticsConfig.ts`, `fontConfig.ts`, `backgroundWallpaper.ts`, `pioConfig.ts` (live2d/spine 看板娘), etc.

### Layout System

- `src/layouts/Layout.astro` — base HTML shell (head, body, theme init, analytics, Swup hooks)
- `src/layouts/MainGridLayout.astro` — full page grid with sidebar(s), navbar, wallpaper, footer

### Scroll Performance Constraints

Scroll-linked work in `src/utils/` is rAF-throttled and must stay cheap on mobile — do not regress these:

- `fullscreen-wallpaper-utils.ts` — fullscreen-mode title fade + blur ramp. The blur value `--fullscreen-blur` is **quantized to 2px steps** (skips writes when unchanged) and the max blur (`--overlay-blur`) is **cached** (read once; refreshed by a MutationObserver on `#wallpaper-wrapper` style). Avoid per-frame `getComputedStyle` or continuous full-screen `filter: blur()` writes — each change re-rasterizes the whole viewport on mobile.
- `grid-layout-utils.ts` — `updateSidebarStickySpacing()` is the per-scroll path and **must not read layout** (`offsetHeight` etc.). The sidebar top-container visibility (`hasVisibleTop`) is cached by `refreshSidebarStickyState()`, which runs on init/navigation only.
- Fullscreen blur ramp can be disabled per device via `backgroundWallpaper.fullscreen.blurRamp.enable.{desktop,mobile}` — when off, fullscreen mode has no blur on that device and the settings-panel blur slider is hidden.

### Content Collections

Defined in `src/content.config.ts`, with content stored under `src/content/`:
- `posts` (`src/content/posts/`) — blog posts (`.md`/`.mdx`) with frontmatter: title, published, tags, category, draft, pinned, password, comment, series, etc.
- `spec` (`src/content/spec/`) — special pages (about, guestbook)
- `dynamic` (`src/content/dynamic/`) — microblog entries (`.md`) with frontmatter: published, pinned, location
- `projects` (`src/content/projects/`) — project showcase entries with frontmatter: title, published, description, image, tags, link (label/icon/value), status, order

### Key Directories

- `src/components/` — organized by domain: `analytics/`, `comment/`, `common/`, `controls/`, `features/`, `layout/`, `misc/`, `pages/`, `widget/`
- `src/plugins/` — custom remark/rehype plugins (Mermaid, PlantUML, KaTeX, GitHub cards, reading time, wiki links, email protection, image grid, etc.), wired in `astro.config.mjs`
- `src/i18n/` — translation keys in `i18nKey.ts`, language files in `languages/*.ts`, lookup via `translation.ts`
- `src/utils/` — content sorting, crypto (encrypted posts), date formatting, image processing/LQIP, TOC generation, scroll/layout utilities
- `src/pages/` — Astro file-based routing (posts, archive, categories, tags, series, dynamic, gallery, friends, guestbook, booknav, bangumi, bilibili, vndb, myanimelist, sponsor, projects, RSS/Atom/sitemap/llms.txt)
- `scripts/` — build-time utilities (`generate-github-card-data.ts`, `generate-lqips.ts`, `generate-vndb-covers.ts`, `prune-pio-assets.ts`, `subset-fonts.ts`, `minify-inline-scripts.ts`, `run-pagefind.ts`, `new-post.js`, `new-dynamic.js`)

### Path Aliases (tsconfig.json)

`@components/*`, `@assets/*`, `@constants/*`, `@utils/*`, `@i18n/*`, `@layouts/*` → `./src/<dir>/*`; `@/*` → `./src/*`

## Code Style

- **Biome** enforces: tab indentation, double quotes, recommended lint rules
- Relaxed rules for `.svelte`/`.astro`/`.vue` files (`useConst`, `useImportType`, `noUnusedVariables`, `noUnusedImports` off)
- `pnpm lint`/`pnpm format` target `./src ./scripts`; `scripts/` is also type-checked via tsconfig `include`
- `src/constants/icons-data.json` is committed and Biome-ignored; consumed by `src/components/common/Icon.svelte` (plus SharePoster/TimelineItem) with no generator script in the current build
- `scripts/subset-font.d.ts` is a hand-written ambient declaration for the untyped `subset-font` package
- Commit convention: **Conventional Commits** (`feat:`, `fix:`, `chore:`, etc.)

## Build Pipeline

Multi-step: `scripts/generate-github-card-data.ts` → `scripts/generate-lqips.ts` → `scripts/generate-vndb-covers.ts` → `astro build` → `scripts/prune-pio-assets.ts` → `scripts/subset-fonts.ts` → `scripts/minify-inline-scripts.ts` → `scripts/run-pagefind.ts`

LQIP data is generated into `src/constants/lqips.json` and committed — regenerate with `pnpm lqips`. GitHub card data goes to `src/constants/github-card-data.json` — regenerate with `pnpm github-cards`.

`generate-vndb-covers.ts` downloads VNDB cover art into `public/vndb-covers/` (gitignored, skips files that already exist). It no-ops unless `siteConfig.vndb` has a `userId`, `downloadCovers: true`, and `mode: "static"`.

`prune-pio-assets.ts` deletes unused 看板娘 assets from `dist/` after the Astro build (Astro copies all of `public/` regardless of config). It drops `dist/pio/models/live2d` plus the orphaned Live2D client chunk when `live2dWidgetConfig.enable` is false, `dist/pio/models/spine` and `dist/pio/static` when `spineModelConfig.enable` is false, and all of `dist/pio` when both are off (~15 MiB). It no-ops when both are enabled.

## Deployment

Production is **Netlify** static hosting at <https://liuxing.icu> (`netlify.toml`: `pnpm build` → publish `dist`, `NODE_VERSION = "22"`, cache/security headers). Other target configs coexist in the repo and are ignored by Netlify:

- **Vercel** (`vercel.json`) — equivalent build + header config; no longer the active host.
- **Cloudflare Workers** (`wrangler.jsonc`) — set the `CF_WORKERS` env var to switch the Astro adapter to `@astrojs/cloudflare` in `astro.config.mjs`.

Static output always goes to `dist/`.