import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

interface NextLinkProps {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}

const NextLink: React.FC<NextLinkProps> = ({ href, children, active }) => {
  const router = useRouter();
  const isActive = active || (href !== '/' && router.pathname.startsWith(href));

  return (
    <Link href={href} passHref>
      <span
        className={`text-base md:text-lg lg:text-xl xl:text-2xl font-medium ${
          isActive ? 'text-primary' : 'text-gray-500 hover:text-primary'
        }`}
      >
        {children}
      </span>
    </Link>
  );
};

export default NextLink;
