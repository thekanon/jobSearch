import React, { useState, useEffect } from "react";
import styled, { useTheme } from "styled-components";
import Chip from "../atoms/Chip";
import { IStyleProps } from "@/types/components/defaultProps";

interface IChipGroupProps {
  textArray: string[];
  onSelectedValue: (value: string) => void;
  addStyle?: string;
}

const ChipGroup = ({
  textArray = [],
  onSelectedValue,
  addStyle = "",
}: IChipGroupProps) => {
  const [selectedValue, setSelectedValue] = useState("");
  const theme = useTheme();

  useEffect(() => {
    if (onSelectedValue) onSelectedValue(selectedValue);
  }, [selectedValue]);

  return (
    <ChipGroupWrapper addStyle={addStyle}>
      {textArray.map((item) => (
        <Chip
          key={item}
          onClick={() => {
            setSelectedValue(item);
          }}
          addStyle={StyledChip(theme)}
        >
          {item}
        </Chip>
      ))}
    </ChipGroupWrapper>
  );
};
const ChipGroupWrapper = styled.div<IStyleProps>`
  display: flex;
  flex-wrap: wrap;
  margin: 0.5rem 0;
  .active {
    background-color: ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.body};
  }
  ${({ addStyle }) => addStyle}
`;
const StyledChip = (theme: any) => `
  margin: 0.3rem 0.3rem 0 0;
  &:hover {
    background-color: ${theme.text + 70};
    color: ${theme.body};
  }
`;

export default ChipGroup;
