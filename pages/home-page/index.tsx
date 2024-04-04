import { HomePage } from '@/pages'
import { AuthProvider } from '@/providers'
import React from 'react'

export default function Home(): JSX.Element {
  return (
    <AuthProvider>
      <HomePage />
    </AuthProvider>
  )
}
