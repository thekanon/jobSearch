import React from "react";
import styled from "styled-components";
import Input from "../atoms/Input";
import { IStyleProps } from "@/types/components/defaultProps";

interface IAutoCompleteProps {
  value: string;
  placeholder?: string;
  textArray: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxListLength?: number;
  styleProps?: IStyleProps;
}

const AutoComplete = ({
  placeholder,
  value,
  textArray = [],
  onChange,
  maxListLength = 10,
  styleProps = {},
}: IAutoCompleteProps) => {
  const [currentValue, setCurrentValue] = React.useState("");
  const filter = (text: string) => {
    if (text === "") return [];
    const result = textArray.filter((item) => item.includes(text));
    if (currentValue === result[0]) return [];
    if (result.length > maxListLength) return result.slice(0, maxListLength);
    return result;
  };
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
        <AutoCompleteList {...styleProps}>
          {filter(value).map((item) => (
            <div
              className={currentValue === item ? "active" : ""}
              onClick={() => {
                setCurrentValue(item);
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
const AutoCompleteList = styled.div<IStyleProps>`
  margin: ${({ margin }) => margin || "10px 0 0 0"};
  padding: 10px;
  border: ${({ border }) => border || ""};
  div {
    padding: 10px;
  }
  div.active {
    background-color: ${({ activeColor }) => activeColor || "gray"};
  }
`;

export default AutoComplete;
