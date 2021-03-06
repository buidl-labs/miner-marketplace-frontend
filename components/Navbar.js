import {
  Button,
  Box,
  Flex,
  Link,
  Image,
  Icon,
  Stack,
  Spacer,
  Text,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { HiMenuAlt3 } from "react-icons/hi";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import * as Fathom from "fathom-client";

const Navbar = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());
  const btnRef = useRef();

  const router = useRouter();

  function track() {
    if (typeof window !== "undefined") {
      Fathom.trackGoal("5O1PTUCW", 0);
    }
  }

  const [btnLoading, setBtnLoading] = useState(false);

  return (
    <>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding={4}
        bg="whiteAlpha.800"
        color="gray.800"
        {...props}
        borderBottom="solid 1px #EDF2F7 "
        px={{ base: 2, xl: 32, lg: 4, md: 2 }}
        position="fixed"
        zIndex="10"
        w="full"
        backdropFilter="blur(16px)"
      >
        <Flex align="center">
          <Link onClick={() => router.push("/")}>
            <Image src="/images/Logo-b.svg" maxW="48" alt="Data Station Logo" />
          </Link>
        </Flex>

        <Spacer />

        <Box
          display={{ base: "block", md: "none" }}
          onClick={handleToggle}
          mr={4}
        >
          <Icon as={HiMenuAlt3} color="blue.800" w={8} h={8} />
        </Box>
        <Drawer
          size="xs"
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>
              <Image
                src="/images/Logo-b.svg"
                maxW="36"
                alt="Data Station Logo"
              />
            </DrawerHeader>

            <DrawerBody>
              <Stack spacing="8" mt="8">
                <Link onClick={() => router.push("/clientLanding")}>
                  <Text fontSize="xl" fontWeight="medium">
                    Want to Store Data?
                  </Text>
                </Link>
                <Box>
                  <Button
                    size="md"
                    variant="outline"
                    isLoading={btnLoading}
                    loadingText="loading please wait"
                    onClick={() => {
                      router.push("/miners");
                      track();
                      setBtnLoading(true);
                    }}
                    colorScheme="blue"
                  >
                    Explore Storage Providers
                  </Button>
                </Box>
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>

        <Stack
          direction="row"
          display={{ base: "none", md: "flex" }}
          width="auto"
          spacing="12"
          mr={12}
        >
          <Link onClick={() => router.push("/clientLanding")}>
            <Text fontSize="lg" fontWeight="medium">
              Want to Store Data?
            </Text>
          </Link>
        </Stack>

        <Box
          mr={4}
          textAlign="right"
          display={{ base: isOpen ? "block" : "none", md: "flex" }}
        >
          <Button
            variant="outline"
            colorScheme="blue"
            borderRadius="full"
            px="6"
            isLoading={btnLoading}
            loadingText="loading please wait"
            onClick={() => {
              router.push("/miners");
              track();
              setBtnLoading(true);
            }}
          >
            Explore Storage Providers
          </Button>
        </Box>
      </Flex>
    </>
  );
};

export default Navbar;
