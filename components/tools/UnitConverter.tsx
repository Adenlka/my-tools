'use client';

import { useState, useMemo, useCallback } from 'react';

// ─────────────────────────────────────────────
// Type definitions
// ─────────────────────────────────────────────
type CategoryKey = 'length' | 'weight' | 'temperature' | 'area';

interface UnitDef {
  key: string;
  label: string;
  symbol: string;
  /** Convert this unit → base unit (metre / gram / celsius / m²) */
  toBase: (v: number) => number;
  /** Convert base unit → this unit */
  fromBase: (v: number) => number;
}

interface Category {
  key: CategoryKey;
  label: string;
  icon: string;
  units: UnitDef[];
}

// ─────────────────────────────────────────────
// Unit definitions
// ─────────────────────────────────────────────
const CATEGORIES: Category[] = [
  {
    key: 'length',
    label: 'Length',
    icon: '📏',
    units: [
      { key: 'mm',    label: 'Millimeter', symbol: 'mm',   toBase: v => v / 1000,       fromBase: v => v * 1000 },
      { key: 'cm',    label: 'Centimeter', symbol: 'cm',   toBase: v => v / 100,         fromBase: v => v * 100 },
      { key: 'm',     label: 'Meter',      symbol: 'm',    toBase: v => v,               fromBase: v => v },
      { key: 'km',    label: 'Kilometer',  symbol: 'km',   toBase: v => v * 1000,        fromBase: v => v / 1000 },
      { key: 'inch',  label: 'Inch',       symbol: 'in',   toBase: v => v * 0.0254,      fromBase: v => v / 0.0254 },
      { key: 'foot',  label: 'Foot',       symbol: 'ft',   toBase: v => v * 0.3048,      fromBase: v => v / 0.3048 },
      { key: 'yard',  label: 'Yard',       symbol: 'yd',   toBase: v => v * 0.9144,      fromBase: v => v / 0.9144 },
      { key: 'mile',  label: 'Mile',       symbol: 'mi',   toBase: v => v * 1609.344,    fromBase: v => v / 1609.344 },
    ],
  },
  {
    key: 'weight',
    label: 'Weight',
    icon: '⚖️',
    units: [
      { key: 'mg',    label: 'Milligram',  symbol: 'mg',   toBase: v => v / 1_000_000,   fromBase: v => v * 1_000_000 },
      { key: 'g',     label: 'Gram',       symbol: 'g',    toBase: v => v / 1000,         fromBase: v => v * 1000 },
      { key: 'kg',    label: 'Kilogram',   symbol: 'kg',   toBase: v => v,                fromBase: v => v },
      { key: 'ton',   label: 'Metric Ton', symbol: 't',    toBase: v => v * 1000,         fromBase: v => v / 1000 },
      { key: 'oz',    label: 'Ounce',      symbol: 'oz',   toBase: v => v * 0.0283495,    fromBase: v => v / 0.0283495 },
      { key: 'lb',    label: 'Pound',      symbol: 'lb',   toBase: v => v * 0.453592,     fromBase: v => v / 0.453592 },
    ],
  },
  {
    key: 'temperature',
    label: 'Temperature',
    icon: '🌡️',
    units: [
      {
        key: 'c', label: 'Celsius',    symbol: '°C',
        toBase:   v => v,
        fromBase: v => v,
      },
      {
        key: 'f', label: 'Fahrenheit', symbol: '°F',
        toBase:   v => (v - 32) * 5 / 9,
        fromBase: v => v * 9 / 5 + 32,
      },
      {
        key: 'k', label: 'Kelvin',     symbol: 'K',
        toBase:   v => v - 273.15,
        fromBase: v => v + 273.15,
      },
    ],
  },
  {
    key: 'area',
    label: 'Area',
    icon: '📐',
    units: [
      { key: 'mm2',    label: 'Sq. Millimeter', symbol: 'mm²',   toBase: v => v / 1_000_000,    fromBase: v => v * 1_000_000 },
      { key: 'cm2',    label: 'Sq. Centimeter', symbol: 'cm²',   toBase: v => v / 10_000,        fromBase: v => v * 10_000 },
      { key: 'm2',     label: 'Sq. Meter',      symbol: 'm²',    toBase: v => v,                 fromBase: v => v },
      { key: 'km2',    label: 'Sq. Kilometer',  symbol: 'km²',   toBase: v => v * 1_000_000,     fromBase: v => v / 1_000_000 },
      { key: 'sqft',   label: 'Sq. Foot',       symbol: 'ft²',   toBase: v => v * 0.092903,      fromBase: v => v / 0.092903 },
      { key: 'sqyard', label: 'Sq. Yard',       symbol: 'yd²',   toBase: v => v * 0.836127,      fromBase: v => v / 0.836127 },
      { key: 'acre',   label: 'Acre',           symbol: 'ac',    toBase: v => v * 4046.856,      fromBase: v => v / 4046.856 },
    ],
  },
];

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────
function formatNum(n: number): string {
  if (!isFinite(n)) return '—';
  const abs = Math.abs(n);
  if (abs === 0) return '0';
  if (abs >= 1e15 || (abs < 1e-6 && abs > 0)) return n.toExponential(6);
  if (abs >= 1000)  return n.toLocaleString('en-US', { maximumFractionDigits: 6 });
  return parseFloat(n.toPrecision(10)).toString();
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────
export default function UnitConverter() {
  const [activeKey, setActiveKey] = useState<CategoryKey>('length');
  const [inputUnit, setInputUnit] = useState<string>('m');
  const [inputVal,  setInputVal]  = useState<string>('1');
  const [copiedKey, setCopied]    = useState<string | null>(null);

  const category = useMemo(
    () => CATEGORIES.find(c => c.key === activeKey)!,
    [activeKey],
  );

  // When tab changes, reset input unit to first unit of new category
  const switchCategory = useCallback((key: CategoryKey) => {
    const cat = CATEGORIES.find(c => c.key === key)!;
    setActiveKey(key);
    setInputUnit(cat.units[0].key);
    setInputVal('1');
    setCopied(null);
  }, []);

  // Compute all results
  const results = useMemo(() => {
    const num = parseFloat(inputVal);
    if (isNaN(num)) return null;

    const srcUnit = category.units.find(u => u.key === inputUnit);
    if (!srcUnit) return null;

    const baseVal = srcUnit.toBase(num);

    return category.units.map(u => ({
      ...u,
      result: u.fromBase(baseVal),
      isSource: u.key === inputUnit,
    }));
  }, [inputVal, inputUnit, category]);

  const handleCopy = useCallback(async (text: string, key: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 1800);
  }, []);

  return (
    <div className="space-y-5">
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map(cat => (
          <button
            key={cat.key}
            onClick={() => switchCategory(cat.key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border transition ${
              activeKey === cat.key
                ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                : 'bg-white border-gray-300 text-gray-600 hover:border-indigo-300 hover:text-indigo-600'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Input row */}
      <div className="flex gap-2">
        <div className="flex-1 flex items-center border border-gray-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent transition bg-white">
          <input
            type="number"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            className="flex-1 px-4 py-2.5 text-sm text-gray-900 outline-none bg-transparent"
            placeholder="输入数值..."
          />
        </div>
        <select
          value={inputUnit}
          onChange={e => setInputUnit(e.target.value)}
          className="px-3 py-2.5 rounded-xl border border-gray-300 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition cursor-pointer"
        >
          {category.units.map(u => (
            <option key={u.key} value={u.key}>
              {u.label} ({u.symbol})
            </option>
          ))}
        </select>
      </div>

      {/* Results table */}
      {results ? (
        <div className="rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-2.5 font-semibold text-gray-500 text-xs uppercase tracking-wide w-1/3">
                  单位
                </th>
                <th className="text-left px-4 py-2.5 font-semibold text-gray-500 text-xs uppercase tracking-wide">
                  结果
                </th>
                <th className="w-10" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {results.map(row => (
                <tr
                  key={row.key}
                  className={`group transition-colors ${
                    row.isSource ? 'bg-indigo-50' : 'hover:bg-gray-50'
                  }`}
                >
                  {/* Unit name */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-block text-xs font-mono font-bold px-2 py-0.5 rounded-md ${
                          row.isSource
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {row.symbol}
                      </span>
                      <span className={`hidden sm:inline text-xs ${row.isSource ? 'text-indigo-700 font-medium' : 'text-gray-500'}`}>
                        {row.label}
                      </span>
                    </div>
                  </td>

                  {/* Result value */}
                  <td className="px-4 py-3">
                    <span className={`font-mono font-semibold ${row.isSource ? 'text-indigo-700' : 'text-gray-900'}`}>
                      {formatNum(row.result)}
                    </span>
                    <span className={`ml-1.5 text-xs ${row.isSource ? 'text-indigo-400' : 'text-gray-400'}`}>
                      {row.symbol}
                    </span>
                  </td>

                  {/* Copy button */}
                  <td className="pr-3 py-3 text-right">
                    <button
                      onClick={() => handleCopy(formatNum(row.result), row.key)}
                      className="opacity-0 group-hover:opacity-100 focus:opacity-100 flex items-center gap-1 ml-auto text-xs border px-2 py-1 rounded-lg transition bg-white border-gray-300 text-gray-400 hover:text-indigo-600 hover:border-indigo-300"
                      title="复制"
                    >
                      {copiedKey === row.key ? (
                        <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-4 10h6a2 2 0 002-2v-8a2 2 0 00-2-2h-6a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-gray-50 border border-dashed border-gray-200 rounded-2xl p-10 text-center">
          <p className="text-3xl mb-3">📐</p>
          <p className="text-sm text-gray-400">请输入数值以查看换算结果</p>
        </div>
      )}

      <p className="text-xs text-gray-400 text-right">
        温度换算基于精确公式；其余单位基于 SI 标准。
      </p>
    </div>
  );
}
