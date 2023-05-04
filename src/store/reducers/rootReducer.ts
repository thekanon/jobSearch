// rootReducer.js

import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./counter";
import categoriesReducer from "./categories";

const rootReducer = combineReducers({
  counter: counterReducer,
  categories: categoriesReducer,
});

export default rootReducer;
