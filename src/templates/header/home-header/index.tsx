import ThemeSwitcher from '@/components/button/button-change-theme/theme-switcher';
import LogoImpactaStore from '@/components/imagens/logo-impacta';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { memo } from 'react';

function HeaderHome() {
  return (
    <div className="flex justify-between">
      <div className="title text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl flex p-2 my-2 gap-2 items-center">
        <Button asChild variant={'link'}>
          <Link href={'/'}>
            <LogoImpactaStore />
          </Link>
        </Button>

        <h1 className="text-light-textPrimary dark:text-dark-textPrimary">
          Store Impacta
        </h1>
      </div>
      <div
        className={`title text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl items-center p-2 my-4`}
      >
        <ThemeSwitcher />
      </div>
    </div>
  );
}
export default memo(HeaderHome);
