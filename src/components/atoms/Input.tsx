import React from "react";
import styled from "styled-components";
import { IDefaultAtomsComponentProps } from "@/types/components/defaultAtomsComponent";


const Input = ({
  value,
  onChange,
  props,
  styleProps,
}: IDefaultAtomsComponentProps) => {
  return (
    <StyledInput
      value={value}
      onChange={onChange}
      {...props}
      styleProps={styleProps || {}}
    />
  );
};

const StyledInput = styled.input<IDefaultAtomsComponentProps>`
    width: ${({ styleProps }) => styleProps?.width || ""};
    height: ${({ styleProps }) => styleProps?.height || ""};
    padding: ${({ styleProps }) => styleProps?.padding || "1em"};
    font-size: ${({ styleProps }) => styleProps?.fontSize || "1em"};
    background-color: ${({ styleProps, theme }) => styleProps?.backgroundColor || theme.body};
    color: ${({ styleProps, theme }) => styleProps?.color || theme.text};
    border: ${({ styleProps }) => styleProps?.border || "1px solid gray"};
  `;
export default Input;
