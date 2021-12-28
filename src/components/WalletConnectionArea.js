import React from "react";
import { Link, Heading, Center, VStack, Image } from "@chakra-ui/react";

import Home from "./Home";

const WalletConnectionArea = ({
  title,
  cta,
  backgroundImage,
  candyMachineId,
  config,
  connection,
  startDate,
  treasury,
  txTimeout,
  rpcHost,
  ...rest
}) => {
  return (
    <Center
      id="cta"
      // height of the spacing
      p={[8, 8, 2, 2]}
      w="100%"
      minH="70vh"
      position="relative"
      overflowX="hidden"
      bg="#778ca2"
      //sx={{ backgroundImage: `url(${"/static/banner.jpg"})`, objectFit: "fill" }}
    >
      <VStack
        p={[8, 8, 20, 20]}
        w="100%"
        maxW="100%"
        borderRadius="1rem"
        borderColor="transparent"
        borderWidth=".25rem"
        bg="transparent"
        color="white"
        textAlign="center"
        _hover={{ transform: "scale(1.005)" }}
        transition="transform 0.5s ease-out"
        spacing={8}
        position="relative"
        //backgroundSize="20px 20px"
        //sx={{ backgroundImage: `url(${"/static/logoBig.png"})`}}
      >
       
        <Image
              src="/static/logoBig.png"
              
              h="300px"
              borderRadius="1rem"
            />
        <VStack>
          <Heading
            as="h2"
            size="lg"
            fontWeight={800}
            maxW="500px"
            lineHeight="tall"
          >
          
          </Heading>
        </VStack>

        <VStack spacing={4}>
          <Link href={cta.href}>
            <Home
              candyMachineId={candyMachineId}
              config={config}
              connection={connection}
              startDate={startDate}
              treasury={treasury}
              txTimeout={txTimeout}
              rpcHost={rpcHost}
            />
          </Link>
        </VStack>
      </VStack>
    </Center>
  );
};

export default WalletConnectionArea;
