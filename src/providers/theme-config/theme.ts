import { ThemeConfig, getVivoNewSkin } from '@/mistica/material';
import Link from 'next/link';

export const themeConfig: ThemeConfig = {
  skin: getVivoNewSkin(),
  i18n: { locale: 'pt-BR', phoneNumberFormattingRegionCode: 'BR' },
  Link: { type: 'Next14', Component: Link },
};
