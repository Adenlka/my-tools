'use client';

import { useState, useCallback } from 'react';
import { PDFDocument } from 'pdf-lib';

interface ImgItem { file: File; url: string; }

export default function ImageToPdf() {
  const [images, setImages] = useState<ImgItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []).filter(f =>
      ['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(f.type)
    );
    const items: ImgItem[] = files.map(f => ({ file: f, url: URL.createObjectURL(f) }));
    setImages(prev => [...prev, ...items]);
    setError('');
  };

  const remove = (idx: number) => {
    setImages(prev => {
      URL.revokeObjectURL(prev[idx].url);
      return prev.filter((_, i) => i !== idx);
    });
  };

  const moveUp = (idx: number) => {
    if (idx === 0) return;
    setImages(prev => { const a = [...prev]; [a[idx-1], a[idx]] = [a[idx], a[idx-1]]; return a; });
  };
  const moveDown = (idx: number) => {
    setImages(prev => {
      if (idx === prev.length - 1) return prev;
      const a = [...prev]; [a[idx], a[idx+1]] = [a[idx+1], a[idx]]; return a;
    });
  };

  const convert = useCallback(async () => {
    if (images.length === 0) { setError('Please add at least one image.'); return; }
    setLoading(true); setError('');
    try {
      const pdf = await PDFDocument.create();
      for (const item of images) {
        const bytes = await item.file.arrayBuffer();
        let img;
        if (item.file.type === 'image/png') img = await pdf.embedPng(bytes);
        else {
          // Convert to JPEG-compatible via canvas for webp/gif
          if (item.file.type === 'image/jpeg') {
            img = await pdf.embedJpg(bytes);
          } else {
            const canvas = document.createElement('canvas');
            const bmp = await createImageBitmap(item.file);
            canvas.width = bmp.width; canvas.height = bmp.height;
            canvas.getContext('2d')!.drawImage(bmp, 0, 0);
            const jpegBytes = await new Promise<ArrayBuffer>(res => {
              canvas.toBlob(b => b!.arrayBuffer().then(res), 'image/jpeg', 0.92);
            });
            img = await pdf.embedJpg(jpegBytes);
          }
        }
        const page = pdf.addPage([img.width, img.height]);
        page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
      }
      const pdfBytes = await pdf.save();
      const blob = new Blob([pdfBytes as unknown as ArrayBuffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'images.pdf'; a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      setError('Failed to convert images to PDF.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [images]);

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl p-8 cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition">
        <span className="text-3xl mb-2">🖼️</span>
        <span className="text-sm font-medium text-gray-600">Click to add images</span>
        <span className="text-xs text-gray-400 mt-1">JPG, PNG, WebP, GIF supported</span>
        <input type="file" accept="image/*" multiple onChange={handleFiles} className="hidden" />
      </label>

      {images.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">{images.length} image(s) — will become 1 page each:</p>
          {images.map((item, i) => (
            <div key={i} className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.url} alt="" className="w-10 h-10 object-cover rounded-lg" />
              <span className="flex-1 text-sm text-gray-700 truncate">{item.file.name}</span>
              <button onClick={() => moveUp(i)} disabled={i===0} className="text-gray-400 hover:text-indigo-600 disabled:opacity-30">▲</button>
              <button onClick={() => moveDown(i)} disabled={i===images.length-1} className="text-gray-400 hover:text-indigo-600 disabled:opacity-30">▼</button>
              <button onClick={() => remove(i)} className="text-gray-400 hover:text-red-500">✕</button>
            </div>
          ))}
        </div>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        onClick={convert}
        disabled={images.length === 0 || loading}
        className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {loading ? 'Converting...' : `Convert ${images.length || ''} Image${images.length !== 1 ? 's' : ''} to PDF`}
      </button>
    </div>
  );
}
