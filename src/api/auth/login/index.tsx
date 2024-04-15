import { FormErrors, type FormData } from '@/@types/userTypes';
import { ButtonPrimary } from '@/components/button';
import { LogoImpactaStore } from '@/components/imagens';
import { AuthContext } from '@/contexts/auth/AuthContext';
import {
  Alert,
  Dialog,
  DialogTitle,
  Link,
  VisibilityIcon,
  VisibilityOffIcon,
} from '@/mui/material';
import { AuthenticationLayout, CssTextField } from '@/templates';
import { formatCPF, isValidCPF } from '@/utils/form-utils';
import { Box, Grid, LinearProgress } from '@mui/material';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';

interface SignInData {
  cpf: string;
  password: string;
}

export default function LoginForm() {
  const API_URL = 'http://localhost:3333';
  const { singIn } = useContext(AuthContext);
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const { theme } = useTheme();
  const [formData, setFormData] = useState<FormData>({
    cpf: '',
    password: '',
  });
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const handleCloseDialog = () => setDialogOpen(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === 'cpf') {
      newValue = formatCPF(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        cpf: isValidCPF(newValue) ? '' : 'Insira somente números',
      }));
    }

    setFormData((prevState) => ({ ...prevState, [name]: newValue }));
  };

  async function handleSignIn(data: SignInData) {
    await singIn(data);
    setErrors({});
    setProgress(100);

    const { cpf, password } = formData;

    if (!cpf || !password) {
      setDialogMessage(`Preencha todos os campos.`);
      setDialogOpen(true);
      setSubmitting(false);
      return;
    }

    const formDataForBackend = {
      ...formData,
      cpf: cpf.replace(/\D/g, ''),
      password: password,
    };

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formDataForBackend),
    };

    try {
      const response = await fetch(`${API_URL}/login/auth`, requestOptions);
      console.log('Resposta do Server', response);
      const responseData = await response.json();

      if (response.ok) {
        setDialogMessage('Autenticação realizada com sucesso!');
        setDialogOpen(true);
        setRedirecting(true);

        setTimeout(() => {
          setDialogMessage('Redirecionando para a página inicial...');
          setTimeout(() => {
            console.log('Redirecionando para a homepage...');
            router.push('/home');
          }, 3000);
        }, 2000);
      } else {
        switch (response.status) {
          case 409:
            setDialogMessage(responseData.message);
            break;
          case 404:
            setDialogMessage(responseData.message);
            break;
          default:
            setDialogMessage('Erro desconhecido.');
        }
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
  }
  const { register, handleSubmit } = useForm<SignInData>();

  return (
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
          onSubmit={handleSubmit(handleSignIn)}
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
                value={formData.cpf}
                onChange={handleChange}
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
                value={formData.password}
                onChange={handleChange}
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
  );
}
