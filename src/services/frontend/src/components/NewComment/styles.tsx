import React from "react";
import styled from "styled-components";
import { GRAY_1 } from "@src/constants/colors.constants";
import { Input, Button, Icon } from "antd";

export const Container = styled.div`
  padding: 24px;
  background-color: ${GRAY_1};
`;

export const SecondContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const TextArea = styled(Input.TextArea)`
  border: unset !important;
  box-shadow: unset !important;
  resize: unset;
`;

const PublishButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const PublishButton = () => (
  <PublishButtonContainer>
    <Button>Publish</Button>
  </PublishButtonContainer>
);

export const EditIcon = styled(props => <Icon type="edit" {...props} />)`
  margin-top: 7px;
`;
