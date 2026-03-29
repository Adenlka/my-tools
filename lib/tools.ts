export type Category = '图片处理' | '文字处理' | '生活实用' | '媒体工具';

export interface Tool {
  name: string;
  slug: string;
  description: string;
  category: Category;
  keywords: string[];
  icon: string;
}

export const tools: Tool[] = [
  {
    name: 'QR Code 生成器',
    slug: 'qr-code-generator',
    description: '免费在线二维码生成器，支持文本、URL、联系人等多种格式，可下载高清PNG图片。',
    category: '图片处理',
    keywords: ['qr code', '二维码', '生成器', 'qrcode generator', 'barcode'],
    icon: '📱',
  },
  {
    name: '图片压缩',
    slug: 'image-compressor',
    description: '在线图片压缩工具，支持 JPG、PNG、WebP 格式，无需上传服务器，本地压缩保护隐私。',
    category: '图片处理',
    keywords: ['图片压缩', 'image compress', 'jpg压缩', 'png压缩', 'webp'],
    icon: '🗜️',
  },
  {
    name: '图片格式转换',
    slug: 'image-converter',
    description: '免费在线图片格式转换工具，支持 JPG、PNG、WebP、GIF 等格式互转，快速便捷。',
    category: '图片处理',
    keywords: ['图片转换', 'image converter', 'jpg to png', 'png to webp', '格式转换'],
    icon: '🔄',
  },
  {
    name: '字数统计',
    slug: 'word-counter',
    description: '在线文字统计工具，实时统计字数、字符数、段落数、句子数，支持中英文混合统计。',
    category: '文字处理',
    keywords: ['字数统计', 'word counter', '字符统计', '文字计数', 'character count'],
    icon: '📝',
  },
  {
    name: '密码生成器',
    slug: 'password-generator',
    description: '安全随机密码生成器，自定义长度、字符类型，生成强密码保护您的账户安全。',
    category: '文字处理',
    keywords: ['密码生成', 'password generator', '随机密码', '强密码', 'secure password'],
    icon: '🔐',
  },
  {
    name: '大小写转换',
    slug: 'case-converter',
    description: '文本大小写转换工具，支持全大写、全小写、首字母大写、驼峰命名等多种格式转换。',
    category: '文字处理',
    keywords: ['大小写转换', 'case converter', 'uppercase', 'lowercase', 'camelCase'],
    icon: '🔤',
  },
  {
    name: '单位换算',
    slug: 'unit-converter',
    description: '全能单位换算工具，支持长度、重量、温度、面积、体积等多种单位之间的快速换算。',
    category: '生活实用',
    keywords: ['单位换算', 'unit converter', '长度换算', '重量换算', '温度转换'],
    icon: '📐',
  },
  {
    name: 'BMI 计算器',
    slug: 'bmi-calculator',
    description: '免费 BMI 身体质量指数计算器，输入身高体重即可计算 BMI 值并给出健康建议。',
    category: '生活实用',
    keywords: ['bmi计算', 'bmi calculator', '身体质量指数', '体重指数', '健康计算'],
    icon: '⚖️',
  },
  {
    name: '年龄计算器',
    slug: 'age-calculator',
    description: '精确年龄计算器，根据出生日期计算精确年龄（年/月/日），还可计算距生日剩余天数。',
    category: '生活实用',
    keywords: ['年龄计算', 'age calculator', '生日计算', '出生日期', '年龄查询'],
    icon: '🎂',
  },
  {
    name: 'YouTube 缩略图下载',
    slug: 'youtube-thumbnail',
    description: '免费 YouTube 视频缩略图下载工具，支持最高画质 1280x720，无需登录即可下载。',
    category: '媒体工具',
    keywords: ['youtube缩略图', 'youtube thumbnail', 'youtube封面', '视频封面下载', 'yt thumbnail'],
    icon: '🎬',
  },
];

export const categories: Category[] = ['图片处理', '文字处理', '生活实用', '媒体工具'];

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: Category): Tool[] {
  return tools.filter((t) => t.category === category);
}
