import {
  Button,
  Flex,
  Link,
  Image,
  Modal,
  Heading,
  HStack,
  Spacer,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";
import { isOpen } from "../dashboard/ledgerAlert/Authenticate";

const DashboardNavbar = () => {
  const router = useRouter();

  return (
    <>
      <Flex
        bg="white"
        borderBottom="solid 1px #E2E8F0"
        p="4"
        w="full"
        overflow="hidden"
      >
        <Link onClick={() => router.push("/")}>
          <Image src="/images/Logo.svg" maxH="12" />
        </Link>
        <Spacer />
        <HStack spacing="12" color="gray.700">
          <Button colorScheme="blue" size="md" variant="solid" onClick="">
            Connect Wallet
          </Button>
        </HStack>
      </Flex>
    </>
  );
};

export default DashboardNavbar;
