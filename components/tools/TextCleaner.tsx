'use client';

import { useState } from 'react';

interface Option { id: string; label: string; fn: (s: string) => string; }

const OPTIONS: Option[] = [
  { id: 'trimLines',     label: 'Trim leading/trailing spaces per line', fn: s => s.split('\n').map(l => l.trim()).join('\n') },
  { id: 'collapseSpaces',label: 'Collapse multiple spaces into one',      fn: s => s.replace(/[^\S\n]+/g, ' ') },
  { id: 'removeBlank',  label: 'Remove empty/blank lines',              fn: s => s.split('\n').filter(l => l.trim() !== '').join('\n') },
  { id: 'singleNewline',label: 'Collapse multiple newlines to one',     fn: s => s.replace(/\n{2,}/g, '\n') },
  { id: 'removeSpecial',label: 'Remove special characters (!@#$… etc)', fn: s => s.replace(/[^a-zA-Z0-9\s\u00C0-\u024F\u4E00-\u9FFF\u3040-\u309F\u30A0-\u30FF.,!?;:\-'"()]/g, '') },
  { id: 'removePunct',  label: 'Remove all punctuation',               fn: s => s.replace(/[^\w\s\u00C0-\u024F\u4E00-\u9FFF\u3040-\u309F\u30A0-\u30FF]/g, '') },
  { id: 'removeNumbers',label: 'Remove numbers',                       fn: s => s.replace(/[0-9]/g, '') },
  { id: 'removeHtml',   label: 'Strip HTML tags',                      fn: s => s.replace(/<[^>]*>/g, '') },
  { id: 'removeUrls',   label: 'Remove URLs',                          fn: s => s.replace(/https?:\/\/\S+/g, '') },
  { id: 'toSingleLine', label: 'Join all lines into one line',         fn: s => s.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim() },
];

export default function TextCleaner() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set(['trimLines', 'collapseSpaces', 'removeBlank']));
  const [copied, setCopied] = useState(false);

  const toggle = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const clean = () => {
    let result = input;
    for (const opt of OPTIONS) {
      if (selected.has(opt.id)) result = opt.fn(result);
    }
    setOutput(result);
  };

  const copy = () => {
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="space-y-5">
      {/* Options */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Cleaning options:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {OPTIONS.map(opt => (
            <label key={opt.id} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 rounded-lg p-1.5 -m-1.5">
              <input
                type="checkbox"
                checked={selected.has(opt.id)}
                onChange={() => toggle(opt.id)}
                className="w-4 h-4 accent-indigo-600 shrink-0"
              />
              <span className="text-sm text-gray-600">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Input Text</label>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          rows={6}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
          placeholder="Paste text to clean..."
        />
      </div>

      <button
        onClick={clean}
        disabled={!input}
        className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        🧹 Clean Text
      </button>

      {/* Output */}
      {output !== '' && (
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium text-gray-700">Cleaned Text</label>
            <button onClick={copy} className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">
              {copied ? '✓ Copied!' : 'Copy'}
            </button>
          </div>
          <textarea
            readOnly
            value={output}
            rows={6}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-mono bg-gray-50 text-gray-700 resize-none focus:outline-none"
          />
          <p className="text-xs text-gray-400 mt-1">
            {input.length} → {output.length} characters ({input.length - output.length >= 0 ? '-' : '+'}{Math.abs(input.length - output.length)} chars)
          </p>
        </div>
      )}
    </div>
  );
}
