import React from 'react';
import styled from 'styled-components';

interface ProgressBarProps {
  percentage: number;
  color?: string;
}

const _progressBar: React.FC<ProgressBarProps> = ({ percentage, color }) => {
  return (
    <ProgressBarContainer>
      <ProgressBarFill percentage={percentage} color={color} />
    </ProgressBarContainer>
  );
};
const ProgressBarContainer = styled.div`
  width: 100%;
  height: 10px;
  background-color: #d9d9d9;
  border-radius: 5px;
`;

const ProgressBarFill = styled.div<ProgressBarProps>`
  height: 100%;
  width: ${({ percentage }) => (percentage < 2 ? 2 : percentage)}%;
  background-color: ${({ color }) => color || 'black'};
  border-radius: 5px;
  transition: width 1s ease-in-out;
`;

export default _progressBar;
