import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Flex,
  Heading,
  Text,
  HStack,
  Stack,
  Wrap,
  WrapItem,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { Mail, Globe, Slack, Twitter } from "react-feather";

const PersonalDetails = () => {
  return (
    <>
      <Box
        border="solid 2px #E2E8F0"
        borderRadius="xl"
        p="12"
        textAlign="left"
        alignItems="flex-start"
      >
        <WrapItem alignItems="center">
          <Avatar
            name="Bruce Wayne"
            src="https://bit.ly/broken-link"
            size="lg"
            bg="gray.100"
            mr="4"
          ></Avatar>
          <VStack alignItems="baseline" textAlign="left">
            <Heading size="md" color="blue.900">
              Bruce Wayne
            </Heading>
            <Text color="blue.700">f0123456</Text>
          </VStack>

          <HStack
            flexDirection="row"
            alignItems="baseline"
            color="gray.600"
            spacing="4"
          >
            <Mail />
            <Globe />
            <Slack />
            <Twitter />
          </HStack>
        </WrapItem>
        <VStack spacing="3" alignItems="left" pt="4">
          <WrapItem alignItems="baseline">
            <Heading size="sm" color="gray.700" mr="3">
              Worker Address:
            </Heading>
            <Text color="gray.600">workerAddressProp</Text>
          </WrapItem>
          <WrapItem alignItems="baseline">
            <Heading size="sm" color="gray.700" mr="3">
              Owner Address:
            </Heading>
            <Text color="gray.600">ownerAddressProp</Text>
          </WrapItem>
          <WrapItem alignItems="baseline">
            <Heading size="sm" color="gray.700" mr="3">
              Bio:
            </Heading>
            <Text color="gray.600">minerBioProp</Text>
          </WrapItem>
        </VStack>
      </Box>
    </>
  );
};

export default PersonalDetails;
