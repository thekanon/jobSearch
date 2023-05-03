import type { Meta, StoryObj } from '@storybook/react';
import Input from './Input';

/*
  text?: string;
  color?: string;
  size?: string;
  bold?: boolean;

*/
const meta: Meta<typeof Input> = {
  title: 'Example/atoms/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: {
        type: 'text',
      },

    },
    onChange: {
      control: {
        type: 'eval',
      }
    },
    props: {
      control: {
        type: 'object',
      }
    },
    styleProps: {
      control: {
        type: 'object',
      }
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;
export const 스타일_및_추가속성: Story = {
  args: {
    props: {
      type: 'text',
      placeholder: '직무, 연차를 입력해주세요',
    },
    styleProps: {
      width: '500px',
      height: '30px',
      padding: '5px',
      fontSize: '20px',
      backgroundColor: 'white',
      color: 'black',
      border: '2px solid blue',
    },

  },
};
export const 이벤트: Story = {
  args: {
    onChange: (e) => {
      alert(e.target.value);
    },
  },
};
