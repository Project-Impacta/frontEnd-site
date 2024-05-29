import MyProfile from '@/components/card/my-profile-card/card-myprofile';
import Head from 'next/head';

const ClientPage = () => {
  return (
    <>
      <Head>
        <title>Meu Perfil</title>
      </Head>
      <div className={'flex justify-center items-center flex-col'}>
        <div>
          <MyProfile />
        </div>
      </div>
    </>
  );
};
export default ClientPage;
