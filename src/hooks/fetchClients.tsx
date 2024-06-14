import { ClientResponseSchemaType } from '@/types/profileDataTypes';
import axios from 'axios';
import {
  API_URL,
  NEXT_PUBLIC_FRONTEND_ORIGIN,
  NEXT_PUBLIC_FRONTEND_TOKEN,
} from 'environment';

export const fetchClients = async (): Promise<ClientResponseSchemaType> => {
  try {
    const response = await axios.get<ClientResponseSchemaType>(
      `${API_URL}/client`,
      {
        headers: {
          'Content-Type': 'application/json',
          secret_origin: NEXT_PUBLIC_FRONTEND_ORIGIN,
          token: NEXT_PUBLIC_FRONTEND_TOKEN,
        },
      },
    );

    if (response.status !== 200) {
      throw new Error('Erro ao buscar clientes');
    }

    return response.data;
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    throw error;
  }
};
