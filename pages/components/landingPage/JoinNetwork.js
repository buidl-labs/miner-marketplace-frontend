import {
  Box,
  Button,
  Flex,
  Stack,
  HStack,
  VStack,
  Text,
  Spacer,
  SimpleGrid,
  Heading,
  WrapItem,
  Wrap,
} from "@chakra-ui/react";
import React from "react";

const JoinNetwork = () => {
  return (
    <>
      <Stack textAlign="center" spacing="16" my="16">
        <Heading color="gray.900" size="2xl">
          Join the Filecoin Network
        </Heading>
        <HStack color="gray.700" spacing="12" justifyContent="center">
          <WrapItem
            maxW="38rem"
            textAlign="left"
            border="solid 1px #CBD5E0"
            borderRadius="xl"
            px="10"
            py="12"
          >
            <Stack alignItems="left" spacing="2">
              <Heading size="lg">Looking to provide Storage Services</Heading>
              <Text size="lg" maxW="30rem">
                Start your miner journey and become part of global network of
                fielcoin miners.
              </Text>
              <Box>
                <Button colorScheme="blue">Become a Miner</Button>
              </Box>
            </Stack>
          </WrapItem>

          <WrapItem
            maxW="38rem"
            textAlign="left"
            border="solid 1px #CBD5E0"
            borderRadius="xl"
            px="10"
            py="12"
          >
            <Stack alignItems="left" spacing="2">
              <Heading size="lg">Looking to Store Data</Heading>
              <Text size="lg">
                Explore miners according to your needs and start storing your
                data securely on Filecoin Network.
              </Text>
              <Box>
                <Button colorScheme="blue">Explore Miners</Button>
              </Box>
            </Stack>
          </WrapItem>
        </HStack>
      </Stack>
    </>
  );
};

export default JoinNetwork;
