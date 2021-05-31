import {
  Button,
  Box,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Spacer,
  Heading,
} from "@chakra-ui/react";
import React from "react";

function LedgerConfirm() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <ModalContent textAlign="center" p="5">
        <ModalHeader alignItems="center">
          <Heading size="lg" color="gray.900">
            Confirm on Ledger
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box
            p="2"
            width="80%"
            borderRadius="full"
            bg="blue.100"
            color="blue.900"
            mb="6"
            mx="auto"
          >
            <Text fontWeight="bold">fx023389rcnjco23e9090n</Text>
          </Box>
          <Text justifyContent="justify" color="gray.600">
            Waiting for confirmation on Ledger
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose} w="36">
            Discard
          </Button>
          <Spacer />
          <Button colorScheme="blue" w="36" disabled>
            Proceed
          </Button>
        </ModalFooter>
      </ModalContent>
    </>
  );
}

export default LedgerConfirm;
