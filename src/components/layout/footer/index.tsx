import styles from './styles.module.css'
import { Box } from '@/styles/display/display'
import { PagesIcon } from '@/styles/icons/icons'
import React from 'react'

const Footer: React.FC = () => {
  return (
    <>
      <div
        className={`text-light-textSecondary dark:text-dark-textSecondary ${styles.footer}`}
      >
        <Box component="div" sx={{ display: 'inline' }}>
          <div
            className={`paragraph text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl`}
          >
            {`Store Impacta© 2024 - v${process.env.version}${' '}`}
            <PagesIcon style={{ position: 'relative', bottom: '2px' }} />
          </div>
        </Box>
      </div>
    </>
  )
}
export default Footer
