import type { I18nDict } from "./en";

export const zh: I18nDict = {
  nav: {
    home: "首页",
    about: "关于",
    tools: "工具",
    privacy: "隐私",
  },
  home: {
    title: "免费在线工具",
    subtitle: "简单、快速、免费，无需注册即可使用所有工具。",
    searchPlaceholder: "搜索工具...",
    statsTools: "工具数量",
    statsFree: "完全免费",
    statsNoSignup: "无需注册",
    statsLocal: "本地处理",
    useNow: "立即使用 →",
    categories: {
      image: "图片处理",
      text: "文字处理",
      life: "生活实用",
      media: "媒体工具",
    },
  },
  tool: {
    backHome: "首页",
    relatedKeywords: "相关关键词",
    comingSoon: "工具功能即将上线，敬请期待 🚀",
  },
  about: {
    title: "关于 MyTools",
    intro: "MyTools 是一个完全免费的在线工具集合平台，致力于为用户提供简单、快速、好用的实用工具。",
    missionTitle: "我们的理念",
    features: [
      { icon: "🆓", title: "完全免费", desc: "所有工具永久免费，无隐藏收费。" },
      { icon: "🔒", title: "隐私优先", desc: "大多数工具在浏览器本地运行，文件不会上传至服务器。" },
      { icon: "⚡", title: "快速便捷", desc: "无需注册账号，打开即用。" },
      { icon: "📱", title: "响应式设计", desc: "完美支持桌面、平板、手机等各种设备。" },
    ],
    contactTitle: "联系我们",
    contactText: "如果您有任何建议或想要我们添加新工具，欢迎通过 GitHub Issues 联系我们。",
  },
  privacy: {
    title: "隐私政策",
    updated: "最后更新：2025年1月",
    sections: [
      { title: "1. 数据收集", content: "MyTools 仅收集匿名的网站访问统计数据（如页面浏览量），用于改善用户体验。我们不收集任何可识别个人身份的信息。" },
      { title: "2. 本地处理", content: "我们的大多数工具（图片处理、文字处理等）完全在您的浏览器中本地运行。您的文件、文本内容不会被上传到任何服务器。" },
      { title: "3. Cookies", content: "我们使用必要的 Cookies 维持网站正常运行。不使用第三方广告追踪 Cookies。" },
      { title: "4. 第三方服务", content: "我们可能使用 Google Analytics 等分析服务收集匿名访问数据，这些服务有其各自的隐私政策。" },
      { title: "5. 政策更新", content: "我们保留随时更新本隐私政策的权利。重大变更将在网站上显著位置公告。" },
    ],
  },
  footer: {
    tagline: "面向所有人的免费在线工具。",
    quickNav: "快速导航",
    categories: "工具分类",
    privacy: "隐私政策",
    about: "关于我们",
    home: "首页",
  },
};
