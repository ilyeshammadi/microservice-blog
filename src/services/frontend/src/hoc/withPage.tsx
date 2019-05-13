import React from "react";
import Navbar from "@src/components/NavBar";
import { Layout } from "antd";
import MainContent from "@src/components/MainContent";

export default function withPage(WrappedComponent) {
  return props => (
    <Layout>
      <Navbar />
      <MainContent>
        <WrappedComponent {...props} />
      </MainContent>
    </Layout>
  );
}
