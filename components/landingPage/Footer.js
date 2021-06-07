import {
  Image,
  Center,
  Box,
  Flex,
  Text,
  Link,
  Stack,
  VStack,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";

const Footer = () => {
  const router = useRouter();

  return (
    <Center
      py="8"
      px="32"
      bgColor="gray.100"
      spacing="10"
      color="gray.600"
      w="stretch"
    >
      <Link href="https://filecoin.io" isExternal>
        <Image src="/images/Filecoin-logo.svg" maxW="28" />
      </Link>
      <Spacer />
      <Text>
        Made with ❤ by{" "}
        <Link href="https://buidllabs.io" isExternal>
          BUIDL Labs
        </Link>
      </Text>
      <Spacer />
      <Link onClick={() => router.push("/privacy")} pl={8}>
        Privacy
      </Link>
      <Link onClick={() => router.push("/terms")} pl={8}>
        Terms
      </Link>
      <Link onClick={() => router.push("/disclaimer")} pl={8}>
        Disclaimer
      </Link>
      <Link href="#" isExternal pl={8}>
        Contact
      </Link>
    </Center>
  );
};

export default Footer;
