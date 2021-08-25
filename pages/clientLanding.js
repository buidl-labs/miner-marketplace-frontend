import {
  Accordion,
  Button,
  Box,
  Container,
  Link,
  Heading,
  Text,
  HStack,
  Stack,
  SimpleGrid,
  WrapItem,
  UnorderedList,
  OrderedList,
  ListItem,
} from "@chakra-ui/react";
import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/landingPage/Hero";
import Features from "../components/landingPage/Features";
import FilecoinStats from "../components/landingPage/FilecoinStats";
import Footer from "../components/landingPage/Footer";
import Faq from "../components/Faq";
import JoinNetwork from "../components/landingPage/JoinNetwork";
import { gql, InMemoryCache, ApolloClient } from "@apollo/client";
import { useRouter } from "next/router";
import Head from "next/head";
import { useState } from "react";

const clientLanding = (stats) => {
  // console.log(stats);
  // console.log("active", stats.stats.activeMinersCount);
  // console.log("dataS", stats.stats.dataStored);
  const router = useRouter();

  const [btnLoading, setBtnLoading] = useState(false);

  return (
    <>
      <Head>
        <title>Find Storage Providers to store your data - DataStation</title>
      </Head>
      <Navbar />
      <Container maxW={{ lg: "container.xl" }} mb="16">
        <SimpleGrid gap="28">
          {/* Hero Section */}
          <Hero
            heroHeading="Find Storage Providers with ease"
            heroText="Get quantitative and qualitative data about Storage Providers in a more enhanced and jargon-free way"
            ctaText="Explore Storage Providers"
          />

          {/*Filecoin Stats*/}
          <Box
            bgColor="blue.600"
            py="6"
            px="12"
            borderRadius="3xl"
            color="white"
            my="16"
          >
            <Stack textAlign="center" spacing="16" my="16">
              <Heading size="2xl" color="white">
                Filecoin Network in Numbers
              </Heading>
              <SimpleGrid columns={{ sm: 1, md: 3, lg: 3 }} gap="16">
                <FilecoinStats
                  count="$24.7k"
                  countText=""
                  subtext="Average Storage Price for 100Gb/month"
                />
                <FilecoinStats
                  count="2.96k"
                  countText=""
                  subtext="TB Data Stored till Now"
                />
                <FilecoinStats
                  count="3.4k"
                  countText=""
                  subtext="Storage Providers to choose from"
                />
              </SimpleGrid>
            </Stack>
          </Box>

          {/* Features Section */}
          <Stack textAlign="center">
            <Heading size="2xl">
              Get Most out of DataStation <br /> with these Features
            </Heading>
            <Features
              featureImg="\images\gif\quote-calc.gif"
              featureTitle="Find Storage Providers according to your Budget"
              featureDescription="With our quote calculator you can get a quick estimate of the final price you would be paying to a storage provider for a range of different storage requirements."
            />
            <Features
              featureImg="\images\gif\scores.gif"
              featureTitle="Find Trustable Storage Providers"
              featureDescription="Each Storage provider is assigned a Reputation Score — which is based on their past activity and a Transparency Score — which is based on the public information they provide; this ensures transparency & helps you in choosing reliable Storage Providers."
            />
            <Features
              featureImg="\images\gif\storage-deal-stats.gif"
              featureTitle="See Previous Storage Deal Stats find Reliable Storage Providers"
              featureDescription="You can also check existing Storage Deal statistics of a storage provider to get more insights about their services and past performance in the network."
            />
          </Stack>

          {/*Join Network*/}

          <JoinNetwork
            cardHeading="Find trustable Storager Providers according to your needs"
            ctaText="Explore Storage Providers"
            ctaRoute={() => {
              router.push("/miners");
              setBtnLoading(true);
            }}
          />

          {/*FAQ*/}
          <Stack textAlign="center" alignItems="center" spacing="16">
            <Heading size="lg">Frequently Asked Questions</Heading>
            <Stack w={{ base: "80vw", md: "48rem" }} textAlign="left">
              <Accordion allowToggle="false">
                <Faq
                  question="What is filecoin?"
                  answer="Filecoin is a peer-to-peer network that stores files on the internet, with built-in economic incentives to ensure files are stored reliably over time."
                />
                <Faq question="Is this platform free to use?" answer="Yes" />
                <Faq
                  question="What is the difference between Filecoin & IPFS?"
                  answer="Filecoin and IPFS are two separate, complementary protocols, both created by Protocol Labs. IPFS allows peers to store, request, and transfer verifiable data with each other, while Filecoin is designed to provide a system of persistent data storage."
                />
              </Accordion>
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
      <Footer />
    </>
  );
};

export default clientLanding;

export async function getServerSideProps() {
  const client = new ApolloClient({
    uri: process.env.BACKEND_URL,
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query {
        networkStats {
          activeMinersCount
          networkStorageCapacity
          dataStored
        }
      }
    `,
  });

  return {
    props: {
      stats: data.networkStats,
    },
  };
}
