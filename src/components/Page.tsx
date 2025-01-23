import * as React from 'react';

interface PageProps {
  children: React.ReactNode;
  className?: string;
}

const Page: React.FC<PageProps> = ({ children, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center min-h-screen text-center px-4 ${className}`}>
      {children}
    </div>
  );
};

export default Page;
