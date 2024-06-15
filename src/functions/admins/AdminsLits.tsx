import { fetchAdmins } from '@/hooks/fetchAdmins';
import {
  AdminDataProfileSchema,
  AdminResponseSchemaType,
} from '@/types/adminDataTypes';
import { useEffect, useState } from 'react';

export const useAdminsList = () => {
  const [admins, setAdmins] = useState<AdminDataProfileSchema[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAdmins = async () => {
      try {
        const response: AdminResponseSchemaType = await fetchAdmins();
        if (response && Array.isArray(response.data)) {
          setAdmins(response.data);
        } else {
          setError('Formato de resposta inesperado');
        }
      } catch (error) {
        setError('Erro ao buscar administradores');
      }
    };

    loadAdmins();
  }, []);

  return { admins, error };
};
