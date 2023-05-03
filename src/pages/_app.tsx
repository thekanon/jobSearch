import React, { createContext } from 'react';
import '@/styles/globals.css';
import { IDefaultComponentProps } from '@/types/components/defaultComponent';
import { ThemeContextProvider } from '@/contexts/ThemeContext';


function MyApp({ Component, pageProps }: IDefaultComponentProps) {
  return (
    <ThemeContextProvider themeMode={'dark'}>
      <Component {...pageProps} />
    </ThemeContextProvider>
  );
}

export default MyApp;
