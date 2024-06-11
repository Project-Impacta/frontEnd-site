import { CircleAlert, TriangleAlert } from 'lucide-react';
import Link from 'next/link';

export default function DeniedPage() {
  return (
    <div className={'h-screen flex flex-col items-center justify-center'}>
      <div
        className={
          'title flex justify-center items-center space-x-2 text-light-textPrimary dark:text-dark-textPrimary text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl'
        }
      >
        <CircleAlert />
        <div>Acesso restrito</div>
        <CircleAlert />
      </div>
      <div
        className={
          'body flex justify-center items-center space-x-2 text-light-textPrimary dark:text-dark-textPrimary text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl'
        }
      >
        <TriangleAlert />
        <div>Você não possui permissão para prosseguir!</div>
        <TriangleAlert />
      </div>
      <div className="mt-10">
        <Link
          href="/"
          className={`link text-light-textPrimary dark:text-dark-textPrimary text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl`}
        >
          {'Voltar'}
        </Link>
      </div>
    </div>
  );
}
