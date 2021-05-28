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

const FilecoinStats = (props) => {
  return (
    <WrapItem maxW="72" textAlign="center">
      <Stack alignItems="center">
        <HStack>
          <Heading size="3xl">{props.count}</Heading>
          <Text size="md">{props.countText}</Text>
        </HStack>
        <Text size="xs">{props.subtext}</Text>
      </Stack>
    </WrapItem>
  );
};

export default FilecoinStats;
