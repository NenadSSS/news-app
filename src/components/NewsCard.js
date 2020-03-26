import React from "react";
import { useDispatch } from "react-redux";
import { setArticle } from "../features/news/newsSlice";

import { Link } from "react-router-dom";
import { Card, Col } from "react-bootstrap";

export function NewsCard({ article }) {
  const dispatch = useDispatch();

  return (
    <Col style={{ marginBottom: "10px" }}>
      <Card style={{ width: "18rem" }}>
        <Card.Title>{article.title}</Card.Title>
        <Card.Img
          variant="top"
          src={article.urlToImage}
          style={{ width: "100%", height: "200px" }}
        />
        <Card.Body>
          <Card.Text>
            {article.description ? article.description.substring(0, 160) : null}
          </Card.Text>
        </Card.Body>

        <Card.Body>
          <Link
            onClick={() => {
              dispatch(setArticle(article));
            }}
            to="/article"
          >
            Read more >
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
}
