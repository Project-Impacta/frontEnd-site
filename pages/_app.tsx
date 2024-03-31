import { themeConfig } from '../src/providers/theme-config/theme'
import '../src/styles/tailwind.css'
import Layout from '@/components/layout'
import { ThemeProvider } from '@/providers'
import { ThemeContextProvider } from '@telefonica/mistica'
import type { AppProps } from 'next/app'
import React from 'react'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <ThemeContextProvider theme={themeConfig}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeContextProvider>
    </ThemeProvider>
  )
}
