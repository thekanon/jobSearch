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
import AutoComplete from "@/components/molecules/AutoComplete";
import { categoryObj } from "@/lib/categories";
import ChipGroup from "@/components/molecules/ChipGroup";
import DataList from "@/components/molecules/DataList";
import jobsData from "@/lib/data/jobsQuestion";
import { useRouter } from "next/router";

type JobListItem = {
  name: string;
  handleClick: () => void;
};

const HomePage = () => {
  const dispatch = useDispatch();
  const router = useRouter(); // Use the useRouter hook

  const category = useSelector(selectCategory);
  const categories = useSelector((state: any) => state.categories.categoryObj);
  const categoryKey = useSelector(selectCategoryKey);

  const SEARCH_RESULTS_TITLE = "검색 결과";

  useEffect(() => {
    dispatch(setCategories(categoryObj));

    const jobs = jobsData;
    console.log("jobs", jobs);
    // Assuming jobsData is an object with keys that map to job objects with a name and id
    const jobList = Object.values(jobs).map((job) => ({
      name: job.name,
      handleClick: () => {
        console.log(`${job.name} clicked!`, job.id); // This will log the job's name and id when clicked
        router.push(`/jobs/${job.id}`); // Navigate using router.push
      },
    }));

    setListItems(jobList);
  }, [dispatch]);

  const [value, setValue] = React.useState("");
  const [selectedValue, setSelectedValue] = React.useState("");
  const [listItems, setListItems] = React.useState<JobListItem[]>([]);

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
    <div>
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
      <SubContainer>
        <Title>
          {SEARCH_RESULTS_TITLE} ({listItems.length + "개"})
        </Title>
        <ResultsContainer>
          <DataList listItems={listItems} />
        </ResultsContainer>
      </SubContainer>
    </div>
  );
};
const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
  flex-direction: column;
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
`;
const SubContainer = styled.div`
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  padding: 30px;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 30px;
  font-weight: bold;
`;

const ResultsContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  margin-top: 30px;

  border: 1px solid gray;
`;

export default HomePage;
