'use client';

import { useState } from 'react';

const SAMPLE = `{"name":"MyTools","version":"1.0","tools":["QR Code","PDF Merger","Color Picker"],"free":true}`;

export default function JsonFormatter() {
  const [input, setInput] = useState(SAMPLE);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [indent, setIndent] = useState(2);
  const [copied, setCopied] = useState(false);

  const format = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent));
      setError('');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Invalid JSON');
      setOutput('');
    }
  };

  const minify = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError('');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Invalid JSON');
      setOutput('');
    }
  };

  const copy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const validate = () => {
    try {
      JSON.parse(input);
      setError('✓ Valid JSON');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Invalid JSON');
    }
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600 font-medium">Indent:</label>
          {[2, 4].map(n => (
            <button
              key={n}
              onClick={() => setIndent(n)}
              className={`px-3 py-1 text-sm rounded-lg font-medium transition ${indent === n ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {n}
            </button>
          ))}
        </div>
        <div className="flex gap-2 ml-auto">
          <button onClick={validate} className="px-4 py-1.5 text-sm font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">Validate</button>
          <button onClick={minify} className="px-4 py-1.5 text-sm font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">Minify</button>
          <button onClick={format} className="px-4 py-1.5 text-sm font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">Format</button>
        </div>
      </div>

      {error && (
        <p className={`text-sm font-medium ${error.startsWith('✓') ? 'text-green-600' : 'text-red-500'}`}>{error}</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Input JSON</label>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            className="w-full h-72 border border-gray-300 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
            placeholder="Paste JSON here..."
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium text-gray-700">Output</label>
            <button
              onClick={copy}
              className="text-xs font-medium text-indigo-600 hover:text-indigo-800 transition"
            >
              {copied ? '✓ Copied!' : 'Copy'}
            </button>
          </div>
          <textarea
            readOnly
            value={output}
            className="w-full h-72 border border-gray-200 rounded-xl px-4 py-3 text-sm font-mono text-gray-700 bg-gray-50 resize-none focus:outline-none"
            placeholder="Formatted JSON will appear here..."
          />
        </div>
      </div>

      <button
        onClick={() => { setInput(''); setOutput(''); setError(''); }}
        className="text-sm text-gray-400 hover:text-gray-600 transition"
      >
        Clear
      </button>
    </div>
  );
}
