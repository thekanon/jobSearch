import { createSlice } from "@reduxjs/toolkit";

const selectChipSlice = createSlice({
  name: "selectChip",
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      if (!state.includes(action.payload)) {
        state.push(action.payload);
      }
    },
    removeItem: (state, action) => {
      return state.filter((item) => item !== action.payload);
    },
    reset: () => [],
  },
});

export const { addItem, removeItem, reset } = selectChipSlice.actions;

export default selectChipSlice.reducer;
