import {
  Button,
  Link,
  Grid,
  Heading,
  SimpleGrid,
  GridItem,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { Icon, IconProps, ArrowBackIcon } from "@chakra-ui/icons";

import React, { useState } from "react";
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

  const router = useRouter();

  function handleIsSignedInChange(newValue) {
    setIsSignedIn(newValue);
  }
  function handleIsClaimedChange(newValue) {
    setIsClaimed(newValue);
  }

  const [transactions, setTransactions] = useState([]);

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
        templateRows="repeat(4, 1fr)"
        templateColumns={{ base: "repeat(1,1fr)", lg: "repeat(12, 1fr)" }}
        gap="12"
        mx="8"
        my="8"
      >
        {/* <GridItem rowSpan="8" colSpan="2">
          <DashboardMenu />
        </GridItem> */}
        <GridItem colSpan={{ base: 1, lg: 6 }}>
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
        <GridItem colSpan={{ base: 1, md: 6 }}>
          <Scores
            reputationScore={miner.reputationScore}
            transparencyScore={miner.transparencyScore}
          />
        </GridItem>
        <GridItem colSpan={{ base: 1, lg: 8 }} mr={{ base: 0, lg: 4 }}>
          <Tabs>
            <TabList>
              <Tab>Service Details</Tab>
              <Tab>Profile Settings</Tab>
              <Tab>Aggregated Earnings</Tab>
              <Tab>Predicted Earnings</Tab>
              <Tab
                onClick={() => {
                  console.log(
                    "osccmcmcm",
                    process.env.BACKEND_URL,
                    "mid",
                    miner.id,
                  );
                  const BACKEND_URL =
                    "https://miner-marketplace-backend.onrender.com/query";
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
                          transactions {
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
                          }
                        }
                      }
                    `,
                    })
                    .then((data) => {
                      console.log(data.data);
                      return data.data;
                    })
                    .then((d) => {
                      console.log(d.miner.id);
                      return d.miner;
                    })
                    .then((m) => {
                      console.log(m.transactions);
                      setTransactions(m.transactions);
                    });
                }}
              >
                Transaction History
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <ServiceDetails
                  serviceLocation={
                    miner.location.country + " (" + miner.location.region + ")"
                  }
                  storageAskPrice={miner.pricing.storageAskPrice}
                  verifiedAskPrice={miner.pricing.verifiedAskPrice}
                  retrievalAskPrice={miner.pricing.retrievalAskPrice}
                  storage={miner.service.serviceTypes.storage}
                  retrieval={miner.service.serviceTypes.retrieval}
                  repair={miner.service.serviceTypes.repair}
                  online={miner.service.dataTransferMechanism.online}
                  offline={miner.service.dataTransferMechanism.offline}
                />
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
                />
              </TabPanel>
              <TabPanel>
                <Heading>Aggregated Earnings</Heading>
              </TabPanel>
              <TabPanel>
                <Heading>Predicted Earnings</Heading>
                <PredictedEarnings />
              </TabPanel>
              <TabPanel>
                <TransactionHistory
                  minerID={miner.id}
                  transactions={transactions}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </GridItem>
        <GridItem colSpan={{ base: 1, lg: 4 }} mt={{ base: 0, lg: 16 }}>
          <QuoteCalculator storageAskPrice={miner.pricing.storageAskPrice} />
        </GridItem>
      </SimpleGrid>
    </>
  );
}

export async function getStaticProps({ params }) {
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

export async function getStaticPaths() {
  const paths = await getAllMinerIds();
  return {
    paths,
    fallback: false,
  };
}
