import {
  Heading,
  HStack,
  Stack,
  Text,
  Image,
  Box,
  Center,
} from "@chakra-ui/react";
import React from "react";

const Features = (props) => {
  return (
    <>
      <Center py="12">
        <HStack
          alignItems="center"
          textAlign="center"
          spacing="24"
          maxW={{ lg: "80%", md: "50%" }}
        >
          <Stack textAlign="left">
            <Heading size="lg">{props.featureTitle}</Heading>
            <Text size="xs">{props.featureDescription}</Text>
          </Stack>
          <Box
            maxW="64rem"
            w={{ lg: "64rem", md: "36rem" }}
            alignItems="center"
          >
            <Image src={props.featureImg} alt="feature GIF" />
          </Box>
        </HStack>
      </Center>
    </>
  );
};

export default Features;
