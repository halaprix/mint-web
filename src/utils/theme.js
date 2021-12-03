import { extendTheme } from "@chakra-ui/react";

const colors = {
  primary: {
    100: "#ecf9ff",
    200: "#B2F2FF",
    300: "#73E7FF",
    400: "#3DDEFF",
    500: "#0FD6FF",
    600: "#00BAE0",
    700: "#009ABA",
    800: "#00809A",
    900: "#006A80",
  },
};

const customTheme = extendTheme({ colors });

export default customTheme;
