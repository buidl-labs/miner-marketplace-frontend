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

const JoinNetwork = (props) => {
  return (
    <>
      <WrapItem
        maxW="38rem"
        textAlign="left"
        border="solid 1px #CBD5E0"
        borderRadius="xl"
        px="10"
        py="12"
      >
        <Stack alignItems="left" spacing="2">
          <Heading size="lg">{props.cardHeading}</Heading>
          <Text size="lg" maxW="30rem">
            {props.cardText}
          </Text>
          <Box>
            <Button colorScheme="blue">{props.ctaText}</Button>
          </Box>
        </Stack>
      </WrapItem>
    </>
  );
};

export default JoinNetwork;
