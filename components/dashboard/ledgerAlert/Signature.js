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
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  IconButton,
} from "@chakra-ui/react";
import { IconProps, Icon } from "@chakra-ui/icon";
import { MdContentCopy } from "react-icons/md";

const Signature = () => {
  return (
    <>
      <ModalContent textAlign="left" p="6" maxW="60vw">
        <ModalHeader alignItems="left">
          <Heading size="lg" color="gray.900">
            Signature Verification
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing="6">
            <Stack>
              <Text fontWeight="medium">Owner Address</Text>
              <Text
                fontSize="md"
                fontWeight="semibold"
                color="blue.800"
                p="2"
                bg="blue.50"
                borderRadius="md"
              >
                owner.address
              </Text>
            </Stack>
            <Stack>
              <Text fontWeight="medium">Message</Text>
              <Text
                color="gray.800"
                p="2"
                bg="gray.50"
                borderRadius="md"
                fontFamily="monospace"
              >
                Message goes here
              </Text>
            </Stack>
            <Stack>
              <Text fontWeight="medium">Sign Code</Text>
              <HStack alignItems="flex-end">
                <Text
                  color="gray.800"
                  p="2"
                  bg="gray.50"
                  borderRadius="md"
                  fontFamily="monospace"
                  wordBreak="break-word"
                >
                  lotus wallet sign f1enfilmuyphmnqexjt33zfbk56c25mo2lplgbpxa
                  5369676e617475726520666f722066696c666f780a66303133333530350a323032312d30372d32395430393a34303a34382e3432315a
                </Text>
                <IconButton
                  colorScheme="gray"
                  aria-label="copy code"
                  icon={<MdContentCopy />}
                  onClick={() =>
                    navigator.clipboard.writeText(
                      "lotus code will go here in curly brackets"
                    )
                  }
                />
              </HStack>
            </Stack>
            <Stack>
              <FormControl>
                <FormLabel>Signature</FormLabel>
                <Input type="text" />
                <FormHelperText color="blue.700">
                  Please copy the Sign code, Sign it with Filecoin wallet and
                  paste it here
                </FormHelperText>
              </FormControl>
            </Stack>
            <Button variant="solid" colorScheme="blue">
              Verify
            </Button>
          </Stack>
        </ModalBody>
      </ModalContent>
    </>
  );
};

export default Signature;
