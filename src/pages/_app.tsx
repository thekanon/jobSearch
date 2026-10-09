import type { AppProps } from "next/app";
import "@/styles/globals.css";
import { ThemeContextProvider } from "@/contexts/ThemeContext";
import Head from "next/head";

export default function MyApp({ Component, pageProps }: AppProps) {
  return <ThemeContextProvider themeMode="light">
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="직무와 전공으로 면접 질문을 검색하고, 질문 의도와 답변 예시를 확인하는 jobSearch 데모입니다." />
      <title>jobSearch · 면접 질문 검색</title>
    </Head>
    <Component {...pageProps} />
  </ThemeContextProvider>;
}
