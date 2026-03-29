'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

// ─────────────────────────────────────────────
// Types & constants
// ─────────────────────────────────────────────
type OutputFormat = 'image/png' | 'image/jpeg' | 'image/webp' | 'image/bmp';

interface FormatDef {
  mime: OutputFormat;
  label: string;
  ext: string;
  supportsQuality: boolean;
}

const FORMATS: FormatDef[] = [
  { mime: 'image/png',  label: 'PNG',  ext: 'png',  supportsQuality: false },
  { mime: 'image/jpeg', label: 'JPEG', ext: 'jpg',  supportsQuality: true  },
  { mime: 'image/webp', label: 'WEBP', ext: 'webp', supportsQuality: true  },
  { mime: 'image/bmp',  label: 'BMP',  ext: 'bmp',  supportsQuality: false },
];

const ACCEPT = 'image/jpeg,image/png,image/webp,image/bmp,image/gif,image/svg+xml';

function fmtBytes(b: number): string {
  if (b < 1024)       return `${b} B`;
  if (b < 1024 ** 2)  return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / 1024 ** 2).toFixed(2)} MB`;
}

function extOf(filename: string): string {
  return filename.split('.').pop()?.toUpperCase() ?? '—';
}

// ─────────────────────────────────────────────
// Canvas conversion (runs in browser only)
// ─────────────────────────────────────────────
function convertWithCanvas(
  file: File,
  targetMime: OutputFormat,
  quality: number,
): Promise<{ blob: Blob; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const srcUrl = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(srcUrl);
      const canvas = document.createElement('canvas');
      canvas.width  = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) { reject(new Error('Canvas not supported')); return; }

      // BMP / PNG need opaque background when converting from transparent source
      if (targetMime === 'image/jpeg' || targetMime === 'image/bmp') {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (!blob) { reject(new Error('Conversion failed')); return; }
          resolve({ blob, width: img.naturalWidth, height: img.naturalHeight });
        },
        targetMime,
        targetMime === 'image/jpeg' || targetMime === 'image/webp' ? quality / 100 : undefined,
      );
    };
    img.onerror = () => { URL.revokeObjectURL(srcUrl); reject(new Error('Failed to load image')); };
    img.src = srcUrl;
  });
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────
export default function ImageConverter() {
  const [srcFile,    setSrcFile]    = useState<File | null>(null);
  const [srcPreview, setSrcPreview] = useState<string>('');
  const [format,     setFormat]     = useState<OutputFormat>('image/png');
  const [quality,    setQuality]    = useState(90);
  const [converting, setConverting] = useState(false);
  const [result,     setResult]     = useState<{ blob: Blob; url: string; size: number; width: number; height: number } | null>(null);
  const [error,      setError]      = useState('');
  const [dragging,   setDragging]   = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const prevUrls = useRef<string[]>([]);

  useEffect(() => () => { prevUrls.current.forEach(URL.revokeObjectURL); }, []);

  const pushUrl = (url: string) => { prevUrls.current.push(url); };

  const convert = useCallback(async (file: File, fmt: OutputFormat, q: number) => {
    setConverting(true);
    setError('');
    try {
      const { blob, width, height } = await convertWithCanvas(file, fmt, q);
      const url = URL.createObjectURL(blob);
      pushUrl(url);
      setResult({ blob, url, size: blob.size, width, height });
    } catch (e) {
      setError(e instanceof Error ? e.message : '转换失败，请重试。');
      setResult(null);
    } finally {
      setConverting(false);
    }
  }, []);

  const loadFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('请上传图片文件。');
      return;
    }
    setError('');
    setResult(null);
    const url = URL.createObjectURL(file);
    pushUrl(url);
    setSrcFile(file);
    setSrcPreview(url);
    convert(file, format, quality);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [format, quality, convert]);

  const reConvert = useCallback((fmt: OutputFormat, q: number) => {
    if (srcFile) convert(srcFile, fmt, q);
  }, [srcFile, convert]);

  // drag handlers
  const onDragOver  = (e: React.DragEvent) => { e.preventDefault(); setDragging(true); };
  const onDragLeave = () => setDragging(false);
  const onDrop      = (e: React.DragEvent) => {
    e.preventDefault(); setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) loadFile(f);
  };

  const handleDownload = () => {
    if (!result || !srcFile) return;
    const fmt = FORMATS.find(f => f.mime === format)!;
    const base = srcFile.name.replace(/\.[^.]+$/, '');
    const a = document.createElement('a');
    a.href     = result.url;
    a.download = `${base}.${fmt.ext}`;
    a.click();
  };

  const activeFormat  = FORMATS.find(f => f.mime === format)!;
  const showQuality   = activeFormat.supportsQuality;
  const savingBytes   = srcFile && result ? srcFile.size - result.size : 0;
  const savingPct     = srcFile && result ? (savingBytes / srcFile.size) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Drop zone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-6 py-10 cursor-pointer transition-colors ${
          dragging
            ? 'border-indigo-400 bg-indigo-50'
            : 'border-gray-300 hover:border-indigo-300 hover:bg-gray-50'
        }`}
      >
        <input ref={inputRef} type="file" accept={ACCEPT} className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) loadFile(f); e.target.value = ''; }} />
        <div className="text-4xl">{srcFile ? '🔄' : '🖼️'}</div>
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-700">
            {srcFile ? srcFile.name : '点击或拖拽图片到此处'}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            {srcFile ? `${extOf(srcFile.name)} · ${fmtBytes(srcFile.size)}` : '支持 JPG / PNG / WebP / BMP / GIF / SVG'}
          </p>
        </div>
        {srcFile && <span className="text-xs text-indigo-500 underline underline-offset-2">重新选择</span>}
      </div>

      {error && (
        <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-xl px-4 py-3">⚠️ {error}</p>
      )}

      {srcFile && (
        <>
          {/* Format selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">目标格式</label>
            <div className="flex gap-2">
              {FORMATS.map(f => (
                <button
                  key={f.mime}
                  onClick={() => { setFormat(f.mime); reConvert(f.mime, quality); }}
                  className={`flex-1 py-2.5 rounded-xl border text-sm font-bold transition ${
                    format === f.mime
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                      : 'bg-white border-gray-300 text-gray-600 hover:border-indigo-300 hover:text-indigo-600'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quality slider — JPEG / WEBP only */}
          {showQuality && (
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-sm font-medium text-gray-700">
                  {activeFormat.label} 质量
                </label>
                <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-lg">{quality}%</span>
              </div>
              <input
                type="range" min={1} max={100} value={quality}
                onChange={e => { const v = +e.target.value; setQuality(v); reConvert(format, v); }}
                className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>1 (最小)</span><span>100 (最清晰)</span>
              </div>
            </div>
          )}

          {/* Before / After stats */}
          <div className="grid grid-cols-3 gap-3 text-center">
            {/* Source */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-3">
              <p className="text-xs text-gray-400 mb-0.5">原始格式</p>
              <p className="text-lg font-extrabold text-gray-900">{extOf(srcFile.name)}</p>
              <p className="text-xs text-gray-400 mt-0.5">{fmtBytes(srcFile.size)}</p>
            </div>

            {/* Arrow */}
            <div className="flex items-center justify-center text-2xl text-gray-300 select-none">→</div>

            {/* Output */}
            <div className={`border rounded-xl px-3 py-3 ${
              result && !converting
                ? 'bg-indigo-50 border-indigo-200'
                : 'bg-gray-50 border-gray-200'
            }`}>
              <p className="text-xs text-gray-400 mb-0.5">转换格式</p>
              <p className={`text-lg font-extrabold ${result && !converting ? 'text-indigo-700' : 'text-gray-900'}`}>
                {activeFormat.label}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                {converting ? '转换中…' : result ? fmtBytes(result.size) : '—'}
              </p>
            </div>
          </div>

          {/* Size delta */}
          {result && !converting && (
            <div className={`text-center text-sm font-medium ${
              savingBytes > 0 ? 'text-green-600' : savingBytes < 0 ? 'text-orange-500' : 'text-gray-500'
            }`}>
              {savingBytes > 0
                ? `✅ 体积减小 ${fmtBytes(savingBytes)}（${savingPct.toFixed(1)}%）`
                : savingBytes < 0
                  ? `⚠️ 体积增大 ${fmtBytes(-savingBytes)}（${(-savingPct).toFixed(1)}%）`
                  : '➡️ 体积不变'}
            </div>
          )}

          {/* Side-by-side preview */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 text-xs font-semibold text-gray-500 flex justify-between">
                <span>原图 ({extOf(srcFile.name)})</span>
                {result && <span>{result.width} × {result.height}</span>}
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={srcPreview} alt="Original" className="w-full max-h-56 object-contain bg-[#f8f8f8]" />
            </div>
            <div className="rounded-2xl border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 text-xs font-semibold text-gray-500">
                转换后 ({activeFormat.label})
              </div>
              <div className="min-h-[8rem] max-h-56 bg-[#f8f8f8] flex items-center justify-center">
                {converting ? (
                  <svg className="w-6 h-6 text-gray-300 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                  </svg>
                ) : result ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={result.url} alt="Converted" className="w-full max-h-56 object-contain" />
                ) : (
                  <span className="text-xs text-gray-400">等待转换</span>
                )}
              </div>
            </div>
          </div>

          {/* Download */}
          <button
            onClick={handleDownload}
            disabled={!result || converting}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold py-3 rounded-xl transition text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"/>
            </svg>
            下载 {activeFormat.label} 图片
          </button>
        </>
      )}

      {!srcFile && (
        <div className="text-center text-xs text-gray-400 space-y-1">
          <p>所有转换在浏览器本地完成，图片不会上传至服务器。</p>
          <p>PNG → JPEG 转换时透明背景将填充为白色。</p>
        </div>
      )}
    </div>
  );
}
