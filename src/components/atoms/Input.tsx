import React from "react";
import styled from "styled-components";
import { IDefaultAtomsComponentProps } from "@/types/components/defaultAtomsComponent";

const Input = ({
  value,
  onChange,
  props,
  addStyle = "",
}: IDefaultAtomsComponentProps) => {
  return (
    <StyledInput
      value={value}
      onChange={onChange}
      {...props}
      addStyle={addStyle}
    />
  );
};

const StyledInput = styled.input<IDefaultAtomsComponentProps>`
  padding: 1em;
  font-size: 1em;
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  border: 1px solid gray;
  ${({ addStyle }) => addStyle}
`;
export default Input;
