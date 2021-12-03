import React from "react";
import { Flex, Divider } from "@chakra-ui/react";

import Header from "./Header";
import Footer from "./Footer";

import footer from "../content/footer.json";
import header from "../content/header.json";

export default function LandingLayout({ children, ...rest }) {
  return (
    <Flex direction="column" align="center" w="100%" m="0 auto" {...rest}>
      <Header {...header} />
      <Divider type="dashed" />
      {children}
      <Footer {...footer} />
    </Flex>
  );
}
