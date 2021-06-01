import {
  Button,
  Flex,
  Link,
  Image,
  HStack,
  Spacer,
  Modal,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";
import Authenticate from "./ledgerAlert/Authenticate";
import AuthFail from "./ledgerAlert/AuthFail";
import AuthSuccess from "./ledgerAlert/AuthSuccess";
import LedgerConfirm from "./ledgerAlert/LedgerConfirm";

const DashboardNavbar = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        bg="white"
        borderBottom="solid 1px #E2E8F0"
        p="4"
        w="full"
        overflow="hidden"
        position="fixed"
        zIndex="20"
      >
        <Link onClick={() => router.push("/")}>
          <Image src="/images/Logo.svg" maxH="12" />
        </Link>
        <Spacer />
        <HStack spacing="12" color="gray.700">
          <Button colorScheme="blue" size="md" variant="solid" onClick={onOpen}>
            Connect Wallet
          </Button>

          <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
            <ModalOverlay />
            <Authenticate />
            {/* <LedgerConfirm />
            <AuthSuccess />
            <AuthFail /> */}
          </Modal>
        </HStack>
      </Flex>
    </>
  );
};

export default DashboardNavbar;
