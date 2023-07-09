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
  maxListLength = 99,
  addStyle = "",
}: IAutoCompleteProps) => {
  const [selectedValue, setSelectedValue] = useState("");
  const filter = (text: string) => {
    // 빈값이면 랜덤으로 추천
    const randomStart = Math.floor(
      Math.random() * Math.max(0, textArray.length - maxListLength)
    );
    if (text === "")
      return textArray.slice(randomStart, randomStart + maxListLength);
    const result = textArray.filter((item) => item.includes(text));
    if (selectedValue === result[0]) return [];
    if (result.length > maxListLength) return result.slice(0, maxListLength);
    return result;
  };
  useEffect(() => {
    console.log(placeholder);
  }, [placeholder]);

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
              key={item || Math.random()}
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
  max-height: 350px;
  overflow: auto;
  div {
    padding: 10px;
  }
  div.active {
    background-color: gray;
  }
  ${({ addStyle }) => addStyle}
`;

export default AutoComplete;
