import React from "react";
import styled from "styled-components";

type FeatureListProps = {
  features: string[];
  className?: string; // 확장성을 위해 className 프로퍼티를 추가하여 스타일링을 커스터마이즈 할 수 있게 함
};

const FeatureList: React.FC<FeatureListProps> = ({ features, className }) => (
  <StyledFeatureList className={className}>
    {features.map((feature, index) => (
      <p key={index}>{feature}</p>
    ))}
  </StyledFeatureList>
);

const StyledFeatureList = styled.div`
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  margin-top: 20px;
  padding: 5px;
  border-radius: 5px;

  p {
    margin: 15px 5px;
    word-break: keep-all;
  }

  @media (max-width: 768px) {
    margin-top: 15px;
    padding: 0px;
    font-size: 14px;
  }
`;

export default FeatureList;
