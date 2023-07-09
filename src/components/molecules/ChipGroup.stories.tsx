import type { Meta, Story } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import ChipGroup, { IChipGroupProps } from "./ChipGroup";

const meta: Meta = {
  title: "Example/molecules/ChipGroup",
  component: ChipGroup,
  tags: ["autodocs"],
  argTypes: {
    textArray: {
      description: "Array of text for each chip",
      control: {
        type: "object",
      },
    },
    addStyle: {
      description: "Add custom CSS",
      control: {
        type: "text",
      },
    },
  },
};

export default meta;

const Template: Story<IChipGroupProps> = (args) => (
  <ThemeProvider theme={theme}>
    <ChipGroup {...args} />
  </ThemeProvider>
);

const theme = {
  body: "#FFFFFF",
  text: "#000000",
};

export const Default = Template.bind({});
Default.args = {
  textArray: ["aaa", "bbbb", "ccccc"],
  onSelectedValue: (value) => console.log(value),
  addStyle: `margin-bottom: 20px;`,
};
export const FiveItems = Template.bind({});
FiveItems.args = {
  textArray: ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"],
  onSelectedValue: (value) => console.log(value),
  addStyle: `margin-bottom: 20px;`,
};

export const TenItems = Template.bind({});
TenItems.args = {
  textArray: [
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 7",
    "Item 8",
    "Item 9",
    "Item 10",
  ],
  onSelectedValue: (value) => console.log(value),
  addStyle: `margin-bottom: 20px;`,
};

export const CustomStyling = Template.bind({});
CustomStyling.args = {
  textArray: ["Item 1", "Item 2", "Item 3"],
  onSelectedValue: (value) => console.log(value),
  addStyle: `
    margin-bottom: 20px;
    border: 1px solid red;
    padding: 10px;
    border-radius: 5px;
  `,
};
