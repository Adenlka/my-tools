'use client';

import { useState, useMemo } from 'react';

const WEEKDAYS = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
const WEEKDAYS_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function toDateOnly(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function today(): Date {
  return toDateOnly(new Date());
}

/** Difference in exact years / months / days between two date-only values (from < to). */
function exactDiff(from: Date, to: Date) {
  let years  = to.getFullYear() - from.getFullYear();
  let months = to.getMonth()    - from.getMonth();
  let days   = to.getDate()     - from.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(to.getFullYear(), to.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }
  return { years, months, days };
}

function totalDays(from: Date, to: Date): number {
  return Math.round((to.getTime() - from.getTime()) / 86_400_000);
}

function nextBirthdayDays(birth: Date, ref: Date): { days: number; date: Date } {
  const thisYear = new Date(ref.getFullYear(), birth.getMonth(), birth.getDate());
  const nextYear = new Date(ref.getFullYear() + 1, birth.getMonth(), birth.getDate());
  const candidate = thisYear >= ref ? thisYear : nextYear;
  return { days: totalDays(ref, candidate), date: candidate };
}

type Mode = 'age' | 'diff';

function InfoCard({ icon, label, value, sub }: { icon: string; label: string; value: string; sub?: string }) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 flex flex-col gap-1">
      <div className="flex items-center gap-1.5 text-xs text-gray-400">
        <span>{icon}</span>
        <span>{label}</span>
      </div>
      <div className="text-xl font-extrabold text-gray-900 leading-tight">{value}</div>
      {sub && <div className="text-xs text-gray-400">{sub}</div>}
    </div>
  );
}

function DateField({ label, value, onChange, max }: {
  label: string; value: string; onChange: (v: string) => void; max?: string;
}) {
  return (
    <div className="flex-1">
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <input
        type="date"
        value={value}
        max={max}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-white"
      />
    </div>
  );
}

export default function AgeCalculator() {
  const [mode, setMode]       = useState<Mode>('age');
  const [birthStr, setBirth]  = useState('');
  const [refStr, setRef]      = useState('');   // target date (age mode) or end date (diff mode)
  const [startStr, setStart]  = useState('');   // diff mode: start date

  const todayStr = today().toISOString().slice(0, 10);

  // ── Age mode result ──────────────────────────────────────────────
  const ageResult = useMemo(() => {
    if (mode !== 'age' || !birthStr) return null;
    const birth = toDateOnly(new Date(birthStr));
    const ref   = refStr ? toDateOnly(new Date(refStr)) : today();
    if (birth > ref) return null;

    const { years, months, days } = exactDiff(birth, ref);
    const td   = totalDays(birth, ref);
    const nb   = nextBirthdayDays(birth, ref);
    const dow  = birth.getDay();
    const isBirthday = nb.days === 0;

    return { years, months, days, totalDays: td, totalHours: td * 24, dow, nb, isBirthday, birth };
  }, [mode, birthStr, refStr]);

  // ── Diff mode result ─────────────────────────────────────────────
  const diffResult = useMemo(() => {
    if (mode !== 'diff' || !startStr || !refStr) return null;
    const a = toDateOnly(new Date(startStr));
    const b = toDateOnly(new Date(refStr));
    const [from, to] = a <= b ? [a, b] : [b, a];
    const { years, months, days } = exactDiff(from, to);
    return { years, months, days, totalDays: totalDays(from, to), from, to };
  }, [mode, startStr, refStr]);

  return (
    <div className="space-y-6 max-w-lg mx-auto">
      {/* Mode toggle */}
      <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
        {(['age', 'diff'] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition ${
              mode === m ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {m === 'age' ? '🎂 年龄计算' : '📅 日期差值'}
          </button>
        ))}
      </div>

      {/* Inputs */}
      {mode === 'age' ? (
        <div className="flex flex-col sm:flex-row gap-3">
          <DateField label="出生日期" value={birthStr} onChange={setBirth} max={todayStr} />
          <DateField
            label={`目标日期（留空 = 今天 ${todayStr}）`}
            value={refStr}
            onChange={setRef}
          />
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row gap-3">
          <DateField label="起始日期" value={startStr} onChange={setStart} />
          <DateField label="结束日期" value={refStr}   onChange={setRef}   />
        </div>
      )}

      {/* ── Age result ── */}
      {mode === 'age' && ageResult && (
        <div className="space-y-4">
          {/* Main age display */}
          <div className="bg-indigo-50 border border-indigo-200 rounded-2xl px-6 py-5 text-center">
            {ageResult.isBirthday && (
              <p className="text-sm font-semibold text-indigo-500 mb-1">🎉 今天是生日！</p>
            )}
            <p className="text-xs text-indigo-400 uppercase tracking-wide mb-1">您的年龄</p>
            <div className="flex items-end justify-center gap-1 text-indigo-700">
              <span className="text-5xl font-extrabold">{ageResult.years}</span>
              <span className="text-lg font-semibold mb-1">岁</span>
              <span className="text-5xl font-extrabold ml-3">{ageResult.months}</span>
              <span className="text-lg font-semibold mb-1">月</span>
              <span className="text-5xl font-extrabold ml-3">{ageResult.days}</span>
              <span className="text-lg font-semibold mb-1">天</span>
            </div>
          </div>

          {/* Info cards grid */}
          <div className="grid grid-cols-2 gap-3">
            <InfoCard
              icon="📆"
              label="出生星期"
              value={WEEKDAYS[ageResult.dow]}
              sub={WEEKDAYS_EN[ageResult.dow]}
            />
            <InfoCard
              icon="🎁"
              label="距下次生日"
              value={ageResult.isBirthday ? '就是今天！' : `${ageResult.nb.days} 天`}
              sub={ageResult.isBirthday ? '🎂' : ageResult.nb.date.toLocaleDateString('zh-CN')}
            />
            <InfoCard
              icon="🗓️"
              label="已活天数"
              value={ageResult.totalDays.toLocaleString()}
              sub="天"
            />
            <InfoCard
              icon="⏰"
              label="已活小时"
              value={ageResult.totalHours.toLocaleString()}
              sub="小时（约）"
            />
          </div>
        </div>
      )}

      {/* ── Diff result ── */}
      {mode === 'diff' && diffResult && (
        <div className="space-y-4">
          <div className="bg-indigo-50 border border-indigo-200 rounded-2xl px-6 py-5 text-center">
            <p className="text-xs text-indigo-400 uppercase tracking-wide mb-1">两日期相差</p>
            <div className="flex items-end justify-center gap-1 text-indigo-700">
              <span className="text-5xl font-extrabold">{diffResult.years}</span>
              <span className="text-lg font-semibold mb-1">年</span>
              <span className="text-5xl font-extrabold ml-3">{diffResult.months}</span>
              <span className="text-lg font-semibold mb-1">月</span>
              <span className="text-5xl font-extrabold ml-3">{diffResult.days}</span>
              <span className="text-lg font-semibold mb-1">天</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <InfoCard
              icon="📅"
              label="起始日期"
              value={diffResult.from.toLocaleDateString('zh-CN')}
              sub={WEEKDAYS[diffResult.from.getDay()]}
            />
            <InfoCard
              icon="📅"
              label="结束日期"
              value={diffResult.to.toLocaleDateString('zh-CN')}
              sub={WEEKDAYS[diffResult.to.getDay()]}
            />
            <InfoCard
              icon="🗓️"
              label="总天数"
              value={diffResult.totalDays.toLocaleString()}
              sub="天"
            />
            <InfoCard
              icon="📆"
              label="总周数"
              value={Math.floor(diffResult.totalDays / 7).toLocaleString()}
              sub={`余 ${diffResult.totalDays % 7} 天`}
            />
          </div>
        </div>
      )}

      {/* Empty state */}
      {((mode === 'age' && !ageResult) || (mode === 'diff' && !diffResult)) && (
        <div className="bg-gray-50 border border-dashed border-gray-200 rounded-2xl p-10 text-center">
          <p className="text-4xl mb-3">🎂</p>
          <p className="text-sm text-gray-400">
            {mode === 'age' ? '请输入出生日期' : '请选择起止日期'}
          </p>
        </div>
      )}

      <p className="text-xs text-gray-400 text-center">基于公历计算，时区为本地时间</p>
    </div>
  );
}
