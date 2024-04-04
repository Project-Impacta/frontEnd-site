import HeaderAuthentication from '@/templates/authentication-header'
import { Box, Container } from '@mui/material'
import React, { ReactNode } from 'react'

interface AuthenticationLayoutProps {
  children: ReactNode
}

const AuthenticationLayout = (
  props: AuthenticationLayoutProps,
): JSX.Element => {
  return (
    <>
      <HeaderAuthentication />
      <Container maxWidth="xs">
        <Box
          sx={{
            mt: 5,
            maxHeight: '200vh',
            maxWidth: '100vw',
          }}
          className={`border-2 border-solid rounded-lg border-light-formFieldBorder dark:border-2 border-solid rounded-lg dark:border-dark-formFieldBorder bg-light-formFieldBackground dark:bg-dark-formFieldBackground 
        `}
        >
          <Box
            sx={{
              maxHeight: '200vh',
              maxWidth: '300vw',
            }}
            className={` bg-light-formFieldBackground dark:bg-dark-formFieldBackground text-light-textPrimary dark:text-dark-textPrimary`}
          >
            {props.children}
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default AuthenticationLayout
