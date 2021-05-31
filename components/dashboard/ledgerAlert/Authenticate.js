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

const Authenticate = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <ModalContent textAlign="center" p="5">
        <ModalHeader alignItems="center">
          <Heading size="lg" color="gray.900">
            Authenticate
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
            Above address will be used for authentication. Please check that you
            have ledger device of the above address.
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose} w="36">
            Discard
          </Button>
          <Spacer />
          <Button colorScheme="blue" w="36">
            Proceed
          </Button>
        </ModalFooter>
      </ModalContent>
    </>
  );
};
export default Authenticate;
