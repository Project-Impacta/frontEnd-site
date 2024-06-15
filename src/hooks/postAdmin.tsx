import { AdminDataProfileSchema } from '@/types/adminDataTypes';
import axios from 'axios';
import {
  API_URL,
  NEXT_PUBLIC_FRONTEND_ORIGIN,
  NEXT_PUBLIC_FRONTEND_TOKEN,
} from 'environment';
import { useState } from 'react';

export const usePostAdmin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const postAdmin = async (adminData: AdminDataProfileSchema) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/admin`, adminData, {
        headers: {
          'Content-Type': 'application/json',
          secret_origin: `${NEXT_PUBLIC_FRONTEND_ORIGIN}`,
          token: `${NEXT_PUBLIC_FRONTEND_TOKEN}`,
        },
      });
      setLoading(false);
      return response.data;
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        setError(err.message);
      } else {
        setError('Ocorreu um erro inesperado');
      }
      setLoading(false);
      throw err;
    }
  };

  return { postAdmin, loading, error };
};
