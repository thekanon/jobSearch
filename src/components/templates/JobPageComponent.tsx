import Button from "@/components/atoms/Button";
import Loading from "@/components/atoms/Loading";
import ButtonContainer from "@/components/molecules/ButtonContainer";
import CustomHead from "@/components/organisms/CustomHead";
import QuestionList from "@/components/molecules/QuestionList";
import FeatureList from "@/components/molecules/FeatureList";
import styled from "styled-components";

const JobPageComponent = ({
  name,
  isLoading,
  generalFeatures,
  technicalQuestions,
  nonTechnicalQuestions,
  technicalExpanded,
  nonTechnicalExpanded,
  technicalCount,
  nonTechnicalCount,
  appendQuestions,
  toggleDetails,
}) => (
  <div>
    {isLoading ? (
      <Loading message="Loading your data..." size="large" color="#8f83ff" />
    ) : (
      <Container>
        <CustomHead
          title={`${name} 면접 정보`}
          description={`${name}의 면접의 특징, 기술 면접 질문, 비기술 면접 질문과 각 질문의 의도, 답변 예시까지 알아보세요!`}
          keywords={`${name}, ${name} 면접, ${name} 기술 면접, ${name} 비기술 면접, ${name} 질문, ${name} 면접 답변, ${name} 질문 의도, ${name} 답변 예시`}
        />
        <h1>{`${name}에 대하여 준비한 정보에요`}</h1>
        <h2>{name} 면접의 질문 특징!</h2>
        <FeatureList features={generalFeatures} />
        <h2>{name} 기술 면접 질문 / 답변!</h2>
        <QuestionList
          questions={technicalQuestions.slice(0, technicalCount)}
          type="technical"
          toggleDetails={toggleDetails}
          expandedState={technicalExpanded}
        />
        <ButtonContainer alignment="center">
          <Button onClick={() => appendQuestions("technical")}>더보기</Button>
        </ButtonContainer>
        <h2>{name} 비기술 면접 질문 / 답변!</h2>
        <QuestionList
          questions={nonTechnicalQuestions.slice(0, nonTechnicalCount)}
          type="nonTechnical"
          toggleDetails={toggleDetails}
          expandedState={nonTechnicalExpanded}
        />
        <ButtonContainer>
          <Button onClick={() => appendQuestions("nonTechnical")}>
            더보기
          </Button>
        </ButtonContainer>{" "}
      </Container>
    )}
  </div>
);

const Container = styled.div`
  margin: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  line-height: 1.5; // 일반 텍스트의 라인 간격 설정

  p {
    word-break: keep-all;
    margin: 35px 5px;
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

export default JobPageComponent;
