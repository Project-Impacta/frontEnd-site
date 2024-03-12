import Footer from './footer'
import HeaderPage from './header'
import ThemeProvider from '@/providers/theme-provider/theme-provider'
import { Box } from '@/styles/display/display'
import React, { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Box>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <HeaderPage />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </Box>
    </>
  )
}

export default Layout
