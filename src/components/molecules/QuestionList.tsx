import React from "react";
import styled from "styled-components";
import type { TechnicalQuestion } from "@/lib/types/jobs";

export type ExpandedState = { intention: boolean; answer: boolean };
export type QuestionType = "technical" | "nonTechnical";

type QuestionListProps = {
  idPrefix: string;
  questions: TechnicalQuestion[];
  type: QuestionType;
  toggleDetails: (type: QuestionType, index: number, part: keyof ExpandedState) => void;
  expandedState: ExpandedState[];
};

const StyledQuestionList = styled.div`
  margin: 20px 0;
  padding: 20px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};

  @media (max-width: 768px) { padding: 5px; }
`;

const QuestionItem = styled.article`
  margin-bottom: 1rem;
  border: 1px solid #8f83ff;
  padding: 12px;
  display: flex;
  flex-direction: column;

  h3 { font-size: 1rem; line-height: 1.6; margin: 10px 5px; font-weight: 600; word-break: keep-all; overflow-wrap: anywhere; }
  h3:focus-visible { outline: 2px solid #8f83ff; outline-offset: 4px; }
  .button-wrapper { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; }
  button {
    color: inherit;
    background: none;
    border: 1px solid #8f83ff;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.875rem;
    padding: 8px 12px;
    margin: 5px 0;
    min-height: 44px;
  }
  button[aria-expanded="true"] { font-weight: 700; }
  button:focus-visible { outline: 3px solid #8f83ff; outline-offset: 3px; }
  .details { margin-top: 0.5rem; font-size: 0.875rem; }
  .details[hidden] { display: none; }
  .details p { white-space: pre-wrap; }
`;

const QuestionList: React.FC<QuestionListProps> = ({ idPrefix, questions, type, toggleDetails, expandedState }) => (
  <StyledQuestionList>
    {questions.length === 0 ? <p>저장된 질문 예시가 없습니다.</p> : questions.map((question, index) => {
      const expanded = expandedState[index] ?? { intention: false, answer: false };
      const baseId = `${idPrefix}-${type}-${index}`;
      return (
        <QuestionItem key={`${baseId}-${question.question}`} aria-labelledby={`${baseId}-question`}>
          <h3 id={`${baseId}-question`} tabIndex={-1}>{index + 1}. {question.question}</h3>
          <div className="button-wrapper">
            <button
              id={`${baseId}-intention-toggle`}
              type="button"
              aria-expanded={expanded.intention}
              aria-controls={`${baseId}-intention`}
              aria-label={`${index + 1}번 질문 의도 ${expanded.intention ? "접기" : "보기"}`}
              onClick={() => toggleDetails(type, index, "intention")}
            >질문 의도 {expanded.intention ? "접기" : "보기"}</button>
            <button
              id={`${baseId}-answer-toggle`}
              type="button"
              aria-expanded={expanded.answer}
              aria-controls={`${baseId}-answer`}
              aria-label={`${index + 1}번 답변 예시 ${expanded.answer ? "접기" : "보기"}`}
              onClick={() => toggleDetails(type, index, "answer")}
            >답변 예시 {expanded.answer ? "접기" : "보기"}</button>
          </div>
          <div className="details" id={`${baseId}-intention`} hidden={!expanded.intention} aria-labelledby={`${baseId}-intention-toggle`}>
            <p><strong>질문 의도</strong></p>
            <p>{question.intention}</p>
          </div>
          <div className="details" id={`${baseId}-answer`} hidden={!expanded.answer} aria-labelledby={`${baseId}-answer-toggle`}>
            <p><strong>답변 예시</strong></p>
            <p>{question.exampleAnswer}</p>
          </div>
        </QuestionItem>
      );
    })}
  </StyledQuestionList>
);

export default QuestionList;
