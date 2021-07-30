import {
  Button,
  Box,
  Text,
  Spacer,
  Heading,
  Image,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  HStack,
  VStack,
  Stack,
  Center,
} from "@chakra-ui/react";
import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import { useGlobalState } from "../../../state";

const AuthMode = (props) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [authMode, setAuthMode] = useGlobalState("authMode");
  const [ledgerConnected, setLedgerConnected] = useState(false);
  const [addressConfirmed, setAddressConfirmed] = useState(false);
  const [receivedVerificationResult, setReceivedVerificationResult] =
    useState(false);

  // const [ledgerAddress, setLedgerAddress] = useState("");
  const [ledgerAddress, setLedgerAddress] = useGlobalState("ledgerAddr");

  return (
    <>
      <ModalContent textAlign="center" p="6">
        <ModalHeader alignItems="center">
          <Heading size="lg" color="gray.900">
            Choose Authentication Method
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize="md" fontWeight="normal" color="gray.700" mt="-1.6rem">
            Verify your owner address
          </Text>
          <Center>
            <HStack spacing="8" mt="8">
              <Box
                bg="gray.100"
                p="1rem 1.4rem"
                borderRadius="xl"
                border="solid 2px #fff"
                _hover={{ bg: "blue.50", border: "solid 2px #90CDF4" }}
                cursor="pointer"
                onClick={() => {
                  console.log("cbox");
                  // props.onOpen();
                  props.getAddress();
                  setAuthMode("ledger");
                }}
              >
                <Image
                  src="/images/authmode-wallet.png"
                  maxW="8rem"
                  mx="auto"
                />
                <Text fontWeight="semibold" fontSize="lg">
                  Ledger
                </Text>
                <Text size="sm" color="gray.600">
                  plug in your ledger hardware wallet
                </Text>
              </Box>
              <Box
                bg="gray.100"
                p="1rem"
                borderRadius="xl"
                border="solid 2px #fff"
                _hover={{ bg: "blue.50", border: "solid 2px #90CDF4" }}
                cursor="pointer"
                onClick={() => {
                  console.log("cbox2");
                  setLedgerAddress(props.ownerAddress);
                  setAuthMode("lotus");
                }}
              >
                <Image src="/images/authmode-sign.png" mx="auto" maxW="8rem" />
                <Text fontWeight="semibold" fontSize="lg">
                  Signature
                </Text>
                <Text size="sm" color="gray.600">
                  verify signature using lotus node
                </Text>
              </Box>
            </HStack>
          </Center>
        </ModalBody>
      </ModalContent>
    </>
  );
};

export default AuthMode;
