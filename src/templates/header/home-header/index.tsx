import { ThemeSwitcher } from '@/components/button';
import { LogoImpactaStore } from '@/components/imagens';
import React from 'react';

export default function HeaderHome() {
  return (
    <div className="flex justify-between">
      <div className="title text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl flex p-2 my-2 gap-2 items-center">
        <LogoImpactaStore />
        <h1 className="text-light-textPrimary dark:text-dark-textPrimary">
          Store Impacta
        </h1>
      </div>

      <div
        className={`title text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl  items-center p-2 my-4`}
      >
        <ThemeSwitcher />
      </div>
    </div>
  );
}
