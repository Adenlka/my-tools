'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export default function CountdownTimer() {
  const [hours, setHours] = useState('0');
  const [minutes, setMinutes] = useState('5');
  const [seconds, setSeconds] = useState('0');
  const [remaining, setRemaining] = useState<number | null>(null);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalSeconds = () => {
    const h = parseInt(hours, 10) || 0;
    const m = parseInt(minutes, 10) || 0;
    const s = parseInt(seconds, 10) || 0;
    return h * 3600 + m * 60 + s;
  };

  const stop = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setRunning(false);
  }, []);

  const start = () => {
    if (running) return;
    const total = remaining !== null ? remaining : totalSeconds();
    if (total <= 0) return;
    setFinished(false);
    setRemaining(total);
    setRunning(true);
  };

  const pause = () => stop();

  const reset = () => {
    stop();
    setRemaining(null);
    setFinished(false);
  };

  useEffect(() => {
    if (!running || remaining === null) return;
    intervalRef.current = setInterval(() => {
      setRemaining(prev => {
        if (prev === null || prev <= 1) {
          clearInterval(intervalRef.current!);
          setRunning(false);
          setFinished(true);
          // Play beep via AudioContext
          try {
            const ctx = new AudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain); gain.connect(ctx.destination);
            osc.frequency.value = 880;
            osc.type = 'sine';
            gain.gain.setValueAtTime(0.5, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 1.5);
          } catch { /* ignore */ }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running, remaining]);

  const display = remaining !== null ? remaining : totalSeconds();
  const h = Math.floor(display / 3600);
  const m = Math.floor((display % 3600) / 60);
  const s = display % 60;
  const pad = (n: number) => String(n).padStart(2, '0');

  const total = remaining !== null ? remaining : totalSeconds();
  const initial = totalSeconds();
  const progress = initial > 0 ? (remaining !== null ? remaining / initial : 1) : 1;

  // Radial progress ring
  const radius = 88;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - progress);

  const numInput = (val: string, setter: (v: string) => void, max: number) => {
    const n = parseInt(val, 10);
    if (val === '' || (n >= 0 && n <= max)) setter(val);
  };

  return (
    <div className="space-y-8 max-w-sm mx-auto text-center">
      {/* Ring */}
      <div className="relative inline-flex items-center justify-center">
        <svg width={200} height={200} className="-rotate-90">
          <circle cx={100} cy={100} r={radius} fill="none" stroke="#e5e7eb" strokeWidth={10} />
          <circle
            cx={100} cy={100} r={radius} fill="none"
            stroke={finished ? '#22c55e' : '#6366f1'}
            strokeWidth={10}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className={`text-4xl font-extrabold font-mono ${finished ? 'text-green-600' : 'text-gray-900'}`}>
            {h > 0 ? `${pad(h)}:` : ''}{pad(m)}:{pad(s)}
          </span>
          {finished && <span className="text-sm text-green-600 font-semibold mt-1">Time&apos;s up!</span>}
        </div>
      </div>

      {/* Inputs */}
      {!running && remaining === null && (
        <div className="flex justify-center gap-3">
          {[
            { label: 'Hours', value: hours, setter: setHours, max: 23 },
            { label: 'Min', value: minutes, setter: setMinutes, max: 59 },
            { label: 'Sec', value: seconds, setter: setSeconds, max: 59 },
          ].map(({ label, value, setter, max }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span className="text-xs text-gray-400 font-medium">{label}</span>
              <input
                type="number"
                value={value}
                onChange={e => numInput(e.target.value, setter, max)}
                min={0}
                max={max}
                className="w-16 text-center border border-gray-300 rounded-xl px-2 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          ))}
        </div>
      )}

      {/* Controls */}
      <div className="flex justify-center gap-3">
        {!running ? (
          <button
            onClick={start}
            disabled={totalSeconds() <= 0 && remaining === null}
            className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition"
          >
            {remaining !== null && remaining > 0 ? '▶ Resume' : '▶ Start'}
          </button>
        ) : (
          <button
            onClick={pause}
            className="px-8 py-3 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-600 transition"
          >
            ⏸ Pause
          </button>
        )}
        <button
          onClick={reset}
          className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition"
        >
          ↺ Reset
        </button>
      </div>

      {/* Presets */}
      {!running && remaining === null && (
        <div className="flex flex-wrap justify-center gap-2">
          {[
            { label: '1 min', m: '1', s: '0' },
            { label: '5 min', m: '5', s: '0' },
            { label: '10 min', m: '10', s: '0' },
            { label: '25 min', m: '25', s: '0' },
            { label: '1 hour', m: '0', s: '0', h: '1' },
          ].map(preset => (
            <button
              key={preset.label}
              onClick={() => { setHours(preset.h ?? '0'); setMinutes(preset.m); setSeconds(preset.s); }}
              className="px-3 py-1.5 text-xs bg-gray-100 text-gray-600 rounded-lg hover:bg-indigo-100 hover:text-indigo-600 font-medium transition"
            >
              {preset.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
