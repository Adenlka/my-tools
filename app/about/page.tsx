import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '关于 MyTools – 免费在线工具集合',
  description: '了解 MyTools 的使命：提供免费、快速、隐私安全的在线工具，无需注册即可使用。',
};

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6">关于 MyTools</h1>

      <div className="prose prose-gray max-w-none space-y-6 text-gray-600">
        <p>
          <strong>MyTools</strong> 是一个完全免费的在线工具集合平台，致力于为用户提供简单、快速、好用的实用工具。
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-3">我们的理念</h2>
        <ul className="space-y-2 list-none">
          {[
            ['🆓', '完全免费', '所有工具永久免费，无隐藏收费。'],
            ['🔒', '隐私优先', '大多数工具在您的浏览器本地运行，数据不上传至服务器。'],
            ['⚡', '快速便捷', '无需注册账号，打开即用，节省您的时间。'],
            ['📱', '响应式设计', '完美支持桌面、平板、手机等各种设备。'],
          ].map(([icon, title, desc]) => (
            <li key={title} className="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
              <span className="text-2xl">{icon}</span>
              <div>
                <strong className="text-gray-900">{title}</strong>
                <p className="text-sm text-gray-500 mt-0.5">{desc}</p>
              </div>
            </li>
          ))}
        </ul>

        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-3">联系我们</h2>
        <p>
          如果您有任何建议、问题或想要我们添加新工具，欢迎通过 GitHub Issues 联系我们。
        </p>
      </div>
    </main>
  );
}
