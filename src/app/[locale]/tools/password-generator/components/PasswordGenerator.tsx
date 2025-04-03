'use client';

import React, { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';

export default function PasswordGenerator() {
  const t = useTranslations('PasswordGeneratorPage');
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(32);
  const [settings, setSettings] = useState({
    useUppercase: true,
    useLowercase: true,
    useNumbers: true,
    useSpecialChars: true,
  });

  const handleLengthChange = (value: string) => {
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 8) {
      setLength(numValue);
    }
  };

  const isAnySettingEnabled = Object.values(settings).some((value) => value);

  const generatePassword = useCallback(() => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let charset = '';
    if (settings.useUppercase) charset += uppercase;
    if (settings.useLowercase) charset += lowercase;
    if (settings.useNumbers) charset += numbers;
    if (settings.useSpecialChars) charset += specialChars;

    if (charset === '') {
      setPassword('');
      return;
    }

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }

    setPassword(newPassword);
  }, [length, settings]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
  };

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <div className="card w-full max-w-lg bg-base-100 p-6 shadow-xl">
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          {/* Password Length Controls */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">{t('length') || 'Password Length'}</span>
            </label>
            <div className="flex items-center gap-4">
              <input
                type="number"
                min="8"
                value={length}
                onChange={(e) => handleLengthChange(e.target.value)}
                className="input input-bordered w-24"
              />
              <input
                type="range"
                min="8"
                max="128"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="range range-primary flex-1"
              />
            </div>
          </div>

          {/* Settings Checkboxes */}
          <div className="form-control space-y-2">
            <label className="label cursor-pointer">
              <span className="label-text">{t('uppercase') || 'Uppercase Letters'}</span>
              <input
                type="checkbox"
                checked={settings.useUppercase}
                onChange={(e) => setSettings({ ...settings, useUppercase: e.target.checked })}
                className="checkbox-primary checkbox"
              />
            </label>
            <label className="label cursor-pointer">
              <span className="label-text">{t('lowercase') || 'Lowercase Letters'}</span>
              <input
                type="checkbox"
                checked={settings.useLowercase}
                onChange={(e) => setSettings({ ...settings, useLowercase: e.target.checked })}
                className="checkbox-primary checkbox"
              />
            </label>
            <label className="label cursor-pointer">
              <span className="label-text">{t('numbers') || 'Numbers'}</span>
              <input
                type="checkbox"
                checked={settings.useNumbers}
                onChange={(e) => setSettings({ ...settings, useNumbers: e.target.checked })}
                className="checkbox-primary checkbox"
              />
            </label>
            <label className="label cursor-pointer">
              <span className="label-text">{t('specialChars') || 'Special Characters'}</span>
              <input
                type="checkbox"
                checked={settings.useSpecialChars}
                onChange={(e) => setSettings({ ...settings, useSpecialChars: e.target.checked })}
                className="checkbox-primary checkbox"
              />
            </label>
          </div>

          {/* Generate Button */}
          <div className="space-y-2">
            <button
              onClick={generatePassword}
              disabled={!isAnySettingEnabled}
              className="btn btn-primary w-full disabled:opacity-50"
            >
              {t('generate') || 'Generate Password'}
            </button>
            {!isAnySettingEnabled && (
              <div className="text-center text-sm text-error">
                {t('selectAtLeastOne') || 'Please select at least one character type'}
              </div>
            )}
          </div>

          {/* Generated Password Display */}
          {password && (
            <div className="form-control">
              <label className="label">
                <span className="label-text">{t('generatedPassword') || 'Generated Password'}</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={password}
                  readOnly
                  className="input input-bordered flex-1"
                />
                <button onClick={copyToClipboard} className="btn btn-outline">
                  {t('copy') || 'Copy'}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Password Security Information Card */}
      <div className="card w-full max-w-lg bg-base-100 p-6 shadow-xl">
        <h2 className="mb-4 text-xl font-semibold text-accent">
          {t('passwordInfoHeader') || 'Password Security Information'}
        </h2>
        <div className="prose max-w-none">
          <div
            dangerouslySetInnerHTML={{
              __html:
                t('passwordInfoText') ||
                `
            <h3>Best Practices</h3>
            <ul>
              <li>Use passwords that are at least 12 characters long</li>
              <li>Include a mix of uppercase, lowercase, numbers, and special characters</li>
              <li>Use a unique password for each account</li>
              <li>Store passwords in a secure password manager</li>
              <li>Never share your passwords with anyone</li>
            </ul>
          `,
            }}
          />
        </div>

        {/* Security Resources Links */}
        <div className="mt-6">
          <h3 className="mb-3 text-lg font-medium">
            {t('additionalResources') || 'Additional Resources'}
          </h3>
          <ul className="space-y-2">
            <li>
              <a
                href="https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html"
                target="_blank"
                rel="noopener noreferrer"
                className="link link-primary"
              >
                OWASP Password Security Guidelines
              </a>
            </li>
            <li>
              <a
                href="https://haveibeenpwned.com/Passwords"
                target="_blank"
                rel="noopener noreferrer"
                className="link link-primary"
              >
                Have I Been Pwned - Password Checker
              </a>
            </li>
            <li>
              <a
                href="https://www.cisa.gov/secure-our-world"
                target="_blank"
                rel="noopener noreferrer"
                className="link link-primary"
              >
                CISA - Cybersecurity & Infrastructure Security Agency
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
