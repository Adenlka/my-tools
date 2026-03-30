import type { Metadata } from "next";
import { getDict } from "@/lib/i18n";

interface Props { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDict(lang);
  return { title: dict.about.title, description: dict.about.intro };
}

export default async function AboutPage({ params }: Props) {
  const { lang } = await params;
  const dict = getDict(lang);
  const d = dict.about;
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6">{d.title}</h1>
      <p className="text-gray-600 mb-8">{d.intro}</p>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{d.missionTitle}</h2>
      <ul className="space-y-3 mb-8">
        {d.features.map((f) => (
          <li key={f.title} className="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
            <span className="text-2xl">{f.icon}</span>
            <div>
              <strong className="text-gray-900">{f.title}</strong>
              <p className="text-sm text-gray-500 mt-0.5">{f.desc}</p>
            </div>
          </li>
        ))}
      </ul>
      <h2 className="text-2xl font-bold text-gray-800 mb-3">{d.contactTitle}</h2>
      <p className="text-gray-600">{d.contactText}</p>
    </main>
  );
}
