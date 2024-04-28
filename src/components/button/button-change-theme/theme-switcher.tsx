'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import React from 'react';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  function isDark() {
    return theme === 'dark';
  }

  return (
    <div>
      <div onClick={() => setTheme(isDark() ? 'light' : 'dark')} role="button">
        {isDark() ? <Sun /> : <Moon />}
      </div>
    </div>
  );
}
