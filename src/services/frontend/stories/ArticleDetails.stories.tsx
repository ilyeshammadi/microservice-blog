import { storiesOf } from "@storybook/react";
import { Col, Row } from "antd";
import styled from "styled-components";

import ArticleDetails from "../src/components/ArticleDetails";
import { GRAY_4 } from "../src/constants/colors.constants";

const Background = styled.div`
  height: 100vh;
  background-color: ${GRAY_4};
`;

const props = {
  id: "1"
};
storiesOf("Article details", module)
  .addDecorator(story => <Background>{story()}</Background>)
  .add("default", () => <ArticleDetails {...props} />);
