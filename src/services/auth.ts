import { v4 as uuid } from 'uuid';

type SingInRequestData = {
  firstName?: string;
  email?: string;
  cpf: string;
  password: string;
};

export async function singInRequest(data: SingInRequestData) {
  return {
    token: uuid(),
    user: {
      firstName: data.firstName,
      email: data.email,
    },
  };
}

export async function recoverUserInformation(data: SingInRequestData) {
  return {
    user: {
      firstName: data.firstName,
      email: data.email,
    },
  };
}
