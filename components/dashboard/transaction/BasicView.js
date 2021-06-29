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

import {
  GetFormattedStorageUnits,
  GetFormattedFILUnits,
} from "../../../util/util";

function BasicView(props) {
  const dataSource = props.transactions.map((txn) => {
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

  const [next, setNext] = useState(10);
  function handleLoadMore() {
    setNext(next + 10);
  }

  function dateOfTransaction(dateProps) {
    const miliseconds = dateProps * 1000;
    const dateObject = new Date(miliseconds);
    const txnDate = dateObject.toLocaleDateString();
    return (
      <Text fontSize="sm" fontWeight="normal" color="gray.600">
        {txnDate}
      </Text>
    );
  }

  return (
    <>
      <>
        <Stack w="74vw">
          <Heading size="md" color="gray.700" fontWeight="semibold" pl="4">
            dateGoesHere
          </Heading>

          <Accordion allowMultiple>
            {dataSource.slice(0, next).map((txn) => (
              <AccordionItem py="3">
                <AccordionButton alignItems="center">
                  <HStack textAlign="left" alignItems="center">
                    <Grid templateColumns="repeat(8, 1fr)" gap={36}>
                      <GridItem colSpan="3">
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
                              {dateOfTransaction(txn.timestamp)}
                            </StatNumber>
                          </Stat>
                        </HStack>
                      </GridItem>

                      <GridItem colSpan="2">
                        <Stat>
                          <StatLabel fontSize="sm" color="gray.600">
                            Total Gas
                          </StatLabel>
                          <StatNumber
                            fontSize="lg"
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
                              ? "-" +
                                GetFormattedFILUnits(
                                  txn.minerFee.val + txn.burnFee.val
                                )
                              : "0"}
                          </StatNumber>
                        </Stat>
                      </GridItem>

                      <GridItem colSpan="2">
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
                          <Text size="md" fontWeight="normal" color="gray.600">
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
                          <Text size="md" fontWeight="normal" color="gray.600">
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
                          <Text size="md" fontWeight="normal" color="gray.600">
                            {txn.to}
                          </Text>
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
                              ? "-" + txn.minerFee.display
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
      </>
    </>
  );
}

export default BasicView;
