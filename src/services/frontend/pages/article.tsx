import ArticleDetails from '@src/components/ArticleDetails';
import withPage from '@src/hoc/withPage';
import { withRouter } from 'next/router';
import React from 'react';

function index({
  router: {
    query: { articleId },
  },
}) {
  return <ArticleDetails id={articleId} />;
}

export default withPage(withRouter(index));
