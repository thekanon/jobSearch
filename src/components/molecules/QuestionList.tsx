import React from "react";
import styled from "styled-components";

type Question = {
  question: string;
  intention: string;
  exampleAnswer: string;
};

type ExpandedState = {
  intention: boolean;
  answer: boolean;
};

type QuestionListProps = {
  questions: Question[];
  type: "technical" | "nonTechnical";
  toggleDetails: (
    type: "technical" | "nonTechnical",
    index: number,
    part: keyof ExpandedState
  ) => void;
  expandedState: ExpandedState[];
};

const StyledQuestionList = styled.div`
  margin-top: 20px;
  padding: 20px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
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


    @media (prefers-color-scheme: dark) {
        button {
          color: black;
        }
    }
  }
  &.expanded .details {
    display: block;
  }
  button {
    background: none;
    border: none;

    cursor: pointer;
    font-size: 0.875rem;
    padding: 0;
    margin: 10px 10px;
  }
  @media (max-width: 768px) {
    // 모바일 환경에서 필요한 추가 스타일...
  }
`;

const QuestionList: React.FC<QuestionListProps> = ({
  questions,
  type,
  toggleDetails,
  expandedState,
}) => (
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

export default QuestionList;
