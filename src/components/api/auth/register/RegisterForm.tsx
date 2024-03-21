import {
  formatCPF,
  formatPhone,
  isValidCPF,
  validateEmail,
  validatePasswordsMatch,
} from './utils/formUtils'
import { CssTextField } from '@/components/layout/text-area'
import { ButtonPrimary } from '@/components/shared/button'
import { BoxAccount } from '@/components/shared/cards'
import LogoImpactaStore from '@/components/shared/imagens/logo-impacta'
import { Box, Grid } from '@/styles/display/display'
import {
  Dialog,
  DialogTitle,
  LinearProgress,
  Alert,
  VisibilityOffIcon,
  VisibilityIcon,
} from '@/styles/icons/icons'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

type FormData = {
  firstName: string
  lastName: string
  phone: string
  cpf: string
  email: string
  password: string
  repeatPassword: string
}

type FormErrors = Partial<FormData>

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phone: '',
    cpf: '',
    email: '',
    password: '',
    repeatPassword: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [showPassword, setShowPassword] = useState(false)

  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogMessage, setDialogMessage] = useState('')
  const [progress, setProgress] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [redirecting, setRedirecting] = useState(false)

  const [showRepeatPassword, setShowRepeatPassword] = useState(false)

  const toggleShowRepeatPassword = () =>
    setShowRepeatPassword(!showRepeatPassword)

  const router = useRouter()
  const API_URL = 'http://localhost:10000'

  useEffect(() => {
    const { password, repeatPassword } = formData
    const matchResult = validatePasswordsMatch(password, repeatPassword)
    setErrors((prevErrors) => ({
      ...prevErrors,
      repeatPassword: matchResult.message,
    }))
  }, [formData, formData.password, formData.repeatPassword])

  const toggleShowPassword = () => setShowPassword(!showPassword)
  const { theme } = useTheme()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    let newValue = value

    if (name === 'cpf') {
      newValue = formatCPF(value)
      setErrors((prevErrors) => ({
        ...prevErrors,
        cpf: isValidCPF(newValue) ? '' : 'CPF inválido.',
      }))
    } else if (name === 'phone') {
      newValue = formatPhone(value)
    } else if (name === 'email') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: validateEmail(value) || '',
      }))
    }

    setFormData((prevState) => ({ ...prevState, [name]: newValue }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrors({})
    setProgress(100)
    setSubmitting(true)

    const requiredFields = [
      'firstName',
      'lastName',
      'phone',
      'cpf',
      'email',
      'password',
      'repeatPassword',
    ]
    const incompleteFields = requiredFields.filter(
      (field) => !formData[field as keyof FormData],
    )

    if (incompleteFields.length > 0) {
      setDialogMessage(`Preencha todos os campos.`)
      setDialogOpen(true)
      setSubmitting(false)
      return
    }

    const formDataForBackend = {
      ...formData,
      cpf: formData.cpf.replace(/\D/g, ''),
      phone: formData.phone.replace(/\D/g, ''),
      email: formData.email.toLowerCase().trim(),
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formDataForBackend),
    }

    try {
      const response = await fetch(`${API_URL}/client`, requestOptions)
      const responseData = await response.json()

      if (response.ok) {
        setDialogMessage('Cadastro realizado com sucesso!')
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

          default:
            setDialogMessage(responseData.message)
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

  const handleCloseDialog = () => setDialogOpen(false)

  return (
    <BoxAccount>
      {submitting && <LinearProgress variant="determinate" value={progress} />}
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
        <LogoImpactaStore />

        <div className="title text-light-textPrimary dark:text-dark-textPrimary">
          Cadastre-se
        </div>

        <Box
          component="form"
          onSubmit={(e) => handleSubmit(e)}
          noValidate
          sx={{ mt: 3, maxHeight: '300vh' }}
        >
          <Grid container spacing={2}>
            <Grid item xs={6} sm={6}>
              <CssTextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="Nome"
                autoFocus
                value={formData.firstName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <CssTextField
                autoComplete="given-name"
                name="lastName"
                required
                fullWidth
                id="lastName"
                label="Sobrenome"
                autoFocus
                value={formData.lastName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
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
            <Grid item xs={6} sm={6}>
              <CssTextField
                required
                fullWidth
                id="phone"
                label="Celular"
                name="phone"
                autoComplete="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <CssTextField
                required
                fullWidth
                id="email"
                label="E-mail"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
              />
              <Grid>
                {errors.email && <Alert severity="error">{errors.email}</Alert>}
              </Grid>
            </Grid>
            <Grid item xs={5} sm={6}>
              <CssTextField
                required
                fullWidth
                name="password"
                label="Senha"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
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
            <Grid item xs={7} sm={6}>
              <CssTextField
                required
                fullWidth
                name="repeatPassword"
                label="Repita a Senha"
                type={showRepeatPassword ? 'text' : 'password'}
                autoComplete="new-password"
                value={formData.repeatPassword}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <button
                      type="button"
                      onClick={toggleShowRepeatPassword}
                      aria-label={
                        showRepeatPassword ? 'Ocultar senha' : 'Mostrar senha'
                      }
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      {showRepeatPassword ? (
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
          <Grid item>
            {errors.repeatPassword && (
              <Alert severity="error">{errors.repeatPassword}</Alert>
            )}
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
            Cadastrar
          </ButtonPrimary>
        </Box>
        {
          <Dialog open={dialogOpen} onClose={handleCloseDialog}>
            <DialogTitle>{dialogMessage}</DialogTitle>
          </Dialog>
        }
      </Box>
      {redirecting && (
        <div className="redirecting">
          <div className="loading-container">
            <LinearProgress value={progress} />
          </div>
        </div>
      )}
    </BoxAccount>
  )
}

export default RegisterForm
