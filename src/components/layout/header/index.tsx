import LogoImpactaStore from '@/components/shared/imagens/logo-impacta'
import React from 'react'

export default function HeaderPage() {
  return (
    <div className="bg-light-background dark:bg-dark-background text-light-textPrimary dark:text-dark-textPrimary py-4 px-6">
      <>
        <LogoImpactaStore />
        <h1 className="title text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
          Store Impacta
        </h1>
      </>
    </div>
  )
}
