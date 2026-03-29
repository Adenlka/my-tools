'use client';

import { useState, useMemo, useCallback } from 'react';

// ─────────────────────────────────────────────
// Conversion functions
// ─────────────────────────────────────────────
function toUpperCase(s: string)    { return s.toUpperCase(); }
function toLowerCase(s: string)    { return s.toLowerCase(); }

function toTitleCase(s: string) {
  return s.replace(/\S+/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
}

function toSentenceCase(s: string) {
  return s
    .toLowerCase()
    .replace(/(^\s*\w|[.!?]\s+\w)/g, c => c.toUpperCase());
}

/** Split mixed text into pure word tokens (handles spaces, hyphens, underscores, camelCase) */
function tokenize(s: string): string[] {
  return s
    // insert space before uppercase runs in camelCase / PascalCase
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    // replace separators
    .replace(/[-_]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

function toCamelCase(s: string) {
  const words = tokenize(s);
  return words
    .map((w, i) =>
      i === 0
        ? w.toLowerCase()
        : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase(),
    )
    .join('');
}

function toSnakeCase(s: string) {
  return tokenize(s).map(w => w.toLowerCase()).join('_');
}

function toKebabCase(s: string) {
  return tokenize(s).map(w => w.toLowerCase()).join('-');
}

// ─────────────────────────────────────────────
// Config
// ─────────────────────────────────────────────
interface Conversion {
  key: string;
  label: string;
  desc: string;
  example: string;
  fn: (s: string) => string;
  mono?: boolean;
}

const CONVERSIONS: Conversion[] = [
  { key: 'upper',    label: 'UPPER CASE',    desc: '全部大写',       example: 'HELLO WORLD',   fn: toUpperCase },
  { key: 'lower',    label: 'lower case',    desc: '全部小写',       example: 'hello world',   fn: toLowerCase },
  { key: 'title',    label: 'Title Case',    desc: '每词首字母大写', example: 'Hello World',   fn: toTitleCase },
  { key: 'sentence', label: 'Sentence case', desc: '句首字母大写',   example: 'Hello world.',  fn: toSentenceCase },
  { key: 'camel',    label: 'camelCase',     desc: '小驼峰命名',     example: 'helloWorld',    fn: toCamelCase,  mono: true },
  { key: 'snake',    label: 'snake_case',    desc: '下划线命名',     example: 'hello_world',   fn: toSnakeCase,  mono: true },
  { key: 'kebab',    label: 'kebab-case',    desc: '短横线命名',     example: 'hello-world',   fn: toKebabCase,  mono: true },
];

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────
export default function CaseConverter() {
  const [input,    setInput]   = useState('');
  const [copiedKey, setCopied] = useState<string | null>(null);

  const results = useMemo(
    () =>
      CONVERSIONS.map(c => ({
        ...c,
        output: input ? c.fn(input) : '',
      })),
    [input],
  );

  const handleCopy = useCallback(async (text: string, key: string) => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 1800);
  }, []);

  const hasInput = input.trim().length > 0;

  return (
    <div className="space-y-5">
      {/* Input */}
      <div className="relative">
        <textarea
          className="w-full min-h-[8rem] px-4 py-3 rounded-xl border border-gray-300 text-sm text-gray-900 placeholder-gray-400 resize-y focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition leading-relaxed"
          placeholder="在此输入或粘贴文本..."
          value={input}
          onChange={e => setInput(e.target.value)}
          spellCheck={false}
          rows={5}
        />
        {input && (
          <button
            onClick={() => setInput('')}
            className="absolute top-3 right-3 flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 bg-white border border-gray-200 hover:border-red-300 px-2.5 py-1 rounded-lg transition"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            清空
          </button>
        )}
      </div>

      {/* Result cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {results.map(({ key, label, desc, example, mono, output }) => {
          const isCopied  = copiedKey === key;
          const display   = hasInput ? output : '';
          const isEmpty   = !display;

          return (
            <div
              key={key}
              className="group bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col gap-2 hover:border-indigo-200 hover:bg-indigo-50/30 transition"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-sm font-bold text-gray-800">{label}</span>
                  <span className="ml-2 text-xs text-gray-400">{desc}</span>
                </div>
                <button
                  onClick={() => handleCopy(display, key)}
                  disabled={isEmpty}
                  title="复制"
                  className={`shrink-0 flex items-center gap-1 text-xs border px-2.5 py-1 rounded-lg transition
                    ${isCopied
                      ? 'bg-green-50 border-green-300 text-green-600'
                      : isEmpty
                        ? 'bg-white border-gray-200 text-gray-300 cursor-not-allowed'
                        : 'bg-white border-gray-300 text-gray-400 hover:border-indigo-400 hover:text-indigo-600 opacity-0 group-hover:opacity-100 focus:opacity-100'
                    }`}
                >
                  {isCopied ? (
                    <>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      已复制
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
              </div>

              {/* Output */}
              <p
                className={`min-h-[2rem] text-sm break-all leading-relaxed ${
                  mono ? 'font-mono' : ''
                } ${
                  isEmpty
                    ? 'text-gray-300 italic'
                    : 'text-gray-900'
                }`}
              >
                {isEmpty ? example : display}
              </p>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-gray-400">
        camelCase / snake_case / kebab-case 会自动拆分现有的驼峰、下划线、短横线命名。
      </p>
    </div>
  );
}
