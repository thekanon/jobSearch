import React, { useEffect, useState } from "react";
import styled from "styled-components";

import useDebounce from "@/hooks/useDebounce";

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
  maxListLength = 999,
  addStyle = "",
}: IAutoCompleteProps) => {
  const [searchTerm, setSearchTerm] = useState(value);
  const [selectedValue, setSelectedValue] = useState("");
  const [filterList, setFilterList] = useState<string[]>([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 200);

  const filter = (text: string) => {
    // 빈값이면 랜덤으로 추천
    const randomStart = Math.floor(
      Math.random() * Math.max(0, textArray.length - maxListLength)
    );
    const result = textArray.filter((item) => item.includes(text));
    if (text === "" || selectedValue === result[0])
      return textArray.slice(randomStart, randomStart + maxListLength);

    if (result.length > maxListLength) return result.slice(0, maxListLength);
    return result;
  };

  useEffect(() => {
    setFilterList(filter(value));
  }, [value, textArray]);

  useEffect(() => {
    setFilterList(filter(debouncedSearchTerm));
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (onSelectedValue) onSelectedValue(selectedValue);
  }, [selectedValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <AutoCompleteWrapper>
      <Input
        value={searchTerm}
        onChange={handleChange}
        props={{
          type: "text",
          placeholder: placeholder,
        }}
      />
      {filterList.length !== 0 && (
        <AutoCompleteList addStyle={addStyle}>
          {filterList.map((item) => (
            <div
              className={selectedValue === item ? "active" : ""}
              onClick={() => {
                setSelectedValue(item);
                setSearchTerm("");
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
