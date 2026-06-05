# NyxBot-WebUI

NyxBot 是一个 Warframe 游戏 QQ 机器人管理后台，基于 [soybean-admin](https://github.com/soybeanjs/soybean-admin) v2.2.0 框架构建。提供世界状态监控、市场查询、紫卡分析、日志管理等功能。

## 技术栈

| 技术       | 版本       |
| ---------- | ---------- |
| Vue        | 3.5.34     |
| Vite       | 8.0.12     |
| TypeScript | 6.0.3      |
| Naive UI   | 2.44.1     |
| Pinia      | 3.0.4      |
| Vue Router | 5.0.7      |
| Vue I18n   | 11.4.2     |
| ECharts    | 6.0.0      |
| UnoCSS     | 66.6.8     |
| pnpm       | >= 10.5.0  |
| Node.js    | >= 20.19.0 |

## 功能

- **首页仪表盘** — 数据概览、图表统计
- **日志系统** — 命令日志查询、实时日志监控（SSE 推送）
- **配置管理** — 管理员、黑白名单（群/个人）、服务配置、订阅管理
- **本地数据** — Warframe 世界状态、市场、紫卡、遗物、地球/金星/火卫二/扎里曼周期等
- **主题系统** — 亮色/暗色/跟随系统、6 种布局模式、主题色定制、预设主题
- **用户系统** — 登录/登出、密码重置、用户名修改、JWT 自动刷新

## 目录结构

```
NyxBot-WebUI/
├── .github/workflows/          # GitHub Actions 工作流
├── .vscode/                    # VSCode 配置
├── build/                      # Vite 构建配置
│   ├── config/                 # 环境/代理/时间配置
│   └── plugins/                # Vite 插件
├── packages/                   # monorepo 内部包
│   ├── alova/                  # @sa/alova — 请求库封装
│   ├── axios/                  # @sa/axios — HTTP 请求
│   ├── color/                  # @sa/color — 颜色系统
│   ├── hooks/                  # @sa/hooks — 通用 composables
│   ├── materials/              # @sa/materials — 布局组件
│   ├── scripts/                # @sa/scripts — CLI 工具
│   ├── uno-preset/             # @sa/uno-preset — UnoCSS 预设
│   └── utils/                  # @sa/utils — 工具函数
├── public/                     # 公共资源
├── src/
│   ├── assets/                 # 静态资源（SVG 图标等）
│   ├── components/             # 组件
│   │   ├── advanced/           # 高级组件（表格列设置等）
│   │   ├── common/             # 通用组件（数据更新按钮、周期卡片等）
│   │   └── custom/             # 自定义组件（图标、水印等）
│   ├── constants/              # 常量定义
│   ├── enum/                   # 枚举
│   ├── hooks/                  # 自定义 hooks
│   │   ├── business/           # 业务 hooks
│   │   └── common/             # 通用 hooks（ECharts、表格、路由等）
│   ├── layouts/                # 布局系统
│   │   ├── base-layout/        # 标准后台布局
│   │   ├── blank-layout/       # 空白布局
│   │   └── modules/            # 布局模块（菜单、标签、主题抽屉等）
│   ├── locales/                # 国际化（中文/英文）
│   ├── plugins/                # 应用插件
│   ├── router/                 # 路由系统
│   │   ├── elegant/            # 自动生成路由（勿手动编辑）
│   │   ├── guard/              # 路由守卫
│   │   └── routes/             # 自定义路由
│   ├── service/                # API 服务层
│   │   ├── api/                # 接口定义
│   │   └── request/            # 请求封装
│   ├── store/                  # Pinia 状态管理
│   ├── styles/                 # 全局样式
│   ├── theme/                  # 主题配置与预设
│   ├── typings/                # TypeScript 类型定义
│   ├── utils/                  # 工具函数
│   └── views/                  # 页面
│       ├── _builtin/           # 内置页面（登录、403/404/500）
│       ├── home/               # 首页
│       ├── log/                # 日志（命令日志、实时监控）
│       ├── config/             # 配置（管理员、黑白名单、服务、订阅）
│       └── local-data/         # 本地数据（Warframe 相关）
├── .oxfmtrc.json               # oxfmt 格式化配置
├── .oxlintrc.json              # oxlint 规则配置
├── pnpm-workspace.yaml         # pnpm workspace 配置
├── tsconfig.json               # TypeScript 配置
└── vite.config.ts              # Vite 配置
```

## 快速开始

### 环境要求

- **Node.js** >= 20.19.0
- **pnpm** >= 10.5.0

### 安装

```bash
git clone https://github.com/KingPrimes/NyxBot-WebUI.git
cd NyxBot-WebUI
pnpm install
```

### 开发

```bash
pnpm dev              # 启动开发服务器（test 模式，端口 9527）
pnpm dev:prod         # 启动开发服务器（prod 模式）
pnpm gen-route        # 重新生成路由文件
```

### 构建

```bash
pnpm build            # 生产构建
pnpm build:test       # 测试环境构建
pnpm preview          # 预览构建产物（端口 9725）
```

### 代码质量

```bash
pnpm typecheck        # TypeScript 类型检查
pnpm lint             # oxlint + ESLint 检查并修复
pnpm fmt              # oxfmt 格式化
```

## 开发注意事项

- 新增页面后运行 `pnpm gen-route` 重新生成路由，**不要手动编辑** `src/router/elegant/` 下的文件
- Naive UI 组件通过 `unplugin-vue-components` 自动按需导入，无需手动注册
- 图标使用 Iconify，本地 SVG 放在 `src/assets/svg-icon/`，命名格式 `{VITE_ICON_LOCAL_PREFIX}-{name}`
- 路径别名：`@/` → `src/`，`~/` → 项目根目录
- 环境变量 `VITE_HTTP_PROXY=Y` 控制开发代理，代理配置在 `build/config/proxy.ts`
- 提交前会自动运行 `typecheck` + `lint` + `fmt`，确保代码质量
- 存储前缀 `VITE_STORAGE_PREFIX=SOY_` 用于区分不同域名下的 localStorage

## 协议

MIT License
