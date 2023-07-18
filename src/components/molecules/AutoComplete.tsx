import React, { useEffect, useState, useCallback, useMemo } from "react";
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
interface ListElementProps {
  item: string;
  active: boolean;
  onClick: () => void;
}

const ListElement = React.memo(
  ({ item, active, onClick }: ListElementProps) => {
    return (
      <div className={active ? "active" : ""} onClick={onClick}>
        {item}
      </div>
    );
  },
  (prevProps, nextProps) =>
    prevProps.item === nextProps.item && prevProps.active === nextProps.active
);

const AutoComplete = ({
  placeholder,
  value,
  textArray = [],
  onChange,
  onSelectedValue,
  maxListLength = 20,
  addStyle = "",
}: IAutoCompleteProps) => {
  const [searchTerm, setSearchTerm] = useState(value);
  const [selectedValue, setSelectedValue] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 200);

  const selectItem = useCallback((item) => {
    setSelectedValue(item);
    setSearchTerm("");
  }, []);

  const filter = useMemo(() => {
    const lowerCaseText = debouncedSearchTerm.toLowerCase();

    const randomStart = Math.floor(
      Math.random() * Math.max(0, textArray.length - maxListLength)
    );

    const result = textArray.filter((item) =>
      item.toLowerCase().includes(lowerCaseText)
    );

    if (debouncedSearchTerm === "" || selectedValue === result[0])
      return textArray.slice(randomStart, randomStart + maxListLength);

    if (result.length > maxListLength) return result.slice(0, maxListLength);
    return result;
  }, [debouncedSearchTerm, textArray, selectedValue]);

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
      {filter.length !== 0 && (
        <AutoCompleteList addStyle={addStyle}>
          {filter.map((item) => (
            <ListElement
              key={item}
              item={item}
              active={selectedValue === item}
              onClick={() => selectItem(item)}
            />
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
  max-height: 250px;
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
