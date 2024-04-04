import { LoginForm } from '@/api/auth'
import Head from 'next/head'
import React from 'react'

const LoginPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Autentique-se</title>
      </Head>
      <div>
        <LoginForm />
      </div>
    </>
  )
}

export default LoginPage
