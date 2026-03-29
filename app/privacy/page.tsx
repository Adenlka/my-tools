import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '隐私政策 | MyTools',
  description: 'MyTools 隐私政策：我们如何处理您的数据，以及我们对用户隐私的承诺。',
};

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-2">隐私政策</h1>
      <p className="text-sm text-gray-400 mb-8">最后更新：2025年1月</p>

      <div className="space-y-8 text-gray-600">
        {[
          {
            title: '1. 数据收集',
            content:
              'MyTools 仅收集匿名的网站访问统计数据（如页面浏览量），用于改善用户体验。我们不收集任何可识别个人身份的信息。',
          },
          {
            title: '2. 本地处理',
            content:
              '我们的大多数工具（图片处理、文字处理等）完全在您的浏览器中本地运行。您的文件、文本内容不会被上传到任何服务器。',
          },
          {
            title: '3. Cookies',
            content:
              '我们使用必要的 Cookies 维持网站正常运行。不使用第三方广告追踪 Cookies。',
          },
          {
            title: '4. 第三方服务',
            content:
              '我们可能使用 Google Analytics 等分析服务收集匿名访问数据，这些服务有其各自的隐私政策。',
          },
          {
            title: '5. 政策更新',
            content:
              '我们保留随时更新本隐私政策的权利。重大变更将在网站上显著位置公告。',
          },
        ].map(({ title, content }) => (
          <section key={title}>
            <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
            <p>{content}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
