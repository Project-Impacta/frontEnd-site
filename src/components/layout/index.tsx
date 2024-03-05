import ThemeSwitcher from '../shared/button/theme-switcher'
import HeaderPage from './header'
import ThemeProvider from '@/src/providers/theme-provider'
import React, { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <HeaderPage />
        <ThemeSwitcher />
        <main>{children}</main>
      </ThemeProvider>
    </>
  )
}

export default Layout
