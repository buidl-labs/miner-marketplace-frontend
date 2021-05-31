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
  Image,
} from "@chakra-ui/react";
import React from "react";

const AuthSuccess = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <ModalContent textAlign="center" p="5" w="full">
        <ModalHeader alignItems="center">
          <Heading size="lg" color="gray.900">
            Authentication Successful
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Image src="/images/AuthSuccess.svg" pb="6" mx="auto" w="20" />
          <Box
            p="2"
            width="50%"
            borderRadius="full"
            bg="blue.100"
            color="blue.900"
            mb="6"
            mx="auto"
          >
            <Text fontWeight="bold">fx023389rcnjco23e9090n</Text>
          </Box>

          <Text justifyContent="justify" color="gray.600">
            You Profile with above address have been authenticated
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" w="80%" mx="auto" onClick={onClose}>
            Continue
          </Button>
        </ModalFooter>
      </ModalContent>
    </>
  );
};

export default AuthSuccess;
