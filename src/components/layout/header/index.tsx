import styles from './styles.module.css'
import ThemeSwitcher from '@/components/shared/button/theme-switcher'
import LogoImpactaStore from '@/components/shared/imagens/logo-impacta'
import React from 'react'

export default function HeaderPage() {
  return (
    <div
      className={`bg-light-background dark:bg-dark-background text-light-textPrimary dark:text-dark-textPrimary ${styles.headerBg}`}
    >
      <>
        <div
          className="title text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
          style={{ position: 'relative', top: '20px', paddingLeft: '25px' }}
        >
          <LogoImpactaStore />
        </div>
        <h1
          className="title text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
          style={{ position: 'relative', bottom: '35px', paddingLeft: '80px' }}
        >
          Store Impacta
        </h1>
        <div
          className={`title text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl ${styles.themeIcon}`}
        >
          <ThemeSwitcher />
        </div>
      </>
    </div>
  )
}
