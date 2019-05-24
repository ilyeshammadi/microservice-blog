import { Col, Row } from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import Link from "next/link";
import React from "react";
import { Container, Image, ImageContainer, Clickable } from "./styles";

export default function index() {
  return (
    <Container>
      <Row>
        <Col span={19}>
          <Link href={{ pathname: "/article", query: { articleId: 1 } }}>
            <Clickable>
              <Title level={4}>
                soluta iure quidem hic. Eum maiores quod illo autem architecto
              </Title>
              <Paragraph type="secondary" ellipsis={{ rows: 2 }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Architecto qui numquam rerum, nisi aliquam libero
              </Paragraph>
            </Clickable>
          </Link>
          <Text strong>Username</Text>
          <br />
          <Text type="secondary">May 2 - 7 min read</Text>
        </Col>
        <Col span={4} offset={1}>
          <ImageContainer>
            <Image />
          </ImageContainer>
        </Col>
      </Row>
    </Container>
  );
}
