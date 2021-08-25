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
import router, { useRouter } from "next/router";
import React from "react";
import * as Fathom from "fathom-client";
import { useState } from "react";

const JoinNetwork = (props) => {
  const router = useRouter();

  function track() {
    if (typeof window != "undefined") {
      Fathom.trackGoal("RLIXEEKF", 0);
    }
  }
  const [btnLoading, setBtnLoading] = useState(false);

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
              isLoading={btnLoading}
              loadingText="loading please wait"
              onClick={() => {
                router.push("/miners");
                track();
                setBtnLoading(true);
              }}
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
