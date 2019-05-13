import React from "react";
import Title from "antd/lib/typography/Title";
import Text from "antd/lib/typography/Text";
import Paragraph from "antd/lib/typography/Paragraph";
import { Row, Col } from "antd";
import { Container, Image, ImageContainer } from "./styles";

export default function index() {
  return (
    <Container>
      <Row>
        <Col span="19">
          <Title level={4}>Title</Title>
          <Paragraph type="secondary" ellipsis={{ rows: 2 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
            qui numquam rerum, nisi aliquam libero soluta iure quidem hic. Eum
            maiores quod illo autem architecto voluptatem perspiciatis. Eos,
            quis veniam.
          </Paragraph>
          <Text strong>Username</Text>
          <br />
          <Text type="secondary">May 2 - 7 min read</Text>
        </Col>
        <Col span="4" offset="1">
          <ImageContainer>
            <Image />
          </ImageContainer>
        </Col>
      </Row>
    </Container>
  );
}
