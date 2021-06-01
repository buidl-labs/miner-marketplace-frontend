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
      bg="whiteAlpha.700"
      borderBottom="solid 1px #EDF2F7 "
      p="4"
      mb="24"
      px="28"
      overflow="hidden"
      position="fixed"
      zIndex="10"
      w="full"
      backdropFilter="blur(16px)"
    >
      <Link onClick={() => router.push("/")}>
        <Image src="/images/Logo.svg" maxH="12" />
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
        <Button
          colorScheme="blue"
          size="md"
          variant="outline"
          onClick={() => router.push("/minerDetails")}
        >
          Dashboard
        </Button>
      </HStack>
    </Flex>
  );
};

export default Navbar;
