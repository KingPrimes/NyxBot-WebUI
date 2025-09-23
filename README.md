# NyxBot-WebUI

NyxBot-WebUI 是一个用于 Warframe 游戏的机器人管理界面。该项目使用 [soybean-admin](https://github.com/soybeanjs/soybean-admin) 框架构建，提供了丰富的功能和友好的用户界面。

## 功能

- 查看和管理机器人日志
- 搜索和过滤日志
- 查看日志详情
- 支持多种操作类型

## 目录结构
```
NyxBot-WebUI/
├── public/                     # 公共资源
├── src/                        # 源代码
│   ├── assets/                 # 静态资源
│   ├── components/             # 公共组件
│   ├── hooks/                  # 自定义 hooks
│   ├── locales/                # 国际化资源
│   ├── router/                 # 路由配置
│   ├── service/                # API 服务
│   ├── store/                  # 状态管理
│   ├── styles/                 # 样式文件
│   ├── utils/                  # 工具函数
│   ├── views/                  # 页面组件
│   ├── App.vue                 # 根组件
│   ├── main.ts                 # 入口文件
│   └── ...                     # 其他配置文件
├── .editorconfig               # 编辑器配置
├── .env                        # 环境变量配置
├── .env.prod                   # 生产环境变量配置
├── .env.test                   # 测试环境变量配置
├── .eslint.config.js           # ESLint 配置
├── .gitattributes              # Git 属性配置
├── .gitignore                  # Git 忽略文件配置
├── .npmrc                      # NPM 配置
├── index.html                  # 入口 HTML 文件
├── LICENSE                     # 许可证
└── README.md                   # 项目介绍文档
```

## 安装和使用

### 克隆项目

```bash
git clone https://github.com/your-repo/NyxBot-WebUI.git
cd NyxBot-WebUI
```

### 安装依赖

```bash
pnpm install
```

### 运行开发服务器

```bash
pnpm run dev
```

### 构建生产版本

```bash
pnpm run build
```

### 运行测试

```bash
pnpm run test
```

## 配置

项目的配置文件位于根目录下的 `.env` 文件中。你可以根据需要修改这些配置。

## 许可证

该项目基于 MIT 许可证，详细信息请参阅 [LICENSE](./LICENSE) 文件。
