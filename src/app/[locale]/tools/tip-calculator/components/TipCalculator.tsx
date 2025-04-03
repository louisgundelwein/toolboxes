'use client';

import React, { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';

export default function TipCalculator() {
  const t = useTranslations('TipCalculatorPage');
  const [billAmount, setBillAmount] = useState('');
  const [tipPercentage, setTipPercentage] = useState(15);
  const [splitCount, setSplitCount] = useState(1);

  const handleBillAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setBillAmount(value);
    }
  };

  const calculateTip = useCallback(() => {
    const amount = parseFloat(billAmount);
    if (isNaN(amount)) return { tip: 0, total: 0, perPerson: 0 };

    const tip = (amount * tipPercentage) / 100;
    const total = amount + tip;
    const perPerson = total / splitCount;

    return {
      tip: Math.round(tip * 100) / 100,
      total: Math.round(total * 100) / 100,
      perPerson: Math.round(perPerson * 100) / 100,
    };
  }, [billAmount, tipPercentage, splitCount]);

  const results = calculateTip();

  return (
    <div className="card w-full max-w-lg bg-base-100 p-6 shadow-xl">
      <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
        {/* Bill Amount Input */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">{t('billAmount') || 'Bill Amount'}</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg">$</span>
            <input
              type="text"
              value={billAmount}
              onChange={handleBillAmountChange}
              placeholder="0.00"
              className="input input-bordered w-full pl-8"
            />
          </div>
        </div>

        {/* Tip Percentage */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">{t('tipPercentage') || 'Tip Percentage'}</span>
            <span className="label-text-alt">{tipPercentage}%</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {[10, 15, 18, 20, 25].map((percentage) => (
              <button
                key={percentage}
                type="button"
                onClick={() => setTipPercentage(percentage)}
                className={`btn btn-outline flex-1 ${
                  tipPercentage === percentage ? 'btn-primary' : ''
                }`}
              >
                {percentage}%
              </button>
            ))}
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={tipPercentage}
            onChange={(e) => setTipPercentage(parseInt(e.target.value))}
            className="range range-primary mt-4"
          />
        </div>

        {/* Split Bill */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">{t('splitBill') || 'Split Bill'}</span>
            <span className="label-text-alt">
              {splitCount} {t('people') || 'people'}
            </span>
          </label>
          <input
            type="range"
            min="1"
            max="20"
            value={splitCount}
            onChange={(e) => setSplitCount(parseInt(e.target.value))}
            className="range range-primary"
          />
        </div>

        {/* Results */}
        {billAmount && (
          <div className="space-y-4 rounded-lg bg-base-200 p-4">
            <div className="flex justify-between">
              <span>{t('tipAmount') || 'Tip Amount'}</span>
              <span className="font-semibold">${results.tip.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>{t('totalAmount') || 'Total Amount'}</span>
              <span className="font-semibold">${results.total.toFixed(2)}</span>
            </div>
            {splitCount > 1 && (
              <div className="flex justify-between">
                <span>{t('perPerson') || 'Per Person'}</span>
                <span className="font-semibold">${results.perPerson.toFixed(2)}</span>
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  );
}
