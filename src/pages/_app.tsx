import React, { createContext } from "react";
import "@/styles/globals.css";
import { IDefaultComponentProps } from "@/types/components/defaultProps";
import { ThemeContextProvider } from "@/contexts/ThemeContext";
import { Provider } from "react-redux";
import { store } from "@/store";

function MyApp({ Component, pageProps }: IDefaultComponentProps) {
  return (
    <Provider store={store}>
      <ThemeContextProvider themeMode={"dark"}>
        <Component {...pageProps} />
      </ThemeContextProvider>
    </Provider>
  );
}

export default MyApp;
