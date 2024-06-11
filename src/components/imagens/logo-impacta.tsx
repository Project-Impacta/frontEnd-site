import Image from 'next/image';
import logoImpacta from 'public/img/logoImpacta.png';
import React from 'react';

export default function LogoImpactaStore() {
  return (
    <Image
      src={logoImpacta}
      alt="Símbolo Impacta Store"
      width={50}
      height={50}
      fetchPriority="low"
    />
  );
}
