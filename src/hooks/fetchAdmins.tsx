import { AdminResponseSchemaType } from '@/types/adminDataTypes';
import axios from 'axios';
import {
  API_URL,
  NEXT_PUBLIC_FRONTEND_ORIGIN,
  NEXT_PUBLIC_FRONTEND_TOKEN,
} from 'environment';

export const fetchAdmins = async (): Promise<AdminResponseSchemaType> => {
  try {
    const response = await axios.get<AdminResponseSchemaType>(
      `${API_URL}/admin`,
      {
        headers: {
          'Content-Type': 'application/json',
          secret_origin: NEXT_PUBLIC_FRONTEND_ORIGIN,
          token: NEXT_PUBLIC_FRONTEND_TOKEN,
        },
      },
    );

    if (response.status !== 200) {
      throw new Error('Erro ao buscar administradores');
    }

    return response.data;
  } catch (error) {
    console.error('Erro ao buscar administradores:', error);
    throw error;
  }
};
