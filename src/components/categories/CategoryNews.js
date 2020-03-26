//core
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//bootstrap
import { Spinner, Row } from "react-bootstrap";

//actions and selectors
import { getAllNewsBySelectedCategory } from "../../features/categories/categoriesSlice";
import { selectedCountrySelector } from "../../features/news/newsSlice";

//utils
import Countries from "../../utils/countries";

//custom
import { NewsCard } from "../NewsCard";

export function CategoryNews() {
  const dispatch = useDispatch();

  const selectedCountry = useSelector(selectedCountrySelector);
  const chosenCategory = useSelector(state => state.categories.chosenCategory);
  const isLoading = useSelector(state => state.categories.isLoading);

  useEffect(() => {
    dispatch(getAllNewsBySelectedCategory(selectedCountry, chosenCategory));
  }, [chosenCategory]);

  const results = useSelector(state => state.categories[chosenCategory]);
  return (
    <div>
      <Row className="justify-content-md-center">
        {isLoading ? (
          <Spinner animation="grow" />
        ) : (
          <div>
            <h5>
              Top news from {Countries[selectedCountry]} for {chosenCategory}{" "}
            </h5>
            <Row lg="12" className="justify-content-md-center">
              {results &&
                results.length > 0 &&
                results.map(article => {
                  return <NewsCard article={article} />;
                })}
            </Row>
          </div>
        )}
      </Row>
    </div>
  );
}
