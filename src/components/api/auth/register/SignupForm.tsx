import {
  formatCPF,
  formatPhone,
  isValidCPF,
  validateEmail,
  validateFormFields,
  validatePasswordsMatch,
} from './utils/formUtils'
import { BoxAccount } from '@/components/shared/cards'
import {
  Button,
  Dialog,
  DialogTitle,
  LinearProgress,
  Alert,
  VisibilityOffIcon,
  VisibilityIcon,
} from '@/styles/icons/icons'
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

const SignupForm: React.FC = () => {
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

  const router = useRouter()
  const API_URL = 'http://localhost:10000'

  useEffect(() => {
    const { password, repeatPassword } = formData
    const matchResult = validatePasswordsMatch(password, repeatPassword)
    setErrors((prevErrors) => ({
      ...prevErrors,
      repeatPassword: matchResult.message,
    }))
  }, [formData.password, formData.repeatPassword])

  const toggleShowPassword = () => setShowPassword(!showPassword)

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

    if (!validateFormFields(formData)) {
      setProgress(0)
      setSubmitting(false)
      return
    }

    const formDataForBackend = {
      ...formData,
      cpf: formData.cpf.replace(/\D/g, ''),
      phone: formData.phone.replace(/\D/g, ''),
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formDataForBackend),
    }

    try {
      console.log(
        'Enviando dados do formulário para o backend:',
        formDataForBackend,
      )
      const response = await fetch(`${API_URL}/client`, requestOptions)
      console.log('Resposta do servidor:', response)

      if (!response.ok) {
        throw new Error('Falha ao enviar os dados do formulário')
      }

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
      <form onSubmit={handleSubmit} className="signup-form">
        <>
          <div className="form-group">
            <label htmlFor="firstName">Nome</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Sobrenome</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cpf">CPF:</label>
            <input
              type="text"
              name="cpf"
              id="cpf"
              value={formData.cpf}
              onChange={handleChange}
            />
            {errors.cpf && <div className="error">{errors.cpf}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="phone">Celular</label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <div className="error">{errors.phone}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="repeatPassword">Repetir Senha</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="repeatPassword"
              id="repeatPassword"
              value={formData.repeatPassword}
              onChange={handleChange}
            />
            {errors.repeatPassword && (
              <p className="error">{errors.repeatPassword}</p>
            )}
          </div>
          {Object.keys(errors).map((key) => {
            const message = errors[key as keyof FormErrors]
            return (
              message && (
                <Alert key={key} variant="outlined" severity="error">
                  {message}
                </Alert>
              )
            )
          })}

          <div>
            <button
              type="button"
              onClick={toggleShowPassword}
              aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
            >
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </button>
          </div>
          <div className="form-group action">
            <Button type="submit" variant="contained" disabled={submitting}>
              Cadastrar
            </Button>
          </div>
          <Dialog open={dialogOpen} onClose={handleCloseDialog}>
            <DialogTitle>{dialogMessage}</DialogTitle>
          </Dialog>
        </>
      </form>
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

export default SignupForm
