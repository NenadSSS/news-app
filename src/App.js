//core
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

//bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Spinner } from "react-bootstrap";

//actions and selectors
import {
  getTopNews,
  topNewsSelector,
  isLoadingSelector,
  selectedCountrySelector,
  searchedNewsSelector,
  searchTermSelector
} from "./features/news/newsSlice";

//utils
import Countries from "./utils/countries";

//custom
import { Header } from "./components/Header";
import { NewsCard } from "./components/NewsCard";
import { Categories } from "./components/categories/Categories";
import { Article } from "./components/Article";
import { CategoryNews } from "./components/categories/CategoryNews";

const App = () => {
  const dispatch = useDispatch();

  const topNews = useSelector(topNewsSelector);
  const isLoading = useSelector(isLoadingSelector);
  const selectedCountry = useSelector(selectedCountrySelector);
  const searchedNews = useSelector(searchedNewsSelector);
  const searchTerm = useSelector(searchTermSelector);

  useEffect(() => {
    dispatch(getTopNews(selectedCountry));
  }, []);

  return (
    <Router>
      <Container id="appContainer">
        <Row className="justify-content-md-center">
          <Header />
        </Row>
        <br />
        <Switch>
          <Route exact path="/">
            <Row className="justify-content-md-center">
              {isLoading ? (
                <Spinner animation="grow" />
              ) : (
                <div>
                  <h5>Top news from {Countries[selectedCountry]} </h5>
                  <Row lg="12" className="justify-content-md-center">
                    {topNews.map(article => {
                      return <NewsCard article={article} />;
                    })}
                  </Row>
                </div>
              )}
            </Row>
          </Route>

          <Route exact path="/article">
            <Article />
          </Route>
          <Route exact path="/categories">
            <Categories />
          </Route>
          <Route exact path="/categories/:category">
            <CategoryNews />
          </Route>
          <Route exact path="/search">
            <Row className="justify-content-md-center">
              {isLoading ? (
                <Spinner animation="grow" />
              ) : (
                <div>
                  <h5>
                    Searched top news in {Countries[selectedCountry]} by term:
                    {searchTerm}
                  </h5>
                  <Row lg="12" className="justify-content-md-center">
                    {searchedNews.map((article, i) => {
                      return <NewsCard article={article} />;
                    })}
                  </Row>
                </div>
              )}
            </Row>
          </Route>
        </Switch>
      </Container>
    </Router>
  );
};

export default App;
