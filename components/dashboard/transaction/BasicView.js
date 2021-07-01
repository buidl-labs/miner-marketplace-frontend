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
  Select,
  VStack,
  HStack,
  Link,
  Tag,
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
import { useRouter } from "next/router";
import { BiTransfer } from "react-icons/bi";
import { FiExternalLink } from "react-icons/fi";

import {
  GetFormattedStorageUnits,
  GetFormattedFILUnits,
} from "../../../util/util";

function BasicView(props) {
  console.log("outside", props.transactions, props.dss);
  const [basicTransactions, setBasicTransactions] = useState(
    props.transactions,
  );
  const [dataSource, setDataSource] = useState(props.dss);

  console.log("CLOG", dataSource, basicTransactions, props.transactions);
  let dataSourceU = dataSource;
  if (dataSource.length == 0) {
    dataSourceU = props.transactions.map((txn) => {
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
  }
  const [offsetValue, setOffsetValue] = useState(props.offsetValue);
  console.log("offsetinitial", offsetValue);
  function handleLoadMore(offsetValue) {}

  function dateOfTransaction(dateProps) {
    const miliseconds = dateProps * 1000;
    const dateObject = new Date(miliseconds);
    const txnDate = dateObject.toLocaleDateString();
    const date = dateObject.getDate();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[dateObject.getMonth()];
    const year = dateObject.getFullYear();
    return (
      <Text fontSize="sm" fontWeight="normal" color="gray.600">
        {month + " " + date + ", " + year}
      </Text>
    );
  }
  function timeOfTransaction(mytimestamp) {
    const dateObject = new Date(mytimestamp * 1000);
    const txnTime = dateObject.toLocaleTimeString();
    const amorpm = txnTime.split(" ")[1];
    const hoursmins = txnTime
      .split(" ")[0]
      .substring(0, txnTime.split(" ")[0].length - 3);
    // const miliseconds = dateProps * 1000;
    // const dateObject = new Date(miliseconds);
    // const txnDate = dateObject.toLocaleDateString();
    return (
      <Text fontSize="sm" fontWeight="normal" color="gray.600">
        {hoursmins + " " + amorpm}
      </Text>
    );
  }

  //const txnIDLink = "https://filfox.info/en/address/" + props.txn.id.mid;

  const [transactions, setTransactions] = useState([]);
  // const [finalTransactions, setFinalTransactions] = useState(dataSource);
  return (
    <>
      <>
        <Stack w="74vw">
          {/*<Heading size="md" color="gray.700" fontWeight="semibold" pl="4">
            dateGoesHere
          </Heading>*/}

          <Accordion allowMultiple>
            {dataSourceU.map((txn) => (
              <AccordionItem py="3">
                <AccordionButton alignItems="center">
                  <HStack textAlign="left" alignItems="center">
                    <Grid templateColumns="repeat(8, 1fr)" gap={36}>
                      <GridItem colSpan="3">
                        <HStack>
                          {txn.transactionType === "Block Reward" ? (
                            <ArrowDownIcon
                              h={10}
                              w={10}
                              p="2"
                              mr="2"
                              borderRadius="full"
                              bg="green.100"
                              color="green.600"
                            />
                          ) : txn.transactionType === "Collateral Deposit" ? (
                            <ArrowUpIcon
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
                              {dateOfTransaction(txn.timestamp)}
                              {timeOfTransaction(txn.timestamp)}
                            </StatNumber>
                          </Stat>
                        </HStack>
                      </GridItem>

                      <GridItem colSpan="2">
                        <Stat>
                          <StatLabel color="gray.600">Value</StatLabel>
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

                      <GridItem colSpan="2">
                        <Stat>
                          <StatLabel
                            fontSize="sm"
                            color="gray.600"
                            marginBottom="8px"
                          >
                            Total Gas
                          </StatLabel>
                          <StatNumber
                            fontSize="md"
                            fontWeight="normal"
                            color="red.600"
                            whiteSpace="nowrap"
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
                              ? GetFormattedFILUnits(
                                  txn.minerFee.val + txn.burnFee.val,
                                )
                              : "0"}
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
                    <Grid templateColumns="repeat(8, 1fr)" gap={16}>
                      <GridItem colSpan="2">
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
                          <Text size="md" fontWeight="normal" color="gray.600">
                            {txn.methodName}
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
                            whiteSpace="nowrap"
                          >
                            Transaction ID
                          </Heading>

                          <Link
                            href={`https://filfox.info/en/${txn.id.txntype}/${txn.id.mid}`}
                            isExternal
                            alt="transaction id link"
                            size="md"
                            fontWeight="normal"
                            color="gray.600"
                          >
                            {txn.id.mid.length > 25
                              ? txn.id.mid.substr(0, 12) +
                                "..." +
                                txn.id.mid.substr(
                                  txn.id.mid.length - 12,
                                  txn.id.mid.length,
                                )
                              : txn.id.mid}
                          </Link>
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
                          <Link
                            href={`https://filfox.info/en/address/${txn.from}`}
                            isExternal
                            alt="transaction id link"
                            size="md"
                            fontWeight="normal"
                            color="gray.600"
                          >
                            {txn.from.length > 25
                              ? txn.from.substr(0, 12) +
                                "..." +
                                txn.from.substr(
                                  txn.from.length - 12,
                                  txn.from.length,
                                )
                              : txn.from}
                          </Link>
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

                          <Link
                            href={`https://filfox.info/en/address/${txn.to}`}
                            isExternal
                            alt="transaction id link"
                            size="md"
                            fontWeight="normal"
                            color="gray.600"
                          >
                            {txn.to.length > 25
                              ? txn.to.substr(0, 12) +
                                "..." +
                                txn.to.substr(txn.to.length - 12, txn.to.length)
                              : txn.to}
                          </Link>
                        </Stack>
                      </GridItem>
                    </Grid>

                    <Grid templateColumns="repeat(8, 1fr)" gap={16}>
                      <GridItem colSpan="2">
                        <Stack>
                          <Heading
                            size="sm"
                            fontWeight="medium"
                            color="gray.700"
                            lineHeight="80%"
                          >
                            Miner Fee
                          </Heading>
                          <Text size="md" fontWeight="normal" color="gray.600">
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
                              ? txn.minerFee.display
                              : "0"}
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
                            Burn Fee
                          </Heading>
                          <Text size="md" fontWeight="normal" color="gray.600">
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
                              txn.burnFee.display
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
              onClick={() => {
                console.log("loadmore", offsetValue);
                let firstValue = 20;
                if (offsetValue == 0) {
                  firstValue = 40;
                }
                setOffsetValue(offsetValue + 20);
                console.log("afterloadmore", offsetValue);
                const BACKEND_URL =
                  "https://miner-marketplace-backend-2.onrender.com/query";
                const client = new ApolloClient({
                  uri: BACKEND_URL,
                  cache: new InMemoryCache(),
                });

                client
                  .query({
                    query: gql`
                      query {
                        miner(id: "${props.minerID}") {
                          id
                          transactions (first: ${firstValue}, offset: ${offsetValue} orderBy: { param: timestamp, sort: DESC }) {
                            id
                            value
                            methodName
                            from
                            to
                            minerFee
                            burnFee
                            transactionType
                            exitCode
                            height
                            timestamp
                          }
                        }
                      }
                    `,
                  })
                  .then((data) => {
                    //console.log(data.data);
                    return data.data;
                  })
                  .then((d) => {
                    //console.log(d.miner.id);
                    return d.miner;
                  })
                  .then((m) => {
                    //console.log("txns", m.transactions);
                    // basicTransactions.extend(m.transactions);
                    // console.log("len", basicTransactions.length());
                    // let btcopy = Object.assign([], basicTransactions);
                    let btcopy = Array.from(basicTransactions);
                    console.log("basssss", basicTransactions);
                    btcopy.push(...m.transactions);
                    setBasicTransactions(btcopy);
                    const dsrc = btcopy.map((txn) => {
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
                          display:
                            valuesign + GetFormattedFILUnits(Number(txn.value)),
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
                    setDataSource(dsrc);
                    // mapNewTxns();
                  });
              }}
            >
              View more
            </Button>
          </Center>
        </Stack>
      </>
    </>
  );
}

export default BasicView;
