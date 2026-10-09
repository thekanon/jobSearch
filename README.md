# jobSearch

직무와 전공으로 면접 질문을 검색하고, 질문 의도와 답변 예시를 살펴보는 웹 앱입니다. 원본의 밝은 회색 배경, 보라색 질문 카드와 버튼, 목록 중심 레이아웃을 유지하면서 로그인 없이 둘러볼 수 있도록 정리했습니다.

- 공개 주소: [job-search-log.vercel.app](https://job-search-log.vercel.app/)
- 원본 저장소: [thekanon/jobSearch](https://github.com/thekanon/jobSearch)
- 프로젝트 소개: [개인 프로젝트 포트폴리오](https://side.doowiki.dev/projects/job_search/)

2026-10-10 기준으로 빌드·브라우저 검증과 Vercel 공개 배포를 완료했습니다. 아래 확인 범위에 실제 검사 결과를 기록합니다.

## 이용 흐름

1. 홈에서 직무·전공 이름을 검색하거나 빠른 검색을 선택합니다.
2. 검색 결과에서 분야를 선택합니다.
3. 분야별 특징과 기술·비기술 면접 질문을 읽습니다.
4. `질문 의도`와 `답변 예시`를 개별적으로 펼치고, `더보기`로 질문을 2개씩 추가합니다.

38개 분야에 총 524개 질문 예시가 있습니다. 질문이 없는 식품생명공학과는 분야 소개와 빈 상태 안내를 보여줍니다. 다른 분야로 이동하면 펼침 상태와 더보기 개수는 초기화됩니다.

자료는 과거 AI로 생성해 저장한 학습용 예시입니다. 현재 앱이 실시간으로 답변을 생성하거나 연차에 맞춰 질문을 바꾸지는 않습니다. 실제 기업의 채용 기준이나 정답을 제공하는 자료로 해석하지 않습니다.

## 실행

Node.js 24.x와 npm을 사용합니다.

```sh
npm ci
npm run dev
```

개발 서버의 주소와 포트는 실행 로그에서 확인합니다. 운영 서버나 기존 서비스가 사용하는 포트를 재사용하지 않습니다.

```sh
npm test
npm run typecheck
npm run build
npm start
```

- Next.js 16.4.0, React 18.3.1, TypeScript 5.9.3
- styled-components 5.3.11
- `dev`와 `build`는 Webpack을 명시합니다.
- 환경변수, 로그인, DB, 외부 API 키가 필요하지 않습니다.

상위 작업 공간의 서버 역할·운영 자료·비밀정보 취급 지침은 [side/AGENTS.md](../../../../AGENTS.md)를 따릅니다. 이 저장소의 로컬 검증을 다른 운영 앱의 재시작이나 데이터 변경으로 확장하지 않습니다.

## 구현 구조

| 위치 | 역할 |
| --- | --- |
| `src/pages/index.tsx` | 빌드 시 분야 요약 목록 생성, 브라우저에서 검색 |
| `src/lib/job-search.mjs` | 이름·ID를 대상으로 공백 구분 검색어를 모두 포함하는 항목 필터링 |
| `src/pages/jobs/[jobId].tsx` | 로컬 JSON을 직접 읽어 분야별 상세 페이지 정적 생성 |
| `src/lib/data/jobsQuestion/` | 기존 분야별 질문·의도·답변 예시 |
| `src/containers/JobPageContainer.tsx` | 분야별 펼침·더보기 상태 |
| `src/components/templates/JobPageComponent.tsx` | 원본 스타일을 유지한 상세 화면 |
| `src/pages/_document.tsx` | styled-components의 서버 렌더링 스타일 수집 |
| `src/pages/api/jobs/[jobId].ts` | 동일한 공개 예시 데이터의 읽기 전용 API |

상세 페이지는 자기 API를 다시 호출하지 않습니다. 정적 경로에 없는 분야는 404입니다. API는 GET만 허용하고, 잘못된 ID·존재하지 않는 ID·객체 상속 키는 404로 처리합니다. 그 외 메서드는 405입니다.

검색어와 화면의 펼침 상태는 메모리에만 있습니다. 입력 내용을 서버에 저장하거나 계정에 연결하지 않으며, 외부 AI·분석 서비스 호출을 앱 흐름에 포함하지 않습니다.

## Vercel 배포 범위

Vercel 프로젝트는 `doo-doo / job-search`이며, 공개 주소는 `https://job-search-log.vercel.app/`입니다.

`vercel.json`은 `npm ci`와 `npm run build`를 사용합니다. `.vercelignore`의 허용 목록에는 빌드 설정, 현재 화면에서 사용하는 소스·질문 JSON, favicon·sitemap·robots만 포함합니다. 과거 도구와 보관 자료, 테스트, Git 메타데이터, 환경 파일·키 파일은 업로드 대상에서 제외합니다.

원본의 `.env`는 로컬의 별도 안전 경로로 옮기고 Git 추적 대상에서 제외했습니다. 새 실행 구조는 해당 파일을 사용하지 않습니다. 기존 생성·대량 창 열기 도구를 배포나 실행 명령으로 사용하지 않습니다.

## 이전 질문 보관함

[이전 질문 보관함](https://side.doowiki.dev/apps/interview/)은 별도의 기존 데모입니다. 이 저장소의 Vercel 앱과 같은 배포본으로 간주하지 않으며, 기존 주소는 별도로 유지합니다.

## 확인 범위

최종 확인: 2026-10-10.

- `npm test`: 10개 중 10개 통과
- `npm run typecheck`: 통과
- Next.js 16.4.0 프로덕션 빌드: 정적 페이지 41개 생성 완료
- `npm audit`: 취약점 0개
- 브라우저: 한국어 검색·빠른 검색·결과 없음, 상세 질문 의도·답변 펼치기와 더보기, 홈 이동 확인
- 모바일: 390px 너비의 홈·상세 화면에서 가로 넘침 없음
- 브라우저 콘솔 오류: 0개
- Vercel 배포 [job-search-7smi84exl-doo-doo.vercel.app](https://job-search-7smi84exl-doo-doo.vercel.app/)의 Ready 상태 및 [공개 주소](https://job-search-log.vercel.app/) 연결 완료
- 공개 HTTP 검사 13개 통과: 정상 응답 200, 잘못된 경로·ID의 404, 허용하지 않는 API 메서드의 405, 환경 파일 비노출 확인
