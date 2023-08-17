import { MainLayout } from '@/components/layout/MainLayout';
import '@/styles/globals.css';
import { checkAuth } from '@/utils/checkAuth';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { FC, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <MainLayout>
          <Component {...pageProps} />
          <ToastContainer position="bottom-left" autoClose={2000} />
        </MainLayout>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default App;
