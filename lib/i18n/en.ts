export const en = {
  nav: {
    home: "Home",
    about: "About",
    tools: "Tools",
    privacy: "Privacy",
  },
  home: {
    title: "Free Online Tools",
    subtitle: "Simple, fast, and free tools for everyone. No sign-up required.",
    searchPlaceholder: "Search tools...",
    statsTools: "Tools",
    statsFree: "Free",
    statsNoSignup: "No Sign-up",
    statsLocal: "Local",
    useNow: "Use Now →",
    categories: {
      image: "Image Tools",
      text: "Text Tools",
      life: "Life & Utilities",
      media: "Media Tools",
      file: "File Tools",
      design: "Design Tools",
    },
  },
  tool: {
    backHome: "Home",
    relatedKeywords: "Related Keywords",
    comingSoon: "Coming soon 🚀",
  },
  about: {
    title: "About MyTools",
    intro: "MyTools is a completely free online tools platform dedicated to providing simple, fast, and useful utilities.",
    missionTitle: "Our Mission",
    features: [
      { icon: "🆓", title: "Completely Free", desc: "All tools are permanently free with no hidden charges." },
      { icon: "🔒", title: "Privacy First", desc: "Most tools run locally in your browser. Files are never uploaded." },
      { icon: "⚡", title: "Fast & Easy", desc: "No account needed. Open and use instantly." },
      { icon: "📱", title: "Responsive", desc: "Works perfectly on desktop, tablet, and mobile." },
    ],
    contactTitle: "Contact Us",
    contactText: "Have suggestions or want us to add a new tool? Reach us via GitHub Issues.",
  },
  privacy: {
    title: "Privacy Policy",
    updated: "Last updated: January 2025",
    sections: [
      { title: "1. Data Collection", content: "MyTools only collects anonymous website analytics (e.g. page views) to improve user experience. We do not collect any personally identifiable information." },
      { title: "2. Local Processing", content: "Most of our tools (image processing, text tools, etc.) run entirely in your browser. Your files and text are never uploaded to any server." },
      { title: "3. Cookies", content: "We use necessary cookies to keep the website running. We do not use third-party advertising tracking cookies." },
      { title: "4. Third-party Services", content: "We may use analytics services such as Google Analytics to collect anonymous visit data. These services have their own privacy policies." },
      { title: "5. Policy Updates", content: "We reserve the right to update this privacy policy at any time. Major changes will be announced prominently on the site." },
    ],
  },
  footer: {
    tagline: "Free online tools for everyone.",
    quickNav: "Quick Links",
    categories: "Categories",
    privacy: "Privacy Policy",
    about: "About",
    home: "Home",
  },
};
export type I18nDict = typeof en;
