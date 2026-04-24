import Link from "next/link";
import { tools, categoryOrder, getToolsByCategory } from "@/lib/tools";
import { getDict } from "@/lib/i18n";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDict(lang);
  return {
    title: `MyTools – ${dict.home.title}`,
    description: dict.home.subtitle,
    alternates: {
      languages: {
        en: "/en",
        zh: "/zh",
      },
    },
  };
}

const categoryIcons: Record<string, string> = {
  image: "🖼️",
  text: "📝",
  life: "🏠",
  media: "🎬",
  file: "📄",
  design: "🎨",
};

export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  const dict = getDict(lang);

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <section className="text-center mb-14">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
          🛠️ {dict.home.title}
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">{dict.home.subtitle}</p>
      </section>

      {/* Category sections */}
      {categoryOrder.map((category) => {
        const categoryTools = getToolsByCategory(category);
        const catLabel = dict.home.categories[category as keyof typeof dict.home.categories];
        return (
          <section key={category} className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span>{categoryIcons[category]}</span>
              <span>{catLabel}</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {categoryTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/${lang}/tools/${tool.slug}`}
                  className="group bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all duration-200"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-4xl">{tool.icon}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors mb-1">
                        {tool.name[lang as "en" | "zh" | "ja"] ?? tool.name.en}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {tool.description[lang as "en" | "zh" | "ja"] ?? tool.description.en}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm text-indigo-500 font-medium">
                    {dict.home.useNow}
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
          { label: dict.home.statsTools, value: `${tools.length}+` },
          { label: dict.home.statsFree, value: "100%" },
          { label: dict.home.statsNoSignup, value: "✓" },
          { label: dict.home.statsLocal, value: "🔒" },
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
