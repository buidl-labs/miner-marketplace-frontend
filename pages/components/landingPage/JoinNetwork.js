import {
  Box,
  Button,
  Flex,
  Stack,
  HStack,
  VStack,
  Text,
  Heading,
  WrapItem,
} from "@chakra-ui/react";
import React from "react";

const JoinNetwork = () => {
  return (
    <Stack textAlign="center" spacing="16" my="16">
      <Heading size="2xl">Join the Filecoin Network</Heading>

      {/* <HStack spacing="16" justifyContent="center"> */}

      <Flex>
        <Box border="solid 2px #E2E8F0" px="12" py="6" borderRadius="2xl">
          <WrapItem maxW="72" textAlign="left">
            <Stack alignItems="left">
              <Heading size="lg">Looking to provide Storage Services</Heading>
              <Text size="lg">
                Start your miner journey and become part of global network of
                fielcoin miners.
              </Text>
              <Button colorScheme="blue">Become a Miner</Button>
            </Stack>
          </WrapItem>
        </Box>

        <Box border="solid 2px #E2E8F0" px="12" py="6" borderRadius="2xl">
          <WrapItem maxW="72" textAlign="left">
            <Stack alignItems="left">
              <Heading size="lg">Looking to Store Data</Heading>
              <Text size="lg">
                Explore miners according to your needs and start storing your
                data securely on Filecoin Network.
              </Text>
              <Button colorScheme="blue">Explore Miners</Button>
            </Stack>
          </WrapItem>
        </Box>
      </Flex>
      {/* </HStack> */}
    </Stack>
  );
};

export default JoinNetwork;
