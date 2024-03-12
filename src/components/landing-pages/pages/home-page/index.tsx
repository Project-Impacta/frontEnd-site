import Head from 'next/head'
import React from 'react'

export default function HomePage(): JSX.Element {
  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>Home Page</div>
    </>
  )
}
