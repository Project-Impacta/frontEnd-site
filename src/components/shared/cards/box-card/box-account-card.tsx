import { Box, Container } from '@mui/material'
import React, { ReactNode } from 'react'

interface BoxAccountProps {
  children: ReactNode
}

const BoxAccount = (props: BoxAccountProps): JSX.Element => {
  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 5,
          maxHeight: '200vh',
          maxWidth: '100vh',
        }}
        className={`border-2 border-solid rounded-lg border-light-formFieldBorder dark:border-2 border-solid rounded-lg dark:border-dark-formFieldBorder bg-light-formFieldBackground dark:bg-dark-formFieldBackground 
        `}
      >
        <Box
          sx={{
            maxHeight: '200vh',
            maxWidth: '300vh',
          }}
          className={` bg-light-formFieldBackground dark:bg-dark-formFieldBackground text-light-textPrimary dark:text-dark-textPrimary`}
        >
          {props.children}
        </Box>
      </Box>
    </Container>
  )
}

export default BoxAccount
