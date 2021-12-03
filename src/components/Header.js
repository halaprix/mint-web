import React from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { Box, Flex, Text, Button, Image } from "@chakra-ui/react";

import { primaryCTA } from "../utils/styles";
import useWindowSize from "../hooks/useWindowSize";

const Header = ({ logoLight, logoDark, links, ...rest }) => {
  const [show, setShow] = React.useState(false);
  const toggleMenu = () => setShow(!show);

  const size = useWindowSize();

  const isDesktop = size.width > 768;

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      p={[6, 6, 2, 2]}
      px={[8, 8, 16, 8]}
      maxW="100%"
      bg="#ad3d3f"
      color="white"
      {...rest}
    >
      {/* <Image src={isDesktop ? logoDark : logoLight} w="54px" alt="Logo" />
       */}
     <Image
              src="/static/logoSmall.png"
              
              h="70px"
             
            />
      <Box w="54" />

      <Box display={{ base: "block", md: "none" }} onClick={toggleMenu}>
        {show ? <HiX size={28} /> : <HiMenu size={28} />}
      </Box>

      <Box
        display={{ base: show ? "block" : "none", md: "block" }}
        flexBasis={{ base: "100%", md: "auto" }}
      >
        <Flex
          align="center"
          justify={["center", "space-between", "flex-end", "flex-end"]}
          direction={["column", "row", "row", "row"]}
          pt={[4, 4, 0, 0]}
        >
          {links.map(({ href, text, isCTA }, index) => (
            <MenuItem to={href} isLast={index === links.length - 1}>
              {text}
            </MenuItem>
          ))}
        </Flex>
      </Box>
    </Flex>
  );
};

const MenuItem = ({ children, isLast, to = "/", ...rest }) => {
  return (
    <Text
      mb={{ base: isLast ? 0 : 8, sm: 0 }}
      mr={{ base: 0, sm: isLast ? 0 : 10 }}
      display="block"
      fontSize="md"
      fontWeight="600"
      {...rest}
    >
      <a href={to}>{children}</a>
    </Text>
  );
};

export default Header;
