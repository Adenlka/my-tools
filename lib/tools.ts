export type Locale = "en" | "zh";
export type Category = "image" | "text" | "life" | "media";

export interface Tool {
  slug: string;
  category: Category;
  icon: string;
  name: Record<Locale, string>;
  description: Record<Locale, string>;
  keywords: Record<Locale, string[]>;
}

export const tools: Tool[] = [
  {
    slug: "qr-code-generator",
    category: "image",
    icon: "📱",
    name: { en: "QR Code Generator", zh: "QR Code 生成器" },
    description: {
      en: "Free online QR code generator. Create QR codes for URLs, text, contacts and more. Download as high-res PNG.",
      zh: "免费在线二维码生成器，支持文本、URL、联系人等多种格式，可下载高清PNG图片。",
    },
    keywords: {
      en: ["qr code generator", "qr code maker", "free qr code", "barcode generator"],
      zh: ["二维码生成器", "免费二维码", "在线二维码", "qr码制作"],
    },
  },
  {
    slug: "image-compressor",
    category: "image",
    icon: "🗜️",
    name: { en: "Image Compressor", zh: "图片压缩" },
    description: {
      en: "Compress JPG, PNG, and WebP images online for free. No upload needed — processed locally in your browser.",
      zh: "在线图片压缩工具，支持 JPG、PNG、WebP 格式，无需上传服务器，本地压缩保护隐私。",
    },
    keywords: {
      en: ["image compressor", "compress jpg", "compress png", "reduce image size", "webp compressor"],
      zh: ["图片压缩", "压缩图片", "jpg压缩", "png压缩", "减小图片大小"],
    },
  },
  {
    slug: "image-converter",
    category: "image",
    icon: "🔄",
    name: { en: "Image Converter", zh: "图片格式转换" },
    description: {
      en: "Convert images between JPG, PNG, WebP, and BMP formats instantly in your browser.",
      zh: "免费在线图片格式转换工具，支持 JPG、PNG、WebP、BMP 等格式互转，快速便捷。",
    },
    keywords: {
      en: ["image converter", "jpg to png", "png to webp", "convert image format", "webp converter"],
      zh: ["图片格式转换", "jpg转png", "png转webp", "图片转换", "格式转换工具"],
    },
  },
  {
    slug: "word-counter",
    category: "text",
    icon: "📝",
    name: { en: "Word Counter", zh: "字数统计" },
    description: {
      en: "Count words, characters, sentences, paragraphs and reading time instantly. Supports mixed Chinese and English text.",
      zh: "在线文字统计工具，实时统计字数、字符数、段落数、句子数，支持中英文混合统计。",
    },
    keywords: {
      en: ["word counter", "character counter", "word count tool", "text analyzer", "reading time calculator"],
      zh: ["字数统计", "字符统计", "文字计数", "在线字数统计", "阅读时间计算"],
    },
  },
  {
    slug: "password-generator",
    category: "text",
    icon: "🔐",
    name: { en: "Password Generator", zh: "密码生成器" },
    description: {
      en: "Generate strong, secure random passwords using crypto.getRandomValues(). Customize length and character types.",
      zh: "安全随机密码生成器，自定义长度、字符类型，使用加密随机数生成强密码保护账户安全。",
    },
    keywords: {
      en: ["password generator", "strong password", "random password", "secure password maker", "password creator"],
      zh: ["密码生成器", "随机密码", "强密码生成", "安全密码", "在线密码生成"],
    },
  },
  {
    slug: "case-converter",
    category: "text",
    icon: "🔤",
    name: { en: "Case Converter", zh: "大小写转换" },
    description: {
      en: "Convert text between UPPER CASE, lower case, Title Case, camelCase, snake_case, kebab-case and more.",
      zh: "文本大小写转换工具，支持全大写、全小写、首字母大写、驼峰命名、下划线命名等多种格式。",
    },
    keywords: {
      en: ["case converter", "uppercase converter", "camelcase converter", "snake case", "text case changer"],
      zh: ["大小写转换", "驼峰命名转换", "snake_case转换", "文字格式转换", "kebab-case"],
    },
  },
  {
    slug: "unit-converter",
    category: "life",
    icon: "📐",
    name: { en: "Unit Converter", zh: "单位换算" },
    description: {
      en: "Convert units of length, weight, temperature, and area. Fast and accurate conversions with one click.",
      zh: "全能单位换算工具，支持长度、重量、温度、面积等多种单位之间的快速换算。",
    },
    keywords: {
      en: ["unit converter", "length converter", "weight converter", "temperature converter", "area converter"],
      zh: ["单位换算", "长度换算", "重量换算", "温度转换", "面积换算"],
    },
  },
  {
    slug: "bmi-calculator",
    category: "life",
    icon: "⚖️",
    name: { en: "BMI Calculator", zh: "BMI 计算器" },
    description: {
      en: "Calculate your Body Mass Index (BMI) with metric or imperial units. Get instant health category results.",
      zh: "免费 BMI 身体质量指数计算器，支持公制/英制单位，输入身高体重即可计算并给出健康建议。",
    },
    keywords: {
      en: ["bmi calculator", "body mass index", "bmi chart", "healthy weight calculator", "obesity calculator"],
      zh: ["bmi计算器", "身体质量指数", "体重指数计算", "健康体重", "bmi标准"],
    },
  },
  {
    slug: "age-calculator",
    category: "life",
    icon: "🎂",
    name: { en: "Age Calculator", zh: "年龄计算器" },
    description: {
      en: "Calculate exact age in years, months, and days. Find days until next birthday and total days lived.",
      zh: "精确年龄计算器，根据出生日期计算精确年龄（年/月/日），还可计算距生日剩余天数。",
    },
    keywords: {
      en: ["age calculator", "birthday calculator", "how old am i", "exact age calculator", "date difference"],
      zh: ["年龄计算器", "生日计算", "出生日期计算", "年龄查询", "日期差计算"],
    },
  },
  {
    slug: "youtube-thumbnail",
    category: "media",
    icon: "🎬",
    name: { en: "YouTube Thumbnail Downloader", zh: "YouTube 缩略图下载" },
    description: {
      en: "Download YouTube video thumbnails in all available resolutions including 1280×720 max quality. No login needed.",
      zh: "免费 YouTube 视频缩略图下载工具，支持最高画质 1280x720，支持所有链接格式，无需登录。",
    },
    keywords: {
      en: ["youtube thumbnail downloader", "youtube thumbnail", "download youtube thumbnail", "yt thumbnail", "video thumbnail"],
      zh: ["youtube缩略图下载", "youtube封面下载", "视频封面下载", "yt缩略图", "油管缩略图"],
    },
  },
];

export const categoryOrder = ["image", "text", "life", "media"] as const;

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: Category): Tool[] {
  return tools.filter((t) => t.category === category);
}
