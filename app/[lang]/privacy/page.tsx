import type { Metadata } from "next";
import { getDict } from "@/lib/i18n";

interface Props { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDict(lang);
  return { title: dict.privacy.title };
}

export default async function PrivacyPage({ params }: Props) {
  const { lang } = await params;
  const dict = getDict(lang);
  const d = dict.privacy;
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{d.title}</h1>
      <p className="text-sm text-gray-400 mb-8">{d.updated}</p>
      <div className="space-y-8 text-gray-600">
        {d.sections.map((s) => (
          <section key={s.title}>
            <h2 className="text-xl font-bold text-gray-800 mb-2">{s.title}</h2>
            <p>{s.content}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
