import type { I18nDict } from "./en";

export const ja: I18nDict = {
  nav: {
    home: "ホーム",
    about: "について",
    tools: "ツール",
    privacy: "プライバシー",
  },
  home: {
    title: "無料オンラインツール",
    subtitle: "シンプル、高速、無料。登録不要でどなたでもすぐ使えます。",
    searchPlaceholder: "ツールを検索...",
    statsTools: "ツール数",
    statsFree: "完全無料",
    statsNoSignup: "登録不要",
    statsLocal: "ローカル処理",
    useNow: "今すぐ使う →",
    categories: {
      image: "画像ツール",
      text: "テキストツール",
      life: "生活・ユーティリティ",
      media: "メディアツール",
      file: "ファイルツール",
      design: "デザインツール",
    },
  },
  tool: {
    backHome: "ホーム",
    relatedKeywords: "関連キーワード",
    comingSoon: "近日公開予定 🚀",
  },
  about: {
    title: "MyToolsについて",
    intro: "MyToolsは完全無料のオンラインツールプラットフォームです。シンプルで使いやすいツールを提供することに専念しています。",
    missionTitle: "私たちの使命",
    features: [
      { icon: "🆓", title: "完全無料", desc: "すべてのツールは永久無料です。隠れた費用はありません。" },
      { icon: "🔒", title: "プライバシー優先", desc: "ほとんどのツールはブラウザ内でローカル処理されます。ファイルはアップロードされません。" },
      { icon: "⚡", title: "高速・簡単", desc: "アカウント不要。開いてすぐ使えます。" },
      { icon: "📱", title: "レスポンシブ", desc: "PC・タブレット・スマートフォンで快適に動作します。" },
    ],
    contactTitle: "お問い合わせ",
    contactText: "ご提案や新しいツールのリクエストはGitHub Issuesからお気軽にどうぞ。",
  },
  privacy: {
    title: "プライバシーポリシー",
    updated: "最終更新：2025年1月",
    sections: [
      { title: "1. データ収集", content: "MyToolsはユーザー体験向上のため、匿名のウェブサイト分析データ（ページビューなど）のみを収集します。個人を特定できる情報は一切収集しません。" },
      { title: "2. ローカル処理", content: "ほとんどのツール（画像処理、テキストツールなど）はブラウザ内で完全にローカル処理されます。ファイルやテキストはサーバーにアップロードされません。" },
      { title: "3. Cookie", content: "ウェブサイトの正常な運営に必要なCookieを使用しています。第三者の広告追跡Cookieは使用していません。" },
      { title: "4. 第三者サービス", content: "Google Analyticsなどの分析サービスを使用して匿名のアクセスデータを収集する場合があります。これらのサービスにはそれぞれのプライバシーポリシーがあります。" },
      { title: "5. ポリシーの更新", content: "このプライバシーポリシーはいつでも更新する権利を留保します。重要な変更はサイト上で目立つ場所でお知らせします。" },
    ],
  },
  footer: {
    tagline: "すべての人のための無料オンラインツール。",
    quickNav: "クイックリンク",
    categories: "カテゴリー",
    privacy: "プライバシーポリシー",
    about: "について",
    home: "ホーム",
  },
};
