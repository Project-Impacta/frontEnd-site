import logoImpacta from '../../../public/logo/logoImpacta.png'
import Image from 'next/image'
import React from 'react'

export default function LogoImpactaStore() {
  return (
    <Image
      src={logoImpacta}
      alt="Símbolo Impacta Store"
      width={50} // Substitua 500 pela largura máxima que a imagem pode ter
      height={50} // Substitua 300 pela altura máxima que a imagem pode ter
    />
  )
}
