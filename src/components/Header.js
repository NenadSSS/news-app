//core
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";

//bootstrap
import { Navbar, Button, Nav, Form, FormControl } from "react-bootstrap";

////actions and selectors
import {
  getTopNews,
  getSearchedNews,
  selectedCountrySelector,
  countrySelectDisabledSelector
} from "../features/news/newsSlice";

export function Header() {
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();
  let history = useHistory();
  let location = useLocation();

  const selectedCountry = useSelector(selectedCountrySelector);
  const countrySelectDisabled = useSelector(countrySelectDisabledSelector);

  const resetSearch = () => {
    dispatch(getTopNews(selectedCountry));
    setSearchTerm("");
  };

  const searchAndRedirect = (selectedCountry, searchTerm) => {
    if (searchTerm.length > 2) {
      dispatch(getSearchedNews(selectedCountry, searchTerm));
      setSearchTerm("");
      history.push("/search");
    }
  };

  return (
    <Navbar
      collapseOnSelect
      expand="sm"
      bg="light"
      variant="light"
      className="justify-content-md-center"
    >
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse>
        <Nav className="mr-auto">
          <Button
            active={location.pathname === "/"}
            variant="light"
            onClick={resetSearch}
          >
            <Link to="/">Top news</Link>
          </Button>
          <Button
            active={location.pathname === "/categories"}
            variant="light"
            onClick={resetSearch}
          >
            <Link to="/categories">Categories</Link>
          </Button>
        </Nav>

        <Form inline>
          <FormControl
            onChange={e => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Search and click the button"
            value={searchTerm}
          />

          <Button
            style={{ marginLeft: "20px", marginRight: "20px" }}
            id="search-button"
            onClick={() => searchAndRedirect(selectedCountry, searchTerm)}
            variant="outline-success"
          >
            Search
          </Button>
        </Form>

        <Nav variant="pills" defaultActiveKey={selectedCountry}>
          <Nav.Item className="country-button">
            <Nav.Link
              disabled={countrySelectDisabled}
              onClick={() => dispatch(getTopNews("GB"))}
              eventKey="GB"
            >
              GB
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="country-button">
            <Nav.Link
              disabled={countrySelectDisabled}
              onClick={() => dispatch(getTopNews("US"))}
              eventKey="US"
            >
              US
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
