import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Image,
  Link,
  VStack,
  Stack,
  Heading,
  Text,
  Spacer,
  SimpleGrid,
  WrapItem,
  Center,
  GridItem,
} from "@chakra-ui/react";
import React from "react";
import { Icon, IconProps, ArrowForwardIcon } from "@chakra-ui/icons";
import * as Fathom from "fathom-client";
import { trackGoal } from "../../util/analytics";
import { useRouter } from "next/router";
import { useState } from "react";

const Hero = (props) => {
  const router = useRouter();

  function track() {
    if (typeof window != "undefined") {
      Fathom.trackGoal("RLIXEEKF", 0);
    }
  }

  const [btnLoading, setBtnLoading] = useState(false);

  return (
    <Stack
      pt="44"
      pb={{ base: 16, md: 0 }}
      textAlign="center"
      alignItems="center"
      mx="auto"
      maxW="80%"
      spacing="6"
    >
      <Heading size="4xl" lineHeight="1.2" color="gray.900">
        {props.heroHeading}
      </Heading>
      <Text
        maxW={{ base: "full", md: "60%" }}
        fontSize="1.2rem"
        color="gray.700"
      >
        {props.heroText}
      </Text>
      <Box>
        <Button
          size="lg"
          variant="solid"
          borderRadius="full"
          isLoading={btnLoading}
          loadingText="Loading Please Wait"
          px="6"
          colorScheme="blue"
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
  );
};

export default Hero;
