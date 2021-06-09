import {
  Box,
  Center,
  Link,
  Text,
  Heading,
  VStack,
  HStack,
  IconButton,
  Input,
  Image,
  Button,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { React, useState, useRef } from "react";
import { useRouter } from "next/router";
import {
  Icon,
  IconProps,
  ChevronRightIcon,
  HamburgerIcon,
  CloseIcon,
} from "@chakra-ui/icons";
import { RiDashboardFill, RiUserSearchFill } from "react-icons/ri";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const DashboardMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const router = useRouter();

  return (
    <>
      {/* Drawer
      <Box pt={16}>
        <IconButton as={HiX} w={12} h={12} ref={btnRef} onClick={onOpen} />
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>
              <Image src="/images/Logo.svg" w={36} />
            </DrawerHeader>

            <DrawerBody>
              <Link onClick={() => router.push("/miners")}>
                <HStack>
                  <Icon as={RiUserSearchFill} w={5} h={5} />
                  <Text fontSize="lg" paddingLeft="2" fontWeight="medium">
                    Search Miners
                  </Text>
                </HStack>
              </Link>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box> */}

      <Box
        display={{ base: isOpen ? "block" : "none", md: "flex" }}
        bg="blue.700"
        color="white"
        w="auto"
        textAlign="left"
        alignItems="left"
        position="fixed"
        z-index="10"
        h="100%"
        pt="20"
      >
        <VStack alignItems="left" spacing="2" textAlign="left">
          <Link
            alignItems="center"
            w="full"
            p="6"
            bgColor="blue.600"
            onClick={() => router.push("/miners")}
          >
            <HStack>
              <Icon as={RiDashboardFill} h={5} w={5} />
              <Text fontSize="lg" paddingLeft="2" fontWeight="medium">
                Dashboard
              </Text>
            </HStack>
          </Link>

          {/*<Link
            p="4"
            alignItems="center"
            onClick={() => router.push("/miners")}
          >
            <HStack>
              <Text size="md" px="2">
                Miner Details
              </Text>
              <ChevronRightIcon h={6} w={6} />
            </HStack>
          </Link>
          <Link
            p="4"
            alignItems="center"
            onClick={() => router.push("/profileSettings")}
          >
            <HStack>
              <Text size="md" px="2">
                Profile Settings
              </Text>
              <ChevronRightIcon h={6} w={6} />
            </HStack>
          </Link>
          <Link
            p="6"
            alignItems="center"
            // onClick={() => router.push("/minerList")}
          >
            <HStack>
              <Icon as={RiUserSearchFill} w={5} h={5} />
              <Text fontSize="lg" paddingLeft="2" fontWeight="medium">
                Search Miners
              </Text>
            </HStack>
          </Link>*/}
        </VStack>
      </Box>
    </>
  );
};

export default DashboardMenu;
