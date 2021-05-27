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
    <Stack textAlign="center" spacing="16" my="16">
      <Heading color="gray.900" size="2xl">
        Why Filecoin?
      </Heading>
      <HStack color="gray.700" spacing="36" justifyContent="center">
        <WrapItem maxW="72" textAlign="center">
          <Stack alignItems="center">
            <Image src="/images/secure.svg" maxW="128" />
            <Heading size="md">Secure</Heading>
            <Text size="xs">
              Miners storing data have to encrypt data which makes storing data
              on Filecoin more secure
            </Text>
          </Stack>
        </WrapItem>

        <WrapItem maxW="72">
          <Stack alignItems="center">
            <Image src="/images/rewards.svg" maxW="128" />
            <Heading size="md">Rewards</Heading>
            <Text size="xs">
              Rewards are directly proportional to amount of storage you
              provide, hence more storage means more rewards
            </Text>
          </Stack>
        </WrapItem>

        <WrapItem maxW="72">
          <Stack alignItems="center">
            <Image src="/images/decentralised.svg" maxW="128" />
            <Heading size="md">Decentralised</Heading>
            <Text size="xs">
              It all is decentralised hence, no single point of control, no
              middle man
            </Text>
          </Stack>
        </WrapItem>
      </HStack>
    </Stack>
  );
};

export default Features;
