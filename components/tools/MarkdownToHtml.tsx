'use client';

import { useState, useEffect } from 'react';
import { marked } from 'marked';

const SAMPLE = `# Hello, Markdown!

This is a **bold** word and this is *italic*.

## Features
- Converts Markdown to HTML instantly
- Live preview on the right
- Copy HTML with one click

## Code Example
\`\`\`js
const greet = name => \`Hello, \${name}!\`;
\`\`\`

> Blockquotes look great too.

---

[Visit MyTools](https://alka003.xyz)
`;

export default function MarkdownToHtml() {
  const [markdown, setMarkdown] = useState(SAMPLE);
  const [html, setHtml] = useState('');
  const [copied, setCopied] = useState(false);
  const [tab, setTab] = useState<'preview' | 'html'>('preview');

  useEffect(() => {
    const result = marked.parse(markdown);
    if (typeof result === 'string') {
      setHtml(result);
    } else {
      result.then(setHtml);
    }
  }, [markdown]);

  const copy = () => {
    navigator.clipboard.writeText(html).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Markdown Input</label>
          <textarea
            value={markdown}
            onChange={e => setMarkdown(e.target.value)}
            className="w-full h-80 border border-gray-300 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
            placeholder="Type your Markdown here..."
          />
        </div>

        {/* Output */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <div className="flex gap-2">
              <button
                onClick={() => setTab('preview')}
                className={`text-sm font-medium px-3 py-1 rounded-lg transition ${tab === 'preview' ? 'bg-indigo-600 text-white' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Preview
              </button>
              <button
                onClick={() => setTab('html')}
                className={`text-sm font-medium px-3 py-1 rounded-lg transition ${tab === 'html' ? 'bg-indigo-600 text-white' : 'text-gray-500 hover:text-gray-700'}`}
              >
                HTML
              </button>
            </div>
            <button
              onClick={copy}
              className="text-xs font-medium text-indigo-600 hover:text-indigo-800 transition"
            >
              {copied ? '✓ Copied!' : 'Copy HTML'}
            </button>
          </div>

          {tab === 'preview' ? (
            <div
              className="h-80 overflow-auto border border-gray-200 rounded-xl px-4 py-3 prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          ) : (
            <textarea
              readOnly
              value={html}
              className="w-full h-80 border border-gray-200 rounded-xl px-4 py-3 text-sm font-mono text-gray-600 bg-gray-50 resize-none focus:outline-none"
            />
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => setMarkdown('')}
          className="text-sm text-gray-400 hover:text-gray-600 transition"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
