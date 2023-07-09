import React from "react";
import styled from "styled-components";

interface ProgressBarTitleProps {
  title?: string;
  color?: string;
  size?: string;
  percentage?: number | string;
}
interface TitleProps {
  color?: string;
  size?: string;
}
interface PercentageProps {
  color?: string;
  size?: string;
}

const _progressBarTitle: React.FC<ProgressBarTitleProps> = ({
  title,
  color,
  size,
  percentage,
}) => {
  return (
    <TitleWrapper>
      <Title color={color} size={size}>
        {title}
      </Title>
      {percentage && (
        <Percentage color={color} size={size}>
          {`${percentage}%`}
        </Percentage>
      )}
    </TitleWrapper>
  );
};
const Title = styled.div<TitleProps>`
  font-size: ${({ size }) => size || "18px"};
  margin-bottom: 10px;
  color: ${({ color }) => color || "black"};
  font-weight: 600;
`;
const Percentage = styled.span<PercentageProps>`
  font-size: ${({ size }) => size || "18px"};
  margin-bottom: 10px;
  color: ${({ color }) => color || "black"};
  font-weight: 600;
`;
const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export default _progressBarTitle;
