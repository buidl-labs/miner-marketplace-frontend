import {
  Grid,
  GridItem,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import React from "react";
import DashboardMenu from "../../components/dashboard/DashboardMenu";
import DashboardNavbar from "../../components/dashboard/DashboardNavbar";
import PersonalDetails from "../../components/dashboard/PersonalDetails";
import QuoteCalculator from "../../components/dashboard/QuoteCalculator";
import Scores from "../../components/dashboard/Scores";
import ServiceDetails from "../../components/dashboard/ServiceDetails";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
// import getAllMinerIds from "../miners";

export default function Miner({ miner }) {
  return (
    <>
      <DashboardNavbar />
      <Grid
        h="200px"
        templateRows="repeat(4, 1fr)"
        templateColumns="repeat(12, 1fr)"
        gap="0.5"
        pr="8"
      >
        <GridItem rowSpan="8" colSpan="2">
          <DashboardMenu />
        </GridItem>
        <GridItem colSpan="5" pt="28">
          <PersonalDetails
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
        <GridItem colSpan="5" pt="28">
          <Scores
            reputationScore={miner.reputationScore}
            transparencyScore={miner.transparencyScore}
          />
        </GridItem>
        <GridItem colSpan="7" pr="4" pt="8">
          <Tabs>
            <TabList>
              <Tab>Service Details</Tab>
              <Tab>Aggregated Earnings</Tab>
              <Tab>Predicted Earnings</Tab>
              <Tab>Transaction History</Tab>
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
                <p>two!</p>
              </TabPanel>
              <TabPanel>
                <p>three!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </GridItem>
        <GridItem colSpan="3" pt="24">
          <QuoteCalculator storageAskPrice={miner.pricing.storageAskPrice} />
        </GridItem>
      </Grid>
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
