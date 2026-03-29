'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import imageCompression from 'browser-image-compression';

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────
function fmtBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 ** 2).toFixed(2)} MB`;
}

function savingColor(pct: number): string {
  if (pct >= 60) return 'text-green-600';
  if (pct >= 30) return 'text-yellow-600';
  return 'text-orange-500';
}

const ACCEPT = ['image/jpeg', 'image/png', 'image/webp'];

interface FileState {
  file: File;
  objectUrl: string;
}

interface Result {
  blob: Blob;
  objectUrl: string;
  sizeBytes: number;
}

// ─────────────────────────────────────────────
// Stat card
// ─────────────────────────────────────────────
function StatCard({ label, value, sub, highlight }: {
  label: string; value: string; sub?: string; highlight?: boolean;
}) {
  return (
    <div className={`flex flex-col gap-0.5 rounded-xl border px-4 py-3 ${
      highlight ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
    }`}>
      <span className="text-xs text-gray-400">{label}</span>
      <span className={`text-lg font-extrabold ${highlight ? 'text-green-600' : 'text-gray-900'}`}>{value}</span>
      {sub && <span className="text-xs text-gray-400">{sub}</span>}
    </div>
  );
}

// ─────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────
export default function ImageCompressor() {
  const [source,   setSource]   = useState<FileState | null>(null);
  const [result,   setResult]   = useState<Result | null>(null);
  const [quality,  setQuality]  = useState(80);
  const [maxMB,    setMaxMB]    = useState(2);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const prevResultUrl = useRef<string | null>(null);

  // Revoke stale object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      if (source)               URL.revokeObjectURL(source.objectUrl);
      if (prevResultUrl.current) URL.revokeObjectURL(prevResultUrl.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const compress = useCallback(async (file: File, q: number, mb: number) => {
    setLoading(true);
    setError('');
    try {
      const compressed = await imageCompression(file, {
        maxSizeMB:           mb,
        initialQuality:      q / 100,
        useWebWorker:        true,
        preserveExif:        false,
        fileType:            file.type as 'image/jpeg' | 'image/png' | 'image/webp',
      });
      // Revoke previous result URL
      if (prevResultUrl.current) URL.revokeObjectURL(prevResultUrl.current);
      const url = URL.createObjectURL(compressed);
      prevResultUrl.current = url;
      setResult({ blob: compressed, objectUrl: url, sizeBytes: compressed.size });
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : '压缩失败，请重试。');
    } finally {
      setLoading(false);
    }
  }, []);

  const loadFile = useCallback((file: File) => {
    if (!ACCEPT.includes(file.type)) {
      setError('仅支持 JPG / PNG / WebP 格式。');
      return;
    }
    if (source) URL.revokeObjectURL(source.objectUrl);
    setResult(null);
    setError('');
    const objectUrl = URL.createObjectURL(file);
    setSource({ file, objectUrl });
    compress(file, quality, maxMB);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quality, maxMB, compress]);

  // Re-compress when sliders change
  const recompress = useCallback((q: number, mb: number) => {
    if (source) compress(source.file, q, mb);
  }, [source, compress]);

  // Drag-and-drop handlers
  const onDragOver  = (e: React.DragEvent) => { e.preventDefault(); setDragging(true); };
  const onDragLeave = () => setDragging(false);
  const onDrop      = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) loadFile(file);
  };
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) loadFile(file);
    e.target.value = '';
  };

  const handleDownload = () => {
    if (!result || !source) return;
    const ext  = source.file.name.split('.').pop() ?? 'jpg';
    const name = source.file.name.replace(/\.[^.]+$/, '') + `-compressed.${ext}`;
    const a    = document.createElement('a');
    a.href     = result.objectUrl;
    a.download = name;
    a.click();
  };

  const savingPct = source && result
    ? ((source.file.size - result.sizeBytes) / source.file.size) * 100
    : 0;

  return (
    <div className="space-y-6">
      {/* Drop zone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`relative flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-6 py-10 cursor-pointer transition-colors ${
          dragging
            ? 'border-indigo-400 bg-indigo-50'
            : 'border-gray-300 hover:border-indigo-300 hover:bg-gray-50'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT.join(',')}
          className="hidden"
          onChange={onInputChange}
        />
        <div className="text-4xl">{source ? '🔄' : '🖼️'}</div>
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-700">
            {source ? source.file.name : '点击或拖拽图片到此处'}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            {source ? `原始大小：${fmtBytes(source.file.size)}` : '支持 JPG / PNG / WebP'}
          </p>
        </div>
        {source && (
          <span className="text-xs text-indigo-500 underline underline-offset-2">重新选择</span>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          ⚠️ {error}
        </p>
      )}

      {/* Controls — only visible once a file is loaded */}
      {source && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Quality slider */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-sm font-medium text-gray-700">压缩质量</label>
                <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-lg">
                  {quality}%
                </span>
              </div>
              <input
                type="range" min={1} max={100} value={quality}
                onChange={e => {
                  const v = Number(e.target.value);
                  setQuality(v);
                  recompress(v, maxMB);
                }}
                className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>1 (最小)</span><span>100 (最清晰)</span>
              </div>
            </div>

            {/* Max size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                最大文件限制
              </label>
              <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500 transition bg-white">
                <input
                  type="number" min={0.1} max={50} step={0.1} value={maxMB}
                  onChange={e => {
                    const v = Math.max(0.1, Number(e.target.value));
                    setMaxMB(v);
                    recompress(quality, v);
                  }}
                  className="flex-1 px-3.5 py-2.5 text-sm text-gray-900 outline-none"
                />
                <span className="px-3 text-sm text-gray-400 bg-gray-50 border-l border-gray-200 py-2.5 select-none">
                  MB
                </span>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3">
            <StatCard label="原始大小" value={fmtBytes(source.file.size)} />
            <StatCard
              label="压缩后大小"
              value={loading ? '计算中…' : result ? fmtBytes(result.sizeBytes) : '—'}
            />
            <StatCard
              label="压缩率"
              value={loading ? '…' : result ? `${savingPct.toFixed(1)}%` : '—'}
              sub={result && savingPct > 0 ? `节省 ${fmtBytes(source.file.size - result.sizeBytes)}` : undefined}
              highlight={!loading && savingPct > 0}
            />
          </div>

          {/* Preview */}
          {(source || result) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Original */}
              <div className="rounded-2xl border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-500">原图</span>
                  <span className="text-xs text-gray-400">{fmtBytes(source.file.size)}</span>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={source.objectUrl}
                  alt="Original"
                  className="w-full max-h-64 object-contain bg-[#f8f8f8]"
                />
              </div>

              {/* Compressed */}
              <div className="rounded-2xl border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-500">压缩后</span>
                  <span className={`text-xs font-semibold ${result ? savingColor(savingPct) : 'text-gray-400'}`}>
                    {result ? fmtBytes(result.sizeBytes) : '—'}
                  </span>
                </div>
                <div className="relative w-full max-h-64 min-h-[8rem] bg-[#f8f8f8] flex items-center justify-center">
                  {loading ? (
                    <div className="flex flex-col items-center gap-2 text-gray-400">
                      <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      <span className="text-xs">压缩中...</span>
                    </div>
                  ) : result ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={result.objectUrl}
                      alt="Compressed"
                      className="w-full max-h-64 object-contain"
                    />
                  ) : (
                    <span className="text-xs text-gray-400">等待压缩</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Download button */}
          <button
            onClick={handleDownload}
            disabled={!result || loading}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold py-3 rounded-xl transition text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
            </svg>
            下载压缩图片
          </button>
        </>
      )}

      <p className="text-xs text-gray-400 text-center">
        所有处理在浏览器本地完成，图片不会上传至服务器。
      </p>
    </div>
  );
}
