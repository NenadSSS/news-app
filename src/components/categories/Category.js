//core
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//bootstrap
import { Collapse } from "reactstrap";
import { Spinner } from "react-bootstrap";

//actions and selectors
import {
  get5NewsByCategory,
  isLoadingSelector,
  setSelectedCategory,
} from "../../features/categories/categoriesSlice";

//custom
import HScroll from "../HorizontalScroll";

export function Category({ category }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const dispatch = useDispatch();

  const isLoading = useSelector(isLoadingSelector);
  const selectedCountry = useSelector(state => state.news.selectedCountry);
  const articlesByCategory = useSelector(state => state.categories[category]);

  useEffect(() => {
    dispatch(get5NewsByCategory(selectedCountry, category));
  }, [selectedCountry]);

  return (
    <div>
      <h5>
        {" "}
        <Link
          onClick={() => dispatch(setSelectedCategory(category))}
          to={`/categories/${category}`}
        >
          {category} &nbsp;&nbsp;
        </Link>
        {isOpen ? (
          <i
            onClick={toggle}
            style={{ fontSize: "20px", cursor: "pointer" }}
            className="fa"
          >
            &#xf102;
          </i>
        ) : (
          <i
            onClick={toggle}
            style={{ fontSize: "20px", cursor: "pointer" }}
            className="fa"
          >
            &#xf103;
          </i>
        )}
      </h5>

      <Collapse isOpen={isOpen}>
        {isLoading ? (
          <Spinner animation="grow" />
        ) : (
          <HScroll articlesByCategory={articlesByCategory} />
        )}
      </Collapse>
    </div>
  );
}
