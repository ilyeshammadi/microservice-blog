import { storiesOf } from "@storybook/react";
import styled from "styled-components";
import ArticleListItem from "../src/components/ArticleListItem";
import { GRAY_4 } from "../src/constants/colors.constants";
import { Row, Col } from "antd";

const Background = styled.div`
  height: 100vh;
  background-color: ${GRAY_4};
`;

storiesOf("Article List Item", module)
  .addDecorator(story => (
    <Background>
      <Row>
        <Col xs={{ span: 16 }}>{story()}</Col>
      </Row>
    </Background>
  ))
  .add("default", () => <ArticleListItem />);
