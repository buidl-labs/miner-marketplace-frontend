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
  Button,
  Tooltip,
  useClipboard,
  IconButton,
} from "@chakra-ui/react";
import React from "react";

import { CopyIcon, Icon, IconProps, QuestionIcon } from "@chakra-ui/icons";
import {} from "react-icons";
import { FaSlack, FaTwitter, FaGlobe } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FiExternalLink } from "react-icons/fi";

function ClaimButton(props) {
  return (
    <>
      <Tooltip
        label={`To claim this profile, click on \"Connect Wallet\"`}
        aria-label="claim profile"
        px="4"
        py="2"
        borderRadius="lg"
        bg="gray.700"
        hasArrow
      >
        <Text
          fontSize="md"
          fontWeight="medium"
          alignItems="baseline"
          color="gray.600"
        >
          Own this Profile{" "}
          <Icon as={QuestionIcon} w={5} h={5} color="gray.500" />
        </Text>
      </Tooltip>
    </>
  );
}

function ContactInfo(props) {
  return (
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
  );
}

function ConditionalDetails(props) {
  if (props.minerClaimed) {
    return (
      <ContactInfo
        minerMail={props.minerMail}
        minerWebsite={props.minerWebsite}
        minerSlack={props.minerSlack}
        minerTwitter={props.minerTwitter}
      />
    );
  } else {
    return <ClaimButton />;
  }
}

const PersonalDetails = (props) => {
  const ownerAddressLink =
    "https://filfox.info/en/address/" + props.ownerAddress.toString();
  const workerAddressLink =
    "https://filfox.info/en/address/" + props.workerAddress.toString();

  return (
    <>
      <Box
        border="solid 2px #E2E8F0"
        borderRadius="2xl"
        px="10"
        py="8"
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
          <VStack alignItems="baseline" textAlign="left" textOverflow="false">
            <Heading size="md" color="blue.900">
              {props.minerName}
            </Heading>
            <Text color="blue.700" fontWeight="medium">
              {props.minerAddress}
            </Text>
          </VStack>
          <Spacer />
          <ConditionalDetails
            minerClaimed={props.minerClaimed}
            minerMail={props.minerMail}
            minerWebsite={props.minerWebsite}
            minerSlack={props.minerSlack}
            minerTwitter={props.minerTwitter}
          />
        </WrapItem>
        <VStack spacing="4" alignItems="left" pt="4">
          <WrapItem alignItems="baseline">
            <Heading size="sm" color="gray.600" mr="3">
              Worker Address:
            </Heading>
            <Link href={workerAddressLink} isExternal>
              <HStack>
                <Text color="gray.600" maxW="72">
                  {props.workerAddress.length > 25
                    ? props.workerAddress.substr(0, 12) +
                      "..." +
                      props.workerAddress.substr(
                        props.workerAddress.length - 12,
                        props.workerAddress.length,
                      )
                    : props.workerAddress}
                </Text>
                <Icon as={FiExternalLink} w={5} h={5} color="gray.600" />
              </HStack>
            </Link>
          </WrapItem>
          <WrapItem alignItems="baseline">
            <Heading size="sm" color="gray.600" mr="3">
              Owner Address:
            </Heading>
            <Link href={ownerAddressLink} isExternal>
              <HStack>
                <Text color="gray.600" maxW="72">
                  {props.ownerAddress.length > 25
                    ? props.ownerAddress.substr(0, 12) +
                      "..." +
                      props.ownerAddress.substr(
                        props.ownerAddress.length - 12,
                        props.ownerAddress.length,
                      )
                    : props.ownerAddress}
                </Text>
                <Icon as={FiExternalLink} w={5} h={5} color="gray.600" />
              </HStack>
            </Link>
          </WrapItem>
          <WrapItem alignItems="baseline">
            <Heading size="sm" color="gray.600" mr="3">
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
