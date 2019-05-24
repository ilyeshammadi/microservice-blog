import styled from "styled-components";
import { Avatar as BaseAvatar } from "antd";
import { GRAY_1 } from "@src/constants/colors.constants";

export const Avatar = styled(BaseAvatar)``;

export const Header = styled.div`
  display: flex;
  margin-bottom: 24px;
  ${Avatar} {
    margin-right: 8px;
  }
`;

export const Container = styled.div`
  padding: 12px;
  background-color: ${GRAY_1};
`;
export const UsernameContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
