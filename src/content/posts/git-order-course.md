---
title: Git命令使用教程
published: 2026-09-24
description: '📚 一份覆盖日常开发高频场景的 Git 命令速查手册，含分支管理、撤销回退、冲突解决与救急场景。'
image: ''
tags: [Git, 版本控制, 开发工具, 教程, 速查手册]
category: '速查手册'
draft: false
lang: ''
series: "Git 命令示例"
slug: git-order-course
seriesOrder: 1 
---

## 目录

1. [基础配置](#一基础配置)
2. [创建仓库](#二创建仓库)
3. [提交与修改](#三提交与修改)
4. [查看状态与历史](#四查看状态与历史)
5. [分支管理](#五分支管理)
6. [远程仓库操作](#六远程仓库操作)
7. [合并与变基](#七合并与变基)
8. [撤销与回退](#八撤销与回退)
9. [标签管理](#九标签管理)
10. [贮藏与清理](#十贮藏与清理)
11. [常见工作流](#十一常见工作流)
12. [常见场景速查](#十二常见场景速查)

---

## 一、基础配置

```bash
# 设置全局用户名
git config --global user.name "你的名字"

# 设置全局邮箱
git config --global user.email "you@example.com"

# 查看当前配置
git config --list

# 查看某个配置项
git config user.name

# 设置默认编辑器
git config --global core.editor "vim"

# 设置合并工具
git config --global merge.tool "vimdiff"

# 显示颜色
git config --global color.ui auto

# 设置默认分支名为 main（新版本 Git 推荐）
git config --global init.defaultBranch main
```

---

## 二、创建仓库

```bash
# 在当前目录初始化一个新的 Git 仓库
git init

# 克隆远程仓库
git clone <仓库地址>

# 克隆指定分支
git clone -b <分支名> <仓库地址>

# 克隆到指定目录
git clone <仓库地址> <目录名>

# 克隆深度为 1（只拉取最新提交，节省空间）
git clone --depth 1 <仓库地址>
```

---

## 三、提交与修改

### 3.1 暂存文件

```bash
# 添加指定文件到暂存区
git add <文件名>

# 添加所有修改过的文件
git add .

# 添加所有已跟踪文件的修改
git add -u

# 交互式添加
git add -p

# 强制添加被忽略的文件
git add -f <文件名>
```

### 3.2 提交更改

```bash
# 提交已暂存的文件
git commit -m "提交信息"

# 提交并同时添加所有修改
git commit -am "提交信息"

# 修改最后一次提交的提交信息
git commit --amend -m "新的提交信息"

# 把暂存区中漏掉的文件补进最后一次提交
git add <漏掉的文件>
git commit --amend --no-edit
```

> ⚠️ 注意：已经推送的提交慎用 `--amend`，会导致远程历史不一致。

---

## 四、查看状态与历史

```bash
# 查看工作区状态
git status

# 简洁版状态
git status -s

# 查看提交历史（一行显示）
git log --oneline

# 查看历史并显示图形化分支结构
git log --oneline --graph --all

# 查看最近 N 条提交
git log -n 5

# 查看某个文件的修改历史
git log -p <文件名>

# 查看每次提交变更的文件列表
git log --stat

# 查看未暂存的修改
git diff

# 查看已暂存的修改
git diff --cached

# 查看工作区与最新提交的差异
git diff HEAD

# 查看某个文件的完整提交历史
git blame <文件名>
```

---

## 五、分支管理

```bash
# 查看所有本地分支
git branch

# 查看所有分支（含远程）
git branch -a

# 查看远程分支
git branch -r

# 创建新分支
git branch <分支名>

# 创建并切换到新分支
git checkout -b <分支名>

# 简写方式（Git 2.23+）
git switch -c <分支名>

# 切换到指定分支
git checkout <分支名>

# 简写方式
git switch <分支名>

# 删除本地分支
git branch -d <分支名>

# 强制删除未合并的分支
git branch -D <分支名>

# 重命名当前分支
git branch -m <新分支名>

# 查看分支间的提交差异
git log <分支A>..<分支B> --oneline
```

---

## 六、远程仓库操作

```bash
# 查看远程仓库
git remote -v

# 添加远程仓库
git remote add origin <仓库地址>

# 修改远程仓库地址
git remote set-url origin <新地址>

# 删除远程仓库
git remote remove origin

# 拉取远程更新并合并
git pull origin <分支名>

# 拉取但不合并（只下载）
git fetch origin

# 首次推送并建立跟踪
git push -u origin <分支名>

# 推送到远程
git push origin <分支名>

# 推送所有分支
git push --all origin

# 推送标签
git push origin --tags

# 删除远程分支
git push origin --delete <分支名>

# 设置当前分支跟踪远程分支
git branch --set-upstream-to=origin/<分支名>
```

> 💡 `git pull` = `git fetch` + `git merge`。

---

## 七、合并与变基

### 7.1 合并（merge）

```bash
# 切换到目标分支后，把指定分支合并进来
git merge <要合并的分支>

# 创建合并提交（保留分支历史）
git merge --no-ff <分支名>

# 阻止自动合并提交
git merge --no-commit <分支名>
```

### 7.2 变基（rebase）

```bash
# 把当前分支的提交变基到目标分支上
git rebase <目标分支>

# 把当前分支变基到远程最新
git pull --rebase

# 交互式变基，整理最近的 N 个提交
git rebase -i HEAD~3

# 变基常用操作（交互界面中的命令）
# pick    保留提交
# reword  保留并修改提交信息
# edit    保留并暂停以便修改
# squash  合并到上一个提交
# drop    删除提交
```

> ⚠️ 不要对已经推送并被别人使用的公共分支执行 `rebase`。

### 7.3 解决冲突

```bash
# 冲突后查看冲突文件
git status

# 使用工具查看冲突
git diff

# 编辑文件手动解决后
git add <冲突文件>
git commit          # merge 时
git rebase --continue  # rebase 时

# 放弃这次合并
git merge --abort

# 放弃这次变基
git rebase --abort
```

---

## 八、撤销与回退

```bash
# 撤销工作区中某文件的修改（危险，会丢失修改）
git checkout -- <文件名>

# 简写（Git 2.23+）
git restore <文件名>

# 把文件从暂存区撤回工作区
git reset HEAD <文件名>

# 简写
git restore --staged <文件名>

# 撤销上一次提交，但保留修改在工作区
git reset --soft HEAD~1

# 撤销上一次提交，并撤销暂存（保留工作区修改）
git reset --mixed HEAD~1

# 撤销上一次提交，并丢弃所有修改（危险）
git reset --hard HEAD~1

# 回退到指定版本
git reset --hard <提交哈希>

# 生成一个撤销某次提交的提交（推荐用于已推送的历史）
git revert <提交哈希>

# 查看 HEAD 移动记录（救命用）
git reflog
```

### 撤销方式对比

| 场景 | 推荐命令 | 说明 |
|------|----------|------|
| 修改还没暂存 | `git restore <文件>` | 丢弃工作区修改 |
| 已暂存还没提交 | `git restore --staged <文件>` | 退出暂存区 |
| 已提交，还没推送 | `git reset --soft HEAD~1` | 撤回提交保留修改 |
| 已提交，已推送 | `git revert <哈希>` | 生成反向提交，历史安全 |

---

## 九、标签管理

```bash
# 查看所有标签
git tag

# 创建轻量标签
git tag <标签名>

# 创建附注标签（推荐）
git tag -a v1.0 -m "版本 1.0 发布"

# 给指定提交打标签
git tag -a v1.0 <提交哈希> -m "版本 1.0"

# 查看标签详情
git show v1.0

# 推送指定标签到远程
git push origin v1.0

# 推送所有标签
git push origin --tags

# 删除本地标签
git tag -d v1.0

# 删除远程标签
git push origin --delete v1.0

# 检出标签（进入分离头指针状态）
git checkout v1.0
```

---

## 十、贮藏与清理

```bash
# 贮藏当前修改
git stash

# 贮藏并携带说明
git stash save "修复中的中间状态"

# 查看贮藏列表
git stash list

# 恢复最近一次贮藏（不删除记录）
git stash apply

# 恢复最近一次贮藏（同时删除记录）
git stash pop

# 恢复指定贮藏
git stash apply stash@{2}

# 删除最近一次贮藏
git stash drop

# 清空所有贮藏
git stash clear

# 展示某次贮藏的具体修改
git stash show -p stash@{0}

# 删除未被跟踪的文件（先预览）
git clean -n

# 确认删除未被跟踪的文件（危险）
git clean -f
```

---

## 十一、常见工作流

### 11.1 日常开发流程

```bash
git pull                        # 1. 拉取最新代码
git checkout -b feature/login   # 2. 创建功能分支
git add . && git commit -m "feat: 登录功能"  # 3. 提交修改
git push -u origin feature/login # 4. 推送分支
# 5. 在远程平台（GitHub/GitLab）发起 Pull Request
```

### 11.2 提交信息规范（Conventional Commits）

```
feat:     新功能
fix:      修复 bug
docs:     文档修改
style:    格式调整（不影响代码逻辑）
refactor: 重构
perf:     性能优化
test:     测试相关
chore:    构建/工具变动
```

### 11.3 .gitignore 常用规则

```
# 忽略所有 .log 文件
*.log

# 忽略某个目录
node_modules/
dist/

# 但保留其中某个文件
!dist/index.html

# 忽略根目录下的配置文件
/config.env
```

---

## 十二、常见场景速查

### 12.1 代码写错了，想回到上次提交

```bash
git restore .
```

### 12.2 提交信息写错了

```bash
git commit --amend -m "正确的提交信息"
```

### 12.3 刚才 commit 错分支了

```bash
git branch <正确分支名>      # 在正确分支创建指针
git checkout <正确分支名>
git reset --hard HEAD~1      # 回到原分支撤销
```

### 12.4 远程代码被改了，本地推送失败

```bash
git pull --rebase origin main
git push origin main
```

### 12.5 想把多次提交压缩成一个

```bash
git rebase -i HEAD~3
# 把后面的 pick 改为 squash，保存退出
```

### 12.6 误删了分支，如何找回

```bash
git reflog                      # 找到分支指向的提交哈希
git branch <分支名> <提交哈希>   # 重建分支
```

### 12.7 不小心在 main 上提交了

```bash
git branch feature/backup   # 1. 保存当前工作到新分支
git reset --hard origin/main # 2. 恢复 main 到远程状态
git checkout feature/backup  # 3. 切回备份分支继续开发
```

---

## 附录：名词速记

| 名词 | 说明 |
|------|------|
| 工作区（Working Directory） | 你正在编辑的目录 |
| 暂存区（Staging Area / Index） | 提交前的准备区域 |
| 仓库（Repository） | 保存历史提交的地方 |
| HEAD | 当前所在位置的指针 |
| origin | 默认远程仓库名 |

---

*文档整理日期：2026-09-24*

