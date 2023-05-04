import { createSlice, createSelector } from "@reduxjs/toolkit";

const categoriesSlice = createSlice({
  name: "categories",
  initialState: [],
  reducers: {
    getCategories: (state) => state,
    setCategories: (state, action) => action.payload,
  },
});

// state.categories를 선택하는 selector
const selectCategories = (state: any) => state.categories;

// 특정 카테고리가 categories 배열에 있는지 확인하는 selector
const selectCategoryExists = (category: any) =>
  createSelector(selectCategories, (categories) =>
    categories.includes(category)
  );

export const { getCategories, setCategories } = categoriesSlice.actions;

export { selectCategories, selectCategoryExists };

export default categoriesSlice.reducer;
