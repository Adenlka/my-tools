'use client';

import { useState, useMemo } from 'react';

type Unit = 'metric' | 'imperial';

interface Category {
  label: string;
  range: string;
  color: string;        // text
  bg: string;           // filled bar segment
  border: string;       // card border
  badge: string;        // badge bg
  advice: string;
  min: number;
  max: number;          // Infinity for last bucket
}

const CATEGORIES: Category[] = [
  {
    label: 'Underweight',
    range: '< 18.5',
    color: 'text-blue-600',
    bg: 'bg-blue-400',
    border: 'border-blue-200',
    badge: 'bg-blue-50 text-blue-700',
    advice: '您的体重偏低，建议增加营养摄入，咨询营养师制定科学增重方案，同时保持适量运动。',
    min: 0,
    max: 18.5,
  },
  {
    label: 'Normal weight',
    range: '18.5 – 24.9',
    color: 'text-green-600',
    bg: 'bg-green-400',
    border: 'border-green-200',
    badge: 'bg-green-50 text-green-700',
    advice: '体重正常，继续保持均衡饮食与规律运动的健康生活方式，定期体检，维持当前状态。',
    min: 18.5,
    max: 25,
  },
  {
    label: 'Overweight',
    range: '25 – 29.9',
    color: 'text-orange-500',
    bg: 'bg-orange-400',
    border: 'border-orange-200',
    badge: 'bg-orange-50 text-orange-700',
    advice: '体重偏高，建议适当控制热量摄入，增加有氧运动（如快走、游泳），目标每周减重 0.5 kg。',
    min: 25,
    max: 30,
  },
  {
    label: 'Obese',
    range: '≥ 30',
    color: 'text-red-600',
    bg: 'bg-red-500',
    border: 'border-red-200',
    badge: 'bg-red-50 text-red-700',
    advice: '体重过高，存在较高健康风险，强烈建议在医生或营养师指导下制定系统性减重计划。',
    min: 30,
    max: Infinity,
  },
];

// Map a BMI value (capped 10–40) to a 0–100% position on the bar
const BAR_MIN = 10;
const BAR_MAX = 40;
function bmiToPercent(bmi: number) {
  return Math.min(100, Math.max(0, ((bmi - BAR_MIN) / (BAR_MAX - BAR_MIN)) * 100));
}

// Each category occupies a proportional slice of [BAR_MIN, BAR_MAX]
const SEGMENTS = CATEGORIES.map((c) => {
  const lo = Math.max(c.min, BAR_MIN);
  const hi = Math.min(c.max === Infinity ? BAR_MAX : c.max, BAR_MAX);
  return { bg: c.bg, width: ((hi - lo) / (BAR_MAX - BAR_MIN)) * 100 };
});

function calcBMI(unit: Unit, weightKg: number, heightCm: number): number | null {
  if (!weightKg || !heightCm || weightKg <= 0 || heightCm <= 0) return null;
  const hm = heightCm / 100;
  return weightKg / (hm * hm);
}

function getCategory(bmi: number): Category {
  return CATEGORIES.find((c) => bmi >= c.min && bmi < c.max) ?? CATEGORIES[CATEGORIES.length - 1];
}

function NumInput({
  label, value, onChange, unit, min, max, step = 1,
}: {
  label: string; value: string; onChange: (v: string) => void;
  unit: string; min?: number; max?: number; step?: number;
}) {
  return (
    <div className="flex-1">
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent transition bg-white">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={min} max={max} step={step}
          className="flex-1 px-3.5 py-2.5 text-sm text-gray-900 outline-none bg-transparent"
          placeholder="0"
        />
        <span className="px-3 text-sm text-gray-400 bg-gray-50 border-l border-gray-200 py-2.5 select-none">
          {unit}
        </span>
      </div>
    </div>
  );
}

export default function BmiCalculator() {
  const [unitMode, setUnitMode] = useState<Unit>('metric');
  const [weightKg, setWeightKg]   = useState('');
  const [heightCm, setHeightCm]   = useState('');
  const [weightLbs, setWeightLbs] = useState('');
  const [heightFt, setHeightFt]   = useState('');
  const [heightIn, setHeightIn]   = useState('');

  const bmi = useMemo<number | null>(() => {
    if (unitMode === 'metric') {
      return calcBMI('metric', parseFloat(weightKg), parseFloat(heightCm));
    }
    const kg  = parseFloat(weightLbs) * 0.453592;
    const cm  = (parseFloat(heightFt) || 0) * 30.48 + (parseFloat(heightIn) || 0) * 2.54;
    return calcBMI('imperial', kg, cm);
  }, [unitMode, weightKg, heightCm, weightLbs, heightFt, heightIn]);

  const category = bmi !== null ? getCategory(bmi) : null;
  const markerPos = bmi !== null ? bmiToPercent(bmi) : null;

  const switchUnit = (u: Unit) => {
    setUnitMode(u);
    setWeightKg(''); setHeightCm('');
    setWeightLbs(''); setHeightFt(''); setHeightIn('');
  };

  return (
    <div className="space-y-6 max-w-lg mx-auto">
      {/* Unit toggle */}
      <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
        {(['metric', 'imperial'] as Unit[]).map((u) => (
          <button
            key={u}
            onClick={() => switchUnit(u)}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition ${
              unitMode === u
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {u === 'metric' ? 'Metric (kg / cm)' : 'Imperial (lbs / ft)'}
          </button>
        ))}
      </div>

      {/* Inputs */}
      {unitMode === 'metric' ? (
        <div className="flex gap-3">
          <NumInput label="体重" value={weightKg} onChange={setWeightKg} unit="kg" min={1} max={300} step={0.1} />
          <NumInput label="身高" value={heightCm} onChange={setHeightCm} unit="cm" min={50} max={250} />
        </div>
      ) : (
        <div className="space-y-3">
          <NumInput label="体重" value={weightLbs} onChange={setWeightLbs} unit="lbs" min={1} max={700} step={0.1} />
          <div className="flex gap-3">
            <NumInput label="身高" value={heightFt} onChange={setHeightFt} unit="ft" min={0} max={8} />
            <NumInput label="　" value={heightIn} onChange={setHeightIn} unit="in" min={0} max={11} step={0.5} />
          </div>
        </div>
      )}

      {/* Result */}
      {bmi !== null && category ? (
        <div className={`border-2 ${category.border} rounded-2xl p-5 space-y-5`}>
          {/* BMI value */}
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-0.5">您的 BMI</p>
              <p className={`text-5xl font-extrabold ${category.color}`}>{bmi.toFixed(1)}</p>
            </div>
            <span className={`text-sm font-semibold px-3 py-1.5 rounded-full ${category.badge}`}>
              {category.label}
            </span>
          </div>

          {/* Visual bar */}
          <div>
            <div className="relative h-3 rounded-full overflow-visible flex">
              {SEGMENTS.map((seg, i) => (
                <div key={i} className={`h-full ${seg.bg} first:rounded-l-full last:rounded-r-full`} style={{ width: `${seg.width}%` }} />
              ))}
              {/* marker */}
              {markerPos !== null && (
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-white border-2 border-gray-800 rounded-full shadow-md z-10 transition-all duration-300"
                  style={{ left: `${markerPos}%` }}
                />
              )}
            </div>
            <div className="flex justify-between text-[10px] text-gray-400 mt-1.5 px-0.5">
              <span>10</span>
              <span>18.5</span>
              <span>25</span>
              <span>30</span>
              <span>40+</span>
            </div>
          </div>

          {/* Category legend */}
          <div className="grid grid-cols-2 gap-2">
            {CATEGORIES.map((c) => (
              <div
                key={c.label}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs transition ${
                  category.label === c.label ? `${c.badge} font-semibold ring-1 ring-current/20` : 'bg-gray-50 text-gray-500'
                }`}
              >
                <span className={`w-2 h-2 rounded-full shrink-0 ${c.bg}`} />
                <span>{c.label}</span>
                <span className="ml-auto opacity-60">{c.range}</span>
              </div>
            ))}
          </div>

          {/* Advice */}
          <div className={`text-sm ${category.color} bg-white border ${category.border} rounded-xl px-4 py-3 leading-relaxed`}>
            💡 {category.advice}
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 border border-dashed border-gray-200 rounded-2xl p-10 text-center">
          <p className="text-4xl mb-3">⚖️</p>
          <p className="text-sm text-gray-400">输入身高和体重后自动计算</p>
        </div>
      )}

      <p className="text-xs text-gray-400 text-center">
        BMI 仅供参考，不能替代专业医疗诊断。
      </p>
    </div>
  );
}
