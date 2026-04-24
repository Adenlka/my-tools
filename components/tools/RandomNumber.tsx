'use client';

import { useState } from 'react';

export default function RandomNumber() {
  const [min, setMin] = useState('1');
  const [max, setMax] = useState('100');
  const [count, setCount] = useState('1');
  const [unique, setUnique] = useState(false);
  const [results, setResults] = useState<number[]>([]);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const lo = parseInt(min, 10);
    const hi = parseInt(max, 10);
    const n = parseInt(count, 10);
    setError('');

    if (isNaN(lo) || isNaN(hi) || isNaN(n)) { setError('Please enter valid numbers.'); return; }
    if (lo > hi) { setError('Min must be ≤ Max.'); return; }
    if (n < 1 || n > 1000) { setError('Count must be between 1 and 1000.'); return; }
    if (unique && n > hi - lo + 1) { setError(`Cannot generate ${n} unique numbers in range [${lo}, ${hi}].`); return; }

    const arr: number[] = [];
    if (unique) {
      const pool = Array.from({ length: hi - lo + 1 }, (_, i) => lo + i);
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
      arr.push(...pool.slice(0, n));
    } else {
      for (let i = 0; i < n; i++) {
        arr.push(Math.floor(Math.random() * (hi - lo + 1)) + lo);
      }
    }
    setResults(arr);
  };

  const copy = () => {
    navigator.clipboard.writeText(results.join(', ')).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="space-y-5 max-w-md mx-auto">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Min</label>
          <input
            type="number"
            value={min}
            onChange={e => setMin(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Max</label>
          <input
            type="number"
            value={max}
            onChange={e => setMax(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Count</label>
          <input
            type="number"
            value={count}
            onChange={e => setCount(e.target.value)}
            min={1}
            max={1000}
            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
      </div>

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={unique}
          onChange={e => setUnique(e.target.checked)}
          className="w-4 h-4 accent-indigo-600"
        />
        <span className="text-sm text-gray-700">No duplicates (unique values)</span>
      </label>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        onClick={generate}
        className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition"
      >
        🎲 Generate
      </button>

      {results.length > 0 && (
        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-700">
              {results.length} number{results.length !== 1 ? 's' : ''} generated
            </span>
            <button onClick={copy} className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">
              {copied ? '✓ Copied!' : 'Copy all'}
            </button>
          </div>
          {results.length === 1 ? (
            <p className="text-5xl font-extrabold text-indigo-600 text-center py-4">{results[0]}</p>
          ) : (
            <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
              {results.map((n, i) => (
                <span key={i} className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-mono text-gray-700">
                  {n}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
