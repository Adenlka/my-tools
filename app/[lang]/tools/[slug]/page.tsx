import { notFound } from "next/navigation";
import { getToolBySlug, tools } from "@/lib/tools";
import { getDict } from "@/lib/i18n";
import type { Metadata } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://alka003.xyz";

const toolComponents: Record<string, React.ComponentType> = {
  "qr-code-generator":  dynamic(() => import("@/components/tools/QrCodeGenerator")),
  "word-counter":       dynamic(() => import("@/components/tools/WordCounter")),
  "password-generator": dynamic(() => import("@/components/tools/PasswordGenerator")),
  "bmi-calculator":     dynamic(() => import("@/components/tools/BmiCalculator")),
  "age-calculator":     dynamic(() => import("@/components/tools/AgeCalculator")),
  "unit-converter":     dynamic(() => import("@/components/tools/UnitConverter")),
  "case-converter":     dynamic(() => import("@/components/tools/CaseConverter")),
  "image-compressor":   dynamic(() => import("@/components/tools/ImageCompressor")),
  "youtube-thumbnail":  dynamic(() => import("@/components/tools/YoutubeThumbnail")),
  "image-converter":    dynamic(() => import("@/components/tools/ImageConverter")),
};

interface Props {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateStaticParams() {
  const params: { lang: string; slug: string }[] = [];
  for (const lang of ["en", "zh"]) {
    for (const tool of tools) {
      params.push({ lang, slug: tool.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return { title: "Tool Not Found" };
  const l = (lang === "zh" ? "zh" : "en") as "en" | "zh";
  const enUrl = `${SITE_URL}/en/tools/${slug}`;
  const zhUrl = `${SITE_URL}/zh/tools/${slug}`;
  return {
    title: tool.name[l],
    description: tool.description[l],
    keywords: tool.keywords[l],
    alternates: {
      canonical: l === "en" ? enUrl : zhUrl,
      languages: {
        en: enUrl,
        zh: zhUrl,
        "x-default": enUrl,
      },
    },
    openGraph: {
      title: tool.name[l],
      description: tool.description[l],
      type: "website",
    },
  };
}

function ToolPlaceholder({ label }: { label: string }) {
  return (
    <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center">
      <p className="text-gray-400 text-sm">{label}</p>
    </div>
  );
}

export default async function ToolPage({ params }: Props) {
  const { lang, slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();
  const l = (lang === "zh" ? "zh" : "en") as "en" | "zh";
  const dict = getDict(lang);

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href={`/${lang}`} className="hover:text-indigo-600 transition-colors">
          {dict.tool.backHome}
        </Link>
        <span>/</span>
        <span className="text-gray-600">{tool.name[l]}</span>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-4 mb-3">
          <span className="text-5xl">{tool.icon}</span>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">{tool.name[l]}</h1>
          </div>
        </div>
        <p className="text-gray-500 text-base leading-relaxed">{tool.description[l]}</p>
      </header>

      {/* Tool area */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
        {toolComponents[tool.slug]
          ? (() => { const ToolComponent = toolComponents[tool.slug]; return <ToolComponent />; })()
          : <ToolPlaceholder label={dict.tool.comingSoon} />}
      </div>

      {/* Keywords SEO */}
      <section className="mt-10">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
          {dict.tool.relatedKeywords}
        </h2>
        <div className="flex flex-wrap gap-2">
          {tool.keywords[l].map((kw) => (
            <span key={kw} className="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full">
              {kw}
            </span>
          ))}
        </div>
      </section>
    </main>
  );
}
