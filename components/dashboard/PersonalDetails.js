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
  Spacer,
  Wrap,
  WrapItem,
  VStack,
  Link,
} from "@chakra-ui/react";
import React from "react";
import { Mail, Globe, Slack, Twitter } from "react-feather";

const PersonalDetails = (props) => {
  return (
    <>
      <Box
        border="solid 2px #E2E8F0"
        borderRadius="2xl"
        p="10"
        textAlign="left"
        alignItems="flex-start"
      >
        <WrapItem alignItems="center">
          <Avatar
            name={props.minerName}
            src="https://bit.ly/broken-link"
            size="lg"
            bg="gray.100"
            mr="4"
          ></Avatar>
          <VStack alignItems="baseline" textAlign="left">
            <Heading size="md" color="blue.900">
              {props.minerName}
            </Heading>
            <Text color="blue.700" fontWeight="medium">
              {props.minerAddress}
            </Text>
          </VStack>
          <Spacer />
          <HStack
            flexDirection="row"
            alignItems="baseline"
            color="gray.600"
            spacing="4"
          >
            <Link href={props.minerMail} isExternal>
              <Mail />
            </Link>
            <Link href={props.minerWebsite} isExternal>
              <Globe />
            </Link>
            <Link href={props.minerSlack} isExternal>
              <Slack />
            </Link>
            <Link href={props.minerTwitter} isExternal>
              <Twitter />
            </Link>
          </HStack>
        </WrapItem>
        <VStack spacing="3" alignItems="left" pt="4">
          <WrapItem alignItems="baseline">
            <Heading size="sm" color="gray.700" mr="3">
              Worker Address:
            </Heading>
            <Text color="gray.600">{props.workerAddress}</Text>
          </WrapItem>
          <WrapItem alignItems="baseline">
            <Heading size="sm" color="gray.700" mr="3">
              Owner Address:
            </Heading>
            <Text color="gray.600">{props.ownerAddress}</Text>
          </WrapItem>
          <WrapItem alignItems="baseline">
            <Heading size="sm" color="gray.700" mr="3">
              Bio:
            </Heading>
            <Text color="gray.600">{props.minerBio}</Text>
          </WrapItem>
        </VStack>
      </Box>
    </>
  );
};

export default PersonalDetails;
