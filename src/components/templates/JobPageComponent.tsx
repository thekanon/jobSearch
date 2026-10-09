import Link from "next/link";
import Button from "@/components/atoms/Button";
import ButtonContainer from "@/components/molecules/ButtonContainer";
import CustomHead from "@/components/organisms/CustomHead";
import QuestionList from "@/components/molecules/QuestionList";
import type { ExpandedState, QuestionType } from "@/components/molecules/QuestionList";
import FeatureList from "@/components/molecules/FeatureList";
import type { InterviewQuestions } from "@/lib/types/jobs";
import styled from "styled-components";

type JobPageProps = InterviewQuestions & {
  technicalExpanded: ExpandedState[];
  nonTechnicalExpanded: ExpandedState[];
  technicalCount: number;
  nonTechnicalCount: number;
  appendQuestions: (type: QuestionType) => void;
  toggleDetails: (type: QuestionType, index: number, part: keyof ExpandedState) => void;
};

const JobPageComponent = ({
  id, name, generalFeatures, technicalQuestions, nonTechnicalQuestions,
  technicalExpanded, nonTechnicalExpanded, technicalCount, nonTechnicalCount,
  appendQuestions, toggleDetails,
}: JobPageProps) => (
  <Container>
    <CustomHead
      title={`${name} 면접 질문 예시`}
      description={`${name} 면접 질문과 질문 의도, 답변 예시를 살펴보세요. 과거 AI가 생성한 예시 자료입니다.`}
    />
    <nav aria-label="직무 탐색"><Link href="/">← 전체 직무로 돌아가기</Link></nav>
    <h1>{`${name}에 대하여 준비한 정보예요`}</h1>
    <Notice>과거 AI가 생성한 면접 예시입니다. 실제 채용 기준이나 정답을 의미하지 않으며, 최신 정보와 함께 확인해 주세요.</Notice>
    <h2>{name} 면접의 질문 특징!</h2>
    <FeatureList features={generalFeatures} />
    <h2>{name} 기술 면접 질문 / 답변!</h2>
    <QuestionList
      idPrefix={id}
      questions={technicalQuestions.slice(0, technicalCount)}
      type="technical"
      toggleDetails={toggleDetails}
      expandedState={technicalExpanded}
    />
    {technicalCount < technicalQuestions.length && (
      <ButtonContainer alignment="center">
        <Button onClick={() => appendQuestions("technical")}>기술 질문 더보기</Button>
      </ButtonContainer>
    )}
    <h2>{name} 비기술 면접 질문 / 답변!</h2>
    <QuestionList
      idPrefix={id}
      questions={nonTechnicalQuestions.slice(0, nonTechnicalCount)}
      type="nonTechnical"
      toggleDetails={toggleDetails}
      expandedState={nonTechnicalExpanded}
    />
    {nonTechnicalCount < nonTechnicalQuestions.length && (
      <ButtonContainer alignment="center">
        <Button onClick={() => appendQuestions("nonTechnical")}>비기술 질문 더보기</Button>
      </ButtonContainer>
    )}
  </Container>
);

const Notice = styled.p`
  border-left: 3px solid #8f83ff;
  padding: 10px 12px;
  font-size: 0.9rem;
  opacity: 0.9;
`;

const Container = styled.main`
  margin: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  line-height: 1.5;
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};

  nav { margin-bottom: 20px; }
  nav a { color: inherit; text-underline-offset: 4px; }
  a:focus-visible, button:focus-visible { outline: 3px solid #8f83ff; outline-offset: 4px; }
  p { word-break: keep-all; overflow-wrap: anywhere; margin: 20px 5px; }
  h1, h2 { word-break: keep-all; }
  h1 { font-size: 1.5rem; margin-bottom: 20px; }
  h2 { font-size: 1.25rem; }

  @media (max-width: 768px) {
    margin: 5px;
    padding: 10px;
    h1 { font-size: 1.25rem; margin-bottom: 20px; }
  }
`;

export default JobPageComponent;
