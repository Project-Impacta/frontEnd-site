import FixedFooter from './footer'
import HeaderPage from './header'
import styles from './styles.module.css'
import ThemeProvider from '@/providers/theme-provider/theme-provider'
import { Box } from '@/styles/display/display'
import { PagesIcon } from '@/styles/icons/icons'
import React, { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <HeaderPage />
        <main>{children}</main>
        <FixedFooter>
          <Box
            className={`paragraph text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl ${styles.footer}`}
          >
            {`Store Impacta© 2024 - v${process.env.version}${' '}`}
            <PagesIcon style={{ position: 'relative', bottom: '2px' }} />
          </Box>
        </FixedFooter>
      </ThemeProvider>
    </Box>
  )
}

export default Layout
