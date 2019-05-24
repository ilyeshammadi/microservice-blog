import React from "react";
import { Container, Header, UsernameContainer, Avatar } from "./styles";
import Text from "antd/lib/typography/Text";
import Paragraph from "antd/lib/typography/Paragraph";

export default function index({ className }) {
  return (
    <Container className={className}>
      <Header>
        <Avatar>U</Avatar>
        <UsernameContainer>
          <Text>Username</Text>
          <Text type="secondary">22 min</Text>
        </UsernameContainer>
      </Header>
      <Paragraph>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit,
        fugiat. Sequi ex iusto dolore modi suscipit omnis officia cum dicta
        asperiores accusantium, earum nam eius illum obcaecati id neque
        mollitia.
      </Paragraph>
    </Container>
  );
}
