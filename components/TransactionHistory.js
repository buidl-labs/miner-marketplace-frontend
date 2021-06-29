import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
  AccordionIcon,
  Button,
  Box,
  Center,
  Heading,
  Image,
  Stack,
  Grid,
  GridItem,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Select,
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

  const [next, setNext] = useState(10);

  function handleLoadMore() {
    setNext(next + 10);
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
        />
        <HStack justifyContent="space-between" mb="8" alignItems="center">
          <VStack alignItems="left">
            <Heading size="lg" color="blue.700" mt="6" pl="4">
              Transaction History
            </Heading>
            <Text fontSize="md" fontWeight="medium" color="gray.600" pl="4">
              for miner ID {props.minerID}
            </Text>
          </VStack>
          <HStack>
            <Text fontSize="lg" fontWeight="medium" color="gray.600">
              Toggle Advance Mode
            </Text>
            <Switch
              id="transactionView"
              onChange={handleTxnToggle}
              isChecked={toggle}
            />
          </HStack>
        </HStack>
        {toggle && (
          <Box>
            <Table
              columns={columns}
              dataSource={dataSource}
              pagination={pagination}
            />
          </Box>
        )}

        {!toggle && (
          <Stack w="74vw">
            <Heading size="md" color="gray.700" fontWeight="semibold" pl="4">
              dateGoesHere
            </Heading>

            <Accordion allowMultiple>
              {dataSource.slice(0, next).map((txn) => (
                <AccordionItem py="3">
                  <AccordionButton alignItems="center">
                    <HStack textAlign="left" alignItems="center">
                      <Grid templateColumns="repeat(5, 1fr)" gap={36}>
                        <GridItem colSpan="2">
                          <HStack>
                            {txn.transactionType === "Block Reward" ? (
                              <ArrowUpIcon
                                h={10}
                                w={10}
                                p="2"
                                mr="2"
                                borderRadius="full"
                                bg="green.100"
                                color="green.600"
                              />
                            ) : txn.transactionType === "Collateral Deposit" ? (
                              <ArrowDownIcon
                                h={10}
                                w={10}
                                p="2"
                                mr="2"
                                borderRadius="full"
                                bg="red.100"
                                color="red.600"
                              />
                            ) : (
                              <Icon
                                as={BiTransfer}
                                h={10}
                                w={10}
                                p="2"
                                mr="2"
                                borderRadius="full"
                                bg="gray.100"
                                color="gray.600"
                              />
                            )}
                            <Stat>
                              <StatLabel
                                fontSize="xl"
                                color="gray.700"
                                whiteSpace="nowrap"
                              >
                                {txn.transactionType}
                              </StatLabel>
                              <StatNumber
                                fontSize="sm"
                                fontWeight="normal"
                                color="gray.600"
                              >
                                {txn.timestamp}
                              </StatNumber>
                            </Stat>
                          </HStack>
                        </GridItem>

                        <GridItem colSpan="1">
                          <Stat>
                            <StatLabel fontSize="sm" color="gray.600">
                              Total Gas
                            </StatLabel>
                            <StatNumber
                              fontSize="lg"
                              fontWeight="normal"
                              color="red.600"
                            >
                              {txn.methodName === "PreCommitSector" ||
                              "ProveCommitSector" ||
                              "PublishStorageDeals" ||
                              "TerminateSectors" ||
                              "RepayDebt" ||
                              "WithdrawBalance (miner)" ||
                              "WithdrawBalance (market)" ||
                              "AddBalance" ||
                              "ChangeWorkerAddress" ||
                              "ChangeOwnerAddress" ||
                              "ChangePeerID" ||
                              "DeclareFaults" ||
                              "DeclareFaultsRecovered" ||
                              "ExtendSectorExpiration"
                                ? "-" + (txn.minerFee.val + txn.burnFee.val)
                                : "0"}
                            </StatNumber>
                          </Stat>
                        </GridItem>

                        <GridItem colSpan="1">
                          <Stat>
                            <StatLabel color="gray.600">value</StatLabel>
                            <StatNumber
                              whiteSpace="nowrap"
                              fontSize="2xl"
                              color="blue.900"
                              fontWeight="normal"
                            >
                              {txn.value.display}
                            </StatNumber>
                          </Stat>
                        </GridItem>

                        <GridItem colSpan="1">
                          <Stat>
                            <StatLabel fontSize="sm" color="gray.600">
                              Status
                            </StatLabel>

                            {txn.exitCode === 0 ? (
                              <Tag colorScheme="green" borderRadius="full">
                                Success
                              </Tag>
                            ) : (
                              <Tag colorScheme="red" borderRadius="full">
                                Faliure
                              </Tag>
                            )}
                          </Stat>
                        </GridItem>
                      </Grid>
                    </HStack>

                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel py="4">
                    <Stack spacing="8">
                      <Grid templateColumns="repeat(5, 1fr)" gap={24}>
                        <GridItem colSpan="1">
                          <Stack>
                            <Heading
                              size="sm"
                              fontWeight="medium"
                              color="gray.700"
                              lineHeight="80%"
                              whiteSpace="nowrap"
                            >
                              Method Name
                            </Heading>
                            <Text
                              size="md"
                              fontWeight="normal"
                              color="gray.600"
                            >
                              {txn.methodName}
                            </Text>
                          </Stack>
                        </GridItem>

                        <GridItem colSpan="1">
                          <Stack>
                            <Heading
                              size="sm"
                              fontWeight="medium"
                              color="gray.700"
                              lineHeight="80%"
                              whiteSpace="nowrap"
                            >
                              Transaction ID
                            </Heading>
                            <Text
                              size="md"
                              fontWeight="normal"
                              color="gray.600"
                            >
                              {txn.id.mid}
                            </Text>
                          </Stack>
                        </GridItem>

                        <GridItem colSpan="2">
                          <Stack>
                            <Heading
                              size="sm"
                              fontWeight="medium"
                              color="gray.700"
                              lineHeight="80%"
                            >
                              From
                            </Heading>
                            <Text
                              size="md"
                              fontWeight="normal"
                              color="gray.600"
                            >
                              {txn.from}
                            </Text>
                          </Stack>
                        </GridItem>

                        <GridItem colSpan="1">
                          <Stack>
                            <Heading
                              size="sm"
                              fontWeight="medium"
                              color="gray.700"
                              lineHeight="80%"
                            >
                              To
                            </Heading>
                            <Text
                              size="md"
                              fontWeight="normal"
                              color="gray.600"
                            >
                              {txn.to}
                            </Text>
                          </Stack>
                        </GridItem>
                      </Grid>

                      <Grid templateColumns="repeat(5, 1fr)" gap={16}>
                        <GridItem colSpan="1">
                          <Stack>
                            <Heading
                              size="sm"
                              fontWeight="medium"
                              color="gray.700"
                              lineHeight="80%"
                            >
                              Miner Fee
                            </Heading>
                            <Text
                              size="md"
                              fontWeight="normal"
                              color="gray.600"
                            >
                              {txn.methodName === "PreCommitSector" ||
                              "ProveCommitSector" ||
                              "PublishStorageDeals" ||
                              "TerminateSectors" ||
                              "RepayDebt" ||
                              "WithdrawBalance (miner)" ||
                              "WithdrawBalance (market)" ||
                              "AddBalance" ||
                              "ChangeWorkerAddress" ||
                              "ChangeOwnerAddress" ||
                              "ChangePeerID" ||
                              "DeclareFaults" ||
                              "DeclareFaultsRecovered" ||
                              "ExtendSectorExpiration"
                                ? "-" + txn.minerFee.display
                                : "0"}
                            </Text>
                          </Stack>
                        </GridItem>

                        <GridItem colSpan="1">
                          <Stack>
                            <Heading
                              size="sm"
                              fontWeight="medium"
                              color="gray.700"
                              lineHeight="80%"
                            >
                              Burn Fee
                            </Heading>
                            <Text
                              size="md"
                              fontWeight="normal"
                              color="gray.600"
                            >
                              {txn.methodName === "PreCommitSector" ||
                              "ProveCommitSector" ||
                              "PublishStorageDeals" ||
                              "TerminateSectors" ||
                              "RepayDebt" ||
                              "WithdrawBalance (miner)" ||
                              "WithdrawBalance (market)" ||
                              "AddBalance" ||
                              "ChangeWorkerAddress" ||
                              "ChangeOwnerAddress" ||
                              "ChangePeerID" ||
                              "DeclareFaults" ||
                              "DeclareFaultsRecovered" ||
                              "ExtendSectorExpiration" ? (
                                "-" + txn.burnFee.display
                              ) : (
                                <p>0</p>
                              )}
                            </Text>
                          </Stack>
                        </GridItem>
                      </Grid>
                    </Stack>
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
            <Center>
              <Button
                mt="6"
                w="36"
                colorScheme="blue"
                variant="outline"
                onClick={handleLoadMore}
              >
                View more
              </Button>
            </Center>
          </Stack>
        )}
      </Stack>
    </>
  );
}

// export default TransactionHistory;
// export async function getStaticProps()
