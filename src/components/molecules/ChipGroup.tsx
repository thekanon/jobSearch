import React, { useState, useEffect } from "react";
import styled from "styled-components";
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
          addStyle={`margin: "0.5rem 0.5rem 0 0",`}
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
export default ChipGroup;
