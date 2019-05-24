import React from "react";
import { Container, SecondContainer, Comment, NewComment } from "./styles";

export default function index() {
  return (
    <Container>
      <SecondContainer>
        <NewComment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
      </SecondContainer>
    </Container>
  );
}
