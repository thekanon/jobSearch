import React from "react";
import styled from "styled-components";

interface IButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  addStyle?: string;
}

const Button = ({ children, className, addStyle, onClick }: IButtonProps) => {
  return (
    <ButtonWrapper className={className} addStyle={addStyle} onClick={onClick}>
      {children}
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.button<IButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 10px 15px;
  background-color: #8f83ff;
  color: #ffffff;
  font-size: 16px;
  line-height: 24px;
  cursor: pointer;
  border: none;
  white-space: nowrap;
  user-select: none;
  transition: background-color 0.3s ease;

  ${({ addStyle }) => addStyle}

  &:hover {
    background-color: #a09aff;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 20px;
    padding: 8px 12px;
    border-radius: 6px;
  }
`;

export default Button;
