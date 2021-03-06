/* eslint-disable no-nested-ternary */
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
  AccordionIcon,
  Button,
  Center,
  Heading,
  Spinner,
  Stack,
  Grid,
  GridItem,
  HStack,
  Link,
  Tag,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Icon, ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { BiTransfer } from "react-icons/bi";

import * as Fathom from "fathom-client";
import PropTypes from "prop-types";
import { GetFormattedFILUnits, GetSimpleUSDUnits } from "../../../util/util";

function dateOfTransaction(dateProps) {
  const miliseconds = dateProps * 1000;
  const dateObject = new Date(miliseconds);
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
      {`${month} ${date}, ${year}`}
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
  return (
    <Text fontSize="sm" fontWeight="normal" color="gray.600">
      {`${hoursmins} ${amorpm}`}
    </Text>
  );
}

function BasicView(props) {
  const [basicTransactions, setBasicTransactions] = useState([]);
  const [firstValue, setFirstValue] = useState(20);
  const offsetValue = 0;
  const [isLoaded, setIsLoaded] = useState(false);
  const [isTxnLoading, setIsTxnLoading] = useState(false);
  const [filecoinUSDRate, setFilecoinUSDRate] = useState(0);

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=filecoin&vs_currencies=usd",
    )
      .then((res) => res.json())
      .then((r) => {
        setFilecoinUSDRate(r.filecoin.usd);
      });

    const client = new ApolloClient({
      uri: "https://miner-marketplace-backend-2.onrender.com/query",
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
      .then((data) => data.data)
      .then((d) => d.miner)
      .then((m) => {
        const dsrc = m.transactions.map((txn) => {
          let txntype = "message";
          if (txn.methodName === "ApplyRewards") {
            txntype = "block";
          }
          return {
            key: txn.id,
            id: {
              mid: txn.id,
              txntype,
            },
            value: {
              val: Number(txn.value),
              display: GetFormattedFILUnits(Number(txn.value)),
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
        setBasicTransactions(dsrc);
        setFirstValue(firstValue + 20);
        setIsLoaded(true);
      });
    return () => {};
  }, []);

  function track() {
    if (typeof window !== "undefined") {
      Fathom.trackGoal("40EP4VDN", 0);
    }
  }

  return (
    <>
      <>
        {isLoaded ? (
          <Stack>
            <Accordion allowMultiple w="fit-content" maxW="96vw">
              {basicTransactions.map((txn) => (
                <AccordionItem key={txn.id} py="3">
                  <AccordionButton alignItems="center">
                    <HStack textAlign="left" alignItems="center">
                      <Grid templateColumns="repeat(8, 1fr)" gap={{ base: 12 }}>
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
                            <StatHelpText>
                              {GetSimpleUSDUnits(
                                Math.round(
                                  ((txn.value.val * filecoinUSDRate) /
                                    10 ** 18 +
                                    Number.EPSILON) *
                                    100,
                                ) / 100,
                              )}
                            </StatHelpText>
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
                              txn.methodName === "ProveCommitSector" ||
                              txn.methodName === "PublishStorageDeals" ||
                              txn.methodName === "TerminateSectors" ||
                              txn.methodName === "RepayDebt" ||
                              txn.methodName === "WithdrawBalance (miner)" ||
                              txn.methodName === "WithdrawBalance (market)" ||
                              txn.methodName === "AddBalance" ||
                              txn.methodName === "ChangeWorkerAddress" ||
                              txn.methodName === "ChangeOwnerAddress" ||
                              txn.methodName === "ChangePeerID" ||
                              txn.methodName === "DeclareFaults" ||
                              txn.methodName === "DeclareFaultsRecovered" ||
                              txn.methodName === "ExtendSectorExpiration"
                                ? GetFormattedFILUnits(
                                    txn.minerFee.val + txn.burnFee.val,
                                  )
                                : "0"}
                            </StatNumber>
                            <StatHelpText>
                              {GetSimpleUSDUnits(
                                Math.round(
                                  (((txn.minerFee.val + txn.burnFee.val) *
                                    filecoinUSDRate) /
                                    10 ** 18 +
                                    Number.EPSILON) *
                                    100,
                                ) / 100,
                              )}
                            </StatHelpText>
                          </Stat>
                        </GridItem>

                        <GridItem colSpan="1" pr="8">
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
                            <Text
                              size="md"
                              fontWeight="normal"
                              color="gray.600"
                            >
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
                              onClick={track()}
                            >
                              {txn.id.mid.length > 25
                                ? `${txn.id.mid.substr(
                                    0,
                                    12,
                                  )}...${txn.id.mid.substr(
                                    txn.id.mid.length - 12,
                                    txn.id.mid.length,
                                  )}`
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
                              onClick={track()}
                            >
                              {txn.from.length > 25
                                ? `${txn.from.substr(
                                    0,
                                    12,
                                  )}...${txn.from.substr(
                                    txn.from.length - 12,
                                    txn.from.length,
                                  )}`
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
                              onClick={track()}
                            >
                              {txn.to.length > 25
                                ? `${txn.to.substr(0, 12)}...${txn.to.substr(
                                    txn.to.length - 12,
                                    txn.to.length,
                                  )}`
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
                            <Text
                              size="md"
                              fontWeight="normal"
                              color="gray.600"
                            >
                              {txn.methodName === "PreCommitSector" ||
                              txn.methodName === "ProveCommitSector" ||
                              txn.methodName === "PublishStorageDeals" ||
                              txn.methodName === "TerminateSectors" ||
                              txn.methodName === "RepayDebt" ||
                              txn.methodName === "WithdrawBalance (miner)" ||
                              txn.methodName === "WithdrawBalance (market)" ||
                              txn.methodName === "AddBalance" ||
                              txn.methodName === "ChangeWorkerAddress" ||
                              txn.methodName === "ChangeOwnerAddress" ||
                              txn.methodName === "ChangePeerID" ||
                              txn.methodName === "DeclareFaults" ||
                              txn.methodName === "DeclareFaultsRecovered" ||
                              txn.methodName === "ExtendSectorExpiration"
                                ? txn.minerFee.display
                                : "0"}
                            </Text>
                            {/* <Text>
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
                                  ? GetSimpleUSDUnits(
                                      Math.round(
                                        ((txn.minerFee.val * filecoinUSDRate) /
                                          10 ** 18 +
                                          Number.EPSILON) *
                                          100,
                                      ) / 100,
                                    )
                                  : "$0"}
                              </Text> */}
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
                            <Text
                              size="md"
                              fontWeight="normal"
                              color="gray.600"
                            >
                              {txn.methodName === "PreCommitSector" ||
                              txn.methodName === "ProveCommitSector" ||
                              txn.methodName === "PublishStorageDeals" ||
                              txn.methodName === "TerminateSectors" ||
                              txn.methodName === "RepayDebt" ||
                              txn.methodName === "WithdrawBalance (miner)" ||
                              txn.methodName === "WithdrawBalance (market)" ||
                              txn.methodName === "AddBalance" ||
                              txn.methodName === "ChangeWorkerAddress" ||
                              txn.methodName === "ChangeOwnerAddress" ||
                              txn.methodName === "ChangePeerID" ||
                              txn.methodName === "DeclareFaults" ||
                              txn.methodName === "DeclareFaultsRecovered" ||
                              txn.methodName === "ExtendSectorExpiration" ? (
                                txn.burnFee.display
                              ) : (
                                <p>0</p>
                              )}
                            </Text>
                            {/* <Text>
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
                                  GetSimpleUSDUnits(
                                    Math.round(
                                      ((txn.burnFee.val * filecoinUSDRate) /
                                        10 ** 18 +
                                        Number.EPSILON) *
                                        100,
                                    ) / 100,
                                  )
                                ) : (
                                  <p>$0</p>
                                )}
                              </Text> */}
                          </Stack>
                        </GridItem>
                      </Grid>
                    </Stack>
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
            {basicTransactions.length > 0 ? (
              <Center>
                <Button
                  mt="6"
                  borderRadius="full"
                  w="fit-content"
                  isLoading={isTxnLoading}
                  loadingText="Getting Transactions"
                  colorScheme="blue"
                  variant="outline"
                  onClick={() => {
                    setIsTxnLoading(true);
                    const client = new ApolloClient({
                      uri: "https://miner-marketplace-backend-2.onrender.com/query",
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
                      .then((data) => data.data)
                      .then((d) => d.miner)
                      .then((m) => {
                        setIsTxnLoading(false);
                        const dsrc = m.transactions.map((txn) => {
                          let txntype = "message";
                          if (txn.methodName === "ApplyRewards") {
                            txntype = "block";
                          }
                          return {
                            key: txn.id,
                            id: {
                              mid: txn.id,
                              txntype,
                            },
                            value: {
                              val: Number(txn.value),
                              display: GetFormattedFILUnits(Number(txn.value)),
                            },
                            methodName: txn.methodName,
                            from: txn.from,
                            to: txn.to,
                            minerFee: {
                              val: Number(txn.minerFee),
                              display: GetFormattedFILUnits(
                                Number(txn.minerFee),
                              ),
                            },
                            burnFee: {
                              val: Number(txn.burnFee),
                              display: GetFormattedFILUnits(
                                Number(txn.burnFee),
                              ),
                            },
                            transactionType: txn.transactionType,
                            exitCode: txn.exitCode,
                            height: txn.height,
                            timestamp: txn.timestamp,
                          };
                        });
                        setBasicTransactions(dsrc);
                        setFirstValue(firstValue + 20);
                      });
                  }}
                >
                  View more
                </Button>
              </Center>
            ) : (
              <Center>
                <br />
                <p>...</p>
              </Center>
            )}
          </Stack>
        ) : (
          <>
            <Center>
              <Spinner marginTop="16" color="blue.900" size="lg" />
            </Center>
          </>
        )}
      </>
    </>
  );
}

BasicView.propTypes = {
  minerID: PropTypes.string.isRequired,
};

export default BasicView;
