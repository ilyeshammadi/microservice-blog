import React from "react";
import Paragraph from "antd/lib/typography/Paragraph";
import Title from "antd/lib/typography/Title";
import { Container, SecondContainer } from "./styles";
import CommentsSection from "@src/components/CommentsSection";

const mock = {
  title: "Hello World",
  content:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae porro, possimus, inventore laudantium laboriosam nisi dicta optio nostrum dolore fugiat culpa quam, dignissimos officia incidunt delectus soluta rem explicabo cum?"
};

function index({ id }) {
  return (
    <>
      <Container>
        <SecondContainer>
          <Title>{mock.title}</Title>
          <Paragraph>{mock.content}</Paragraph>
        </SecondContainer>
      </Container>
      <CommentsSection />
    </>
  );
}

export default index;
