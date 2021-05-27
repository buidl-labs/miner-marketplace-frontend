import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Image,
  VStack,
  Stack,
  Heading,
  Text,
  Spacer,
  WrapItem,
} from "@chakra-ui/react";
import React from "react";

const Hero = () => {
  return (
    <Stack>
      <HStack>
        <Stack spacing="4">
          <Heading size="3xl" lineHeight="1.2" color="gray.900">
            Decentralised Storage Solution for all your needs
          </Heading>
          <Text maxW="30vw" color="gray.700">
            Filecoin is a decentralised storage network designed to store
            humanity’s most important information. Sounds interesting? head over
            to link below to learn more.
          </Text>
          <Box>
            <Button
              size="lg"
              variant="link"
              colorScheme="blue"
              textDecoration="underline"
            >
              Learn more about Filecoin Network
            </Button>
          </Box>
        </Stack>
        <Image src="/images/heroGlobe.svg" />
      </HStack>
    </Stack>
  );
};

export default Hero;
