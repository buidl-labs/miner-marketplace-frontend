import { Heading, VStack, Text, Image, Center } from "@chakra-ui/react";
import React from "react";

const Features = (props) => {
  return (
    <>
      <Center>
        <VStack alignItems="center" textAlign="center">
          <Image src={props.featureIcon} maxW="128" />
          <Heading size="md">{props.featureTitle}</Heading>
          <Text size="xs">{props.featureDescription}</Text>
        </VStack>
      </Center>
    </>
  );
};

export default Features;
