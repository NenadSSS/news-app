import axios from "axios";
const API_KEY = "031ea9ea7fb842a99f5c9f9d61d8ffdc";

export async function fetchTopNews(selectedCountry) {
  const url = `http://newsapi.org/v2/top-headlines?country=${selectedCountry}&apiKey=${API_KEY}`;
  try {
    const topNews = await axios.get(url);
    return topNews;
  } catch (err) {
    throw err;
  }
}

export async function fetchTop5NewsByCategory(selectedCountry, category) {
  const url = `http://newsapi.org/v2/top-headlines?country=${selectedCountry}&apiKey=${API_KEY}&category=${category}&pageSize=5`;
  try {
    const top5NewsByCategory = await axios.get(url);
    return top5NewsByCategory;
  } catch (err) {
    throw err;
  }
}

export async function fetchAllNewsByCategory(selectedCountry, category) {
  const url = `http://newsapi.org/v2/top-headlines?country=${selectedCountry}&apiKey=${API_KEY}&category=${category}`;
  try {
    const allNewsByCategory = await axios.get(url);
    return allNewsByCategory;
  } catch (err) {
    throw err;
  }
}

export async function searchNews(selectedCountry, searchTerm) {
  const url = `http://newsapi.org/v2/everything?q=${searchTerm}&apiKey=${API_KEY}`;
  try {
    const newsBySearch = await axios.get(url);
    return newsBySearch;
  } catch (err) {
    throw err;
  }
}
