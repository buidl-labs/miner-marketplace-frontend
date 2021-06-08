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
} from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";

const Footer = () => {
  const router = useRouter();

  return (
    <Center
      py="8"
      px={{ lg: 32, md: 8, sm: 4 }}
      bgColor="gray.100"
      spacing="10"
      color="gray.600"
      width="full"
      alignItems={{ sm: "flex-start" }}
    >
      <SimpleGrid columns={{ lg: 3, md: 1, sm: 1 }} gap={4} w="container.xl">
        <GridItem>
          <Link href="https://filecoin.io" isExternal>
            <Image src="/images/Filecoin-logo.svg" maxW="28" />
          </Link>
        </GridItem>

        <GridItem>
          <HStack>
            <Text>
              Made with ❤ by{" "}
              <Link href="https://buidllabs.io" isExternal>
                BUIDL Labs
              </Link>
            </Text>
          </HStack>
        </GridItem>

        <GridItem>
          <HStack spacing={4}>
            <Link onClick={() => router.push("/privacy")}>Privacy</Link>

            <Link onClick={() => router.push("/terms")}>Terms</Link>

            <Link onClick={() => router.push("/disclaimer")}>Disclaimer</Link>

            <Link href="#" isExternal>
              Contact
            </Link>
          </HStack>
        </GridItem>
      </SimpleGrid>
    </Center>
  );
};

export default Footer;
