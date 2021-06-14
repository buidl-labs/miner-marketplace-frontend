import {
  Button,
  Box,
  Image,
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
import { useRouter } from "next/router";

function AuthFail() {
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <ModalContent textAlign="center" p="5">
        <ModalHeader alignItems="center">
          <Heading size="lg" color="gray.900">
            Authentication Failed!
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Image src="/images/AuthFail.svg" pb="6" mx="auto" w="20" />
          <Box
            p="2"
            width="60%"
            borderRadius="full"
            bg="blue.100"
            color="blue.900"
            mb="6"
            mx="auto"
          >
            <Text fontWeight="bold">fx023389rcnjco23e9090n</Text>
          </Box>
          <Text justifyContent="justify" color="gray.600">
            Profile with above address could not be authenticated
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose} w="36">
            Discard
          </Button>
          <Spacer />
          <Button colorScheme="blue" w="36" onClick={() => router.push("/")}>
            Retry
          </Button>
        </ModalFooter>
      </ModalContent>
    </>
  );
}

export default AuthFail;
