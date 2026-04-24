'use client';

import { useState, useMemo } from 'react';

export default function LoanCalculator() {
  const [principal, setPrincipal] = useState('200000');
  const [rate, setRate] = useState('5');
  const [years, setYears] = useState('30');

  const result = useMemo(() => {
    const P = parseFloat(principal);
    const annualRate = parseFloat(rate);
    const n = parseInt(years, 10) * 12;
    if (isNaN(P) || isNaN(annualRate) || isNaN(n) || P <= 0 || annualRate < 0 || n <= 0) return null;

    if (annualRate === 0) {
      const monthly = P / n;
      return { monthly, totalPayment: P, totalInterest: 0 };
    }

    const r = annualRate / 100 / 12;
    const monthly = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = monthly * n;
    const totalInterest = totalPayment - P;
    return { monthly, totalPayment, totalInterest };
  }, [principal, rate, years]);

  const fmt = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });

  return (
    <div className="space-y-6 max-w-lg mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Loan Amount ($)</label>
          <input
            type="number"
            value={principal}
            onChange={e => setPrincipal(e.target.value)}
            min={0}
            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="200000"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Annual Rate (%)</label>
          <input
            type="number"
            value={rate}
            onChange={e => setRate(e.target.value)}
            min={0}
            step={0.1}
            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="5"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Term (years)</label>
          <input
            type="number"
            value={years}
            onChange={e => setYears(e.target.value)}
            min={1}
            max={50}
            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="30"
          />
        </div>
      </div>

      {result ? (
        <div className="bg-indigo-50 rounded-2xl p-6 space-y-4">
          <div className="text-center">
            <p className="text-sm text-indigo-500 font-medium mb-1">Monthly Payment</p>
            <p className="text-4xl font-extrabold text-indigo-700">{fmt(result.monthly)}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-indigo-100">
            <div className="text-center">
              <p className="text-xs text-gray-500 font-medium mb-0.5">Total Payment</p>
              <p className="text-lg font-bold text-gray-800">{fmt(result.totalPayment)}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 font-medium mb-0.5">Total Interest</p>
              <p className="text-lg font-bold text-gray-800">{fmt(result.totalInterest)}</p>
            </div>
          </div>

          {/* Visual breakdown */}
          <div>
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Principal</span>
              <span>Interest</span>
            </div>
            <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden flex">
              <div
                className="h-full bg-indigo-500 rounded-l-full"
                style={{ width: `${(parseFloat(principal) / result.totalPayment) * 100}%` }}
              />
              <div className="h-full bg-amber-400 flex-1 rounded-r-full" />
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span className="text-indigo-600 font-medium">Principal: {fmt(parseFloat(principal))}</span>
              <span className="text-amber-600 font-medium">Interest: {fmt(result.totalInterest)}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-2xl p-8 text-center text-gray-400 text-sm">
          Enter valid loan details to see the calculation.
        </div>
      )}
    </div>
  );
}
