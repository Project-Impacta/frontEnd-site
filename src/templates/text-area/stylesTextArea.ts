import { TextField, styled } from '@/mui/material';
import { useTheme } from 'next-themes';

const CssTextField = styled(TextField)(() => {
  const { theme } = useTheme();

  return {
    '& label': {
      color: theme === 'dark' ? '#F2F2F2' : '#262626',
    },
    '& label.Mui-focused': {
      color: theme === 'dark' ? '#F2F2F2' : '#262626',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: theme === 'dark' ? '#F2F2F2' : '#012340',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme === 'dark' ? '#F2F2F2' : '#012340',
      },
      '&:hover fieldset': {
        borderColor: theme === 'dark' ? '#F2F2F2' : '#012340',
      },
      '&.Mui-focused fieldset': {
        borderColor: theme === 'dark' ? '#F2F2F2' : '#012340',
      },
      '& input': {
        caretColor: theme === 'dark' ? '#F2F2F2' : '#262626',
        color: theme === 'dark' ? '#F2F2F2' : '#012340',
      },
    },
  };
});

export default CssTextField;
