'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import QRCode from 'qrcode';

type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';
type QrSize = 128 | 256 | 512;

const SIZE_OPTIONS: QrSize[] = [128, 256, 512];
const EC_LEVELS: { value: ErrorCorrectionLevel; label: string; desc: string }[] = [
  { value: 'L', label: 'L', desc: '~7% 可修复' },
  { value: 'M', label: 'M', desc: '~15% 可修复' },
  { value: 'Q', label: 'Q', desc: '~25% 可修复' },
  { value: 'H', label: 'H', desc: '~30% 可修复' },
];

export default function QrCodeGenerator() {
  const [text, setText] = useState('');
  const [size, setSize] = useState<QrSize>(256);
  const [ecLevel, setEcLevel] = useState<ErrorCorrectionLevel>('M');
  const [dataUrl, setDataUrl] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const generate = useCallback(async (value: string, s: QrSize, ec: ErrorCorrectionLevel) => {
    if (!value.trim()) {
      setDataUrl('');
      setError('');
      return;
    }
    try {
      const url = await QRCode.toDataURL(value, {
        width: s,
        margin: 2,
        errorCorrectionLevel: ec,
        color: { dark: '#111827', light: '#ffffff' },
      });
      setDataUrl(url);
      setError('');
    } catch (e) {
      setError('生成失败，请检查输入内容。');
      setDataUrl('');
    }
  }, []);

  // Debounce text input; immediate on size/ec change
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => generate(text, size, ecLevel), 300);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [text, size, ecLevel, generate]);

  function handleDownload() {
    if (!dataUrl) return;
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `qrcode-${size}px.png`;
    a.click();
  }

  async function handleCopyImage() {
    if (!dataUrl) return;
    try {
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API not available in all browsers
    }
  }

  const isEmpty = !text.trim();

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* ── Left: Controls ── */}
      <div className="flex-1 space-y-5">
        {/* Text input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            内容
          </label>
          <textarea
            className="w-full h-32 px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm text-gray-900 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            placeholder="Enter URL or text..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            spellCheck={false}
          />
          <p className="mt-1 text-xs text-gray-400 text-right">{text.length} 字符</p>
        </div>

        {/* Size selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            尺寸
          </label>
          <div className="flex gap-2">
            {SIZE_OPTIONS.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium border transition ${
                  size === s
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                    : 'bg-white border-gray-300 text-gray-600 hover:border-indigo-400 hover:text-indigo-600'
                }`}
              >
                {s}px
              </button>
            ))}
          </div>
        </div>

        {/* Error correction level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            错误纠正级别
          </label>
          <div className="grid grid-cols-4 gap-2">
            {EC_LEVELS.map(({ value, label, desc }) => (
              <button
                key={value}
                onClick={() => setEcLevel(value)}
                title={desc}
                className={`flex flex-col items-center py-2.5 px-1 rounded-xl border text-sm font-semibold transition ${
                  ecLevel === value
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                    : 'bg-white border-gray-300 text-gray-600 hover:border-indigo-400 hover:text-indigo-600'
                }`}
              >
                <span className="text-base">{label}</span>
                <span className={`text-[10px] font-normal mt-0.5 ${ecLevel === value ? 'text-indigo-100' : 'text-gray-400'}`}>
                  {desc}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 pt-1">
          <button
            onClick={handleDownload}
            disabled={!dataUrl}
            className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-200 disabled:text-gray-400 text-white text-sm font-semibold py-2.5 rounded-xl transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
            </svg>
            下载 PNG
          </button>
          <button
            onClick={handleCopyImage}
            disabled={!dataUrl}
            className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 border border-gray-300 text-gray-700 text-sm font-semibold py-2.5 rounded-xl transition"
          >
            {copied ? (
              <>
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-green-600">已复制</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-4 10h6a2 2 0 002-2v-8a2 2 0 00-2-2h-6a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                复制图片
              </>
            )}
          </button>
        </div>
      </div>

      {/* ── Right: Preview ── */}
      <div className="lg:w-72 flex flex-col items-center justify-start gap-3">
        <p className="self-start text-sm font-medium text-gray-700">预览</p>
        <div className="w-full aspect-square bg-white rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden">
          {error ? (
            <div className="text-center px-4">
              <span className="text-3xl">⚠️</span>
              <p className="mt-2 text-sm text-red-500">{error}</p>
            </div>
          ) : dataUrl ? (
            <img
              src={dataUrl}
              alt="Generated QR Code"
              className="w-full h-full object-contain p-3"
            />
          ) : (
            <div className="text-center px-4">
              <span className="text-5xl opacity-20">📱</span>
              <p className="mt-3 text-sm text-gray-400">
                {isEmpty ? '输入内容后自动生成' : '生成中...'}
              </p>
            </div>
          )}
        </div>

        {dataUrl && (
          <p className="text-xs text-gray-400">
            {size} × {size} px · 纠错级别 {ecLevel}
          </p>
        )}
      </div>
    </div>
  );
}
