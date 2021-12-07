import React from "react";
import { Image, Center, Wrap, WrapItem } from "@chakra-ui/react";

import Section from "./Section";
import sampleWork from "../content/sample-work.json";

const SampleWork = () => {
  return (
    <Section
      id="sampleWork"
      subtitle={sampleWork.subtitle}
      justify="center"
      maxW="100%"
      py={20}
      sx={{ backgroundColor: "#7abac0", marginTop: 0 }}
    >
      <Center position="relative" w="100%" py={16}>
        <Wrap
          spacing={8}
          position="relative"
          maxW="1200px"
          justify="center"
          m="0 !imporant"
        >
          <WrapItem>
            <Image
              src="/static/0.png"
              w="200px"
              h="200px"
              borderRadius="1rem"
            />
          </WrapItem>
          <WrapItem>
            <Image
              src="/static/281.png"
              w="200px"
              h="200px"
              borderRadius="1rem"
            />
          </WrapItem>
          <WrapItem>
            <Image
              src="/static/4.png"
              w="200px"
              h="200px"
              borderRadius="1rem"
            />
          </WrapItem>
          <WrapItem>
            <Image
              src="/static/173.png"
              w="200px"
              h="200px"
              borderRadius="1rem"
            />
          </WrapItem>
          <WrapItem>
            <Image
              src="/static/175.png"
              w="200px"
              h="200px"
              borderRadius="1rem"
            />
          </WrapItem>
          <WrapItem>
            <Image
              src="/static/234.png"
              w="200px"
              h="200px"
              borderRadius="1rem"
            />
          </WrapItem>
          <WrapItem>
            <Image
              src="/static/317.png"
              w="200px"
              h="200px"
              borderRadius="1rem"
            />
          </WrapItem>
          <WrapItem>
            <Image
              src="/static/2.png"
              w="200px"
              h="200px"
              borderRadius="1rem"
            />
          </WrapItem>
          <WrapItem>
            <Image
              src="/static/279.png"
              w="200px"
              h="200px"
              borderRadius="1rem"
            />
          </WrapItem>
        </Wrap>
      </Center>
    </Section>
  );
};

export default SampleWork;
