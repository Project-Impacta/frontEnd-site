import { RegisterForm } from '@/components/api/auth'
import Head from 'next/head'
import React from 'react'

const RegisterPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Cadastre-se</title>
        <link rel="icon" href="/logo/logoImpacta.png" type="image/png" />
      </Head>
      <div>
        <RegisterForm />
      </div>
    </>
  )
}

export default RegisterPage
