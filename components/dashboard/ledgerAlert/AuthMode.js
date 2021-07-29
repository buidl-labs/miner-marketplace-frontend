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

const AuthMode = () => {
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
            Choose how you want to authenticate your profile
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
              >
                <Image
                  src="/images/authmode-wallet.png"
                  maxW="8rem"
                  mx="auto"
                />
                <Text fontWeight="semibold" fontSize="lg">
                  Wallet
                </Text>
                <Text size="sm" color="gray.600">
                  use ledger device to authenticate
                </Text>
              </Box>
              <Box
                bg="gray.100"
                p="1rem"
                borderRadius="xl"
                border="solid 2px #fff"
                _hover={{ bg: "blue.50", border: "solid 2px #90CDF4" }}
                cursor="pointer"
              >
                <Image src="/images/authmode-sign.png" mx="auto" maxW="8rem" />
                <Text fontWeight="semibold" fontSize="lg">
                  Signature
                </Text>
                <Text size="sm" color="gray.600">
                  use signature method via lotus node
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
