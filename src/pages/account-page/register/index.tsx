import { RegisterForm } from '@/api/auth'
import Head from 'next/head'
import React from 'react'

const RegisterPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Cadastre-se</title>
      </Head>
      <div>
        <RegisterForm />
      </div>
    </>
  )
}

export default RegisterPage
