import { createSlice, createSelector } from "@reduxjs/toolkit";

const categoriesSlice = createSlice({
  name: "categories",
  // JobType, MajorType, experienceLevels
  initialState: {
    categoryObj: {},
    categoryKey: "JobType",
  },
  reducers: {
    setCategories: (state, action) => {
      state.categoryObj = action.payload;
    },
    setCategoryKey: (state, action) => {
      state.categoryKey = action.payload;
    },
  },
});
const selectCategories = (state: any) => state;
// 특정 카테고리를 선택하는 selector
const selectCategory = (state: any) => {
  return state.categories.categoryObj[state.categories.categoryKey];
};
const selectCategoryKey = (state: any) => state.categories.categoryKey;

// 특정 카테고리가 categories 배열에 있는지 확인하는 selector
const selectCategoryExists = (category: any) =>
  createSelector(selectCategories, (state) => {
    if (state?.categories?.categoryObj === undefined) return false;
    return (
      state?.categories?.categoryObj[state.categories?.categoryKey]?.filter(
        (item: any) => item.includes(category)
      ).length > 0
    );
  });

export const { setCategoryKey, setCategories } = categoriesSlice.actions;

export {
  selectCategory,
  selectCategories,
  selectCategoryExists,
  selectCategoryKey,
};

export default categoriesSlice.reducer;
