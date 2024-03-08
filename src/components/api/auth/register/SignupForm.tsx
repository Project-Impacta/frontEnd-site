import { BoxAccount } from '@/components/shared/cards'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'

type FormData = {
  firstName: string
  lastName: string
  phone: string
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
    email: '',
    password: '',
    repeatPassword: '',
  })

  const router = useRouter()
  const API_URL = 'http://localhost:10000'
  const [errors, setErrors] = useState<FormErrors>({})
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    validatePasswordsMatch()
  }, [formData.password, formData.repeatPassword])

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword)
  }

  const validatePasswordsMatch = () => {
    const { password, repeatPassword } = formData
    if (password && repeatPassword && password !== repeatPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        repeatPassword: 'As senhas não coincidem.',
      }))
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, repeatPassword: '' }))
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    let newValue = value

    if (name === 'phone') {
      newValue = formatPhone(value)
    } else if (name === 'email') {
      const emailError = validateEmail(value)
      setErrors((prevErrors) => ({ ...prevErrors, email: emailError || '' }))
    }

    setFormData((prevState) => ({ ...prevState, [name]: newValue }))
  }

  const formatPhone = (phone: string): string => {
    const numbers = phone.replace(/\D/g, '')
    if (numbers.length > 10) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3')
    } else if (numbers.length > 5) {
      return numbers.replace(/(\d{2})(\d{4,5})(\d{0,4}).*/, '($1) $2-$3')
    } else if (numbers.length > 2) {
      return numbers.replace(/(\d{2})(\d{0,5})/, '($1) $2')
    }
    return numbers
  }

  const validateEmail = (email: string): string | null => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return !emailPattern.test(email)
      ? 'Por favor, insira um endereço de email válido.'
      : null
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    }

    try {
      const response = await fetch(`${API_URL}/client`, requestOptions)
      if (!response.ok) {
        throw new Error('Falha ao enviar os dados do formulário')
      }
      const data = await response.json()
      console.log('Resposta do servidor:', data)
      // Redireciona para a homepage
      router.push('/')
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error)
    }
  }

  return (
    <BoxAccount>
      <form onSubmit={handleSubmit} className="signup-form">
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
        <button
          type="button"
          className="toggle-password"
          onClick={toggleShowPassword}
          aria-label="Mostrar ou ocultar senha"
        >
          {showPassword ? 'Ocultar Senha' : 'Mostrar Senha'}
        </button>
        <div className="form-group action">
          <button
            type="button"
            className="toggle-password"
            onClick={toggleShowPassword}
            aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
          >
            <i className="fi-rr-eye"></i>
          </button>
        </div>
      </form>
    </BoxAccount>
  )
}

export default SignupForm
