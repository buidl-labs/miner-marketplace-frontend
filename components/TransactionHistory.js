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
  const [pagination, setPagination] = useState({});

  const dataSource = props.transactions.map((txn) => {
    // Math.round((Number(txn.value) / 10 ** 18 + Number.EPSILON) * 1000) / 1000;
    // if (txn.minerFee > 0)
    //   console.log("MF", txn.minerFee, Number(txn.minerFee) / 10 ** 18);
    // TODO: convert value, minerFee, burnFee to nanoFIL/attoFIL etc based on their size
    // right now all are in FIL

    let txntype = "message";
    if (txn.methodName == "ApplyRewards") {
      txntype = "block";
    }
    let valuesign = "+";
    if (txn.methodName != "ApplyRewards") {
      valuesign = "-";
    }
    if (Number(txn.value) == 0) {
      valuesign = "";
    }
    if (txn.transactionType == "Transfer") {
      valuesign = "";
    }
    return {
      key: txn.id,
      id: {
        mid: txn.id,
        txntype: txntype,
      },
      value: {
        val: Number(txn.value),
        display: valuesign + GetFormattedFILUnits(Number(txn.value)),
      },
      methodName: txn.methodName,
      from: txn.from,
      to: txn.to,
      minerFee: {
        val: Number(txn.minerFee),
        display: GetFormattedFILUnits(Number(txn.minerFee)),
      },
      burnFee: {
        val: Number(txn.burnFee),
        display: GetFormattedFILUnits(Number(txn.burnFee)),
      },
      transactionType: txn.transactionType,
      exitCode: txn.exitCode,
      height: txn.height,
      timestamp: txn.timestamp,
    };
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id) => {
        return (
          <div>
            <a
              href={"https://filfox.info/en/" + id.txntype + "/" + id.mid}
              style={{ cursor: "pointer" }}
              target="_blank"
            >
              <Text maxW="10" isTruncated>
                {id.mid}
              </Text>
            </a>
          </div>
        );
      },
    },
    {
      title: "Height",
      dataIndex: "height",
      key: "height",
      sorter: {
        compare: (a, b) => parseInt(a.height) - parseInt(b.height),
      },
    },
    {
      title: "Timestamp",
      dataIndex: "timestamp",
      key: "timestamp",
      sorter: {
        compare: (a, b) => parseInt(a.timestamp) - parseInt(b.timestamp),
      },
    },
    {
      title: "Type",
      dataIndex: "transactionType",
      key: "transactionType",
      filters: [
        { text: "Collateral Deposit", value: "Collateral Deposit" },
        { text: "Block Reward", value: "Block Reward" },
        { text: "Penalty", value: "Penalty" },
        { text: "Transfer", value: "Transfer" },
        { text: "Others", value: "Others" },
      ],
      onFilter: (value, record) => {
        return record.transactionType.includes(value);
      },
    },
    {
      title: "Method",
      dataIndex: "methodName",
      key: "methodName",
      filters: [
        { text: "AddBalance", value: "AddBalance" },
        { text: "PreCommitSector", value: "PreCommitSector" },
        { text: "ProveCommitSector", value: "ProveCommitSector" },
        { text: "ApplyRewards", value: "ApplyRewards" },
        { text: "PublishStorageDeals", value: "PublishStorageDeals" },
        { text: "TerminateSectors", value: "TerminateSectors" },
        { text: "RepayDebt", value: "RepayDebt" },
        { text: "ReportConsensusFault", value: "ReportConsensusFault" },
        { text: "DisputeWindowedPoSt", value: "DisputeWindowedPoSt" },
        {
          text: "WithdrawBalance (miner)",
          value: "WithdrawBalance (miner)",
        },
        {
          text: "WithdrawBalance (market)",
          value: "WithdrawBalance (market)",
        },
      ],
      onFilter: (value, record) => {
        return record.methodName.includes(value);
      },
    },
    {
      title: "From",
      dataIndex: "from",
      key: "from",
      filters: props.finalFromArr,
      onFilter: (value, record) => {
        return record.from.includes(value);
      },
      render: (m) => {
        return (
          <div>
            <a
              href={"https://filfox.info/en/address/" + m}
              style={{ cursor: "pointer" }}
              target="_blank"
            >
              <Text maxW="10" isTruncated>
                {m}
              </Text>
            </a>
          </div>
        );
      },
    },
    {
      title: "To",
      dataIndex: "to",
      key: "to",
      filters: props.finalToArr,
      onFilter: (value, record) => {
        return record.to.includes(value);
      },
      render: (m) => {
        return (
          <div>
            <a
              href={"https://filfox.info/en/address/" + m}
              style={{ cursor: "pointer" }}
              target="_blank"
            >
              <Text maxW="10" isTruncated>
                {m}
              </Text>
            </a>
          </div>
        );
      },
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      sorter: {
        compare: (a, b) => parseInt(a.value.val) - parseInt(b.value.val),
      },
      render: (v) => {
        return <p>{v.display}</p>;
      },
    },
    {
      title: "Miner Fee",
      dataIndex: "minerFee",
      key: "minerFee",
      sorter: {
        compare: (a, b) => parseInt(a.minerFee.val) - parseInt(b.minerFee.val),
      },
      render: (v) => {
        return <p>{v.display}</p>;
      },
    },
    {
      title: "Burn Fee",
      dataIndex: "burnFee",
      key: "burnFee",
      sorter: {
        compare: (a, b) => parseInt(a.burnFee.val) - parseInt(b.burnFee.val),
      },
      render: (v) => {
        return <p>{v.display}</p>;
      },
    },
    {
      title: "Exit Code",
      dataIndex: "exitCode",
      key: "exitCode",
      filters: [
        { text: 0, value: 0 },
        { text: 1, value: 1 },
        { text: 2, value: 2 },
      ],
      onFilter: (value, record) => {
        return record.exitCode == value;
      },
    },
  ];

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

  // const [next, setNext] = useState(10);
  // function handleLoadMore() {
  //   setNext(next + 10);
  // }

  let dss = props.transactions.map((txn) => {
    let txntype = "message";
    if (txn.methodName == "ApplyRewards") {
      txntype = "block";
    }
    let valuesign = "";
    if (txn.methodName != "ApplyRewards") {
      valuesign = "";
    }
    if (Number(txn.value) == 0) {
      valuesign = "";
    }
    if (txn.transactionType == "Transfer") {
      valuesign = "";
    }
    return {
      key: txn.id,
      id: {
        mid: txn.id,
        txntype: txntype,
      },
      value: {
        val: Number(txn.value),
        display: valuesign + GetFormattedFILUnits(Number(txn.value)),
      },
      methodName: txn.methodName,
      from: txn.from,
      to: txn.to,
      minerFee: {
        val: Number(txn.minerFee),
        display: GetFormattedFILUnits(Number(txn.minerFee)),
      },
      burnFee: {
        val: Number(txn.burnFee),
        display: GetFormattedFILUnits(Number(txn.burnFee)),
      },
      transactionType: txn.transactionType,
      exitCode: txn.exitCode,
      height: txn.height,
      timestamp: txn.timestamp,
    };
  });

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
            <Alert status="warning" borderRadius="lg" maxW={{ md: "60vw", base: "full" }}>
              <AlertIcon />
              <AlertTitle mr={2}>This feature is currently in beta!</AlertTitle>
              <AlertDescription>information might be incorrect</AlertDescription>
            </Alert>
            <AdvanceView
              minerID={props.minerID}
            />
          </>
        )}
        {!toggle && (
          <BasicView
            minerID={props.minerID}
            transactions={props.transactions}
            offsetValue={props.offsetValue}
            dss={dss}
          />
        )}
      </Stack>
    </>
  );
}

// export default TransactionHistory;
// export async function getStaticProps()
