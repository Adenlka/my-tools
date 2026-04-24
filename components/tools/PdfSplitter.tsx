'use client';

import { useState, useCallback } from 'react';
import { PDFDocument } from 'pdf-lib';

export default function PdfSplitter() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [range, setRange] = useState('');
  const [splitAll, setSplitAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.type !== 'application/pdf') { setError('Please select a PDF file.'); return; }
    setFile(f);
    setError('');
    try {
      const bytes = await f.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);
      setPageCount(pdf.getPageCount());
      setRange(`1-${pdf.getPageCount()}`);
    } catch {
      setError('Could not read PDF file.');
    }
  };

  const parseRange = (raw: string, max: number): number[] => {
    const pages = new Set<number>();
    raw.split(',').forEach(part => {
      const p = part.trim();
      if (p.includes('-')) {
        const [a, b] = p.split('-').map(n => parseInt(n.trim(), 10));
        for (let i = a; i <= b && i <= max; i++) { if (i >= 1) pages.add(i); }
      } else {
        const n = parseInt(p, 10);
        if (n >= 1 && n <= max) pages.add(n);
      }
    });
    return Array.from(pages).sort((a, b) => a - b);
  };

  const downloadPdf = async (bytes: Uint8Array, name: string) => {
    const blob = new Blob([bytes as unknown as ArrayBuffer], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = name; a.click();
    URL.revokeObjectURL(url);
  };

  const split = useCallback(async () => {
    if (!file) { setError('Please select a PDF file first.'); return; }
    setLoading(true); setError('');
    try {
      const bytes = await file.arrayBuffer();
      const srcPdf = await PDFDocument.load(bytes);

      if (splitAll) {
        for (let i = 0; i < srcPdf.getPageCount(); i++) {
          const newPdf = await PDFDocument.create();
          const [page] = await newPdf.copyPages(srcPdf, [i]);
          newPdf.addPage(page);
          await downloadPdf(await newPdf.save(), `page-${i + 1}.pdf`);
        }
      } else {
        const pages = parseRange(range, srcPdf.getPageCount());
        if (pages.length === 0) { setError('No valid pages in range.'); setLoading(false); return; }
        const newPdf = await PDFDocument.create();
        const copied = await newPdf.copyPages(srcPdf, pages.map(p => p - 1));
        copied.forEach(p => newPdf.addPage(p));
        await downloadPdf(await newPdf.save(), 'extracted.pdf');
      }
    } catch {
      setError('Failed to split PDF.');
    } finally {
      setLoading(false);
    }
  }, [file, range, splitAll]);

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl p-8 cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition">
        <span className="text-3xl mb-2">✂️</span>
        <span className="text-sm font-medium text-gray-600">
          {file ? file.name : 'Click to select a PDF file'}
        </span>
        {pageCount > 0 && <span className="text-xs text-gray-400 mt-1">{pageCount} pages</span>}
        <input type="file" accept="application/pdf" onChange={handleFile} className="hidden" />
      </label>

      {file && pageCount > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="splitAll"
              checked={splitAll}
              onChange={e => setSplitAll(e.target.checked)}
              className="w-4 h-4 accent-indigo-600"
            />
            <label htmlFor="splitAll" className="text-sm text-gray-700 font-medium">
              Split into individual pages (1 PDF per page)
            </label>
          </div>

          {!splitAll && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Page range <span className="text-gray-400 font-normal">(e.g. 1-3, 5, 7-9)</span>
              </label>
              <input
                type="text"
                value={range}
                onChange={e => setRange(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder={`1-${pageCount}`}
              />
            </div>
          )}
        </div>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        onClick={split}
        disabled={!file || loading}
        className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {loading ? 'Processing...' : splitAll ? 'Split into Individual Pages' : 'Extract Pages'}
      </button>
    </div>
  );
}
