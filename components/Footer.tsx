import Link from 'next/link';
import { getDict } from '@/lib/i18n';

interface Props {
  lang: string;
}

export default function Footer({ lang }: Props) {
  const dict = getDict(lang);
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span>🛠️</span> MyTools
            </h3>
            <p className="text-sm text-gray-500">{dict.footer.tagline}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">{dict.footer.quickNav}</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href={`/${lang}`} className="hover:text-indigo-600 transition-colors">{dict.footer.home}</Link></li>
              <li><Link href={`/${lang}/about`} className="hover:text-indigo-600 transition-colors">{dict.footer.about}</Link></li>
              <li><Link href={`/${lang}/privacy`} className="hover:text-indigo-600 transition-colors">{dict.footer.privacy}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">{dict.footer.categories}</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>🖼️ {dict.home.categories.image}</li>
              <li>📝 {dict.home.categories.text}</li>
              <li>🏠 {dict.home.categories.life}</li>
              <li>🎬 {dict.home.categories.media}</li>
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
