'use client';

import { useState, useMemo, useCallback } from 'react';

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

/** Extract YouTube video ID from any common URL format, or bare ID. */
function extractVideoId(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  const patterns = [
    // Standard:   https://www.youtube.com/watch?v=XXXXXXXXXX
    /[?&]v=([A-Za-z0-9_-]{11})/,
    // Short:      https://youtu.be/XXXXXXXXXX
    /youtu\.be\/([A-Za-z0-9_-]{11})/,
    // Embed:      https://www.youtube.com/embed/XXXXXXXXXX
    /youtube\.com\/embed\/([A-Za-z0-9_-]{11})/,
    // Shorts:     https://www.youtube.com/shorts/XXXXXXXXXX
    /youtube\.com\/shorts\/([A-Za-z0-9_-]{11})/,
    // Live:       https://www.youtube.com/live/XXXXXXXXXX
    /youtube\.com\/live\/([A-Za-z0-9_-]{11})/,
  ];

  for (const re of patterns) {
    const m = trimmed.match(re);
    if (m) return m[1];
  }

  // Bare 11-char video ID
  if (/^[A-Za-z0-9_-]{11}$/.test(trimmed)) return trimmed;

  return null;
}

// ─────────────────────────────────────────────
// Thumbnail definitions
// ─────────────────────────────────────────────
interface ThumbDef {
  key: string;
  label: string;
  size: string;
  filename: string;    // used in YouTube img URL
  downloadName: string;
}

const THUMBS: ThumbDef[] = [
  { key: 'maxres',   label: 'Max Resolution', size: '1280 × 720', filename: 'maxresdefault', downloadName: 'maxres'   },
  { key: 'sd',       label: 'Standard',       size: '640 × 480',  filename: 'sddefault',     downloadName: 'standard' },
  { key: 'hq',       label: 'High Quality',   size: '480 × 360',  filename: 'hqdefault',     downloadName: 'hq'       },
  { key: 'mq',       label: 'Medium Quality', size: '320 × 240',  filename: 'mqdefault',     downloadName: 'mq'       },
  { key: 'default',  label: 'Default',        size: '120 × 90',   filename: 'default',       downloadName: 'default'  },
];

function thumbUrl(videoId: string, filename: string): string {
  return `https://img.youtube.com/vi/${videoId}/${filename}.jpg`;
}

// ─────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────
function ThumbCard({
  videoId,
  thumb,
}: {
  videoId: string;
  thumb: ThumbDef;
}) {
  const [status,   setStatus]   = useState<'loading' | 'ok' | 'error'>('loading');
  const [downloading, setDl]    = useState(false);
  const url = thumbUrl(videoId, thumb.filename);

  const handleDownload = useCallback(async () => {
    setDl(true);
    try {
      // fetch through browser to trigger download instead of navigation
      const res  = await fetch(url);
      const blob = await res.blob();
      const a    = document.createElement('a');
      a.href     = URL.createObjectURL(blob);
      a.download = `${videoId}-${thumb.downloadName}.jpg`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 5000);
    } catch {
      // fallback: open in new tab
      window.open(url, '_blank');
    } finally {
      setDl(false);
    }
  }, [url, videoId, thumb.downloadName]);

  return (
    <div className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md hover:border-indigo-200 transition-all">
      {/* Image area */}
      <div className="relative aspect-video bg-gray-100 flex items-center justify-center overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={url}
          alt={`${thumb.label} thumbnail`}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            status === 'ok' ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setStatus('ok')}
          onError={() => setStatus('error')}
        />

        {/* Loading skeleton */}
        {status === 'loading' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-6 h-6 text-gray-300 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
          </div>
        )}

        {/* Not available overlay */}
        {status === 'error' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-gray-400 bg-gray-50">
            <span className="text-2xl">🚫</span>
            <span className="text-xs">此尺寸不可用</span>
          </div>
        )}

        {/* Hover: open in new tab button */}
        {status === 'ok' && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition bg-black/60 hover:bg-black/80 text-white rounded-lg p-1.5"
            title="在新标签页打开"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}
      </div>

      {/* Info + download */}
      <div className="px-4 py-3 flex items-center justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-gray-800">{thumb.label}</p>
          <p className="text-xs text-gray-400">{thumb.size}</p>
        </div>
        <button
          onClick={handleDownload}
          disabled={status !== 'ok' || downloading}
          className="shrink-0 flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border transition
            bg-indigo-600 border-indigo-600 text-white hover:bg-indigo-700
            disabled:bg-gray-100 disabled:border-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          {downloading ? (
            <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
            </svg>
          ) : (
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
            </svg>
          )}
          {downloading ? '下载中' : '下载'}
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────
export default function YoutubeThumbnail() {
  const [inputVal, setInputVal] = useState('');
  const [committed, setCommitted] = useState('');   // only update grid on submit

  const videoId = useMemo(() => extractVideoId(committed), [committed]);
  const inputId = useMemo(() => extractVideoId(inputVal),  [inputVal]);

  const handleSubmit = useCallback((e?: React.FormEvent) => {
    e?.preventDefault();
    setCommitted(inputVal.trim());
  }, [inputVal]);

  const handleClear = () => {
    setInputVal('');
    setCommitted('');
  };

  const isValid  = inputId !== null;
  const hasError = committed !== '' && videoId === null;

  return (
    <div className="space-y-6">
      {/* Input */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          {/* YT icon */}
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
            <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.5 6.19a3.02 3.02 0 00-2.12-2.14C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.38.55A3.02 3.02 0 00.5 6.19C0 8.04 0 12 0 12s0 3.96.5 5.81a3.02 3.02 0 002.12 2.14C4.46 20.5 12 20.5 12 20.5s7.54 0 9.38-.55a3.02 3.02 0 002.12-2.14C24 15.96 24 12 24 12s0-3.96-.5-5.81zM9.75 15.5v-7l6.5 3.5-6.5 3.5z"/>
            </svg>
          </div>
          <input
            type="text"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            placeholder="粘贴 YouTube 链接或视频 ID..."
            className={`w-full pl-10 pr-10 py-2.5 rounded-xl border text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
              hasError ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
            }`}
          />
          {inputVal && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          )}
        </div>
        <button
          type="submit"
          disabled={!isValid}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-200 disabled:text-gray-400 text-white text-sm font-semibold rounded-xl transition"
        >
          获取
        </button>
      </form>

      {/* Inline validation hint */}
      {hasError && (
        <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          ⚠️ 无法识别视频 ID，请确认链接格式正确。
        </p>
      )}

      {/* Valid ID preview pill */}
      {isValid && inputVal && (
        <div className="flex items-center gap-2 text-xs text-green-700 bg-green-50 border border-green-200 rounded-xl px-4 py-2">
          <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
          </svg>
          识别到 Video ID：<code className="font-mono font-bold">{inputId}</code>
        </div>
      )}

      {/* Thumbnail grid */}
      {videoId ? (
        <>
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-700">全部尺寸</p>
            <a
              href={`https://www.youtube.com/watch?v=${videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-indigo-500 hover:text-indigo-700 flex items-center gap-1"
            >
              在 YouTube 上查看
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {THUMBS.map(thumb => (
              <ThumbCard key={thumb.key} videoId={videoId} thumb={thumb} />
            ))}
          </div>
        </>
      ) : (
        !committed && (
          <div className="bg-gray-50 border border-dashed border-gray-200 rounded-2xl p-12 text-center space-y-2">
            <p className="text-4xl">🎬</p>
            <p className="text-sm text-gray-400">
              支持 youtube.com/watch?v=…、youtu.be/…、/shorts/…、/embed/… 等格式
            </p>
          </div>
        )
      )}

      <p className="text-xs text-gray-400 text-center">
        缩略图来自 YouTube 公共 CDN，仅供个人学习使用，请遵守版权规定。
      </p>
    </div>
  );
}
