import {
  Box,
  Button,
  Center,
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
  Link,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

const JoinNetwork = (props) => {
  return (
    <>
      <Center
        textAlign="center"
        borderRadius="2xl"
        px="10"
        py="12"
        bg="gray.100"
        maxW="80%"
        mx="auto"
      >
        <Stack alignItems="center" spacing="2" maxW="75%">
          <Heading size="xl">{props.cardHeading}</Heading>
          <Text size="lg" maxW="30rem">
            {props.cardText}
          </Text>
          <Box>
            <Button
              colorScheme="blue"
              variant="solid"
              borderRadius="full"
              px="6"
              onClick={props.ctaRoute}
            >
              {props.ctaText}
            </Button>
          </Box>
        </Stack>
      </Center>
    </>
  );
};

export default JoinNetwork;
