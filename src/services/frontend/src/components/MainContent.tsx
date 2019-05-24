import styled from "styled-components";
import { Layout } from "antd";

const MainContent = styled(props => <Layout.Content {...props} />)`
  margin-top: 64px;
`;

export default MainContent;
