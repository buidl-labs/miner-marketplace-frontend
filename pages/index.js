import {
  Accordion,
  Box,
  Container,
  Heading,
  Stack,
  SimpleGrid,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Hero from "../components/landingPage/Hero";
import Features from "../components/landingPage/Features";
import FilecoinStats from "../components/landingPage/FilecoinStats";
import JoinNetwork from "../components/landingPage/JoinNetwork";
import Footer from "../components/landingPage/Footer";
import Faq from "../components/Faq";
import { gql, ApolloClient, InMemoryCache } from "@apollo/client";
import { useRouter } from "next/router";
import Head from "next/head";
import { useState } from "react";

const IndexPage = (stats) => {
  //console.log(stats);
  // console.log("active", stats.stats.activeMinersCount);
  // console.log("dataS", stats.stats.dataStored);
  const router = useRouter();

  const [btnLoading, setBtnLoading] = useState(false);

  return (
    <>
      <Head>
        <title>
          Explore Storage Providers, Get Financial Stats - DataStation
        </title>
      </Head>
      <Navbar />

      <Container maxW={{ lg: "container.xl" }} mb="16">
        <SimpleGrid gap="28">
          {/* Hero Section */}
          <Hero
            heroHeading="Simplified Stats for Filecoin Storage Providers"
            heroText="Get quantitative and qualitative data about Storage Providers in a more enhanced and jargon-free way"
            ctaText="Get Started"
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
                  subtext="Given as Block Reward last month"
                />
                <FilecoinStats
                  count="$4.9k"
                  countText=""
                  subtext="Earned in past 24hrs by Top Miner"
                />
                <FilecoinStats
                  count="2.96k"
                  countText=""
                  subtext="TB Data Stored till Now"
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
              featureImg="\images\gif\agg-earn.gif"
              featureTitle="Get Aggregated & Predicted Earning Stats"
              featureDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fames vie rra id tellus interdum bibendum aliquet faucibus nullam consequat. Purus, non sed in viverra."
            />
            <Features
              featureImg="\images\gif\txn.gif"
              featureTitle="Simplified Transaction History"
              featureDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fames vie rra id tellus interdum bibendum aliquet faucibus nullam consequat. Purus, non sed in viverra."
            />
            <Features
              featureImg="\images\gif\scores.gif"
              featureTitle="Stand out from other Storage Providers by improving your Scores"
              featureDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fames vie rra id tellus interdum bibendum aliquet faucibus nullam consequat. Purus, non sed in viverra."
            />
          </Stack>

          {/*Join Network*/}

          <JoinNetwork
            cardHeading="Storage Provider Stats, made simple. Get Started with DataStation"
            ctaText="Setup Profile"
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

export default IndexPage;

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
