import React, { createContext, useState, ReactNode } from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { lightTheme, darkTheme } from '../styles/Theme';

interface IThemeContext {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}
interface ThemeProviderProps {
  themeMode: 'light' | 'dark';
  children: ReactNode;
}

export const ThemeContext = createContext<IThemeContext>({
  theme: 'dark',
  toggleTheme: () => { },
});
export const ThemeContextProvider: React.FC<ThemeProviderProps> = ({ children, themeMode }) => {
  const [theme, setTheme] = useState(themeMode);
  console.log(theme);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};