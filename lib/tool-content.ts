export interface HowToStep {
  title: string;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ToolContent {
  howTo: {
    intro: string;
    steps: HowToStep[];
  };
  faqs: FAQ[];
}

export const toolContent: Record<string, ToolContent> = {
  "qr-code-generator": {
    howTo: {
      intro:
        "A QR code (Quick Response code) is a two-dimensional barcode that can store a wide variety of information including URLs, plain text, contact details, Wi-Fi credentials, and more. Our free QR Code Generator creates high-resolution QR codes instantly in your browser — no account required, no watermarks, and no data sent to any server. The generated QR code can be downloaded as a transparent PNG and used anywhere: product packaging, business cards, posters, presentations, or digital content. QR codes are readable by virtually any smartphone camera app, making them a universally accepted bridge between physical and digital worlds.",
      steps: [
        { title: "Enter your content", description: "Type or paste the text, URL, or data you want to encode into the input field." },
        { title: "Customize (optional)", description: "Adjust the error correction level or size if needed for your use case." },
        { title: "Download", description: "Click the Download button to save the QR code as a high-resolution PNG image." },
      ],
    },
    faqs: [
      { question: "What types of content can I encode in a QR code?", answer: "You can encode URLs, plain text, email addresses, phone numbers, SMS messages, Wi-Fi credentials, vCards, and more." },
      { question: "How large should a QR code be to scan reliably?", answer: "As a rule of thumb, the QR code should be at least 1 cm × 1 cm for every 10 cm of scanning distance. For most print uses, 2.5 cm × 2.5 cm is a safe minimum." },
      { question: "Is the generated QR code permanent?", answer: "Yes. Since the data is encoded directly into the image, the QR code works forever as long as the destination URL or content is still accessible." },
    ],
  },

  "image-compressor": {
    howTo: {
      intro:
        "Large images slow down websites, consume storage space, and make sharing files by email or messaging apps frustrating. Our Image Compressor reduces file sizes by up to 90% while preserving visual quality — all processed locally in your browser using the browser-image-compression library. No files are ever uploaded to a server, keeping your images completely private. It supports JPEG, PNG, and WebP formats. Compressed images load faster in browsers, improving page speed scores and user experience. Whether you're a web developer optimizing assets, a blogger preparing images for posts, or someone trying to reduce an email attachment, this tool delivers results in seconds.",
      steps: [
        { title: "Select an image", description: "Click the upload area or drag and drop a JPG, PNG, or WebP image file." },
        { title: "Adjust quality", description: "Use the quality slider to balance between file size and visual fidelity." },
        { title: "Download", description: "Click Download to save the compressed image. The size reduction is shown before downloading." },
      ],
    },
    faqs: [
      { question: "Will compression make my image look blurry?", answer: "At quality settings of 70–85%, compression is nearly imperceptible. Lower settings produce smaller files but may show artifacts, especially in high-detail areas." },
      { question: "Does it support PNG transparency?", answer: "Yes. PNG files with transparent backgrounds are supported and transparency is preserved after compression." },
      { question: "Is there a file size limit?", answer: "There's no hard server-side limit since processing is local. Very large files (50 MB+) may be slower due to browser memory constraints." },
    ],
  },

  "image-converter": {
    howTo: {
      intro:
        "Different image formats serve different purposes: JPEG is great for photographs with small file sizes, PNG preserves transparency and sharp edges, WebP offers the best compression for the web, and BMP is an uncompressed format used by some legacy applications. Our Image Converter lets you switch between these formats instantly using the Canvas API — entirely in your browser, with no server upload. Whether you need to convert a PNG to JPEG to reduce size, a WebP to PNG for compatibility, or any other combination, this tool handles it in seconds and lets you download the result immediately.",
      steps: [
        { title: "Upload your image", description: "Click to select or drag and drop an image file in any supported format." },
        { title: "Choose output format", description: "Select the target format: JPG, PNG, WebP, or BMP." },
        { title: "Convert and download", description: "Click Convert and download your newly formatted image." },
      ],
    },
    faqs: [
      { question: "Does converting to JPEG remove transparency?", answer: "Yes. JPEG does not support transparency. Transparent areas are typically filled with a white background when converting to JPEG." },
      { question: "Which format is best for web use?", answer: "WebP generally offers the best combination of quality and file size for web images. JPG is widely supported as a fallback." },
      { question: "Does conversion affect image dimensions?", answer: "No. The converted image retains the same pixel dimensions as the original. Only the format changes." },
    ],
  },

  "word-counter": {
    howTo: {
      intro:
        "Whether you're writing an essay with a maximum word limit, crafting an SEO-optimized article that needs a specific length, or checking how long it will take to read a blog post, our Word Counter gives you instant, accurate statistics. It counts words, characters (with and without spaces), sentences, paragraphs, and estimates reading time — all updating in real time as you type or paste text. It handles mixed Chinese and English content correctly, recognizing Chinese characters as individual words. There's no character limit on the input.",
      steps: [
        { title: "Paste or type your text", description: "Enter your content in the text area. Statistics update instantly." },
        { title: "Review the counts", description: "Check the word count, character count, sentences, paragraphs, and reading time." },
        { title: "Copy or clear", description: "Use the Copy button to copy the text, or Clear to start fresh." },
      ],
    },
    faqs: [
      { question: "How is reading time calculated?", answer: "Reading time is estimated at approximately 200–250 words per minute for English text and 300 characters per minute for Chinese text." },
      { question: "Does it count Chinese characters as words?", answer: "Yes. Each Chinese character is counted as one word, which reflects how character-based languages are typically measured." },
      { question: "Is there a word or character limit?", answer: "No. You can paste an entire book if needed. Processing happens locally in your browser." },
    ],
  },

  "password-generator": {
    howTo: {
      intro:
        "A strong password is your first line of defense against unauthorized access. Our Password Generator uses the Web Crypto API's `crypto.getRandomValues()` function — the same cryptographically secure random number generator used in security-sensitive applications — to create unpredictable, high-entropy passwords. You can customize the length (8–128 characters) and choose which character sets to include: uppercase letters, lowercase letters, digits, and special symbols. Generated passwords are never transmitted or stored anywhere. You can generate as many passwords as you need with a single click.",
      steps: [
        { title: "Set the length", description: "Use the slider to choose how many characters your password should have (8–128)." },
        { title: "Select character types", description: "Check or uncheck uppercase, lowercase, numbers, and symbols to match your requirements." },
        { title: "Generate and copy", description: "Click Generate to create a new password, then click Copy to copy it to your clipboard." },
      ],
    },
    faqs: [
      { question: "Are the generated passwords truly random?", answer: "Yes. They use crypto.getRandomValues(), which is a cryptographically secure pseudo-random number generator (CSPRNG) built into modern browsers." },
      { question: "How long should a secure password be?", answer: "A minimum of 16 characters is recommended for most accounts. For critical accounts, use 24+ characters with all character types enabled." },
      { question: "Are passwords stored anywhere?", answer: "No. Passwords are generated entirely in your browser and are never transmitted to any server." },
    ],
  },

  "case-converter": {
    howTo: {
      intro:
        "When working with text, code, or data, you often need to convert between different capitalization styles. Developers need camelCase for JavaScript variables, snake_case for Python, and kebab-case for CSS. Writers need Title Case for headings and UPPERCASE for acronyms. Our Case Converter handles all of these transformations instantly. Just paste your text and click the desired conversion format. The tool processes the entire input in one click, no matter how long the text is.",
      steps: [
        { title: "Paste your text", description: "Enter the text you want to convert in the input area." },
        { title: "Choose a format", description: "Click one of the format buttons: UPPER CASE, lower case, Title Case, camelCase, snake_case, kebab-case, or others." },
        { title: "Copy the result", description: "The converted text appears instantly. Copy it with one click." },
      ],
    },
    faqs: [
      { question: "What is camelCase used for?", answer: "camelCase (e.g., myVariableName) is commonly used for JavaScript and TypeScript variable and function names." },
      { question: "What is snake_case used for?", answer: "snake_case (e.g., my_variable_name) is standard in Python, Ruby, and database column names." },
      { question: "Does it preserve numbers and special characters?", answer: "Yes. Numbers and most special characters are preserved as-is during conversion. Only the letter casing changes." },
    ],
  },

  "unit-converter": {
    howTo: {
      intro:
        "Unit conversion is a daily necessity in science, engineering, cooking, travel, and everyday life. Our Unit Converter covers the most commonly needed conversions: length (meters, feet, inches, miles, kilometers), weight (kilograms, pounds, ounces, grams), temperature (Celsius, Fahrenheit, Kelvin), and area (square meters, square feet, acres, hectares). Simply enter a value, select the unit categories, and all conversions are displayed instantly. The tool is ideal for students, engineers, travelers, and anyone who needs quick, accurate unit conversions.",
      steps: [
        { title: "Select a category", description: "Choose the type of unit you want to convert: Length, Weight, Temperature, or Area." },
        { title: "Enter a value", description: "Type the number you want to convert in the input field." },
        { title: "View all conversions", description: "All converted values appear instantly across all units in that category." },
      ],
    },
    faqs: [
      { question: "How accurate are the conversions?", answer: "The tool uses standard scientific conversion factors and displays results to several decimal places, making it suitable for most practical purposes." },
      { question: "Can I convert temperature from Fahrenheit to Celsius?", answer: "Yes. Temperature conversions use the proper formulas: °C = (°F − 32) × 5/9 and °K = °C + 273.15." },
      { question: "Are imperial and metric units both supported?", answer: "Yes. Both imperial (US/UK) and metric (SI) units are fully supported across all categories." },
    ],
  },

  "bmi-calculator": {
    howTo: {
      intro:
        "Body Mass Index (BMI) is a widely used screening tool to categorize weight relative to height. Our BMI Calculator supports both metric (kg and cm) and imperial (lbs and inches) units. After entering your height and weight, the tool calculates your BMI and classifies it according to WHO guidelines: Underweight (below 18.5), Normal weight (18.5–24.9), Overweight (25–29.9), and Obese (30 and above). Note that BMI is a general indicator and does not account for muscle mass, bone density, age, or other factors. Consult a healthcare professional for a comprehensive health assessment.",
      steps: [
        { title: "Select unit system", description: "Choose between Metric (kg/cm) or Imperial (lbs/inches)." },
        { title: "Enter your measurements", description: "Input your height and weight in the appropriate fields." },
        { title: "View your result", description: "Your BMI score and health category are displayed instantly with a color-coded indicator." },
      ],
    },
    faqs: [
      { question: "Is BMI accurate for athletes?", answer: "BMI can overestimate body fat in athletes with high muscle mass and underestimate it in older adults who have lost muscle. It's best used alongside other health metrics." },
      { question: "What is a healthy BMI range?", answer: "According to the WHO, a BMI of 18.5–24.9 is considered normal/healthy for adults." },
      { question: "Is my data stored?", answer: "No. All calculations are done locally in your browser. No personal health data is collected or transmitted." },
    ],
  },

  "age-calculator": {
    howTo: {
      intro:
        "Our Age Calculator computes your exact age in years, months, and days based on your date of birth and a comparison date (defaulting to today). It also shows how many days remain until your next birthday and the total number of days you've been alive. This is useful for verifying ages for legal documents, calculating experience durations, or simply satisfying curiosity. The calculation accounts for leap years and the varying lengths of calendar months, ensuring precise results every time.",
      steps: [
        { title: "Enter your birth date", description: "Use the date picker to select your date of birth." },
        { title: "Set comparison date", description: "The comparison date defaults to today, but you can change it to calculate age at any point in time." },
        { title: "View results", description: "Your exact age in years, months, and days is displayed along with days until your next birthday." },
      ],
    },
    faqs: [
      { question: "Does it account for leap years?", answer: "Yes. The calculator correctly handles leap years (February 29) when computing exact ages and remaining days." },
      { question: "Can I calculate someone else's age?", answer: "Absolutely. Just enter any birth date and comparison date to calculate the age for any person or date range." },
      { question: "What is the total days count used for?", answer: "The total days lived is a fun statistic and can be useful for milestone calculations or actuarial estimations." },
    ],
  },

  "youtube-thumbnail": {
    howTo: {
      intro:
        "YouTube thumbnail images are used as preview images for videos and are often used in content creation, presentations, social media posts, or research. Our YouTube Thumbnail Downloader extracts the thumbnail URL from any valid YouTube video link (including youtube.com/watch, youtu.be short links, and embed URLs) and displays all available resolutions: maximum resolution (1280×720), high quality (480×360), medium quality (320×180), and standard quality (120×90). You can download any resolution with a single click. No login or API key is required.",
      steps: [
        { title: "Copy the YouTube video URL", description: "Copy the link from your browser's address bar or the share button on YouTube." },
        { title: "Paste the URL", description: "Paste the YouTube video URL into the input field on this page." },
        { title: "Select and download", description: "Choose your preferred resolution and click the Download button to save the thumbnail." },
      ],
    },
    faqs: [
      { question: "What URL formats are supported?", answer: "The tool supports youtube.com/watch?v=..., youtu.be/..., youtube.com/embed/..., and youtube.com/shorts/... formats." },
      { question: "Why is the maximum resolution thumbnail sometimes missing?", answer: "Not all videos have a 1280×720 (maxresdefault) thumbnail. In that case, hqdefault (480×360) is the highest available." },
      { question: "Can I use downloaded thumbnails commercially?", answer: "Thumbnails are subject to YouTube's and the creator's copyright. Always check licensing before using thumbnails for commercial purposes." },
    ],
  },

  "pdf-merger": {
    howTo: {
      intro:
        "Combining multiple PDF files into one cohesive document is a common task for professionals, students, and businesses alike. You might need to merge separate invoice pages, combine chapter drafts into a manuscript, join scanned document pages, or consolidate multiple reports into a single file for easy distribution. Our PDF Merger tool handles all of this entirely within your web browser using the pdf-lib JavaScript library — meaning your files are never uploaded to any server, ensuring complete privacy and security. There are no file size limits imposed by a backend, and the merge operation preserves all original text, images, fonts, and formatting from each source PDF. You can add as many PDFs as needed, reorder them with the arrow buttons, and remove any file you accidentally added before merging. The resulting combined PDF is downloaded directly to your device.",
      steps: [
        { title: "Add your PDF files", description: "Click the upload area to select multiple PDF files. You can also add them one at a time." },
        { title: "Reorder if needed", description: "Use the ▲ and ▼ arrow buttons next to each file to arrange them in the correct order." },
        { title: "Merge and download", description: "Click the Merge button. The combined PDF will be automatically downloaded to your device." },
      ],
    },
    faqs: [
      { question: "Is there a limit to how many PDFs I can merge?", answer: "There is no strict limit. You can merge as many PDFs as your browser can hold in memory. For very large collections of files, processing may take a few seconds." },
      { question: "Are my files uploaded to a server?", answer: "No. All merging is done locally in your browser using JavaScript. Your files never leave your device, ensuring complete privacy." },
      { question: "Will the merge reduce image or text quality in my PDFs?", answer: "No. The tool copies pages directly between PDF documents without re-encoding content, so quality is fully preserved." },
    ],
  },

  "pdf-splitter": {
    howTo: {
      intro:
        "Sometimes you have a large PDF document and only need a specific section — a single contract page, a particular chapter, or a set of slides. Our PDF Splitter allows you to either split a PDF into individual single-page files or extract a custom range of pages into a new PDF. The operation is performed entirely in your browser using pdf-lib, so no files are uploaded anywhere. You can specify page ranges using a flexible notation: enter single pages (e.g., \"5\"), ranges (e.g., \"3-7\"), or combinations (e.g., \"1, 3-5, 8\"). This makes it easy to extract exactly the content you need without any unnecessary pages.",
      steps: [
        { title: "Upload your PDF", description: "Click the upload area and select the PDF file you want to split. The total page count is displayed automatically." },
        { title: "Choose split mode", description: "Either check 'Split into individual pages' to get one PDF per page, or enter a page range to extract specific pages." },
        { title: "Split and download", description: "Click the Split or Extract button. If splitting into pages, each page downloads as a separate file." },
      ],
    },
    faqs: [
      { question: "How do I specify a page range?", answer: "Use commas to separate pages/ranges. For example: '1, 3-5, 8' extracts pages 1, 3, 4, 5, and 8 into a single PDF." },
      { question: "Can I split a PDF into individual pages?", answer: "Yes. Check the 'Split into individual pages' option and each page will be downloaded as a separate PDF file." },
      { question: "Are my PDF files kept private?", answer: "Yes. All processing is done locally in your browser. Your documents are never sent to any server." },
    ],
  },

  "image-to-pdf": {
    howTo: {
      intro:
        "Converting images to PDF is useful for creating portfolios, compiling photo collections, submitting image-based documents in a universally accepted format, and archiving pictures in a single file. Our Image to PDF converter supports JPG, PNG, WebP, and GIF formats, and allows you to add multiple images that each become a separate page in the resulting PDF. The page dimensions automatically match each image's resolution, so no cropping or stretching occurs. The entire conversion process happens locally in your browser using pdf-lib, ensuring that your photos and documents remain private. Simply add your images, arrange them in the desired order, and download the PDF with a single click.",
      steps: [
        { title: "Add your images", description: "Click the upload area to select one or more image files (JPG, PNG, WebP, or GIF)." },
        { title: "Reorder the images", description: "Use the ▲ and ▼ buttons to arrange images in the order they should appear as pages in the PDF." },
        { title: "Convert and download", description: "Click the Convert button. A PDF with one image per page will be downloaded to your device." },
      ],
    },
    faqs: [
      { question: "How many images can I convert at once?", answer: "You can add as many images as needed. Each image becomes one page in the PDF. For very large images, processing may take a moment." },
      { question: "Does the tool support transparent PNG images?", answer: "Yes, PNG transparency is supported. Transparent areas will appear as white in the resulting PDF." },
      { question: "Are my images uploaded to a server?", answer: "No. All conversion happens locally in your browser. Your images are never transmitted to any external server." },
    ],
  },

  "markdown-to-html": {
    howTo: {
      intro:
        "Markdown is a lightweight markup language that lets you write formatted text using plain text syntax, widely used in README files, documentation, blogging platforms, and static site generators. Our Markdown to HTML converter uses the 'marked' library to instantly parse Markdown and generate valid HTML. You can see a live rendered preview of your Markdown or switch to view the raw HTML output for use in your code. This is ideal for blog writers, technical writers, developers, and anyone who writes content in Markdown and needs the HTML equivalent. The converter handles all standard Markdown syntax including headings, bold, italic, links, images, code blocks, tables, and blockquotes.",
      steps: [
        { title: "Write or paste your Markdown", description: "Enter your Markdown content in the left panel. The preview updates in real time." },
        { title: "Switch between Preview and HTML views", description: "Click 'Preview' to see the rendered output, or 'HTML' to view the generated HTML source code." },
        { title: "Copy the HTML", description: "Click 'Copy HTML' to copy the generated HTML to your clipboard for use in your project." },
      ],
    },
    faqs: [
      { question: "What Markdown features are supported?", answer: "The tool supports all standard CommonMark Markdown: headings (#), bold (**), italic (*), links, images, unordered and ordered lists, code blocks, tables, and blockquotes." },
      { question: "Does it sanitize the HTML output?", answer: "The converter outputs the HTML as generated by the marked library. For user-generated content in web applications, you should additionally sanitize the HTML using a library like DOMPurify before rendering." },
      { question: "Can I use the output in any CMS or website builder?", answer: "Yes. The generated HTML is standard and compatible with any CMS, website builder, or HTML page that accepts HTML input." },
    ],
  },

  "json-formatter": {
    howTo: {
      intro:
        "JSON (JavaScript Object Notation) is the most widely used data interchange format in modern web development, APIs, and configuration files. Reading minified or poorly formatted JSON can be challenging without proper indentation. Our JSON Formatter instantly beautifies compact JSON into human-readable, indented format, making it easy to inspect, debug, and understand. It also validates JSON and reports syntax errors with specific details when your JSON is malformed. Additionally, it can minify JSON by removing all whitespace, which is useful for reducing payload sizes in API requests and responses. Choose between 2-space or 4-space indentation based on your preference.",
      steps: [
        { title: "Paste your JSON", description: "Copy and paste your JSON data into the left input panel." },
        { title: "Click Format or Minify", description: "Click 'Format' to beautify with indentation, or 'Minify' to compress. 'Validate' checks syntax without transforming." },
        { title: "Copy the result", description: "The formatted or minified JSON appears in the right panel. Click Copy to use it." },
      ],
    },
    faqs: [
      { question: "What happens when my JSON has errors?", answer: "The validator reports the exact error message from the JSON parser, including details that help you locate the syntax mistake." },
      { question: "Does it support large JSON files?", answer: "Yes. Since processing is done in the browser with JavaScript's native JSON parser, it can handle large payloads efficiently." },
      { question: "Can I format JSON with comments (JSONC)?", answer: "Standard JSON does not allow comments. If your JSON contains comments, they must be removed before formatting." },
    ],
  },

  "base64-encoder": {
    howTo: {
      intro:
        "Base64 is an encoding scheme that converts binary data into a text string using 64 ASCII characters, commonly used to transmit binary data (like images or files) over text-based protocols such as email (MIME) or JSON APIs. Our Base64 Encoder/Decoder supports both directions: encoding text or binary files to Base64, and decoding Base64 strings back to readable text. UTF-8 text is fully supported, so non-ASCII characters (including Chinese, Japanese, Arabic, and emoji) are correctly encoded and decoded. You can also encode an entire file to Base64 — useful for embedding images directly in HTML or CSS using data URIs.",
      steps: [
        { title: "Select Encode or Decode mode", description: "Click 'Encode' to convert text or a file to Base64, or 'Decode' to convert a Base64 string back to text." },
        { title: "Enter your content", description: "Type or paste text to encode/decode, or enable 'File to Base64' mode and select a file." },
        { title: "Get the result", description: "Click the action button to see the encoded or decoded output, then copy it with one click." },
      ],
    },
    faqs: [
      { question: "Does Base64 encoding encrypt my data?", answer: "No. Base64 is an encoding scheme, not encryption. Anyone can decode a Base64 string without a key. Do not use it to protect sensitive information." },
      { question: "Why does the encoded string end with '=' signs?", answer: "The '=' characters are padding added to make the Base64 string length a multiple of 4, which is required by the Base64 specification." },
      { question: "How much larger does Base64 make a file?", answer: "Base64 encoding increases the data size by approximately 33%, because it uses 4 characters to represent every 3 bytes of binary data." },
    ],
  },

  "hash-generator": {
    howTo: {
      intro:
        "Cryptographic hash functions convert input data of any size into a fixed-length string of characters called a hash or digest. Hash values are used to verify data integrity, store passwords securely, detect duplicate files, and generate digital fingerprints for documents. Our Hash Generator computes MD5, SHA-1, SHA-256, and SHA-512 hashes for any text input simultaneously. SHA-256 and SHA-512 are computed using the browser's built-in Web Crypto API, while MD5 uses a pure JavaScript implementation since it is not natively supported by modern browsers. All computation happens locally — no data is ever sent to a server. This tool is ideal for developers, security professionals, and anyone needing to verify checksums.",
      steps: [
        { title: "Enter your text", description: "Type or paste the text you want to hash into the input field." },
        { title: "Generate hashes", description: "Click 'Generate Hashes' to compute all four hash values simultaneously." },
        { title: "Copy any hash", description: "Click the 'Copy' button next to any algorithm to copy that specific hash to your clipboard." },
      ],
    },
    faqs: [
      { question: "What is the difference between MD5, SHA-1, SHA-256, and SHA-512?", answer: "MD5 produces a 128-bit hash and is considered cryptographically broken for security use. SHA-1 (160 bits) is also deprecated for security. SHA-256 and SHA-512 are current standards recommended for most security applications." },
      { question: "Can I reverse a hash to get the original text?", answer: "No. Hash functions are one-way: you cannot mathematically reverse a hash to recover the original input. This property is fundamental to their security." },
      { question: "Why should I not use MD5 for passwords?", answer: "MD5 hashes can be cracked using rainbow tables and GPU-accelerated brute force. For passwords, use dedicated functions like bcrypt, scrypt, or Argon2 instead." },
    ],
  },

  "color-picker": {
    howTo: {
      intro:
        "Colors are fundamental to design, and working with them across different color models is a daily task for web developers, UI/UX designers, and graphic artists. Our Color Picker lets you visually select any color and instantly see its values in three formats: HEX (e.g., #6366F1), RGB (e.g., rgb(99, 102, 241)), and HSL (e.g., hsl(239, 84%, 67%)). You can use the native color picker for visual selection, type a HEX code directly for precision, or click any color in the quick palette for common swatches. Click any value card to copy it to your clipboard with a single click. This tool saves time when translating design specifications into code.",
      steps: [
        { title: "Pick a color", description: "Click the color swatch to open the native color picker, or type a HEX code directly in the input field." },
        { title: "View all color values", description: "HEX, RGB, HSL, and individual R, G, B channel values are displayed instantly." },
        { title: "Copy any value", description: "Click any value card to copy that color format to your clipboard." },
      ],
    },
    faqs: [
      { question: "What is the difference between HEX, RGB, and HSL?", answer: "HEX is a compact hexadecimal representation used in CSS. RGB specifies red, green, and blue channels (0–255). HSL (Hue, Saturation, Lightness) is more intuitive for adjusting colors — you can shift hue, increase saturation, or change brightness independently." },
      { question: "Can I enter any HEX color code directly?", answer: "Yes. Type any valid 6-digit HEX code (with or without the # prefix) into the text field to see its conversions." },
      { question: "Is the color picker useful for accessibility checks?", answer: "Knowing exact color values helps when checking contrast ratios using tools like the WCAG contrast checker. You can copy the HEX value directly into such tools." },
    ],
  },

  "loan-calculator": {
    howTo: {
      intro:
        "Understanding the true cost of a loan before signing is essential for informed financial decisions. Our Loan Calculator computes monthly payments, total interest paid over the life of the loan, and total repayment amount using the standard amortization formula. It works for any type of fixed-rate loan: mortgages, car loans, personal loans, student loans, and more. Simply enter the loan amount (principal), the annual interest rate, and the loan term in years. The calculation updates instantly, allowing you to compare scenarios — for example, how much you save by choosing a 15-year mortgage over a 30-year one, or how a lower interest rate affects your monthly payment. A visual bar shows the proportion of principal versus total interest paid.",
      steps: [
        { title: "Enter the loan amount", description: "Input the total amount you plan to borrow in the Loan Amount field." },
        { title: "Set the interest rate and term", description: "Enter the annual interest rate (%) and the loan term in years." },
        { title: "View the results", description: "The monthly payment, total payment, and total interest are displayed instantly with a visual breakdown." },
      ],
    },
    faqs: [
      { question: "Does this calculate compound or simple interest?", answer: "The calculator uses the standard amortization formula, which compounds interest monthly. Each monthly payment covers the interest accrued that month plus a portion of the principal." },
      { question: "Can I calculate a 0% interest loan?", answer: "Yes. Enter 0 as the interest rate, and the monthly payment will simply be the principal divided by the number of months." },
      { question: "Is this suitable for adjustable-rate mortgages?", answer: "This calculator assumes a fixed interest rate throughout the loan term. For adjustable-rate mortgages, you would need to recalculate each time the rate changes." },
    ],
  },

  "random-number": {
    howTo: {
      intro:
        "Random numbers have many practical uses: picking lottery numbers, simulating dice rolls for games, selecting a random winner from a list, generating test data, running statistical simulations, or simply making a fair decision when you can't choose between options. Our Random Number Generator uses JavaScript's Math.random() function to generate numbers within any range you specify. You can generate a single number or a batch of up to 1,000 numbers at once. Enable 'No duplicates' mode to ensure each generated number is unique within the range — useful for lottery-style picks or sampling without replacement. All generated numbers can be copied with a single click.",
      steps: [
        { title: "Set your range and count", description: "Enter the minimum value, maximum value, and how many numbers to generate." },
        { title: "Enable unique mode (optional)", description: "Check 'No duplicates' if you need unique values — for example, lottery number picks." },
        { title: "Generate and copy", description: "Click the Generate button. A single large number is displayed prominently, or multiple numbers appear as a list you can copy." },
      ],
    },
    faqs: [
      { question: "Are the numbers truly random?", answer: "The tool uses Math.random(), which is a pseudo-random number generator (PRNG). It is suitable for games, simulations, and everyday use but not for cryptographic purposes. For cryptographic randomness, use the Password Generator which uses crypto.getRandomValues()." },
      { question: "What is the maximum number of values I can generate at once?", answer: "You can generate up to 1,000 numbers at once. If 'No duplicates' is enabled, the count cannot exceed the size of the range (max − min + 1)." },
      { question: "Can I generate decimal (floating point) numbers?", answer: "Currently the tool generates integers only. Decimal support may be added in a future update." },
    ],
  },

  "text-cleaner": {
    howTo: {
      intro:
        "Text copied from PDFs, websites, Word documents, or emails often contains unwanted formatting: extra spaces between words, blank lines, HTML tags, special characters, or inconsistent line breaks. Cleaning this text manually is tedious and error-prone. Our Text Cleaner offers multiple targeted cleaning operations that you can combine as needed: trim spaces from each line, collapse multiple spaces into one, remove empty lines, collapse multiple newlines, strip HTML tags, remove URLs, and more. Select the operations you need, paste your text, and click Clean. The result is clean, formatted text ready to use. The character count before and after cleaning is displayed so you can see exactly how much was removed.",
      steps: [
        { title: "Select your cleaning options", description: "Check the boxes for the operations you want to apply. Commonly used: Trim spaces, Collapse multiple spaces, Remove blank lines." },
        { title: "Paste your text", description: "Paste the text that needs cleaning into the input area." },
        { title: "Clean and copy", description: "Click 'Clean Text' and then copy the result from the output area." },
      ],
    },
    faqs: [
      { question: "Will it change the meaning of my text?", answer: "The cleaning operations only affect whitespace, formatting, and structure — they do not alter word order or content. However, 'Join all lines into one' and 'Remove special characters' can change the visual layout significantly, so preview carefully." },
      { question: "Can I strip HTML from content copied off a website?", answer: "Yes. Enable 'Strip HTML tags' to remove all HTML markup, leaving only the visible text content." },
      { question: "Does it support text in all languages?", answer: "Yes. The tool processes Unicode text, including Chinese, Japanese, Arabic, and other non-Latin scripts." },
    ],
  },

  "countdown-timer": {
    howTo: {
      intro:
        "A countdown timer is one of the most practical productivity tools available. Whether you use the Pomodoro technique (25-minute focus sessions), need a kitchen timer while cooking, want to stay on schedule during a presentation, or just want to be reminded when a specific duration has elapsed, our Countdown Timer delivers a clean, distraction-free experience. Set any duration from seconds to hours, and watch the animated ring shrink as time passes. When the timer reaches zero, a beep plays through your browser's audio system to alert you even if you're looking at another tab. Use preset buttons (1 min, 5 min, 10 min, 25 min, 1 hour) for common durations, or pause and resume the timer mid-session.",
      steps: [
        { title: "Set the duration", description: "Enter hours, minutes, and seconds in the input fields, or click one of the preset buttons (1 min, 5 min, 25 min, etc.)." },
        { title: "Start the timer", description: "Click the Start button. The circular progress ring begins counting down." },
        { title: "Pause or reset", description: "Click Pause to halt the countdown and Resume to continue. Click Reset to start over with a new time." },
      ],
    },
    faqs: [
      { question: "Does it make a sound when time is up?", answer: "Yes. When the countdown reaches zero, the timer plays a short beep tone using the Web Audio API. Make sure your device volume is not muted." },
      { question: "Does the timer continue if I switch to another tab?", answer: "Yes. The countdown uses JavaScript's setInterval in the background, so it keeps running even when you switch browser tabs." },
      { question: "Can I set a timer for more than an hour?", answer: "Yes. The hours field accepts values up to 99 hours, making it suitable for long tasks as well as short sprints." },
    ],
  },
};
