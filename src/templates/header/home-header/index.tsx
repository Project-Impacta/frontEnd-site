import styles from './styles.module.css';
import { LogoutButton, ThemeSwitcher } from '@/components/button';
import { LogoImpactaStore } from '@/components/imagens';
import React from 'react';

export default function HeaderHome() {
  return (
    <div
      className={`bg-light-background dark:bg-dark-background text-light-textPrimary dark:text-dark-textPrimary ${styles.headerBg}`}
    >
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
      <LogoutButton />
    </div>
  );
}
