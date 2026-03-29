# 🛠️ MyTools

**MyTools** 是一个基于 Next.js 16 + TypeScript + Tailwind CSS 构建的免费在线工具集合，所有工具均在浏览器本地运行，无需注册，保护隐私。

## ✨ 已实现工具

| 工具 | 路由 | 说明 |
|------|------|------|
| QR Code 生成器 | `/tools/qr-code-generator` | 支持多尺寸、多纠错级别，可下载 PNG |
| 图片压缩 | `/tools/image-compressor` | 基于 browser-image-compression，本地处理 |
| 图片格式转换 | `/tools/image-converter` | Canvas API，支持 PNG/JPEG/WebP/BMP |
| 字数统计 | `/tools/word-counter` | 实时统计字数、字符、句子、段落、阅读时间 |
| 密码生成器 | `/tools/password-generator` | `crypto.getRandomValues()`，支持批量生成 |
| 大小写转换 | `/tools/case-converter` | 7 种格式：UPPER/lower/Title/Sentence/camel/snake/kebab |
| 单位换算 | `/tools/unit-converter` | 长度/重量/温度/面积，一键复制 |
| BMI 计算器 | `/tools/bmi-calculator` | Metric/Imperial，可视化进度条 + 健康建议 |
| 年龄计算器 | `/tools/age-calculator` | 精确年/月/日，支持两日期差值模式 |
| YouTube 缩略图 | `/tools/youtube-thumbnail` | 全尺寸预览 + 下载，支持所有 URL 格式 |

## 🚀 本地运行

### 前置条件

- Node.js ≥ 18
- npm ≥ 9

### 步骤

```bash
# 1. 克隆仓库
git clone https://github.com/YOUR_USERNAME/my-tools.git
cd my-tools

# 2. 安装依赖
npm install

# 3. 复制环境变量模板
cp .env.local .env.local
# 按需编辑 .env.local

# 4. 启动开发服务器
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

### 常用命令

```bash
npm run dev      # 开发模式（Turbopack）
npm run build    # 生产构建
npm run start    # 启动生产服务器
npm run lint     # ESLint 检查
npx tsc --noEmit # TypeScript 类型检查
```

## ☁️ 部署到 Vercel

### 方式一：Vercel 控制台（推荐）

1. 将代码推送到 GitHub：
   ```bash
   git init
   git add .
   git commit -m "init: MyTools initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/my-tools.git
   git push -u origin main
   ```

2. 访问 [vercel.com](https://vercel.com) → **New Project**

3. 选择 GitHub 仓库 → **Import**

4. 设置环境变量（可选）：
   - `NEXT_PUBLIC_SITE_URL` → 你的域名，如 `https://my-tools.vercel.app`
   - `NEXT_PUBLIC_SITE_NAME` → `MyTools`

5. 点击 **Deploy** — 约 1 分钟完成 🎉

### 方式二：Vercel CLI

```bash
npm i -g vercel
vercel --prod
```

## 🔧 添加新工具

按以下 4 步添加一个新工具：

### 1. 在 `lib/tools.ts` 注册工具信息

```ts
{
  name: '我的新工具',
  slug: 'my-new-tool',          // 决定路由 /tools/my-new-tool
  description: '工具描述...',
  category: '生活实用',          // 图片处理 | 文字处理 | 生活实用 | 媒体工具
  keywords: ['关键词1', '关键词2'],
  icon: '🔧',
},
```

### 2. 创建组件文件

```bash
touch components/tools/MyNewTool.tsx
```

组件必须：
- 顶部加 `'use client';`（因为使用了 React state/hooks）
- 默认导出组件函数

```tsx
'use client';
export default function MyNewTool() {
  return <div>工具内容</div>;
}
```

### 3. 在路由页注册动态导入

编辑 `app/tools/[slug]/page.tsx`，在 `toolComponents` map 里加一行：

```ts
const toolComponents: Record<string, React.ComponentType> = {
  // ...现有工具
  'my-new-tool': dynamic(() => import('@/components/tools/MyNewTool')),
};
```

### 4. 完成 ✅

访问 `/tools/my-new-tool` 即可看到新工具。首页卡片会自动出现（按分类分组）。

## 📁 项目结构

```
my-tools/
├── app/
│   ├── layout.tsx              # 根布局（Navbar + Footer）
│   ├── page.tsx                # 首页（工具卡片网格）
│   ├── about/page.tsx          # 关于页
│   ├── privacy/page.tsx        # 隐私政策
│   └── tools/[slug]/page.tsx   # 动态工具页（含 SEO metadata）
├── components/
│   ├── Navbar.tsx              # 响应式导航栏
│   ├── Footer.tsx              # 页脚
│   └── tools/                  # 各工具组件
│       ├── QrCodeGenerator.tsx
│       ├── ImageCompressor.tsx
│       ├── ImageConverter.tsx
│       ├── WordCounter.tsx
│       ├── PasswordGenerator.tsx
│       ├── CaseConverter.tsx
│       ├── UnitConverter.tsx
│       ├── BmiCalculator.tsx
│       ├── AgeCalculator.tsx
│       └── YoutubeThumbnail.tsx
├── lib/
│   └── tools.ts                # 工具配置数据（统一管理）
├── next.config.ts
├── tailwind.config.ts
└── .env.local                  # 环境变量（不提交到 git）
```

## 🛡️ 隐私与安全

- 所有图片处理（压缩、转换）均在浏览器本地完成，**不上传服务器**
- 密码生成使用 `window.crypto.getRandomValues()`，**加密安全随机**
- YouTube 缩略图来自公共 CDN，仅供学习参考

## 📄 License

MIT
