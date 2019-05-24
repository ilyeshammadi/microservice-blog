import { GRAY_1, GRAY_4 } from "@src/constants/colors.constants";
import styled from "styled-components";

export const Container = styled.div`
  padding: 6px 12px;
  margin: 8px 0;
  background-color: ${GRAY_1};
`;

export const Image = styled.div`
  height: 100px;
  width: 100px;
  background-color: ${GRAY_4};
`;

export const ImageContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Clickable = styled.div`
  cursor: pointer;
`;
