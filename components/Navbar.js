import {
  Button,
  Box,
  Flex,
  Link,
  Image,
  Heading,
  HStack,
  Stack,
  Spacer,
  Text,
  useDisclosure,
  Icon,
  Slide,
  Collapse,
} from "@chakra-ui/react";

import { HiMenuAlt3, HiX, HiXCircle } from "react-icons/hi";

import { useRouter } from "next/router";

const Navbar = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());

  const router = useRouter();

  return (
    <>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding={6}
        bg="whiteAlpha.800"
        color="gray.800"
        {...props}
        borderBottom="solid 1px #EDF2F7 "
        mb="24"
        px={{ base: "2", md: "2", xl: "28" }}
        position="fixed"
        zIndex="10"
        w="full"
        backdropFilter="blur(16px)"
      >
        <Flex align="center">
          <Link onClick={() => router.push("/")}>
            <Image src="/images/Logo.svg" maxW="36" />
          </Link>
        </Flex>

        <Spacer />

        <Box
          display={{ base: "block", md: "none" }}
          onClick={handleToggle}
          mr={4}
        >
          <Icon
            as={HiMenuAlt3}
            color={"blue.800"}
            w={8}
            h={8}
            display={{ base: isOpen ? "none" : "block" }}
          />
          <Icon
            as={HiX}
            color={"blue.800"}
            w={8}
            h={8}
            display={{ base: isOpen ? "block" : "none" }}
          />
        </Box>

        <Stack
          direction={{ base: "column", md: "row" }}
          display={{ base: isOpen ? "block" : "none", md: "flex" }}
          width={{ base: "full", md: "auto" }}
          justify="end"
          textAlign="right"
          mt={{ base: 8, md: 0 }}
          spacing={{ base: isOpen ? "16" : "12" }}
          mr={12}
        >
          <Link
            onClick={() => router.push("/clientLanding")}
            p={{ base: isOpen ? "4" : "0" }}
          >
            <Text fontSize="lg" fontWeight="medium">
              Clients
            </Text>
          </Link>
          <Link
            onClick={() => router.push("/minerLanding")}
            p={{ base: isOpen ? "4" : "0" }}
          >
            <Text fontSize="lg" fontWeight="medium">
              Miners
            </Text>
          </Link>
        </Stack>

        <Box
          display={{ base: isOpen ? "block" : "none", md: "block" }}
          w={{ base: isOpen ? "full" : "fit-content" }}
          mr={4}
          textAlign="right"
        >
          <Button
            variant="outline"
            colorScheme="blue"
            onClick={() => router.push("/miners")}
          >
            Dashboard
          </Button>
        </Box>
      </Flex>
    </>
  );
};

export default Navbar;
