import {
  Button,
  Flex,
  Link,
  Image,
  Heading,
  HStack,
  Spacer,
  Text,
} from "@chakra-ui/react";

import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();

  return (
    <Flex
      bg="white"
      borderBottom="solid 1px #E2E8F0"
      p="4"
      mb="24"
      px="36"
      overflow="hidden"
    >
      <Link onClick={() => router.push("/")}>
        <Image src="/images/Logo.svg" maxH="16" />
      </Link>
      <Spacer />
      <HStack spacing="12" color="gray.700">
        <Link onClick={() => router.push("/clientLanding")}>
          <Text fontSize="lg" fontWeight="medium">
            Clients
          </Text>
        </Link>
        <Link onClick={() => router.push("/minerLanding")}>
          <Text fontSize="lg" fontWeight="medium">
            Miners
          </Text>
        </Link>
        <Button colorScheme="blue" size="lg" variant="outline">
          Dashboard
        </Button>
      </HStack>
    </Flex>
  );
};

export default Navbar;
