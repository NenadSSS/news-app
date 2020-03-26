//core
import React from "react";
import { useSelector } from "react-redux";

//actions and selectors
import { selectedCountrySelector } from "../../features/news/newsSlice";

//custom
import { Category } from "./Category";

export const Categories = () => {
  const selectedCountry = useSelector(selectedCountrySelector);

  return (
    <div>
      <h5>Top 5 news by Categories from {selectedCountry}</h5>
      <Category category="science" />
      <Category category="health" />
      <Category category="technology" />
      <Category category="sports" />
      <Category category="entertainment" />
    </div>
  );
};
