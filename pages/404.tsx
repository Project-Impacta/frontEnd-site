import { Box } from '@/mui/material'
import { NotFound } from '@/pages'
import styles from '@/styles/global-styles/styles.module.css'
import Link from 'next/link'
import React from 'react'

const ServerError = (): JSX.Element => {
  return (
    <div
      className={` title text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl ${styles.error404}`}
    >
      <Box>
        <NotFound />
        <Link
          href="/"
          className={`link ${styles.link}`}
          style={{ textDecoration: 'underline' }}
        >
          Ir para a Página Inicial
        </Link>
      </Box>
    </div>
  )
}

export default ServerError
