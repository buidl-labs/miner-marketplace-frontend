import {
  Box,
  Stack,
  HStack,
  VStack,
  Text,
  Heading,
  WrapItem,
} from "@chakra-ui/react";
import React from "react";

const FilecoinStats = () => {
  return (
    <>
      <Box
        bgColor="blue.600"
        py="6"
        px="12"
        borderRadius="2xl"
        color="white"
        my="16"
      >
        <Stack textAlign="center" spacing="16" my="16">
          <Heading size="2xl">Filecoin Network in Numbers</Heading>

          <HStack spacing="52" justifyContent="center">
            <WrapItem maxW="72" textAlign="center">
              <Stack alignItems="center">
                <Heading size="3xl">2194+</Heading>
                <Text size="xs">Active Miners and counting</Text>
              </Stack>
            </WrapItem>

            <WrapItem maxW="72" textAlign="center">
              <Stack alignItems="center">
                <HStack>
                  <Heading size="3xl">5849</Heading>
                  <Text size="md">PB</Text>
                </HStack>
                <Text size="xs">Network Storage Capacity</Text>
              </Stack>
            </WrapItem>

            <WrapItem maxW="72" textAlign="center">
              <Stack alignItems="center">
                <HStack>
                  <Heading size="3xl">3489</Heading>
                  <Text size="md">PB</Text>
                </HStack>
                <Text size="xs">Data Stored till now</Text>
              </Stack>
            </WrapItem>
          </HStack>
        </Stack>
      </Box>
    </>
  );
};

export default FilecoinStats;
