import { useMemo, useState } from "react";
import type { GetStaticProps } from "next";
import Link from "next/link";
import styled from "styled-components";
import { filterJobs } from "@/lib/job-search.mjs";
import jobsData from "@/lib/data/jobsQuestion";

type JobSummary = { id: string; name: string; count: number };
export const getStaticProps: GetStaticProps = async () => ({ props: {
  jobs: Object.entries(jobsData).map(([id, job]) => ({
    id, name: job.name, count: job.technicalQuestions.length + job.nonTechnicalQuestions.length,
  })),
} });

export default function HomePage({ jobs }: { jobs: JobSummary[] }) {
  const [query, setQuery] = useState("");
  const matches = useMemo(() => filterJobs(jobs, query), [jobs, query]);
  return <main>
    <MainContainer>
      <h1>jobSearch</h1>
      <p>직무와 전공으로 찾아보는 면접 질문</p>
      <label htmlFor="job-query">직무·전공 검색</label>
      <input id="job-query" type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="직무 또는 전공을 입력해주세요" />
      <QuickSearch aria-label="빠른 검색">
        {["프론트엔드", "백엔드", "마케터", "컴퓨터"].map(term => <button type="button" key={term} aria-pressed={query === term} onClick={() => setQuery(term)}>{term}</button>)}
        <button type="button" onClick={() => setQuery("")}>전체 보기</button>
      </QuickSearch>
      <small>로그인 없이 {jobs.length}개 직무·전공, {jobs.reduce((sum, j) => sum + j.count, 0)}개 질문을 둘러볼 수 있습니다.</small>
      <small>과거 AI로 생성한 학습용 예시입니다. 실시간 생성이나 연차별 맞춤 기능은 제공하지 않습니다.</small>
    </MainContainer>
    <SubContainer>
      <h2 aria-live="polite">검색 결과 ({matches.length}개)</h2>
      <Results>
        {matches.length ? <ul>{matches.map(job => <li key={job.id}><Link href={`/jobs/${job.id}`}><span>{job.name}</span><small>{job.count ? `${job.count}개 질문` : "직무 소개"}</small></Link></li>)}</ul> : <p className="empty">검색 결과가 없습니다. 다른 직무나 전공으로 검색해 보세요.</p>}
      </Results>
      <Footer><a href="https://side.doowiki.dev/projects/job_search/">프로젝트 소개</a> · <a href="https://side.doowiki.dev/apps/interview/">이전 질문 보관함</a></Footer>
    </SubContainer>
  </main>;
}
const MainContainer = styled.section`
  display: flex; justify-content: center; align-items: center; min-height: 52vh;
  flex-direction: column; gap: 16px; padding: 40px 20px;
  background-color: ${({theme})=>theme.body}; color: ${({theme})=>theme.text};
  h1 { font-size: 30px; } p { text-align: center; } label { margin-top: 16px; }
  input { width: min(100%, 520px); padding: 14px; font: inherit; border: 1px solid gray; border-radius: 0; background: white; color: #333; }
  small { max-width: 620px; font-size: 13px; line-height: 1.6; text-align: center; }
`;
const QuickSearch = styled.div`
  display: flex; flex-wrap: wrap; justify-content: center; gap: 8px;
  button { padding: 8px 12px; background: white; color: #333; border: 1px solid #8f83ff; border-radius: 4px; cursor: pointer; font: inherit; font-size: 14px; }
  button[aria-pressed="true"] { background: #e9e5ff; }
`;
const SubContainer = styled.section`
  padding: 30px; background-color: ${({theme})=>theme.body}; color: ${({theme})=>theme.text};
  h2 { text-align: center; font-size: 30px; }
  @media(max-width: 768px) { padding: 20px 12px; h2 { font-size: 24px; } }
`;
const Results = styled.div`
  width: 90%; max-width: 1100px; margin: 30px auto 0; border: 1px solid gray;
  ul { list-style: none; } li:not(:last-child) { border-bottom: 1px solid #e1e1e1; }
  a { display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 15px 20px; }
  a:hover { background: #e9e5ff; } small { white-space: nowrap; color: #666; }
  .empty { padding: 30px 20px; text-align: center; }
  @media(max-width: 768px) { width: 100%; a { padding: 14px 12px; font-size: 14px; } }
`;
const Footer = styled.footer`text-align: center; margin: 32px 0 12px; font-size: 14px; a { text-decoration: underline; }`;
