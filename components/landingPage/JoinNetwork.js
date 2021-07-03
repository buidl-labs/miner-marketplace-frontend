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
import React from "react";

const JoinNetwork = (props) => {
  return (
    <>
      <Center
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
            <Button colorScheme="blue" variant={props.ctaVariant}>
            <Link href={props.ctaLink} onClick={props.ctaRoute} isExternal colorScheme="blue" textDecoration="none">
              {props.ctaText}
              </Link>
            </Button>
          </Box>
        </Stack>
      </Center>
    </>
  );
};

export default JoinNetwork;
