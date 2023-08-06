import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import Head from "next/head";
import styled from "styled-components";
import { fetchJob } from "@/lib/api/jobs";
import { InterviewQuestions } from "@/lib/types/jobs";
import { useState, useEffect } from "react";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const jobId = context.params?.jobId as string;
  const job = await fetchJob(jobId);

  if (!job) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ...job,
    },
  };
};

type JobProps = InterviewQuestions;
type ExpandedState = {
  intention: boolean;
  answer: boolean;
};

const JobPage = ({
  id,
  name,
  generalFeatures,
  technicalQuestions,
  nonTechnicalQuestions,
}: JobProps) => {
  const router = useRouter();
  // set expanded state
  const [technicalExpanded, setTechnicalExpanded] = useState<ExpandedState[]>(
    technicalQuestions.map(() => ({ intention: false, answer: false }))
  );
  const [nonTechnicalExpanded, setNonTechnicalExpanded] = useState<
    ExpandedState[]
  >(nonTechnicalQuestions.map(() => ({ intention: false, answer: false })));

  const [technicalCount, setTechnicalCount] = useState(2);
  const [nonTechnicalCount, setNonTechnicalCount] = useState(2);

  const appendQuestions = (type: "technical" | "nonTechnical") => {
    type === "technical"
      ? setTechnicalCount(technicalCount + 2)
      : setNonTechnicalCount(nonTechnicalCount + 2);
  };

  const toggleDetails = (
    type: "technical" | "nonTechnical",
    index: number,
    part: keyof ExpandedState
  ) => {
    const newState =
      type === "technical" ? [...technicalExpanded] : [...nonTechnicalExpanded];
    newState[index][part] = !newState[index][part];

    type === "technical"
      ? setTechnicalExpanded(newState)
      : setNonTechnicalExpanded(newState);
  };

  return (
    <Container>
      <Head>
        <title>{name}에 대한 면접 정보</title>
      </Head>
      <h1>{`${name}에 대하여 준비한 정보에요`}</h1>
      <h2>{name} 면접의 질문 특징!</h2>
      <FeatureList>
        {generalFeatures.map((feature, index) => (
          <p key={index}>{feature}</p>
        ))}
      </FeatureList>
      <h2>{name} 기술 면접 질문 / 답변</h2>
      <QuestionList
        questions={technicalQuestions.slice(0, technicalCount)}
        type="technical"
        toggleDetails={toggleDetails}
        expandedState={technicalExpanded}
      />
      <button onClick={() => appendQuestions("technical")}>더보기</button>

      <h2>{name} 비기술 면접 질문 / 답변</h2>
      <QuestionList
        questions={nonTechnicalQuestions.slice(0, nonTechnicalCount)}
        type="nonTechnical"
        toggleDetails={toggleDetails}
        expandedState={nonTechnicalExpanded}
      />
      <button onClick={() => appendQuestions("nonTechnical")}>더보기</button>
    </Container>
  );
};

const QuestionList = ({ questions, type, toggleDetails, expandedState }) => (
  <StyledQuestionList>
    {questions.map((question, index) => (
      <QuestionItem
        key={index}
        className={
          expandedState[index].intention || expandedState[index].answer
            ? "expanded"
            : ""
        }
      >
        <p>{question.question}</p>
        <div className="button-wrapper">
          <button onClick={() => toggleDetails(type, index, "intention")}>
            질문 의도
          </button>
          <button onClick={() => toggleDetails(type, index, "answer")}>
            답변 예시
          </button>
        </div>
        <div className="details">
          <div
            className="intention"
            style={{
              display: expandedState[index].intention ? "block" : "none",
            }}
          >
            <p>
              <strong>의도 : </strong>
            </p>
            <p>{question.intention}</p>
          </div>
          <div
            className="intention"
            style={{ display: expandedState[index].answer ? "block" : "none" }}
          >
            <p>
              <strong>답변 : </strong>
            </p>
            <p>{question.exampleAnswer}</p>
          </div>
        </div>
      </QuestionItem>
    ))}
  </StyledQuestionList>
);

export default JobPage;
// styles for this page
// ...
const Container = styled.div`
  margin: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  line-height: 1.5; // 일반 텍스트의 라인 간격 설정

  p {
    word-break: keep-all;
    margin: 15px 5px;
  }

  h1,
  h2 {
    word-break: keep-all;
  }

  h1 {
    font-size: 1.5rem;
    margin-bottom: 30px;
  }

  h2 {
    font-size: 1.25rem;
  }

  @media (max-width: 768px) {
    margin: 5px;
    padding: 10px;

    h1 {
      font-size: 1.25rem;
      margin-bottom: 20px;
    }
  }
`;

const Loading = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin: 20px;

  @media (max-width: 768px) {
    font-size: 16px;
    margin: 15px;
  }
`;

const StyledList = styled.div`
  margin-top: 20px;
  padding: 20px;
  border-radius: 5px;

  @media (max-width: 768px) {
    margin-top: 15px;
    padding: 0px;
    font-size: 14px;
  }
`;

const FeatureList = styled(StyledList)`
  background-color: #2f2f2f;
  margin-bottom: 20px;
  padding: 5px;
`;

const StyledQuestionList = styled(StyledList)`
  background-color: #2f2f2f;
  margin-bottom: 20px;
`;
const QuestionItem = styled.div`
  margin-bottom: 1rem;
  border: 1px solid #8f83ff;

  display: flex;
  flex-direction: column;
  .details {
    display: none;
    margin-top: 0.5rem;
    font-size: 0.875rem;
  }
  .button-wrapper {
    display: flex;
    justify-content: center;
  }

  &.expanded .details {
    display: block;
  }

  button {
    background: none;
    border: none;
    color: #8f83ff;
    cursor: pointer;
    font-size: 0.875rem;
    padding: 0;
    margin: 10px 10px;
  }

  @media (max-width: 768px) {
    // 모바일 환경에서 필요한 추가 스타일...
  }
`;
