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

const HomePage = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state: any) => state.categories);

  useEffect(() => {
    dispatch(setCategories([...JobType, ...MajorType, ...experienceLevels]));
  }, []);

  const { theme, toggleTheme } = useContext(ThemeContext);
  const [value, setValue] = React.useState("");
  const categoryExists = useSelector(selectCategoryExists(value));
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    console.log(categoryExists);
  }, [value]);

  return (
    <MainContainer>
      <AutoComplete
        value={value}
        onChange={onChange}
        placeholder={"직무, 연차를 입력해주세요"}
        textArray={categories}
        styleProps={{
          border: "1px solid gray",
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

export default HomePage;
