import {
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  Center,
  Link,
  SimpleGrid,
  Spacer,
  Spinner,
  Stack,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  VStack,
  VisuallyHidden,
} from "@chakra-ui/react";
import { Icon, IconProps, ArrowBackIcon } from "@chakra-ui/icons";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import ProfileSettings from "../profileSettings";
import DashboardMenu from "../../components/dashboard/DashboardMenu";
import DashboardNavbar from "../../components/dashboard/DashboardNavbar";
import PersonalDetails from "../../components/dashboard/PersonalDetails";
import QuoteCalculator from "../../components/dashboard/QuoteCalculator";
import Scores from "../../components/dashboard/Scores";
import ServiceDetails from "../../components/dashboard/ServiceDetails";
import TransactionHistory from "../../components/TransactionHistory";
import PredictedEarnings from "../../components/dashboard/PredictedEarnings";
import AggregatedEarnings from "../../components/dashboard/AggregatedEarnings";
import StorageDealStats from "../../components/dashboard/StorageDealStats";

import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
// import getAllMinerIds from "../miners";
// import { createGlobalState } from "react-hooks-global-state";

// const initialState = { isSignedIn: false, isClaimed: false };
// export default const { useGlobalState } = createGlobalState(initialState);

export default function Miner({ miner }) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isClaimed, setIsClaimed] = useState(miner.claimed);
  // const [isSignedIn, setisSignedIn] = useGlobalState("isSignedIn");
  // const [isClaimed, setIsClaimed] = useGlobalState("isClaimed");
  // setIsClaimed(miner.claimed);

  const [storageDealStatsIsLoaded, setStorageDealStatsIsLoaded] =
    useState(false);
  const [aggregateEarningsIsLoaded, setAggregateEarningsIsLoaded] =
    useState(false);
  const [predictedEarningsIsLoaded, setPredictedEarningsIsLoaded] =
    useState(false);
  const [transactionHistoryIsLoaded, setTransactionHistoryIsLoaded] =
    useState(true);

  const [storageDealStats, setStorageDealStats] = useState({
    averagePrice: "0",
    dataStored: "0",
    faultTerminated: 0,
    noPenalties: 0,
    slashed: 0,
    successRate: "1.00000000000000000000",
    terminated: 0,
    total: 0,
  });
  //state for estimated & aggregated earnings' query, keeping initital state as static to avoid errors
  const [estimatedEarnings, setEstimatedEarnings] = useState({
    miner: {
      qualityAdjustedPower: 0,
      estimatedEarnings: {
        income: {
          total: 0,
          storageDealPayments: {
            existingDeals: 0,
            potentialFutureDeals: 0,
          },
          blockRewards: {
            blockRewards: 0,
            daysUntilEligible: 0,
          },
        },
        expenditure: {
          total: 0,
          collateralDeposit: 0,
          gas: 0,
          penalty: 0,
          others: 0,
        },
        netEarnings: 0,
      },
    },
  });

  const [aggregateEarnings, setAggregateEarnings] = useState({
    miner: {
      id: 0,
      qualityAdjustedPower: 0,
      aggregateEarnings: {
        income: {
          total: 0,
          storageDealPayments: 0,
          blockRewards: 0,
        },
        expenditure: {
          total: 0,
          collateralDeposit: 0,
          gas: 0,
          penalty: 0,
          others: 0,
        },
        netEarnings: "0",
      },
    },
  });

  const router = useRouter();

  function handleIsSignedInChange(newValue) {
    setIsSignedIn(newValue);
  }
  function handleIsClaimedChange(newValue) {
    setIsClaimed(newValue);
  }

  const [transactions, setTransactions] = useState([]);
  const [finalFromArr, setFinalFromArr] = useState([]);
  const [finalToArr, setFinalToArr] = useState([]);
  //const [offsetValue, setOffsetValue] = useState(10);
  let offsetValue = 0;

  return (
    <>
      <DashboardNavbar
        minerID={miner.id}
        isMinerProfile={true}
        // isSignedIn={isSignedIn}
        // isClaimed={isClaimed}
        // onIsSignedInChange={handleIsSignedInChange}
        // onisClaimedChange={handleIsClaimedChange}
      />
      <Button
        mt="28"
        ml="8"
        colorScheme="blue"
        variant="link"
        textDecoration="underline"
        onClick={() => router.push("/miners")}
      >
        <ArrowBackIcon w={5} h={5} color="gray.600" mr="1" color="blue.500" />
        Back to Miner Listings
      </Button>
      <SimpleGrid
        maxH="44rem"
        templateColumns={{ base: "repeat(1,1fr)", lg: "repeat(12, 1fr)" }}
        gap="12"
        mx="8"
        my="8"
      >
        {/* <GridItem rowSpan="8" colSpan="2">
          <DashboardMenu />
        </GridItem> */}
        <GridItem colSpan={{ base: 1, lg: 7 }}>
          <PersonalDetails
            minerClaimed={miner.claimed}
            minerName={miner.personalInfo.name}
            minerAddress={miner.id}
            minerMail={miner.personalInfo.email}
            minerWebsite={miner.personalInfo.website}
            minerSlack={miner.personalInfo.slack}
            minerTwitter={miner.personalInfo.twitter}
            workerAddress={miner.worker.address}
            ownerAddress={miner.owner.address}
            minerBio={miner.personalInfo.bio}
          />
        </GridItem>
        <GridItem colSpan={{ base: 1, md: 5 }}>
          <Scores
            reputationScore={miner.reputationScore}
            transparencyScore={miner.transparencyScore}
          />
        </GridItem>
        <GridItem
          colSpan={{ base: 1, lg: 12 }}
          mr={{ base: 0, lg: 4 }}
          overflow={{ base: "scroll", lg: "unset" }}
        >
          <Tabs overflow={{ base: "scroll", lg: "unset" }}>
            <TabList whiteSpace="nowrap">
              <Tab>Service Details</Tab>
              <Tab>Profile Settings</Tab>
              <Tab
                onClick={() => {
                  console.log(
                    "osccmcmcm",
                    process.env.BACKEND_URL,
                    "mid",
                    miner.id,
                  );
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
                          miner(id: "${miner.id}") {
                            id
                            storageDealStats {
                              averagePrice
                              dataStored
                              faultTerminated
                              noPenalties
                              slashed
                              successRate
                              terminated
                              total
                            }
                          }
                        }
                    `,
                    })
                    .then((data) => {
                      return data.data;
                    })
                    .then((g) => {
                      setStorageDealStats(g.miner.storageDealStats);
                      setStorageDealStatsIsLoaded(true);
                    })
                    .catch((e) => {
                      console.log("err", e);
                    });
                }}
              >
                Storage Deal Stats
              </Tab>
              <Tab
                onClick={() => {
                  console.log(
                    "osccmcmcm",
                    process.env.BACKEND_URL,
                    "mid",
                    miner.id,
                  );
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
                        miner(id: "${miner.id}") {
                          id
                            aggregateEarnings(
                              startHeight: 0
                              endHeight: 1000000
                              includeGas: false
                            ) {
                              income {
                                total
                                storageDealPayments
                                blockRewards
                              }
                              expenditure {
                                total
                                collateralDeposit
                                gas
                                penalty
                                others
                              }
                              netEarnings
                            }
                          }
                        }
                      `,
                    })
                    .then((data) => {
                      return data.data;
                    })
                    .then((g) => {
                      setAggregateEarnings(g);
                      setAggregateEarningsIsLoaded(true);
                    });
                }}
              >
                Aggregated Earnings
              </Tab>
              <Tab
                onClick={() => {
                  console.log(
                    "osccmcmcm",
                    process.env.BACKEND_URL,
                    "mid",
                    miner.id,
                  );
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
                      miner(id: "${miner.id}") {
                        id
                          estimatedEarnings(
                            days: 60
                            includeGas: false
                          ) {
                            income {
                              total
                              storageDealPayments {
                                existingDeals
                                potentialFutureDeals
                              }
                              blockRewards {
                                blockRewards
                                daysUntilEligible
                              }
                            }
                            expenditure {
                              total
                              collateralDeposit
                              gas
                              penalty
                              others
                            }
                            netEarnings
                          }
                        }
                      }
                    `,
                    })
                    .then((data) => {
                      return data.data;
                    })
                    .then((g) => {
                      setEstimatedEarnings(g);
                      setPredictedEarningsIsLoaded(true);
                    })
                    .catch((e) => {
                      console.log("esti err", e);
                    });
                }}
              >
                Predicted Earnings
              </Tab>
              <Tab>Transaction History</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Flex
                  spacing="16"
                  flexDirection={{ md: "row", base: "column" }}
                >
                  <ServiceDetails
                    serviceLocation={
                      miner.location.country +
                      " (" +
                      miner.location.region +
                      ")"
                    }
                    country={miner.location.country}
                    region={miner.location.region}
                    storageAskPrice={miner.pricing.storageAskPrice}
                    verifiedAskPrice={miner.pricing.verifiedAskPrice}
                    retrievalAskPrice={miner.pricing.retrievalAskPrice}
                    storage={miner.service.serviceTypes.storage}
                    retrieval={miner.service.serviceTypes.retrieval}
                    repair={miner.service.serviceTypes.repair}
                    online={miner.service.dataTransferMechanism.online}
                    offline={miner.service.dataTransferMechanism.offline}
                  />

                  <Spacer />

                  <QuoteCalculator
                    storageAskPrice={miner.pricing.storageAskPrice}
                  />
                </Flex>
              </TabPanel>
              <TabPanel>
                <ProfileSettings
                  minerID={miner.id}
                  minerName={miner.personalInfo.name}
                  minerMail={miner.personalInfo.email}
                  minerWebsite={miner.personalInfo.website}
                  minerSlack={miner.personalInfo.slack}
                  minerTwitter={miner.personalInfo.twitter}
                  minerBio={miner.personalInfo.bio}
                  country={miner.location.country}
                  region={miner.location.region}
                  storageAskPrice={miner.pricing.storageAskPrice}
                  verifiedAskPrice={miner.pricing.verifiedAskPrice}
                  retrievalAskPrice={miner.pricing.retrievalAskPrice}
                  storage={miner.service.serviceTypes.storage}
                  retrieval={miner.service.serviceTypes.retrieval}
                  repair={miner.service.serviceTypes.repair}
                  online={miner.service.dataTransferMechanism.online}
                  offline={miner.service.dataTransferMechanism.offline}
                  transparencyScore={miner.transparencyScore}
                />
              </TabPanel>
              <TabPanel>
                {storageDealStatsIsLoaded ? (
                  <StorageDealStats
                    averagePrice={storageDealStats.averagePrice}
                    dataStored={storageDealStats.dataStored}
                    faultTerminated={storageDealStats.faultTerminated}
                    noPenalties={storageDealStats.noPenalties}
                    slashed={storageDealStats.slashed}
                    successRate={storageDealStats.successRate}
                    terminated={storageDealStats.terminated}
                    total={storageDealStats.total}
                  />
                ) : (
                  <>
                    <Center>
                      {/**<Spinner size="xl" color="red.500" /> */}
                      <Spinner marginTop="16" color="blue.900" size="lg" />
                    </Center>
                  </>
                )}
              </TabPanel>
              <TabPanel>
                {aggregateEarningsIsLoaded ? (
                  <AggregatedEarnings
                    qap={aggregateEarnings.miner.qualityAdjustedPower}
                    totalIncome={
                      aggregateEarnings.miner.aggregateEarnings.income.total
                    }
                    storageDeal={
                      aggregateEarnings.miner.aggregateEarnings.income
                        .storageDealPayments
                    }
                    blockRewards={
                      aggregateEarnings.miner.aggregateEarnings.income
                        .blockRewards
                    }
                    totalExpenditure={
                      aggregateEarnings.miner.aggregateEarnings.expenditure
                        .total
                    }
                    deposits={
                      aggregateEarnings.miner.aggregateEarnings.expenditure
                        .collateralDeposit
                    }
                    gas={
                      aggregateEarnings.miner.aggregateEarnings.expenditure.gas
                    }
                    penalty={
                      aggregateEarnings.miner.aggregateEarnings.expenditure
                        .penalty
                    }
                    others={
                      aggregateEarnings.miner.aggregateEarnings.expenditure
                        .others
                    }
                    netEarnings={
                      aggregateEarnings.miner.aggregateEarnings.netEarnings
                    }
                  />
                ) : (
                  <>
                    <Center>
                      {/**<Spinner size="xl" color="red.500" /> */}
                      <Spinner marginTop="16" color="blue.900" size="lg" />
                    </Center>
                  </>
                )}
              </TabPanel>
              <TabPanel>
                {predictedEarningsIsLoaded ? (
                  <PredictedEarnings
                    totalIncome={
                      estimatedEarnings.miner.estimatedEarnings.income.total
                    }
                    existing={
                      estimatedEarnings.miner.estimatedEarnings.income
                        .storageDealPayments.existingDeals
                    }
                    potential={
                      estimatedEarnings.miner.estimatedEarnings.income
                        .storageDealPayments.potentialFutureDeals
                    }
                    blockRewards={
                      estimatedEarnings.miner.estimatedEarnings.income
                        .blockRewards.blockRewards
                    }
                    totalExpenditure={
                      estimatedEarnings.miner.estimatedEarnings.expenditure
                        .total
                    }
                    deposits={
                      estimatedEarnings.miner.estimatedEarnings.expenditure
                        .collateralDeposit
                    }
                    gas={
                      estimatedEarnings.miner.estimatedEarnings.expenditure.gas
                    }
                    penalty={
                      estimatedEarnings.miner.estimatedEarnings.expenditure
                        .penalty
                    }
                    others={
                      estimatedEarnings.miner.estimatedEarnings.expenditure
                        .others
                    }
                    netEarnings={
                      estimatedEarnings.miner.estimatedEarnings.netEarnings
                    }
                    days={
                      estimatedEarnings.miner.estimatedEarnings.income
                        .blockRewards.daysUntilEligible
                    }
                  />
                ) : (
                  <>
                    <Center>
                      {/**<Spinner size="xl" color="red.500" /> */}
                      <Spinner marginTop="16" color="blue.900" size="lg" />
                    </Center>
                  </>
                )}
              </TabPanel>
              <TabPanel>
                {transactionHistoryIsLoaded ? (
                  <TransactionHistory
                    minerID={miner.id}
                    transactions={transactions}
                    finalFromArr={finalFromArr}
                    finalToArr={finalToArr}
                    offsetValue={offsetValue}
                  />
                ) : (
                  <>
                    <Center>
                      {/**<Spinner size="xl" color="red.500" /> */}
                      <Spinner marginTop="16" color="blue.900" size="lg" />
                    </Center>
                  </>
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </GridItem>
        {/* <GridItem colSpan={{ base: 1, lg: 4 }} mt={{ base: 0, lg: 16 }}>
          <QuoteCalculator storageAskPrice={miner.pricing.storageAskPrice} />
        </GridItem> */}
      </SimpleGrid>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const client = new ApolloClient({
    uri: process.env.BACKEND_URL,
    cache: new InMemoryCache(),
  });
  const { data } = await client.query({
    query: gql`
      query {
        miner(id: "${params.id}") {
          id
          claimed
          location {
            region
            country
          }
          transparencyScore
          reputationScore
          owner {
            address
          }
          worker {
            address
          }
          personalInfo {
            name
            bio
            email
            website
            twitter
            slack
          }
          pricing {
            storageAskPrice
            verifiedAskPrice
            retrievalAskPrice
          }
          service {
            serviceTypes {
              storage
              retrieval
              repair
            }
            dataTransferMechanism {
              online
              offline
            }
          }
        }
      }
    `,
  });

  return {
    props: {
      miner: data.miner,
    },
  };
}

async function getAllMinerIds() {
  const client = new ApolloClient({
    uri: process.env.BACKEND_URL,
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query {
        miners(first: 10000) {
          id
        }
      }
    `,
  });
  return data.miners.map((m) => {
    return {
      params: {
        id: m.id,
      },
    };
  });
}

// export async function getStaticPaths() {
//   const paths = await getAllMinerIds();
//   return {
//     paths,
//     fallback: false,
//   };
// }
