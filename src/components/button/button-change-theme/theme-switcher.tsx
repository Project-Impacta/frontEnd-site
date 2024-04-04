'use client'

import styles from './styles.module.css'
import { DarkModeIcon, IconButton, LightModeIcon } from '@/mui/material'
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  function isDark() {
    return theme === 'dark'
  }

  if (!mounted || document.querySelectorAll('.theme-switcher').length > 1) {
    return null
  }

  return (
    <div>
      <IconButton
        className={`${styles.iconButtonTransition} theme-switcher focus:outline-none bg-light-background-primary dark:bg-dark-background-primary text-light-textPrimary dark:text-dark-textPrimary`}
        onClick={() => setTheme(isDark() ? 'light' : 'dark')}
        aria-label="Toggle theme"
        style={{
          transition: 'transform 0.3s ease',
          border: '2px solid currentColor',
          borderRadius: '50%',
          padding: '5px',
          display: 'inline-flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {isDark() ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </div>
  )
}
