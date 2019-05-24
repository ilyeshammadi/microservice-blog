import React from "react";
import withPage from "@src/hoc/withPage";
import ArticlesList from "@src/components/ArticlesList";

function index() {
  return <ArticlesList />;
}

export default withPage(index);
