import { Box } from '@/mui/material'
import { FixedFooterLayout, ResponsiveLayout } from '@telefonica/mistica'
import React, { ReactNode } from 'react'

interface FixedFooterProps {
  children: ReactNode
}
const FixedFooter = (props: FixedFooterProps): JSX.Element => {
  return (
    <FixedFooterLayout
      footer={
        <ResponsiveLayout>
          <Box
            className={`paragraph text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl`}
          />
        </ResponsiveLayout>
      }
    >
      {props.children}
    </FixedFooterLayout>
  )
}

export default FixedFooter
