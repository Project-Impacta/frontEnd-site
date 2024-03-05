import '../src/styles/tailwind.css'
import Layout from '@/src/components/layout'
import ThemeProvider from '@/src/providers/theme-provider'
import type { AppProps } from 'next/app'
import React from 'react'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}
