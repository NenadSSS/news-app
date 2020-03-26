//core
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

//bootstrap
import { Card, Col, Button } from "react-bootstrap";

//actions and selectors
import {
  enableCountrySelect,
  disableCountrySelect
} from "../features/news/newsSlice";

const BackButton = ({ children }) => {
  let history = useHistory();
  return (
    <Button variant="link" onClick={() => history.goBack()}>
      {children}
    </Button>
  );
};

export const Article = () => {
  const dispatch = useDispatch();
  const article = JSON.parse(localStorage.getItem("article"));

  useEffect(() => {
    dispatch(disableCountrySelect());
    return () => {
      dispatch(enableCountrySelect());
    };
  });

  return (
    <Col xs={12}>
      <Card>
        <Card.Body>
          <Card.Title>{article.title}</Card.Title>
          <Card.Img
            variant="top"
            src={article.urlToImage}
            style={{ width: "100%", height: "75%" }}
          />
          <Card.Text>{article.content || article.description}</Card.Text>
          <Card.Link href={article.url}>Read the news &rarr;</Card.Link>
          <br />
          <BackButton>&larr; Go back</BackButton>
        </Card.Body>
      </Card>
    </Col>
  );
};
