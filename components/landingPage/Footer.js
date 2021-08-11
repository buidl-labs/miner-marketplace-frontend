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
  SimpleGrid,
  GridItem,
  VisuallyHidden,
} from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";

const Footer = () => {
  const router = useRouter();

  return (
    <Flex
      py="8"
      px={{ base: 4, lg: 32, md: 8 }}
      bgColor="gray.100"
      spacing="10"
      color="gray.600"
      width="full"
    >
      <SimpleGrid columns={{ base: 1, lg: 2 }} w="container.xl" mx="auto">
        <VStack spacing={4} align="flex-start">
          <Link href="https://filecoin.io" isExternal>
            <Image
              src="/images/Filecoin-logo.svg"
              maxW="28"
              alt="filecoin logo"
            />
            <VisuallyHidden>Filecoin Network's offical website</VisuallyHidden>
          </Link>

          <Text>
            Made with ❤ by{" "}
            <Link href="https://buidllabs.io" isExternal>
              BUIDL Labs
            </Link>
          </Text>
        </VStack>

        <HStack
          spacing="8"
          mx={{ base: 0, md: "auto" }}
          pt={{ base: 4, md: 0 }}
          mr={{ base: 0, md: "0" }}
          alignItems={{ base: "left", md: "center" }}
          textAlign="right"
        >
          <Link onClick={() => router.push("/about")}>About Us</Link>

          <Link onClick={() => router.push("/privacy")}>Privacy</Link>

          <Link onClick={() => router.push("/terms")}>Terms</Link>

          <Link onClick={() => router.push("/disclaimer")}>Disclaimer</Link>

          {/* <Link
            href="https://github.com/buidl-labs/miner-marketplace-frontend/issues/new/choose"
            isExternal
          >
            Report Bug
          </Link> */}
        </HStack>
      </SimpleGrid>
    </Flex>
  );
};

export default Footer;
