import { type ThemeConfig, getVivoNewSkin } from '@telefonica/mistica'
import Link from 'next/link'

export const themeConfig: ThemeConfig = {
  skin: getVivoNewSkin(),
  i18n: { locale: 'pt-BR', phoneNumberFormattingRegionCode: 'BR' },
  Link: { type: 'Next14', Component: Link },
}
