import { RegisterForm } from '@/components/api/auth'
import Head from 'next/head'
import React from 'react'
import LogoImpactaStore from '@/components/shared/imagens/logo-impacta'

const RegisterPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Cadastre-se</title>
        <LogoImpactaStore />
      </Head>
      <div>
        <RegisterForm />
      </div>
    </>
  )
}

export default RegisterPage
