import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Input from "../atoms/Input";
import { IStyleProps } from "@/types/components/defaultProps";

interface IAutoCompleteProps {
  value: string;
  placeholder?: string;
  textArray: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectedValue?: (value: string) => void;
  maxListLength?: number;
  addStyle?: string;
}
interface IAutoCompleteListProps {
  addStyle?: string;
}

const AutoComplete = ({
  placeholder,
  value,
  textArray = [],
  onChange,
  onSelectedValue,
  maxListLength = 10,
  addStyle = "",
}: IAutoCompleteProps) => {
  const [selectedValue, setSelectedValue] = useState("");
  const filter = (text: string) => {
    if (text === "") return [];
    const result = textArray.filter((item) => item.includes(text));
    if (selectedValue === result[0]) return [];
    if (result.length > maxListLength) return result.slice(0, maxListLength);
    return result;
  };

  useEffect(() => {
    if (onSelectedValue) onSelectedValue(selectedValue);
  }, [selectedValue]);

  return (
    <AutoCompleteWrapper>
      <Input
        value={value}
        onChange={onChange}
        props={{
          type: "text",
          placeholder: placeholder,
        }}
      />
      {filter(value).length !== 0 && (
        <AutoCompleteList addStyle={addStyle}>
          {filter(value).map((item) => (
            <div
              className={selectedValue === item ? "active" : ""}
              onClick={() => {
                setSelectedValue(item);
                onChange({
                  target: { value: item },
                } as React.ChangeEvent<HTMLInputElement>);
              }}
              key={item}
            >
              {item}
            </div>
          ))}
        </AutoCompleteList>
      )}
    </AutoCompleteWrapper>
  );
};

const AutoCompleteWrapper = styled.div``;
const AutoCompleteList = styled.div<IAutoCompleteListProps>`
  margin: 10px 0 0 0;
  padding: 10px;
  border: none;
  div {
    padding: 10px;
  }
  div.active {
    background-color: gray;
  }
  ${({ addStyle }) => addStyle}
`;

export default AutoComplete;
