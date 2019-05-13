import React from "react";
import { Avatar, Input } from "antd";
import Link from "next/link";
import { Header, Title, LeftContainer, UserAvatar, Container } from "./styles";

const { Search } = Input;

export default function index() {
  return (
    <Header>
      <Container>
        <Link href="/">
          <Title />
        </Link>
        <LeftContainer>
          <Search
            placeholder="input search text"
            onSearch={value => console.log(value)}
            style={{ width: 200 }}
          />
          <UserAvatar />
        </LeftContainer>
      </Container>
    </Header>
  );
}
