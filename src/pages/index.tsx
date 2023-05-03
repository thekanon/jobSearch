import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../contexts/ThemeContext';
import AutoComplete from '@/components/molecules/AutoComplete';
import {
  JobType,
  MajorType,
  experienceLevels,
} from '@/lib/categories'


const HomePage = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [value, setValue] = React.useState('');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setValue(e.target.value);
  };

  return (
    <MainContainer>
      <AutoComplete
        value={value}
        onChange={onChange}
        placeholder={'직무, 연차를 입력해주세요'}
        textArray={[
          ...JobType,
          ...MajorType,
          ...experienceLevels,
        ]}
        styleProps={{
          border: '1px solid gray',
        }}
      />
    </MainContainer>
  );
};
const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
`;

const ToggleButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: ${({ theme }) => theme.toggleBorder};
  color: ${({ theme }) => theme.text};
  border: none;
  padding: 10px;
  cursor: pointer;
`;

export default HomePage;
