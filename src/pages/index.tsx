import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import {
  setCategories,
  selectCategoryExists,
} from "@/store/reducers/categories";
import { ThemeContext } from "../contexts/ThemeContext";
import AutoComplete from "@/components/molecules/AutoComplete";
import { JobType, MajorType, experienceLevels } from "@/lib/categories";
import ChipGroup from "@/components/molecules/ChipGroup";
const HomePage = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state: any) => state.categories);

  useEffect(() => {
    dispatch(setCategories([...JobType, ...MajorType, ...experienceLevels]));
  }, []);

  const { theme, toggleTheme } = useContext(ThemeContext);
  const [value, setValue] = React.useState("");
  const [selectedValue, setSelectedValue] = React.useState("");
  const [chipList, setChipList] = React.useState<string[]>([]);
  const categoryExists = useSelector(selectCategoryExists(value));

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onSelectedValue = (value: string) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    if (categoryExists) {
      const newChipList = new Set([...chipList, selectedValue]);
      setChipList(Array.from(newChipList));
      setValue("");
    }
  }, [selectedValue]);

  return (
    <MainContainer>
      <ChipGroup textArray={chipList} onSelectedValue={onSelectedValue} />
      <AutoComplete
        value={value}
        onChange={onChange}
        onSelectedValue={onSelectedValue}
        placeholder={"직무, 연차를 입력해주세요"}
        textArray={categories}
        addStyle={`
          border: 1px solid gray;
        `}
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

export default HomePage;
