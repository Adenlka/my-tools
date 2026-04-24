'use client';

import { useState } from 'react';

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m ? { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) } : null;
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

const PALETTE = [
  '#ef4444','#f97316','#eab308','#22c55e','#3b82f6','#8b5cf6','#ec4899',
  '#000000','#374151','#6b7280','#d1d5db','#ffffff',
];

export default function ColorPicker() {
  const [hex, setHex] = useState('#6366f1');
  const [copied, setCopied] = useState('');

  const rgb = hexToRgb(hex);
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;

  const copy = (val: string, label: string) => {
    navigator.clipboard.writeText(val).then(() => {
      setCopied(label);
      setTimeout(() => setCopied(''), 2000);
    });
  };

  const handleHexInput = (v: string) => {
    const clean = v.startsWith('#') ? v : '#' + v;
    if (/^#[0-9a-fA-F]{0,6}$/.test(clean)) setHex(clean);
  };

  const isValidHex = /^#[0-9a-fA-F]{6}$/.test(hex);

  const values = isValidHex && rgb && hsl ? [
    { label: 'HEX', value: hex.toUpperCase() },
    { label: 'RGB', value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
    { label: 'HSL', value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
    { label: 'R', value: String(rgb.r) },
    { label: 'G', value: String(rgb.g) },
    { label: 'B', value: String(rgb.b) },
  ] : [];

  return (
    <div className="space-y-6 max-w-md mx-auto">
      {/* Color preview */}
      <div
        className="w-full h-40 rounded-2xl border border-gray-200 shadow-inner transition-colors duration-150"
        style={{ backgroundColor: isValidHex ? hex : '#e5e7eb' }}
      />

      {/* Picker + hex input */}
      <div className="flex items-center gap-4">
        <label className="relative cursor-pointer">
          <input
            type="color"
            value={isValidHex ? hex : '#000000'}
            onChange={e => setHex(e.target.value)}
            className="w-14 h-14 rounded-xl border border-gray-300 cursor-pointer p-0.5"
          />
        </label>
        <input
          type="text"
          value={hex}
          onChange={e => handleHexInput(e.target.value)}
          maxLength={7}
          className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-sm font-mono uppercase focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="#000000"
        />
      </div>

      {/* Quick palette */}
      <div>
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-2">Quick Palette</p>
        <div className="flex flex-wrap gap-2">
          {PALETTE.map(c => (
            <button
              key={c}
              onClick={() => setHex(c)}
              style={{ backgroundColor: c }}
              className={`w-8 h-8 rounded-lg border-2 transition hover:scale-110 ${hex.toLowerCase() === c ? 'border-indigo-500' : 'border-gray-200'}`}
              title={c}
            />
          ))}
        </div>
      </div>

      {/* Values */}
      {values.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {values.map(({ label, value }) => (
            <button
              key={label}
              onClick={() => copy(value, label)}
              className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-left hover:border-indigo-300 hover:bg-indigo-50 transition group"
            >
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{label}</p>
                <p className="text-sm font-mono text-gray-800">{value}</p>
              </div>
              <span className="text-xs text-indigo-500 opacity-0 group-hover:opacity-100 transition font-medium">
                {copied === label ? '✓' : 'Copy'}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
