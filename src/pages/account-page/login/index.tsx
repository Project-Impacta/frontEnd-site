'use client';

import { FormErrors } from '@/@types/userTypes';
import { ButtonPrimary } from '@/components/button';
import { LogoImpactaStore } from '@/components/imagens';
import {
  Alert,
  Box,
  Dialog,
  DialogTitle,
  Grid,
  LinearProgress,
  Link,
  VisibilityIcon,
  VisibilityOffIcon,
} from '@/mui/material';
import { AuthenticationLayout, CssTextField } from '@/templates';
import { signIn } from 'next-auth/react';
import { useTheme } from 'next-themes';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

interface SignInData {
  cpf: string;
  password: string;
}
export default function LoginPage(): JSX.Element {
  const router = useRouter();
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const { theme } = useTheme();

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const handleCloseDialog = () => setDialogOpen(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setProgress(100);

    if (!cpf || !password) {
      setDialogMessage(`Preencha todos os campos.`);
      setDialogOpen(true);
      setSubmitting(false);
      return;
    }

    const unformattedCPF = cpf.replace(/\D/g, '');

    const formDataForBackend = {
      cpf: unformattedCPF,
      password: password,
    };

    try {
      const response = await signIn('credentials', {
        redirect: false,
        ...formDataForBackend,
        cpf,
        password,
      });
      console.log('[LOGIN_RESPONSE]:', response);

      if (!response?.error) {
        setDialogMessage('Autenticação realizada com sucesso!');
        setDialogOpen(true);
        setRedirecting(true);

        setTimeout(() => {
          setDialogMessage('Redirecionando para a página inicial...');
          setTimeout(() => {
            router.push('/home');
          }, 3000);
        }, 2000);
      } else {
        setDialogMessage('CPF ou Senha invalidas...');
        setDialogOpen(true);
      }
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
      setDialogMessage(
        'Ocorreu um erro ao enviar o formulário. Por favor, tente novamente mais tarde.',
      );
      setDialogOpen(true);
    } finally {
      setSubmitting(false);
    }
  };
  const { register } = useForm<SignInData>();

  return (
    <>
      <Head>
        <title>Autentique-se</title>
      </Head>
      <AuthenticationLayout>
        <Box
          sx={{
            mt: 2,
            mb: 2,
            ml: 2,
            mr: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {submitting && (
            <LinearProgress variant="determinate" value={progress} />
          )}
          <LogoImpactaStore />
          <Box
            position="relative"
            top={'2vh'}
            className={`title text-light-textPrimary dark:text-dark-textPrimary text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl`}
          >
            Autentique-se
          </Box>
          <Box
            component="form"
            onSubmit={(e: React.FormEvent<Element>) => handleSignIn(e)}
            noValidate
            sx={{ mt: 3, maxHeight: '300vh' }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={24}>
                <CssTextField
                  {...register('cpf')}
                  required
                  fullWidth
                  id="cpf"
                  label="CPF"
                  name="cpf"
                  autoComplete="cpf"
                  onChange={(e: {
                    target: { value: React.SetStateAction<string> };
                  }) => setCpf(e.target.value)}
                />
                <Grid>
                  {errors.cpf && <Alert severity="info">{errors.cpf}</Alert>}
                </Grid>
              </Grid>
              <Grid item xs={12} sm={24}>
                <CssTextField
                  {...register('password')}
                  required
                  fullWidth
                  name="password"
                  label="Senha"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="password"
                  onChange={(e: {
                    target: { value: React.SetStateAction<string> };
                  }) => setPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <button
                        type="button"
                        onClick={toggleShowPassword}
                        aria-label={
                          showPassword ? 'Ocultar senha' : 'Mostrar senha'
                        }
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                        }}
                      >
                        {showPassword ? (
                          <VisibilityOffIcon
                            sx={{
                              color: theme === 'dark' ? '#F2F2F2' : '#012340',
                            }}
                            fontSize="small"
                          />
                        ) : (
                          <VisibilityIcon
                            sx={{
                              color: theme === 'dark' ? '#F2F2F2' : '#012340',
                            }}
                            fontSize="small"
                          />
                        )}
                      </button>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <ButtonPrimary
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 1,
              }}
            >
              Logar
            </ButtonPrimary>
          </Box>
          <Box>
            <Link
              href="/register"
              underline="hover"
              className={`link text-light-textPrimary dark:text-dark-textPrimary text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl`}
            >
              {'Não possui um conta?'}
            </Link>
          </Box>
          {
            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
              <DialogTitle>{dialogMessage}</DialogTitle>
            </Dialog>
          }
          <Box>
            {redirecting && (
              <div className="redirecting">
                <div className="loading-container">
                  <LinearProgress value={progress} />
                </div>
              </div>
            )}
          </Box>
        </Box>
      </AuthenticationLayout>
    </>
  );
}
