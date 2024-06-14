import { fetchClients } from '@/hooks/fetchClients';
import {
  ClientResponseSchemaType,
  ProfileDataSchema,
} from '@/types/profileDataTypes';
import { useEffect, useState } from 'react';

export const useClientsList = () => {
  const [clients, setClients] = useState<ProfileDataSchema[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadClients = async () => {
      try {
        const response: ClientResponseSchemaType = await fetchClients();
        if (response && Array.isArray(response.clients)) {
          setClients(response.clients);
        } else {
          setError('Formato de resposta inesperado');
        }
      } catch (error) {
        setError('Erro ao buscar clientes');
      }
    };

    loadClients();
  }, []);

  return { clients, error };
};
