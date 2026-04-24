'use client';

import { useState, useCallback } from 'react';
import { PDFDocument } from 'pdf-lib';

export default function PdfMerger() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).filter(f => f.type === 'application/pdf');
      setFiles(prev => [...prev, ...newFiles]);
      setError('');
    }
  };

  const removeFile = (idx: number) => {
    setFiles(prev => prev.filter((_, i) => i !== idx));
  };

  const moveUp = (idx: number) => {
    if (idx === 0) return;
    setFiles(prev => {
      const arr = [...prev];
      [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
      return arr;
    });
  };

  const moveDown = (idx: number) => {
    setFiles(prev => {
      if (idx === prev.length - 1) return prev;
      const arr = [...prev];
      [arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]];
      return arr;
    });
  };

  const mergePdfs = useCallback(async () => {
    if (files.length < 2) {
      setError('Please add at least 2 PDF files.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const merged = await PDFDocument.create();
      for (const file of files) {
        const bytes = await file.arrayBuffer();
        const pdf = await PDFDocument.load(bytes);
        const pages = await merged.copyPages(pdf, pdf.getPageIndices());
        pages.forEach(p => merged.addPage(p));
      }
      const pdfBytes = await merged.save();
      const blob = new Blob([pdfBytes as unknown as ArrayBuffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'merged.pdf';
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setError('Failed to merge PDFs. Please make sure all files are valid PDFs.');
    } finally {
      setLoading(false);
    }
  }, [files]);

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl p-8 cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition">
        <span className="text-3xl mb-2">📄</span>
        <span className="text-sm font-medium text-gray-600">Click to add PDF files</span>
        <span className="text-xs text-gray-400 mt-1">Only PDF files are accepted</span>
        <input type="file" accept="application/pdf" multiple onChange={handleFiles} className="hidden" />
      </label>

      {files.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">{files.length} file(s) — drag to reorder:</p>
          {files.map((f, i) => (
            <div key={i} className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5">
              <span className="text-indigo-500 font-bold text-sm w-5 text-center">{i + 1}</span>
              <span className="flex-1 text-sm text-gray-700 truncate">{f.name}</span>
              <span className="text-xs text-gray-400">{(f.size / 1024).toFixed(0)} KB</span>
              <button onClick={() => moveUp(i)} disabled={i === 0} className="text-gray-400 hover:text-indigo-600 disabled:opacity-30 px-1">▲</button>
              <button onClick={() => moveDown(i)} disabled={i === files.length - 1} className="text-gray-400 hover:text-indigo-600 disabled:opacity-30 px-1">▼</button>
              <button onClick={() => removeFile(i)} className="text-gray-400 hover:text-red-500 px-1">✕</button>
            </div>
          ))}
        </div>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        onClick={mergePdfs}
        disabled={files.length < 2 || loading}
        className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {loading ? 'Merging...' : `Merge ${files.length} PDFs`}
      </button>
    </div>
  );
}
