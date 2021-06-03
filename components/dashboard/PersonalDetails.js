import {
  Avatar,
  Box,
  Heading,
  Text,
  HStack,
  Spacer,
  WrapItem,
  VStack,
  Link,
} from "@chakra-ui/react";
import React from "react";

import { Icon, IconProps } from "@chakra-ui/icons";
import {} from "react-icons";
import { FaSlack, FaTwitter, FaGlobe } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

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
            spacing="6"
          >
            <a href={"mailto:" + props.minerMail} color="gray.500">
              <Icon as={IoMdMail} h={6} w={6} viewBox="0 0 24 24" />
            </a>
            <a href={props.minerWebsite} color="gray.500" target="_blank">
              <Icon as={FaGlobe} h={6} w={6} viewBox="0 0 24 24" />
            </a>
            <a href={props.minerSlack} color="gray.500" target="_blank">
              <Icon as={FaSlack} h={6} w={6} viewBox="0 0 24 24" />
            </a>
            <a
              href={"https://twitter.com/" + props.minerTwitter}
              color="gray.500"
              target="_blank"
            >
              <Icon as={FaTwitter} h={6} w={6} viewBox="0 0 24 24" />
            </a>
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
