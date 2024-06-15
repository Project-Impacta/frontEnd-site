import { usePostAdmin } from '@/hooks/postAdmin';
import { AdminDataProfileSchema } from '@/types/adminDataTypes';

export const useRegisterAdmin = () => {
  const { postAdmin, loading, error } = usePostAdmin();

  const registerAdmin = async (adminData: AdminDataProfileSchema) => {
    try {
      const response = await postAdmin(adminData);
      return response;
    } catch (err) {
      console.error('Erro ao registrar administrador:', err);
      throw err;
    }
  };

  return { registerAdmin, loading, error };
};
