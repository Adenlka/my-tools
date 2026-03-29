'use client';

import { useState, useMemo, useCallback } from 'react';

function computeStats(text: string) {
  const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const charsWithSpaces = text.length;
  const charsNoSpaces = text.replace(/\s/g, '').length;
  const sentences = text.trim() === '' ? 0 : (text.match(/[^.!?]*[.!?]+/g) ?? []).length;
  const paragraphs = text.trim() === '' ? 0 : text.split(/\n+/).filter((p) => p.trim() !== '').length;
  const minutes = words / 200;
  const readingTime =
    words === 0
      ? '0 秒'
      : minutes < 1
      ? `${Math.ceil(minutes * 60)} 秒`
      : `${Math.floor(minutes)} 分 ${Math.round((minutes % 1) * 60)} 秒`;

  return { words, charsWithSpaces, charsNoSpaces, sentences, paragraphs, readingTime };
}

const STAT_CARDS = [
  { key: 'words',           label: 'Words',           labelCn: '单词数',          icon: '📝' },
  { key: 'charsWithSpaces', label: 'Characters',       labelCn: '字符数（含空格）', icon: '🔡' },
  { key: 'charsNoSpaces',   label: 'Characters',       labelCn: '字符数（不含空格）',icon: '✂️' },
  { key: 'sentences',       label: 'Sentences',        labelCn: '句子数',          icon: '💬' },
  { key: 'paragraphs',      label: 'Paragraphs',       labelCn: '段落数',          icon: '📄' },
  { key: 'readingTime',     label: 'Reading Time',     labelCn: '预计阅读时间',    icon: '⏱️' },
] as const;

export default function WordCounter() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);
  const stats = useMemo(() => computeStats(text), [text]);

  const handleCopy = useCallback(async () => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);

  return (
    <div className="space-y-5">
      {/* Textarea */}
      <div className="relative">
        <textarea
          className="w-full min-h-[14rem] px-4 py-3 rounded-xl border border-gray-300 text-sm text-gray-900 placeholder-gray-400 resize-y focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition leading-relaxed"
          placeholder="在此粘贴或输入文本..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          spellCheck={false}
          rows={10}
        />
        {text && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-xs bg-white border border-gray-200 px-2.5 py-1 rounded-lg transition hover:border-indigo-400 hover:text-indigo-600 text-gray-400"
              title="复制文本"
            >
              {copied ? (
                <>
                  <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-green-600">已复制</span>
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-4 10h6a2 2 0 002-2v-8a2 2 0 00-2-2h-6a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  复制
                </>
              )}
            </button>
            <button
              onClick={() => setText('')}
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 bg-white border border-gray-200 hover:border-red-300 px-2.5 py-1 rounded-lg transition"
              title="清空"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              清空
            </button>
          </div>
        )}
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {STAT_CARDS.map(({ key, label, labelCn, icon }) => {
          const value = stats[key];
          return (
            <div
              key={key}
              className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 flex flex-col gap-1"
            >
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <span>{icon}</span>
                <span>{labelCn}</span>
              </div>
              <div className="text-2xl font-extrabold text-gray-900 leading-none">
                {value}
              </div>
              <div className="text-xs text-gray-400">{label}</div>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-gray-400 text-right">阅读速度按 200 词/分钟计算</p>
    </div>
  );
}
