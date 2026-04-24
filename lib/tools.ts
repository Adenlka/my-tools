export type Locale = "en" | "zh" | "ja";
export type Category = "image" | "text" | "life" | "media" | "file" | "design";

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
    name: { en: "QR Code Generator", zh: "QR Code 生成器", ja: "QRコード生成" },
    description: {
      en: "Free online QR code generator. Create QR codes for URLs, text, contacts and more. Download as high-res PNG.",
      zh: "免费在线二维码生成器，支持文本、URL、联系人等多种格式，可下载高清PNG图片。",
      ja: "無料オンラインQRコード生成ツール。URL・テキスト・連絡先などのQRコードを作成し、高解像度PNGでダウンロードできます。",
    },
    keywords: {
      en: ["qr code generator", "qr code maker", "free qr code", "barcode generator"],
      zh: ["二维码生成器", "免费二维码", "在线二维码", "qr码制作"],
      ja: ["QRコード生成", "QRコード作成", "無料QRコード", "バーコード生成"],
    },
  },
  {
    slug: "image-compressor",
    category: "image",
    icon: "🗜️",
    name: { en: "Image Compressor", zh: "图片压缩", ja: "画像圧縮" },
    description: {
      en: "Compress JPG, PNG, and WebP images online for free. No upload needed — processed locally in your browser.",
      zh: "在线图片压缩工具，支持 JPG、PNG、WebP 格式，无需上传服务器，本地压缩保护隐私。",
      ja: "JPG・PNG・WebP画像をオンラインで無料圧縮。アップロード不要 — ブラウザ内でローカル処理します。",
    },
    keywords: {
      en: ["image compressor", "compress jpg", "compress png", "reduce image size", "webp compressor"],
      zh: ["图片压缩", "压缩图片", "jpg压缩", "png压缩", "减小图片大小"],
      ja: ["画像圧縮", "JPG圧縮", "PNG圧縮", "画像サイズ削減", "WebP圧縮"],
    },
  },
  {
    slug: "image-converter",
    category: "image",
    icon: "🔄",
    name: { en: "Image Converter", zh: "图片格式转换", ja: "画像フォーマット変換" },
    description: {
      en: "Convert images between JPG, PNG, WebP, and BMP formats instantly in your browser.",
      zh: "免费在线图片格式转换工具，支持 JPG、PNG、WebP、BMP 等格式互转，快速便捷。",
      ja: "JPG・PNG・WebP・BMP形式の画像を即座に変換。ブラウザ内で処理されます。",
    },
    keywords: {
      en: ["image converter", "jpg to png", "png to webp", "convert image format", "webp converter"],
      zh: ["图片格式转换", "jpg转png", "png转webp", "图片转换", "格式转换工具"],
      ja: ["画像変換", "JPGをPNGに変換", "PNGをWebPに変換", "画像フォーマット変換", "WebP変換"],
    },
  },
  {
    slug: "word-counter",
    category: "text",
    icon: "📝",
    name: { en: "Word Counter", zh: "字数统计", ja: "文字数カウント" },
    description: {
      en: "Count words, characters, sentences, paragraphs and reading time instantly. Supports mixed Chinese and English text.",
      zh: "在线文字统计工具，实时统计字数、字符数、段落数、句子数，支持中英文混合统计。",
      ja: "単語数・文字数・文章数・段落数・読了時間を即座にカウント。日英混合テキストに対応。",
    },
    keywords: {
      en: ["word counter", "character counter", "word count tool", "text analyzer", "reading time calculator"],
      zh: ["字数统计", "字符统计", "文字计数", "在线字数统计", "阅读时间计算"],
      ja: ["文字数カウント", "単語数カウント", "テキスト解析", "読了時間計算", "文字数統計"],
    },
  },
  {
    slug: "password-generator",
    category: "text",
    icon: "🔐",
    name: { en: "Password Generator", zh: "密码生成器", ja: "パスワード生成" },
    description: {
      en: "Generate strong, secure random passwords using crypto.getRandomValues(). Customize length and character types.",
      zh: "安全随机密码生成器，自定义长度、字符类型，使用加密随机数生成强密码保护账户安全。",
      ja: "crypto.getRandomValues()を使った強力なランダムパスワード生成。長さや文字種をカスタマイズできます。",
    },
    keywords: {
      en: ["password generator", "strong password", "random password", "secure password maker", "password creator"],
      zh: ["密码生成器", "随机密码", "强密码生成", "安全密码", "在线密码生成"],
      ja: ["パスワード生成", "強力なパスワード", "ランダムパスワード", "安全なパスワード", "パスワード作成"],
    },
  },
  {
    slug: "case-converter",
    category: "text",
    icon: "🔤",
    name: { en: "Case Converter", zh: "大小写转换", ja: "大文字・小文字変換" },
    description: {
      en: "Convert text between UPPER CASE, lower case, Title Case, camelCase, snake_case, kebab-case and more.",
      zh: "文本大小写转换工具，支持全大写、全小写、首字母大写、驼峰命名、下划线命名等多种格式。",
      ja: "大文字・小文字・タイトルケース・キャメルケース・スネークケース・ケバブケースなどに一括変換。",
    },
    keywords: {
      en: ["case converter", "uppercase converter", "camelcase converter", "snake case", "text case changer"],
      zh: ["大小写转换", "驼峰命名转换", "snake_case转换", "文字格式转换", "kebab-case"],
      ja: ["大文字小文字変換", "キャメルケース変換", "スネークケース", "テキスト変換", "ケバブケース"],
    },
  },
  {
    slug: "unit-converter",
    category: "life",
    icon: "📐",
    name: { en: "Unit Converter", zh: "单位换算", ja: "単位変換" },
    description: {
      en: "Convert units of length, weight, temperature, and area. Fast and accurate conversions with one click.",
      zh: "全能单位换算工具，支持长度、重量、温度、面积等多种单位之间的快速换算。",
      ja: "長さ・重さ・温度・面積などの単位を素早く正確に変換。ワンクリックで完了。",
    },
    keywords: {
      en: ["unit converter", "length converter", "weight converter", "temperature converter", "area converter"],
      zh: ["单位换算", "长度换算", "重量换算", "温度转换", "面积换算"],
      ja: ["単位変換", "長さ変換", "重さ変換", "温度変換", "面積変換"],
    },
  },
  {
    slug: "bmi-calculator",
    category: "life",
    icon: "⚖️",
    name: { en: "BMI Calculator", zh: "BMI 计算器", ja: "BMI計算機" },
    description: {
      en: "Calculate your Body Mass Index (BMI) with metric or imperial units. Get instant health category results.",
      zh: "免费 BMI 身体质量指数计算器，支持公制/英制单位，输入身高体重即可计算并给出健康建议。",
      ja: "メートル法またはヤード・ポンド法でBMIを計算。即座に健康カテゴリの結果を表示します。",
    },
    keywords: {
      en: ["bmi calculator", "body mass index", "bmi chart", "healthy weight calculator", "obesity calculator"],
      zh: ["bmi计算器", "身体质量指数", "体重指数计算", "健康体重", "bmi标准"],
      ja: ["BMI計算機", "体格指数", "BMIチャート", "適正体重計算", "肥満度計算"],
    },
  },
  {
    slug: "age-calculator",
    category: "life",
    icon: "🎂",
    name: { en: "Age Calculator", zh: "年龄计算器", ja: "年齢計算機" },
    description: {
      en: "Calculate exact age in years, months, and days. Find days until next birthday and total days lived.",
      zh: "精确年龄计算器，根据出生日期计算精确年龄（年/月/日），还可计算距生日剩余天数。",
      ja: "年・月・日単位で正確な年齢を計算。次の誕生日までの日数と総日数も表示します。",
    },
    keywords: {
      en: ["age calculator", "birthday calculator", "how old am i", "exact age calculator", "date difference"],
      zh: ["年龄计算器", "生日计算", "出生日期计算", "年龄查询", "日期差计算"],
      ja: ["年齢計算機", "誕生日計算", "何歳かを計算", "正確な年齢計算", "日付差計算"],
    },
  },
  {
    slug: "youtube-thumbnail",
    category: "media",
    icon: "🎬",
    name: { en: "YouTube Thumbnail Downloader", zh: "YouTube 缩略图下载", ja: "YouTubeサムネイルダウンロード" },
    description: {
      en: "Download YouTube video thumbnails in all available resolutions including 1280×720 max quality. No login needed.",
      zh: "免费 YouTube 视频缩略图下载工具，支持最高画质 1280x720，支持所有链接格式，无需登录。",
      ja: "1280×720の最高画質を含む全解像度でYouTubeサムネイルをダウンロード。ログイン不要。",
    },
    keywords: {
      en: ["youtube thumbnail downloader", "youtube thumbnail", "download youtube thumbnail", "yt thumbnail", "video thumbnail"],
      zh: ["youtube缩略图下载", "youtube封面下载", "视频封面下载", "yt缩略图", "油管缩略图"],
      ja: ["YouTubeサムネイルダウンロード", "YouTubeサムネイル", "YouTube画像保存", "YTサムネイル", "動画サムネイル"],
    },
  },
  // New tools
  {
    slug: "pdf-merger",
    category: "file",
    icon: "📄",
    name: { en: "PDF Merger", zh: "PDF 合并", ja: "PDF結合" },
    description: {
      en: "Merge multiple PDF files into one document. Fast, free, and processed entirely in your browser.",
      zh: "在线 PDF 合并工具，将多个 PDF 文件合并为一个文档，本地处理，隐私安全。",
      ja: "複数のPDFファイルを一つに結合。高速・無料・ブラウザ内で完全処理。",
    },
    keywords: {
      en: ["pdf merger", "merge pdf", "combine pdf", "join pdf files", "pdf combiner"],
      zh: ["pdf合并", "合并pdf", "pdf合并工具", "pdf文件合并", "在线pdf合并"],
      ja: ["PDF結合", "PDFをまとめる", "PDF合体", "PDFファイル結合", "PDF結合ツール"],
    },
  },
  {
    slug: "pdf-splitter",
    category: "file",
    icon: "✂️",
    name: { en: "PDF Splitter", zh: "PDF 分割", ja: "PDF分割" },
    description: {
      en: "Split a PDF into individual pages or extract specific page ranges. No upload required.",
      zh: "在线 PDF 分割工具，将 PDF 拆分为单页或提取指定页码范围，无需上传服务器。",
      ja: "PDFを個別ページに分割したり、特定のページ範囲を抽出。アップロード不要。",
    },
    keywords: {
      en: ["pdf splitter", "split pdf", "extract pdf pages", "pdf page extractor", "divide pdf"],
      zh: ["pdf分割", "分割pdf", "pdf页面提取", "pdf拆分", "pdf分页"],
      ja: ["PDF分割", "PDFを分ける", "PDFページ抽出", "PDF分割ツール", "PDFページ分割"],
    },
  },
  {
    slug: "image-to-pdf",
    category: "file",
    icon: "🖼️",
    name: { en: "Image to PDF", zh: "图片转 PDF", ja: "画像をPDFに変換" },
    description: {
      en: "Convert JPG, PNG, and other images to a PDF file. Supports multiple images in one PDF.",
      zh: "将 JPG、PNG 等图片转换为 PDF 文件，支持多张图片合并为一个 PDF，本地处理。",
      ja: "JPG・PNGなどの画像をPDFに変換。複数画像を1つのPDFにまとめることも可能。",
    },
    keywords: {
      en: ["image to pdf", "jpg to pdf", "png to pdf", "convert image to pdf", "photo to pdf"],
      zh: ["图片转pdf", "jpg转pdf", "png转pdf", "图片转文档", "照片转pdf"],
      ja: ["画像をPDFに変換", "JPGをPDFに", "PNGをPDFに", "写真PDF変換", "画像PDF変換"],
    },
  },
  {
    slug: "markdown-to-html",
    category: "text",
    icon: "📋",
    name: { en: "Markdown to HTML", zh: "Markdown 转 HTML", ja: "MarkdownをHTMLに変換" },
    description: {
      en: "Convert Markdown text to HTML instantly. Preview rendered output and copy the HTML code.",
      zh: "在线 Markdown 转 HTML 工具，实时预览渲染效果，一键复制 HTML 代码。",
      ja: "MarkdownテキストをHTMLに即座に変換。レンダリング結果をプレビューし、HTMLコードをコピーできます。",
    },
    keywords: {
      en: ["markdown to html", "markdown converter", "markdown editor", "md to html", "markdown preview"],
      zh: ["markdown转html", "markdown编辑器", "markdown预览", "md转html", "markdown转换"],
      ja: ["MarkdownをHTMLに変換", "Markdownコンバーター", "Markdownエディタ", "MDをHTMLに", "Markdownプレビュー"],
    },
  },
  {
    slug: "json-formatter",
    category: "text",
    icon: "🔧",
    name: { en: "JSON Formatter", zh: "JSON 格式化", ja: "JSONフォーマッター" },
    description: {
      en: "Format, validate and minify JSON data. Instantly pretty-print or compress JSON with syntax highlighting.",
      zh: "在线 JSON 格式化工具，支持美化、压缩和验证 JSON 数据，语法高亮显示。",
      ja: "JSONデータを整形・検証・最小化。シンタックスハイライト付きで即座に整形または圧縮できます。",
    },
    keywords: {
      en: ["json formatter", "json beautifier", "json validator", "json minifier", "format json"],
      zh: ["json格式化", "json美化", "json验证", "json压缩", "在线json工具"],
      ja: ["JSONフォーマット", "JSON整形", "JSON検証", "JSON圧縮", "JSONツール"],
    },
  },
  {
    slug: "base64-encoder",
    category: "text",
    icon: "🔑",
    name: { en: "Base64 Encoder/Decoder", zh: "Base64 编码/解码", ja: "Base64エンコード/デコード" },
    description: {
      en: "Encode or decode Base64 strings instantly. Supports UTF-8 text and file encoding.",
      zh: "在线 Base64 编码解码工具，支持 UTF-8 文本和文件的编码与解码，快速便捷。",
      ja: "Base64文字列を即座にエンコード・デコード。UTF-8テキストとファイルのエンコードに対応。",
    },
    keywords: {
      en: ["base64 encoder", "base64 decoder", "encode base64", "decode base64", "base64 converter"],
      zh: ["base64编码", "base64解码", "base64转换", "在线base64", "base64工具"],
      ja: ["Base64エンコード", "Base64デコード", "Base64変換", "オンラインBase64", "Base64ツール"],
    },
  },
  {
    slug: "hash-generator",
    category: "text",
    icon: "🔒",
    name: { en: "Hash Generator", zh: "哈希生成器", ja: "ハッシュ生成" },
    description: {
      en: "Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from any text. Instantly computed in your browser.",
      zh: "在线哈希生成器，支持 MD5、SHA-1、SHA-256、SHA-512，浏览器本地计算，安全快速。",
      ja: "テキストからMD5・SHA-1・SHA-256・SHA-512ハッシュを生成。ブラウザ内で即座に計算。",
    },
    keywords: {
      en: ["hash generator", "md5 generator", "sha256 generator", "sha1 hash", "checksum calculator"],
      zh: ["哈希生成器", "md5生成", "sha256生成", "sha1哈希", "校验和计算"],
      ja: ["ハッシュ生成", "MD5生成", "SHA256生成", "SHA1ハッシュ", "チェックサム計算"],
    },
  },
  {
    slug: "color-picker",
    category: "design",
    icon: "🎨",
    name: { en: "Color Picker", zh: "颜色选择器", ja: "カラーピッカー" },
    description: {
      en: "Pick colors and get HEX, RGB, and HSL values instantly. Perfect for web design and development.",
      zh: "在线颜色选择器，即时获取 HEX、RGB、HSL 颜色值，适合网页设计和开发使用。",
      ja: "色を選択してHEX・RGB・HSL値を即座に取得。Webデザインや開発に最適。",
    },
    keywords: {
      en: ["color picker", "hex color picker", "rgb color picker", "color converter", "color palette"],
      zh: ["颜色选择器", "hex颜色", "rgb颜色", "颜色转换", "取色器"],
      ja: ["カラーピッカー", "HEXカラー", "RGBカラー", "カラー変換", "色選択ツール"],
    },
  },
  {
    slug: "loan-calculator",
    category: "life",
    icon: "🏦",
    name: { en: "Loan Calculator", zh: "贷款计算器", ja: "ローン計算機" },
    description: {
      en: "Calculate monthly loan payments, total interest, and amortization schedule for any loan.",
      zh: "在线贷款计算器，快速计算月还款额、总利息和还款计划，支持各类贷款。",
      ja: "月々の返済額・総利息・返済スケジュールを計算。あらゆるローンに対応。",
    },
    keywords: {
      en: ["loan calculator", "mortgage calculator", "monthly payment calculator", "interest calculator", "amortization calculator"],
      zh: ["贷款计算器", "房贷计算器", "月还款计算", "利息计算器", "还款计划"],
      ja: ["ローン計算機", "住宅ローン計算機", "月返済額計算", "利息計算機", "返済スケジュール"],
    },
  },
  {
    slug: "random-number",
    category: "life",
    icon: "🎲",
    name: { en: "Random Number Generator", zh: "随机数生成器", ja: "乱数生成" },
    description: {
      en: "Generate random numbers within any range. Supports multiple numbers, unique values, and custom ranges.",
      zh: "在线随机数生成器，支持自定义范围、生成多个数字、保证唯一值等功能。",
      ja: "任意の範囲で乱数を生成。複数の数値・ユニーク値・カスタム範囲に対応。",
    },
    keywords: {
      en: ["random number generator", "random number picker", "dice roller", "lottery number generator", "random picker"],
      zh: ["随机数生成器", "随机数字", "骰子模拟器", "彩票号码生成", "随机选择器"],
      ja: ["乱数生成", "ランダム数字", "サイコロシミュレーター", "宝くじ番号生成", "ランダム選択"],
    },
  },
  {
    slug: "text-cleaner",
    category: "text",
    icon: "🧹",
    name: { en: "Text Cleaner", zh: "文本清理器", ja: "テキストクリーナー" },
    description: {
      en: "Remove extra spaces, line breaks, special characters, and format text quickly. Multiple cleaning options.",
      zh: "在线文本清理工具，快速删除多余空格、换行符、特殊字符，提供多种文本格式化选项。",
      ja: "余分なスペース・改行・特殊文字を素早く除去してテキストを整形。多様なクリーニングオプション。",
    },
    keywords: {
      en: ["text cleaner", "remove extra spaces", "text formatter", "clean text", "strip whitespace"],
      zh: ["文本清理", "删除空格", "文本格式化", "清理文本", "去除空白"],
      ja: ["テキストクリーナー", "余分なスペース削除", "テキスト整形", "テキスト清書", "空白除去"],
    },
  },
  {
    slug: "countdown-timer",
    category: "life",
    icon: "⏱️",
    name: { en: "Countdown Timer", zh: "倒计时器", ja: "カウントダウンタイマー" },
    description: {
      en: "Set a countdown timer for any duration. Plays an alert sound when time is up. Simple and distraction-free.",
      zh: "在线倒计时器，支持自定义时长，时间结束时发出提示音，界面简洁无干扰。",
      ja: "任意の時間でカウントダウンタイマーを設定。時間になるとアラートを再生。シンプルで集中できる。",
    },
    keywords: {
      en: ["countdown timer", "online timer", "kitchen timer", "pomodoro timer", "egg timer"],
      zh: ["倒计时器", "在线计时器", "番茄钟", "厨房计时器", "倒数计时"],
      ja: ["カウントダウンタイマー", "オンラインタイマー", "キッチンタイマー", "ポモドーロタイマー", "タイマー"],
    },
  },
];

export const categoryOrder = ["image", "text", "life", "media", "file", "design"] as const;

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: Category): Tool[] {
  return tools.filter((t) => t.category === category);
}
