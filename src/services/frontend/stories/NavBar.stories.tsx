import { storiesOf } from "@storybook/react";

import NavBar from "../src/components/NavBar/index";
import { Layout } from "antd";
storiesOf("NavBar", module).add("default", () => <NavBar />);
