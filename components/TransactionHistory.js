import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  Box,
  Center,
  Heading,
  Image,
  Stack,
  Grid,
  GridItem,
  IconButton,
  VStack,
  HStack,
  Link,
  Tag,
  // Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Wrap,
  WrapItem,
  Text,
  Spacer,
  Stat,
  Switch,
  StatLabel,
  StatNumber,
  StatHelpText,
} from "@chakra-ui/react";
import React, { useEffect, useState, useRef } from "react";
import {
  Icon,
  IconProps,
  Search2Icon,
  ArrowDownIcon,
  ArrowUpIcon,
} from "@chakra-ui/icons";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { createHttpLink } from "apollo-link-http";
import { TableProps } from "antd/lib/table";
import "antd/dist/antd.css";
import NxLink from "next/link";
import { Table, Space } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useDisclosure } from "@chakra-ui/hooks";
import { BiTransfer } from "react-icons/bi";

import { GetFormattedStorageUnits, GetFormattedFILUnits } from "../util/util";
import BasicView from "./dashboard/transaction/BasicView";
import AdvanceView from "./dashboard/transaction/AdvanceView";

export default function TransactionHistory(props) {
  const [toggle, setToggle] = useState(false);

  function handleTxnToggle() {
    toggle ? setToggle(false) : setToggle(true);
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <>
      <Stack>
        <IconButton
          icon={<ArrowUpIcon h={8} w={8} />}
          aria-label="go to top"
          color="gray.600"
          bg="gray.100"
          border="2px solid #CBD5E0"
          boxShadow="xl"
          isRound
          onClick={scrollToTop}
          right="8"
          bottom="8"
          position="fixed"
          w={12}
          h={12}
          zIndex="10"
        />
        <HStack justifyContent="space-between" mb="8" alignItems="center">
          <VStack alignItems="left">
            <Heading size="lg" color="blue.700" mt="6" pl="4">
              Transaction History
            </Heading>
          </VStack>
          <HStack>
            <Switch
              id="transactionView"
              onChange={handleTxnToggle}
              isChecked={toggle}
            />
            <Text fontSize="lg" fontWeight="medium" color="gray.600">
              Advanced view
            </Text>
          </HStack>
        </HStack>
        {toggle && (
          <>
            <Alert
              status="warning"
              borderRadius="lg"
              maxW={{ md: "60vw", base: "full" }}
            >
              <AlertIcon />
              <AlertTitle mr={2}>This feature is currently in beta!</AlertTitle>
              <AlertDescription>
                Performance may not be optimal
              </AlertDescription>
            </Alert>
            <AdvanceView minerID={props.minerID} />
          </>
        )}
        {!toggle && <BasicView minerID={props.minerID} />}
      </Stack>
    </>
  );
}
