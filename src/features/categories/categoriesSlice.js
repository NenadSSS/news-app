import { createSlice } from "@reduxjs/toolkit";
import {
  fetchTop5NewsByCategory,
  fetchAllNewsByCategory
} from "../../api/newsAPI";

const startLoading = state => {
  state.isLoading = true;
};

export const slice = createSlice({
  name: "categories",
  initialState: {
    chosenCategory: "",
    isLoading: false,
    science: [],
    health: [],
    technology: [],
    sports: [],
    entertainment: []
  },
  reducers: {
    get5NewsByCategoryStart: startLoading,
    getAllNewsByCategoryStart: startLoading,
    getTop5NewsByCategory: (state, action, category) => {
      state[action.payload.category] = action.payload.data.articles;
      state.isLoading = false;
    },
    getTopNewsByCategory: (state, action) => {
      state[action.payload.category] = action.payload.data.articles;
      state.isLoading = false;
    },
    setChosenCategory: (state, action) => {
      state.chosenCategory = action.payload;
    }
  }
});

//actions
export const {
  get5NewsByCategoryStart,
  getAllNewsByCategoryStart,
  getAllNewsByCategory,
  getTop5NewsByCategory,
  getTopNewsByCategory,
  setChosenCategory
} = slice.actions;

//selectors
export const isLoadingSelector = state => state.categories.isLoading;
export const selectedCountrySelector = state =>
  state.categories.selectedCountry;

export default slice.reducer;

//async and sync action dispathers
export const get5NewsByCategory = (
  selectedCountry,
  category
) => async dispatch => {
  try {
    dispatch(get5NewsByCategoryStart());
    const top5newsByCategory = await fetchTop5NewsByCategory(
      selectedCountry,
      category
    );
    let payload = {
      category,
      data: top5newsByCategory.data
    };
    dispatch(getTop5NewsByCategory(payload));
  } catch (err) {
    console.log("error: ", err);
  }
};

export const getAllNewsBySelectedCategory = (
  selectedCountry,
  category
) => async dispatch => {
  try {
    dispatch(getAllNewsByCategoryStart());
    const newsByCategory = await fetchAllNewsByCategory(
      selectedCountry,
      category
    );
    let payload = {
      category,
      data: newsByCategory.data
    };
    dispatch(getTopNewsByCategory(payload));
  } catch (err) {
    console.log("error: ", err);
  }
};

export const setSelectedCategory = chosenCategory => async dispatch => {
  dispatch(setChosenCategory(chosenCategory));
};
