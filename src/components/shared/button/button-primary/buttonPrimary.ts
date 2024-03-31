import { styled } from '@/styles/display/display'
import { Button } from '@/styles/icons/icons'
import { CSSObject } from '@emotion/react'
import { useTheme } from 'next-themes'

const ButtonPrimary = styled(Button)(() => {
  const { theme } = useTheme()
  return {
    backgroundColor: theme === 'dark' ? '#0597F2' : '#0597F2',
    color: theme === 'dark' ? '#F2F2F2' : '#012340',
    boxShadow: 'none',
    textTransform: 'none' as CSSObject['textTransform'],
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    borderRadius: 20,
    borderColor: theme === 'dark' ? '#F2F2F2' : '#012340',

    '&:hover': {
      backgroundColor: theme === 'dark' ? '#0063cc' : '#0063cc',
      borderColor: theme === 'dark' ? '#F2F2F2' : '#012340',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: theme === 'dark' ? '#0063cc' : '#0597F2',
      borderColor: theme === 'dark' ? '#F2F2F2' : '#012340',
    },
    '&:focus': {
      boxShadow: theme === 'dark' ? '0 0 0 2px #F2F2F2' : '0 0 0 2px #012340',
    },
  }
})
export default ButtonPrimary
