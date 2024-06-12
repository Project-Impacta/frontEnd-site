import ErrorDisplay from '@/components/display/ErrorDisplay';
import LoadingDisplay from '@/components/display/LoadingDisplay';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { fetchUser } from '@/hooks/fetchUser';
import { ProfileDataSchema } from '@/types/profileDataTypes';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

const MyProfile: React.FC = () => {
  const { data: session } = useSession();
  const token = session?.user.token;
  console.log(token);
  const [userProfile, setUserProfile] = useState<ProfileDataSchema[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [dialogMessage, setDialogMessage] = useState<string>('');
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleCloseDialog = () => setDialogOpen(false);

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode<
        JwtPayload & { profile: { user: { cpf: string } } }
      >(token);
      const cpf = decoded?.profile?.user?.cpf;

      const loadProfile = async () => {
        try {
          const { data } = await fetchUser(cpf);
          if (Array.isArray(data) && data.length > 0) {
            setUserProfile(data);
            setLoading(false);
          } else {
            throw new Error('Dados de perfil inválidos');
          }
        } catch (error) {
          console.error('Erro ao buscar perfil:', error);
          setDialogMessage('Erro ao buscar perfil: ' + error);
          setDialogOpen(true);
          setLoading(false);
        }
      };

      loadProfile();
    }
  }, [token]);

  if (loading) {
    return <LoadingDisplay dialogOpen={true} />;
  }

  return (
    <>
      {userProfile.length > 0 ? (
        userProfile.map((myUserProfile) => (
          <div key={myUserProfile.cpf} className="mx-auto max-w-xl mt-8">
            <Card className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-96">
              <CardHeader className="text-center">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  Meu Perfil
                </h1>
              </CardHeader>
              <CardContent className="items-center justify-center">
                <div className="mt-4 flex space-x-2 items-center">
                  <Label className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                    Nome:
                  </Label>
                  <p className="mt-1 text-gray-800 dark:text-gray-200">
                    {myUserProfile.firstName} {myUserProfile.lastName}
                  </p>
                </div>
                <div className="mt-4 flex space-x-2 items-center">
                  <Label className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                    Telefone:
                  </Label>
                  <p className="mt-1 text-gray-800 dark:text-gray-200">
                    {myUserProfile.phone}
                  </p>
                </div>
                <div className="mt-4 flex space-x-2 items-center">
                  <Label className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                    Email:
                  </Label>
                  <p className="mt-1 text-gray-800 dark:text-gray-200">
                    {myUserProfile.email}
                  </p>
                </div>
                <div className="mt-4 flex space-x-2 items-center">
                  <Label className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                    CPF:
                  </Label>
                  <p className="mt-1 text-gray-800 dark:text-gray-200">
                    {myUserProfile.cpf}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        ))
      ) : (
        <ErrorDisplay
          dialogOpen={dialogOpen}
          dialogMessage={dialogMessage}
          handleCloseDialog={handleCloseDialog}
        />
      )}
    </>
  );
};

export default MyProfile;
