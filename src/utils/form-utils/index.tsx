export const validateFormFields = (formData: { [x: string]: string }) => {
  let valid = true;
  const newErrors: { [key: string]: string } = {}; // Especificando o tipo de newErrors
  Object.keys(formData).forEach((key) => {
    if (!formData[key].trim()) {
      newErrors[key] = 'Este campo é obrigatório.';
      valid = false;
    }
  });
  return { valid, newErrors };
};

export const validatePasswordsMatch = (password: any, repeatPassword: any) => {
  if (password && repeatPassword && password !== repeatPassword) {
    return { match: false, message: 'As senhas não coincidem.' };
  } else {
    return { match: true, message: '' };
  }
};

export const validateEmail = (email: string) => {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ? ''
    : 'O e-mail deve conter a seguinte estrutura: example@example.com';
};

export const isValidCPF = (cpf: string) => {
  return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf);
};

export const formatCPF = (value: string) => {
  return value
    .replace(/\D/g, '')
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
};

export const formatPhone = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
};
