import React from 'react';
import styled from 'styled-components';

interface ProgressBarTitleProps {
  title?: string;
  color?: string;
  size?: string;
  percentage?: number | string;
}

const _progressBarTitle: React.FC<ProgressBarTitleProps> = ({ title, color, size, percentage }) => {
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
const Title = styled.div`
  font-size: ${({ size }) => size || '18px'};
  margin-bottom: 10px;
  color: ${({ color }) => color || 'black'};
  font-weight: 600;
`;
const Percentage = styled.span`
  font-size: ${({ size }) => size || '18px'};
  margin-bottom: 10px;
  color: ${({ color }) => color || 'black'};
  font-weight: 600;
`;
const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export default _progressBarTitle;
