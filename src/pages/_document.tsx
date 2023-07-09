import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
