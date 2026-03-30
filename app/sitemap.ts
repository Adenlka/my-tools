import { MetadataRoute } from "next";

const BASE_URL = "https://alka003.xyz";
const LOCALES = ["en", "zh"];

const toolSlugs = [
  "qr-code-generator",
  "image-compressor",
  "image-converter",
  "word-counter",
  "password-generator",
  "case-converter",
  "unit-converter",
  "bmi-calculator",
  "age-calculator",
  "youtube-thumbnail",
];

const staticPages = ["", "/about", "/privacy"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const page of staticPages) {
      entries.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: page === "" ? 1.0 : 0.7,
      });
    }
    for (const slug of toolSlugs) {
      entries.push({
        url: `${BASE_URL}/${locale}/tools/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.9,
      });
    }
  }

  return entries;
}
