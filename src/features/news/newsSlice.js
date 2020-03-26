import { createSlice } from "@reduxjs/toolkit";
import { fetchTopNews, searchNews } from "../../api/newsAPI";

const startLoading = state => {
  state.isLoading = true;
};

export const slice = createSlice({
  name: "news",
  initialState: {
    topNews: [],
    searchedNews: [],
    isLoading: false,
    selectedCountry: "GB",
    selectedArticle: null,
    countrySelectDisabled: false,
    searchTerm: ""
  },
  reducers: {
    fetchTopNewsStart: startLoading,
    getTopNewsSuccess: (state, action) => {
      state.isLoading = false;
      state.countrySelectDisabled = false;
      state.topNews = action.payload.articles;
    },
    getSearchedNewsSuccess: (state, action) => {
      state.isLoading = false;
      state.topNews = [];
      state.searchedNews = action.payload.articles;
      state.countrySelectDisabled = false;
    },
    selectCountry: (state, action) => {
      state.selectedCountry = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    selectArticle: (state, action) => {
      state.selectedArticle = action.payload;
      state.countrySelectDisabled = true;
    },
    enableCountrySelect: state => {
      state.countrySelectDisabled = false;
    },
    disableCountrySelect: state => {
      state.countrySelectDisabled = true;
    },
    resetSearchedNews: state => {
      state.searchTerm = "";
      state.searchedNews = [];
    }
  }
});

//actions
export const {
  fetchTopNewsStart,
  getTopNewsSuccess,
  getSearchedNewsSuccess,
  selectCountry,
  selectArticle,
  enableCountrySelect,
  disableCountrySelect,
  setSearchTerm,
  resetSearchedNews
} = slice.actions;

//selectors
export const topNewsSelector = state => state.news.topNews;
export const searchedNewsSelector = state => state.news.searchedNews;
export const isLoadingSelector = state => state.news.isLoading;
export const selectedCountrySelector = state => state.news.selectedCountry;
export const searchTermSelector = state => state.news.searchTerm;
export const countrySelectDisabledSelector = state =>
  state.news.countrySelectDisabled;

export default slice.reducer;

//async and sync action dispathers
export const getTopNews = selectedCountry => async dispatch => {
  try {
    dispatch(fetchTopNewsStart());
    const topNews = await fetchTopNews(selectedCountry);
    dispatch(selectCountry(selectedCountry));
    dispatch(getTopNewsSuccess(topNews.data));
  } catch (err) {
    console.log("error: ", err);
  }
};

export const setArticle = article => async dispatch => {
  try {
    // Put the object into storage
    localStorage.setItem("article", JSON.stringify(article));
    dispatch(selectArticle(article));
  } catch (err) {
    console.log("error: ", err);
  }
};

export const getSearchedNews = (selectedCountry, q) => async dispatch => {
  try {
    dispatch(fetchTopNewsStart());
    dispatch(setSearchTerm(q));
    const searchedNewsResult = await searchNews(selectedCountry, q);
    dispatch(getSearchedNewsSuccess(searchedNewsResult.data));
  } catch (err) {
    console.log("error: ", err);
  }
};

export const resetSearch = () => async dispatch => {
  dispatch(resetSearchedNews());
};
