'use client';

import { useState } from 'react';

function encodeBase64(text: string): string {
  try {
    return btoa(unescape(encodeURIComponent(text)));
  } catch {
    return '';
  }
}

function decodeBase64(b64: string): string {
  try {
    return decodeURIComponent(escape(atob(b64.trim())));
  } catch {
    return '';
  }
}

export default function Base64Encoder() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [fileMode, setFileMode] = useState(false);

  const process = () => {
    setError('');
    if (!input.trim()) { setOutput(''); return; }
    if (mode === 'encode') {
      setOutput(encodeBase64(input));
    } else {
      const result = decodeBase64(input);
      if (!result && input.trim()) {
        setError('Invalid Base64 string.');
        setOutput('');
      } else {
        setOutput(result);
      }
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // result is like "data:image/png;base64,iVBOR..."
      const b64 = result.split(',')[1] ?? result;
      setOutput(b64);
      setInput(`[File: ${f.name}]`);
      setError('');
    };
    reader.readAsDataURL(f);
  };

  const copy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const swap = () => {
    setInput(output);
    setOutput('');
    setMode(m => m === 'encode' ? 'decode' : 'encode');
  };

  return (
    <div className="space-y-5">
      {/* Mode toggle */}
      <div className="flex gap-2">
        {(['encode', 'decode'] as const).map(m => (
          <button
            key={m}
            onClick={() => { setMode(m); setOutput(''); setError(''); }}
            className={`px-5 py-2 rounded-xl text-sm font-semibold transition ${mode === m ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            {m === 'encode' ? 'Encode' : 'Decode'}
          </button>
        ))}
        <label className="flex items-center gap-2 ml-auto cursor-pointer">
          <input type="checkbox" checked={fileMode} onChange={e => setFileMode(e.target.checked)} className="w-4 h-4 accent-indigo-600" />
          <span className="text-sm text-gray-600">File to Base64</span>
        </label>
      </div>

      {fileMode && mode === 'encode' ? (
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl p-6 cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition">
          <span className="text-2xl mb-1">📎</span>
          <span className="text-sm text-gray-500">Click to select a file</span>
          <input type="file" onChange={handleFile} className="hidden" />
        </label>
      ) : (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {mode === 'encode' ? 'Text to encode' : 'Base64 to decode'}
          </label>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            rows={5}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
            placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Paste Base64 string to decode...'}
          />
        </div>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex gap-3">
        <button
          onClick={process}
          className="flex-1 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition"
        >
          {mode === 'encode' ? 'Encode →' : '← Decode'}
        </button>
        <button
          onClick={swap}
          title="Swap input/output"
          className="px-4 py-2.5 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition font-medium"
        >
          ⇄
        </button>
      </div>

      {output && (
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium text-gray-700">Result</label>
            <button onClick={copy} className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">
              {copied ? '✓ Copied!' : 'Copy'}
            </button>
          </div>
          <textarea
            readOnly
            value={output}
            rows={5}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-mono bg-gray-50 text-gray-700 resize-none focus:outline-none"
          />
        </div>
      )}
    </div>
  );
}
