import { notFound } from 'next/navigation';
import { getToolBySlug, tools } from '@/lib/tools';
import type { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const toolComponents: Record<string, React.ComponentType> = {
  'qr-code-generator':  dynamic(() => import('@/components/tools/QrCodeGenerator')),
  'word-counter':       dynamic(() => import('@/components/tools/WordCounter')),
  'password-generator': dynamic(() => import('@/components/tools/PasswordGenerator')),
  'bmi-calculator':     dynamic(() => import('@/components/tools/BmiCalculator')),
  'age-calculator':     dynamic(() => import('@/components/tools/AgeCalculator')),
  'unit-converter':     dynamic(() => import('@/components/tools/UnitConverter')),
  'case-converter':     dynamic(() => import('@/components/tools/CaseConverter')),
  'image-compressor':   dynamic(() => import('@/components/tools/ImageCompressor')),
  'youtube-thumbnail':  dynamic(() => import('@/components/tools/YoutubeThumbnail')),
  'image-converter':    dynamic(() => import('@/components/tools/ImageConverter')),
};

// Next.js 15+: params is now a Promise
interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return { title: '工具未找到' };
  return {
    title: `${tool.name} – 免费在线工具 | MyTools`,
    description: tool.description,
    keywords: tool.keywords,
    openGraph: {
      title: `${tool.name} | MyTools`,
      description: tool.description,
      type: 'website',
    },
  };
}

function ToolPlaceholder({ tool }: { tool: ReturnType<typeof getToolBySlug> }) {
  if (!tool) return null;
  return (
    <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center">
      <div className="text-6xl mb-4">{tool.icon}</div>
      <h2 className="text-xl font-semibold text-gray-700 mb-2">{tool.name}</h2>
      <p className="text-gray-400 text-sm">工具功能即将上线，敬请期待 🚀</p>
    </div>
  );
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-indigo-600 transition-colors">首页</Link>
        <span>/</span>
        <span className="text-gray-600">{tool.name}</span>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-4 mb-3">
          <span className="text-5xl">{tool.icon}</span>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">{tool.name}</h1>
            <span className="inline-block mt-1 text-xs font-medium bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
              {tool.category}
            </span>
          </div>
        </div>
        <p className="text-gray-500 text-base leading-relaxed">{tool.description}</p>
      </header>

      {/* Tool area */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
        {toolComponents[tool.slug]
          ? (() => { const ToolComponent = toolComponents[tool.slug]; return <ToolComponent />; })()
          : <ToolPlaceholder tool={tool} />}
      </div>

      {/* Keywords (SEO) */}
      <section className="mt-10">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">相关关键词</h2>
        <div className="flex flex-wrap gap-2">
          {tool.keywords.map((kw) => (
            <span key={kw} className="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full">
              {kw}
            </span>
          ))}
        </div>
      </section>
    </main>
  );
}
