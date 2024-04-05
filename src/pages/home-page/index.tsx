import HomeLayout from '@/templates/layouts/home-layout'
import Head from 'next/head'
import React from 'react'

export default function HomePage(): JSX.Element {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <HomeLayout>
        <div>Home Page</div>
      </HomeLayout>
    </>
  )
}
