import {
  Image,
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
    <HStack py="8" px="32" bgColor="gray.100" spacing="10" color="gray.600">
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
      <Link onClick={() => router.push("/privacy")}>Privacy</Link>
      <Link onClick={() => router.push("/terms")}>Terms</Link>
      <Link onClick={() => router.push("/disclaimer")}>Disclaimer</Link>
      <Link href="#" isExternal>
        Contact
      </Link>
    </HStack>
  );
};

export default Footer;
