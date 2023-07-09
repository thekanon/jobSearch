import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import {
  selectCategory,
  setCategories,
  selectCategoryExists,
  setCategoryKey,
  selectCategoryKey,
} from "@/store/reducers/categories";
import { addItem, removeItem } from "@/store/reducers/selectChip";
import { ThemeContext } from "../contexts/ThemeContext";
import AutoComplete from "@/components/molecules/AutoComplete";
import { categoryObj } from "@/lib/categories";
import ChipGroup from "@/components/molecules/ChipGroup";
const HomePage = () => {
  const dispatch = useDispatch();
  const category = useSelector(selectCategory);
  const categories = useSelector((state: any) => state.categories.categoryObj);
  const categoryKey = useSelector(selectCategoryKey);

  useEffect(() => {
    dispatch(setCategories(categoryObj));
  }, []);
  const [value, setValue] = React.useState("");
  const [selectedValue, setSelectedValue] = React.useState("");
  const chipList = useSelector((state: any) => state.selectChip);
  const categoryExists = useSelector(selectCategoryExists(value));

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e) return;
    setValue(e.target.value);
  };

  const onSelectedValue = (value: string) => {
    setSelectedValue(value);
  };
  const onClickChip = (value: string) => {
    dispatch(removeItem(value));
  };

  useEffect(() => {
    if (categoryExists) {
      setValue("");
      dispatch(addItem(selectedValue));
      console.log(chipList);
    }
  }, [selectedValue]);

  useEffect(() => {
    const categoryKeys = Object.keys(categories);
    const resultKeys = chipList.flatMap((value) =>
      categoryKeys.filter((key) => categories[key].includes(value))
    );

    const result = categoryKeys.filter((key) => !resultKeys.includes(key));

    if (result.length > 0) {
      dispatch(setCategoryKey(result[0]));
      setValue("");
    }
    console.log(result[0]);
  }, [chipList]);

  const getPlaceholder = () => {
    if (!categoryKey) return "";
    // JobType, MajorType, experienceLevels
    else if (categoryKey === "JobType") return "직무를 입력해주세요";
    else if (categoryKey === "experienceLevels") return "경력을 입력해주세요";
    else if (categoryKey === "MajorType") return "전공을 입력해주세요";
  };

  return (
    <MainContainer>
      <ChipGroup
        textArray={chipList}
        onSelectedValue={onClickChip}
        addStyle={`
        margin-bottom: 20px;
      `}
      />
      <AutoComplete
        value={value}
        onChange={onChange}
        onSelectedValue={onSelectedValue}
        placeholder={getPlaceholder()}
        textArray={category !== undefined ? category : []}
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
