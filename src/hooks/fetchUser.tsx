import { ProfileDataSchema } from '@/types/profileDataTypes';
import {
  API_URL,
  NEXT_PUBLIC_FRONTEND_ORIGIN,
  NEXT_PUBLIC_FRONTEND_TOKEN,
} from 'environment';

export const fetchUser = async (cpf: string): Promise<ProfileDataSchema> => {
  try {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        secret_origin: `${NEXT_PUBLIC_FRONTEND_ORIGIN}`,
        token: `${NEXT_PUBLIC_FRONTEND_TOKEN}`,
      },
    };

    const response = await fetch(`${API_URL}/client/${cpf}`, requestOptions);
    console.log('Resposta do server', response);
    if (!response.ok) {
      throw new Error('Erro ao buscar usuário');
    }
    const data: ProfileDataSchema = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Erro ao buscar usuário: ${(error as Error).message}`);
  }
};
