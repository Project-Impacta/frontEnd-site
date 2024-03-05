'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import React from 'react'
import { BiMoon, BiSun } from 'react-icons/bi'

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  function isDark() {
    return theme === 'dark'
  }

  // Verifica se o tema está montado e se já existe um botão visível
  if (!mounted || document.querySelectorAll('.theme-switcher').length > 1)
    return null

  return (
    <button
      className="focus:outline-none theme-switcher"
      onClick={() => setTheme(isDark() ? 'light' : 'dark')}
      aria-label="Theme toggle"
    >
      {isDark() ? <BiSun size={20} /> : <BiMoon size={20} />}
    </button>
  )
}
