import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";

import useDebounce from "@/hooks/useDebounce";

import Input from "../atoms/Input";

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

  const selectItem = useCallback((item) => {
    setSelectedValue(item);
    setSearchTerm("");
  }, []);

  const filter = (text: string) => {
    const lowerCaseText = text.toLowerCase();

    const randomStart = Math.floor(
      Math.random() * Math.max(0, textArray.length - maxListLength)
    );

    const result = textArray.filter((item) =>
      item.toLowerCase().includes(lowerCaseText)
    );

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
          {filterList.map((item, index) => (
            <div
              className={selectedValue === item ? "active" : ""}
              onClick={() => selectItem(item)}
              key={index}
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
    cursor: pointer;
  }
  div.active,
  div:hover {
    background-color: gray;
  }
  ${({ addStyle }) => addStyle}
`;

export default AutoComplete;
