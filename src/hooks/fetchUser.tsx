import { ProfileDataSchema } from '@/types/profileDataTypes';

export const fetchUser = async (cpf: string): Promise<ProfileDataSchema> => {
  try {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        secret_origin: `${process.env.NEXT_PUBLIC_FRONTEND_ORIGIN}`,
        token: `${process.env.NEXT_PUBLIC_FRONTEND_TOKEN}`,
      },
    };

    const response = await fetch(
      `http://localhost:3333/client/${cpf}`,
      requestOptions,
    );
    console.log('Resposta do server', response);
    if (!response.ok) {
      throw new Error('Erro ao buscar usuário');
    }
    const data: ProfileDataSchema = await response.json();
    return data;
  } catch (error) {
    // Adicionando uma mensagem genérica ao erro
    throw new Error(`Erro ao buscar usuário: ${(error as Error).message}`);
  }
};
