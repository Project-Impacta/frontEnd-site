import '../src/styles/tailwind.css'
import { ThemeContextProvider } from '@/mistica/material'
import { themeConfig } from '@/providers'
import { Layout } from '@/templates'
import { ThemeProvider } from 'next-themes'
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
