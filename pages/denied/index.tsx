import { Alert, Box, Link, Typography } from '@mui/material';

export default function DeniedPage() {
  return (
    <Box className={'h-screen flex flex-col items-center justify-center'}>
      <Typography
        variant="h1"
        sx={{ my: 3 }}
        className={
          'title text-light-textPrimary dark:text-dark-textPrimary text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl'
        }
      >
        <Alert severity="error">Acesso restrito</Alert>
      </Typography>
      <Typography
        variant="body1"
        sx={{ my: 3 }}
        className={
          'body text-light-textPrimary dark:text-dark-textPrimary text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl'
        }
      >
        <Alert severity="info">
          Você não possui permissão para prosseguir!
        </Alert>
      </Typography>
      <Box>
        <Link
          href="/"
          underline="hover"
          className={`link text-light-textPrimary dark:text-dark-textPrimary text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl`}
        >
          {'Voltar'}
        </Link>
      </Box>
    </Box>
  );
}
