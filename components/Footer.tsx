import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span>🛠️</span> MyTools
            </h3>
            <p className="text-sm text-gray-500">
              免费在线工具集合，无需注册，随时使用，保护您的隐私。
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">快速导航</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/" className="hover:text-indigo-600 transition-colors">首页</Link></li>
              <li><Link href="/about" className="hover:text-indigo-600 transition-colors">关于我们</Link></li>
              <li><Link href="/privacy" className="hover:text-indigo-600 transition-colors">隐私政策</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">工具分类</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>📷 图片处理</li>
              <li>📝 文字处理</li>
              <li>🏠 生活实用</li>
              <li>🎬 媒体工具</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-6 text-center text-xs text-gray-400">
          © {year} MyTools. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
