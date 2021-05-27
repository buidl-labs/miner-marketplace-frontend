import {
  Button,
  Flex,
  Link,
  Heading,
  HStack,
  Spacer,
  Text,
} from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Flex
      bg="white"
      borderBottom="solid 1px #E2E8F0"
      p="4"
      mb="24"
      px="36"
      overflow="hidden"
    >
      <Link>
        <Heading size="md" color="blue.700">
          Miner Marketplace
        </Heading>
      </Link>
      <Spacer />
      <HStack spacing="12" color="gray.700">
        <Link>
          <Text fontSize="lg" fontWeight="medium">
            Clients
          </Text>
        </Link>
        <Link>
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
