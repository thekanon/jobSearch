import React, { createContext, useEffect } from "react";
import "@/styles/globals.css";
import { IDefaultComponentProps } from "@/types/components/defaultProps";
import { ThemeContextProvider } from "@/contexts/ThemeContext";
import { Provider } from "react-redux";
import { store } from "@/store";
import Head from "next/head";

function MyApp({ Component, pageProps }: IDefaultComponentProps) {
  return (
    <Provider store={store}>
      <ThemeContextProvider themeMode={"dark"}>
        <Head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta http-equiv="X-UA-Compatible" content="ie=edge" />
          <meta
            name="description"
            content="연차, 직무를 넣으면 면접 질문과 답변 만들어주는 웹앱입니다."
          />
          <meta
            name="keywords"
            content="면접질문, 자기소개서, 신입 면접, 주니어 면접"
          />

          <title>면접을 위한 맞춤 정보</title>
        </Head>
        <Component {...pageProps} />
      </ThemeContextProvider>
    </Provider>
  );
}

export default MyApp;
