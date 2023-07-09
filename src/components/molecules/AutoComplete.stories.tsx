import type { Meta, Story } from "@storybook/react";
import AutoComplete from "./AutoComplete";

interface IAutoCompleteProps {
  value: string;
  placeholder?: string;
  textArray: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxListLength?: number;
  addStyle?: string;
}

const meta: Meta = {
  title: "Example/molecules/AutoComplete",
  component: AutoComplete,
  tags: ["autodocs"],
  argTypes: {
    value: {
      description: "현재 입력 값",
      defaultValue: {
        summary: "required",
      },
      control: {
        type: "text",
      },
    },
    placeholder: {
      description: "플레이스홀더",
      defaultValue: {
        summary: "Input text here...",
      },
      control: {
        type: "text",
      },
    },
    textArray: {
      description: "자동완성에 사용될 텍스트 배열",
      defaultValue: {
        summary: "required",
      },
      control: {
        type: "object",
      },
    },
    maxListLength: {
      description: "자동완성 목록의 최대 길이",
      defaultValue: {
        summary: "10",
      },
      control: {
        type: "number",
      },
    },
    addStyle: {
      description: "스타일 프로퍼티",
      defaultValue: {
        summary: "",
      },
      control: {
        type: "string",
      },
    },
  },
};

export default meta;

const Template: Story<IAutoCompleteProps> = (args) => (
  <AutoComplete {...args} />
);

let value = "";
let value2;

export const DefaultAutoComplete = Template.bind({});
DefaultAutoComplete.args = {
  value: value,
  placeholder: "Search...",
  textArray: ["Apple", "Banana", "Cherry", "Date", "Elderberry"],
  onChange: (e) => (value = e.target.value),
  maxListLength: 5,
};

export const CustomStyleAutoComplete = Template.bind({});
CustomStyleAutoComplete.args = {
  value: value2,
  placeholder: "Search...",
  textArray: ["Apple", "Banana", "Cherry", "Date", "Elderberry"],
  onChange: (e) => (value = e.target.value),
  maxListLength: 5,
  addStyle: `margin: 15px,
  border: 1px solid gray",
  activeColor: lightgray,
  `,
};
