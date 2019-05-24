import React from "react";
import _ from "lodash";
import { Col, Row } from "antd";
import ArticleListItem from "@src/components/ArticleListItem";

export default function index() {
  return (
    <Row>
      <Col xs={{ span: 24 }} lg={{ span: 12, offset: 6 }}>
        {_.range(10).map(n => (
          <ArticleListItem key={n} />
        ))}
      </Col>
    </Row>
  );
}
