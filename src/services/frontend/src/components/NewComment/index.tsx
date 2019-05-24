import React, { useState } from "react";
import {
  Container,
  TextArea,
  PublishButton,
  SecondContainer,
  EditIcon
} from "./styles";

export default function index({ className }) {
  const [value, setValue] = useState("");
  return (
    <Container className={className}>
      <SecondContainer>
        <EditIcon />
        <TextArea
          placeholder="Write response"
          value={value}
          autosize
          onChange={e => setValue(e.target.value)}
        />
      </SecondContainer>
      {value && <PublishButton />}
    </Container>
  );
}
