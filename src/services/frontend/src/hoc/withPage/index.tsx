import React from "react";
import Navbar from "@src/components/NavBar";
import MainContent from "@src/components/MainContent";
import { Layout } from "./styles";

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
