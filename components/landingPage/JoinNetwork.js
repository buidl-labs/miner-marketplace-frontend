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
            <Link href={props.ctaLink} isExternal colorScheme="blue" textDecoration="none">
              <Button colorScheme="blue" variant={props.ctaVariant} rightIcon={props.ctaIcon} onClick={props.ctaRoute}>
                {props.ctaText}
              </Button>
            </Link>
          </Box>
        </Stack>
      </Center>
    </>
  );
};

export default JoinNetwork;
