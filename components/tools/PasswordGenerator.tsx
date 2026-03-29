'use client';

import { useState, useCallback } from 'react';

const CHARS = {
  upper:   'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lower:   'abcdefghijklmnopqrstuvwxyz',
  digits:  '0123456789',
  special: '!@#$%^&*()-_=+[]{}|;:,.<>?',
};

type Options = { upper: boolean; lower: boolean; digits: boolean; special: boolean };

function buildPool(opts: Options): string {
  return (
    (opts.upper   ? CHARS.upper   : '') +
    (opts.lower   ? CHARS.lower   : '') +
    (opts.digits  ? CHARS.digits  : '') +
    (opts.special ? CHARS.special : '')
  );
}

function secureRandom(max: number): number {
  const arr = new Uint32Array(1);
  let result: number;
  // rejection sampling to avoid modulo bias
  const limit = Math.floor(0x100000000 / max) * max;
  do {
    window.crypto.getRandomValues(arr);
    result = arr[0];
  } while (result >= limit);
  return result % max;
}

function generateOne(length: number, pool: string): string {
  return Array.from({ length }, () => pool[secureRandom(pool.length)]).join('');
}

type Strength = { label: string; color: string; bg: string; bars: number };

function calcStrength(pwd: string, opts: Options): Strength {
  if (!pwd) return { label: '—', color: 'text-gray-300', bg: 'bg-gray-200', bars: 0 };
  let score = 0;
  if (pwd.length >= 12) score++;
  if (pwd.length >= 20) score++;
  const activeCount = Object.values(opts).filter(Boolean).length;
  if (activeCount >= 2) score++;
  if (activeCount >= 4) score++;

  if (score <= 1) return { label: 'Weak',        color: 'text-red-500',    bg: 'bg-red-400',    bars: 1 };
  if (score === 2) return { label: 'Fair',        color: 'text-orange-500', bg: 'bg-orange-400', bars: 2 };
  if (score === 3) return { label: 'Strong',      color: 'text-yellow-500', bg: 'bg-yellow-400', bars: 3 };
  return              { label: 'Very Strong',  color: 'text-green-500',  bg: 'bg-green-500',  bars: 4 };
}

const DEFAULT_OPTS: Options = { upper: true, lower: true, digits: true, special: false };

export default function PasswordGenerator() {
  const [length, setLength]       = useState(16);
  const [opts, setOpts]           = useState<Options>(DEFAULT_OPTS);
  const [passwords, setPasswords] = useState<string[]>([]);
  const [copied, setCopied]       = useState<number | null>(null);
  const [bulk, setBulk]           = useState(false);

  const poolEmpty = !Object.values(opts).some(Boolean);

  const generate = useCallback(() => {
    if (poolEmpty) return;
    const pool = buildPool(opts);
    const count = bulk ? 5 : 1;
    setPasswords(Array.from({ length: count }, () => generateOne(length, pool)));
    setCopied(null);
  }, [length, opts, bulk, poolEmpty]);

  const handleCopy = useCallback(async (pwd: string, idx: number) => {
    await navigator.clipboard.writeText(pwd);
    setCopied(idx);
    setTimeout(() => setCopied(null), 2000);
  }, []);

  const toggleOpt = (key: keyof Options) =>
    setOpts((prev) => ({ ...prev, [key]: !prev[key] }));

  const firstPwd  = passwords[0] ?? '';
  const strength  = calcStrength(firstPwd, opts);

  return (
    <div className="space-y-6">
      {/* ── Length ── */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium text-gray-700">密码长度</label>
          <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-lg">
            {length}
          </span>
        </div>
        <input
          type="range"
          min={8} max={64} value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-indigo-600"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>8</span><span>64</span>
        </div>
      </div>

      {/* ── Character options ── */}
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-2">字符类型</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {(
            [
              { key: 'upper',   label: 'A–Z',  sub: '大写字母' },
              { key: 'lower',   label: 'a–z',  sub: '小写字母' },
              { key: 'digits',  label: '0–9',  sub: '数字'     },
              { key: 'special', label: '!@#',  sub: '特殊符号' },
            ] as const
          ).map(({ key, label, sub }) => {
            const active = opts[key];
            return (
              <button
                key={key}
                onClick={() => toggleOpt(key)}
                className={`flex flex-col items-center py-3 rounded-xl border text-sm font-semibold transition select-none ${
                  active
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                    : 'bg-white border-gray-300 text-gray-500 hover:border-indigo-300 hover:text-indigo-500'
                }`}
              >
                <span className="font-mono text-base">{label}</span>
                <span className={`text-[11px] font-normal mt-0.5 ${active ? 'text-indigo-100' : 'text-gray-400'}`}>
                  {sub}
                </span>
              </button>
            );
          })}
        </div>
        {poolEmpty && (
          <p className="mt-2 text-xs text-red-500">请至少选择一种字符类型</p>
        )}
      </div>

      {/* ── Bulk toggle ── */}
      <div className="flex items-center gap-2">
        <button
          role="switch"
          aria-checked={bulk}
          onClick={() => setBulk((b) => !b)}
          className={`relative inline-flex h-5 w-9 shrink-0 rounded-full border-2 border-transparent transition-colors cursor-pointer ${
            bulk ? 'bg-indigo-600' : 'bg-gray-300'
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${
              bulk ? 'translate-x-4' : 'translate-x-0'
            }`}
          />
        </button>
        <span className="text-sm text-gray-600">批量生成 5 个密码</span>
      </div>

      {/* ── Generate button ── */}
      <button
        onClick={generate}
        disabled={poolEmpty}
        className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold py-3 rounded-xl transition text-sm"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        {bulk ? '批量生成 5 个密码' : '生成密码'}
      </button>

      {/* ── Result(s) ── */}
      {passwords.length > 0 && (
        <div className="space-y-3">
          {/* Strength bar — based on first password */}
          {!bulk && (
            <div className="flex items-center gap-3">
              <div className="flex gap-1 flex-1">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`h-1.5 flex-1 rounded-full transition-all ${
                      i <= strength.bars ? strength.bg : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
              <span className={`text-xs font-semibold ${strength.color}`}>
                {strength.label}
              </span>
            </div>
          )}

          {passwords.map((pwd, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"
            >
              <span className="flex-1 font-mono text-sm text-gray-900 break-all leading-relaxed">
                {pwd}
              </span>
              <button
                onClick={() => handleCopy(pwd, idx)}
                className="shrink-0 flex items-center gap-1 text-xs border px-2.5 py-1.5 rounded-lg transition
                  bg-white border-gray-300 text-gray-500 hover:border-indigo-400 hover:text-indigo-600"
                title="复制"
              >
                {copied === idx ? (
                  <>
                    <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-green-600">已复制</span>
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-4 10h6a2 2 0 002-2v-8a2 2 0 00-2-2h-6a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    复制
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-gray-400">
        使用 <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-600">window.crypto.getRandomValues()</code> 生成，拒绝模偏差，安全可靠。
      </p>
    </div>
  );
}
