import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "../features/news/newsSlice";
import categoriesReducer from "../features/categories/categoriesSlice";

export default configureStore({
  reducer: {
    news: newsReducer,
    categories: categoriesReducer
  }
});
