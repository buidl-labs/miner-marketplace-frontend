import {
  Box,
  Link,
  Text,
  VStack,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";
import { React, useRef } from "react";
import { useRouter } from "next/router";
import { Icon } from "@chakra-ui/icons";
import { RiDashboardFill } from "react-icons/ri";

const DashboardMenu = () => {
  // eslint-disable-next-line no-unused-vars
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const btnRef = useRef();

  const router = useRouter();

  return (
    <>
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
            bgColor="blue.500"
            onClick={() => router.push("/miners")}
          >
            <HStack>
              <Icon as={RiDashboardFill} h={5} w={5} />
              <Text fontSize="lg" paddingLeft="2" fontWeight="medium">
                Dashboard
              </Text>
            </HStack>
          </Link>
        </VStack>
      </Box>
    </>
  );
};

export default DashboardMenu;
