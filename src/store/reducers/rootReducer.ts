// rootReducer.js

import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./counter";
import categoriesReducer from "./categories";
import selectChipReducer from "./selectChip";

const rootReducer = combineReducers({
  counter: counterReducer,
  categories: categoriesReducer,
  selectChip: selectChipReducer,
});

export default rootReducer;
