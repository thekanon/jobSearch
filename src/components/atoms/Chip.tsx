import React from "react";
import styled from "styled-components";

interface IChipProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  addStyle?: string;
}

const Chip = ({ children, className, addStyle, ...rest }: IChipProps) => {
  return (
    <ChipWrapper className={className} addStyle={addStyle} {...rest}>
      {children}
    </ChipWrapper>
  );
};
const ChipWrapper = styled.div<IChipProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  padding: 8px 12px;
  background-color: #f1f3f4;
  font-size: 14px;
  line-height: 20px;
  color: #333;
  white-space: nowrap;
  user-select: none;

  ${({ addStyle }) => addStyle}

  @media (max-width: 768px) {
    font-size: 12px;
    line-height: 18px;
    padding: 6px 10px;
    border-radius: 14px;
  }
`;
export default Chip;
