import styled from "styled-components";
import BaseNewComment from "@src/components/NewComment";
import BaseComment from "@src/components/Comment";

export const NewComment = styled(BaseNewComment)``;
export const Comment = styled(BaseComment)``;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  ${NewComment}, ${Comment} {
    margin: 12px 0;
  }
`;

export const SecondContainer = styled.div`
  width: 600px;
`;
