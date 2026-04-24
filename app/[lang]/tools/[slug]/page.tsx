import { notFound } from "next/navigation";
import { getToolBySlug, tools } from "@/lib/tools";
import { getDict } from "@/lib/i18n";
import { toolContent } from "@/lib/tool-content";
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
  "pdf-merger":         dynamic(() => import("@/components/tools/PdfMerger")),
  "pdf-splitter":       dynamic(() => import("@/components/tools/PdfSplitter")),
  "image-to-pdf":       dynamic(() => import("@/components/tools/ImageToPdf")),
  "markdown-to-html":   dynamic(() => import("@/components/tools/MarkdownToHtml")),
  "json-formatter":     dynamic(() => import("@/components/tools/JsonFormatter")),
  "base64-encoder":     dynamic(() => import("@/components/tools/Base64Encoder")),
  "hash-generator":     dynamic(() => import("@/components/tools/HashGenerator")),
  "color-picker":       dynamic(() => import("@/components/tools/ColorPicker")),
  "loan-calculator":    dynamic(() => import("@/components/tools/LoanCalculator")),
  "random-number":      dynamic(() => import("@/components/tools/RandomNumber")),
  "text-cleaner":       dynamic(() => import("@/components/tools/TextCleaner")),
  "countdown-timer":    dynamic(() => import("@/components/tools/CountdownTimer")),
};

interface Props {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateStaticParams() {
  const params: { lang: string; slug: string }[] = [];
  for (const lang of ["en", "zh", "ja"]) {
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
  const l = (lang === "zh" ? "zh" : lang === "ja" ? "ja" : "en") as "en" | "zh" | "ja";
  const enUrl  = `${SITE_URL}/en/tools/${slug}`;
  const zhUrl  = `${SITE_URL}/zh/tools/${slug}`;
  const jaUrl  = `${SITE_URL}/ja/tools/${slug}`;
  const canonical = `${SITE_URL}/${l}/tools/${slug}`;
  const ogLocale = l === "zh" ? "zh_CN" : l === "ja" ? "ja_JP" : "en_US";

  return {
    title: `${tool.name[l]} - Free Online Tool`,
    description: tool.description[l],
    keywords: tool.keywords[l].join(", "),
    alternates: {
      canonical,
      languages: {
        en: enUrl,
        zh: zhUrl,
        ja: jaUrl,
        "x-default": enUrl,
      },
    },
    openGraph: {
      title: `${tool.name[l]} - Free Online Tool`,
      description: tool.description[l],
      url: canonical,
      siteName: "MyTools",
      locale: ogLocale,
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
  const l = (lang === "zh" ? "zh" : lang === "ja" ? "ja" : "en") as "en" | "zh" | "ja";
  const dict = getDict(lang);
  const content = toolContent[slug] ?? null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": tool.name[l],
    "description": tool.description[l],
    "url": `${SITE_URL}/${l}/tools/${slug}`,
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
    },
  };

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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

      {/* How to Use + FAQ (SEO content) */}
      {content && (
        <section className="mt-10 space-y-8">
          {/* How to Use */}
          <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              How to Use {tool.name.en}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-5">
              {content.howTo.intro}
            </p>
            <ol className="space-y-3">
              {content.howTo.steps.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{step.title}</p>
                    <p className="text-sm text-gray-500">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* FAQ */}
          <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-5">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {content.faqs.map((faq, i) => (
                <div key={i} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                  <h3 className="text-sm font-semibold text-gray-800 mb-1">{faq.question}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
