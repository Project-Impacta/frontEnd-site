import { FormErrors, type FormData } from '@/@types/userTypes'
import { ButtonPrimary } from '@/components/button'
import { LogoImpactaStore } from '@/components/imagens'
import {
  Alert,
  Dialog,
  DialogTitle,
  VisibilityIcon,
  VisibilityOffIcon,
} from '@/mui/material'
import { AuthenticationLayout, CssTextField } from '@/templates'
import { formatCPF, isValidCPF } from '@/utils/form-utils'
import { Box, Grid, LinearProgress } from '@mui/material'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function LoginForm() {
  const router = useRouter()
  const API_URL = 'http://localhost:3333'
  const [submitting, setSubmitting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [dialogMessage, setDialogMessage] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [redirecting, setRedirecting] = useState(false)
  const { theme } = useTheme()
  const [formData, setFormData] = useState<FormData>({
    cpf: '',
    password: '',
  })
  const toggleShowPassword = () => setShowPassword(!showPassword)
  const handleCloseDialog = () => setDialogOpen(false)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    let newValue = value

    if (name === 'cpf') {
      newValue = formatCPF(value)
      setErrors((prevErrors) => ({
        ...prevErrors,
        cpf: isValidCPF(newValue) ? '' : 'CPF inválido.',
      }))
    }

    setFormData((prevState) => ({ ...prevState, [name]: newValue }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Submit do formulário foi acionado!')
    setErrors({})
    setProgress(100)

    const formData = new FormData(e.currentTarget)
    const cpf = formData.get('cpf') as string
    const password = formData.get('password') as string

    if (!cpf || !password) {
      setDialogMessage(`Preencha todos os campos.`)
      setDialogOpen(true)
      setSubmitting(false)
      return
    }

    const formDataForBackend = {
      ...formData,
      cpf: cpf.replace(/\D/g, ''),
      password: password,
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formDataForBackend),
    }

    try {
      const response = await fetch(`${API_URL}/login/auth`, requestOptions)
      console.log('Resposta do Server', response)
      const responseData = await response.json()

      if (response.ok) {
        setDialogMessage('Autenticação realizada com sucesso!')
        setDialogOpen(true)
        setRedirecting(true)

        setTimeout(() => {
          setDialogMessage('Redirecionando para a página inicial...')
          setTimeout(() => {
            console.log('Redirecionando para a homepage...')
            router.push('/home-page')
          }, 3000)
        }, 2000)
      } else {
        switch (response.status) {
          case 409:
            setDialogMessage(responseData.message)
            break
          case 404:
            setDialogMessage(responseData.message)
            break
          default:
            setDialogMessage('Erro desconhecido.')
        }
        setDialogOpen(true)
      }
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error)
      setDialogMessage(
        'Ocorreu um erro ao enviar o formulário. Por favor, tente novamente mais tarde.',
      )
      setDialogOpen(true)
    } finally {
      setSubmitting(false)
    }
  }

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
          className={`title text-light-textPrimary dark:text-dark-textPrimary`}
        >
          Autentique-se
        </Box>
        <Box
          component="form"
          onSubmit={(e) => handleSubmit(e)}
          noValidate
          sx={{ mt: 3, maxHeight: '300vh' }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={24}>
              <CssTextField
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
                {errors.cpf && <Alert severity="error">{errors.cpf}</Alert>}
              </Grid>
            </Grid>
            <Grid item xs={12} sm={24}>
              <CssTextField
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
        {
          <Dialog open={dialogOpen} onClose={handleCloseDialog}>
            <DialogTitle>{dialogMessage}</DialogTitle>
          </Dialog>
        }
      </Box>
    </AuthenticationLayout>
  )
}
