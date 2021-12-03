import React from "react";
import {
  Text,
  Box,
  Wrap,
  WrapItem,
  VStack,
  Image,
  HStack,
  Center,
} from "@chakra-ui/react";
import { FiTwitter } from "react-icons/fi";

import Section from "./Section";
import team from "../content/team.json";

const Team = () => {
  return (
    <Section
      id="team"
      subtitle={team.subtitle}
      maxW="100%"
      pt={8}
      overflowX="hidden"
      sx={{ backgroundColor: "#778ca2", marginTop: 0 }}
    >
      <Center position="relative" w="100%" py={16}>
        <Wrap
          spacing={8}
          position="relative"
          maxW="1200px"
          justify="center"
          m="0 !imporant"
        >
          {team.quotes.map((user) => (
            <WrapItem>
              <Card {...user} />
            </WrapItem>
          ))}
        </Wrap>
      </Center>
    </Section>
  );
};

const Card = ({ href, jobTitle, name, photo }) => {
  return (
    <VStack
      maxW="300px"
      align="start"
      spacing={8}
      p={8}
      border="2px solid"
      borderColor="gray.100"
      borderRadius="1rem"
      bg="white"
    >
      <VStack align="start" spacing={2}>
        <Image src={photo} w="100%" h="100%" borderRadius="1rem" />
      </VStack>

      <HStack>
        <Center width="52px" height="52px" bg="gray.100" borderRadius="100px">
          <Box as="a" rel="noreferrer" href={href} isExternal>
            <FiTwitter width="44px" height="44px" name={name} />
          </Box>
        </Center>

        <VStack align="start">
          <Text
            fontSize="18px"
            fontWeight="bold"
            color="gray.900"
            lineHeight="none"
          >
            {name}
          </Text>
          <Text
            fontSize="14px"
            fontWeight="400"
            color="gray.600"
            lineHeight="none"
          >
            {jobTitle}
          </Text>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default Team;
