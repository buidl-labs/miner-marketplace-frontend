import {
  Heading,
  Flex,
  HStack,
  VStack,
  Stack,
  Text,
  Image,
  Spacer,
  Wrap,
  WrapItem,
  Center,
} from "@chakra-ui/react";
import React from "react";

const Features = (props) => {
  return (
    <WrapItem maxW="72" textAlign="center">
      <Stack alignItems="center">
        <Image src={props.featureIcon} maxW="128" />
        <Heading size="md">{props.featureTitle}</Heading>
        <Text size="xs">{props.featureDescription}</Text>
      </Stack>
    </WrapItem>
  );
};

export default Features;
