export type FormData = {
  firstName?: string;
  lastName?: string;
  phone?: string;
  cpf?: string;
  email?: string;
  password?: string;
  repeatPassword?: string;
};

export type FormErrors = Partial<FormData>;
