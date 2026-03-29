import Link from 'next/link';
import { tools, categories, getToolsByCategory } from '@/lib/tools';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MyTools – 免费在线工具集合',
  description: '提供 QR Code 生成、图片压缩、字数统计、密码生成等10款免费在线工具，无需注册，即开即用。',
  keywords: ['在线工具', '免费工具', 'qr code生成器', '图片压缩', '字数统计', '密码生成器'],
};

export default function HomePage() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <section className="text-center mb-14">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
          🛠️ 免费在线工具集合
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          10 款精选工具，无需注册登录，本地处理保护隐私，随时随地免费使用。
        </p>
      </section>

      {/* Category sections */}
      {categories.map((category) => {
        const categoryTools = getToolsByCategory(category);
        const categoryIcon: Record<string, string> = {
          '图片处理': '🖼️',
          '文字处理': '📝',
          '生活实用': '🏠',
          '媒体工具': '🎬',
        };
        return (
          <section key={category} className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span>{categoryIcon[category]}</span>
              <span>{category}</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {categoryTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="group bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all duration-200"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-4xl">{tool.icon}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors mb-1">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-2">{tool.description}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm text-indigo-500 font-medium">
                    立即使用 →
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      {/* Stats strip */}
      <section className="mt-4 bg-indigo-50 rounded-2xl p-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
        {[
          { label: '工具数量', value: `${tools.length}+` },
          { label: '完全免费', value: '100%' },
          { label: '无需注册', value: '✓' },
          { label: '本地处理', value: '🔒' },
        ].map((item) => (
          <div key={item.label}>
            <div className="text-3xl font-extrabold text-indigo-600">{item.value}</div>
            <div className="text-sm text-gray-500 mt-1">{item.label}</div>
          </div>
        ))}
      </section>
    </main>
  );
}
