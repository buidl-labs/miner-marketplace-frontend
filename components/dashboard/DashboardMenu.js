import { Box, Center, Link, Text, Heading, VStack } from "@chakra-ui/react";
import React from "react";
import { ChevronRight, Home, Layout, UserCheck } from "react-feather";

const DashboardMenu = () => {
  return (
    <>
      <Box
        bg="blue.700"
        color="white"
        w="56"
        textAlign="left"
        alignItems="left"
        position="fixed"
        z-index="10"
        h="100%"
        pt="20"
      >
        <VStack alignItems="left" spacing="2" textAlign="left">
          <Link _activeLink bg="blue.500" w="full" p="6">
            <Center>
              <Layout />
              <Heading size="md" paddingLeft="2" fontWeight="medium">
                Dashboard
              </Heading>
            </Center>
          </Link>
          <Link p="4">
            <Center>
              <Text size="md" fontWeight="bold" px="2">
                Miner Details
              </Text>
              <ChevronRight size="20px" />
            </Center>
          </Link>
          <Link p="4">
            <Center>
              <Text size="md" px="2">
                Profile Settings
              </Text>
              <ChevronRight size="20px" />
            </Center>
          </Link>
          <Link p="6">
            <Center>
              <UserCheck />
              <Heading size="md" paddingLeft="2" fontWeight="medium">
                Search Miners
              </Heading>
            </Center>
          </Link>
        </VStack>
      </Box>
    </>
  );
};

export default DashboardMenu;
