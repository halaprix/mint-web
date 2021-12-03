import React from "react";
import { Flex, Text, Box } from "@chakra-ui/react";

import { FiTwitter } from "react-icons/fi";
import { FaDiscord } from "react-icons/fa";

import Column from "./Column";
import Row from ".//Row";

const Footer = ({
  logo,
  tagline,
  cta,
  social,
  madeBy,
  companyName,
  columns,
  ...rest
}) => {
  return (
    <Column
      id="footer"
      as="footer"
      w="100%"
      m={0}
      zIndex={1}
      overflowX="hidden"
      {...rest}
    >
      <Column
        spacing={16}
        bg="#ad3d3f"
        pt={8}
        w="100%"
        minW="100%"
        align="center"
        shouldWrapChildren={false}
      >
        <Column maxW="1000px" w="100%" spacing={8}>
          <Flex
            align="center"
            flexDir={["column", "column", "row", "row"]}
            justify={["center", "center", "space-between", "space-between"]}
            pb="1.5rem"
            w="100%"
            color="#ffffff"
            opacity={0.9}
          >
            <Row spacing={4} mb={[8, 8, 0, 0]}>
              {social.map(({ platform, href }, index) => (
                <Box
                  key={index}
                  as="a"
                  rel="noreferrer"
                  href={href}
                  isExternal
                  aria-label={platform}
                >
                  {platform === "twitter" ? (
                    <FiTwitter size={18} />
                  ) : platform === "discord" ? (
                    <FaDiscord size={18} />
                  ) : null}
                </Box>
              ))}
            </Row>

            <Text fontSize="sm" textAlign="center">
              ©{new Date().getFullYear()} Remixed by{" "}
              <b>
                <Box as="a" rel="noreferrer" href={madeBy.href} target="_blank">
                  {madeBy.text}
                </Box>
              </b>
            </Text>
          </Flex>
        </Column>
      </Column>
    </Column>
  );
};

export default Footer;
