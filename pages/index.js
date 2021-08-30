import {
  Accordion,
  Center,
  HStack,
  VStack,
  Image,
  Text,
  Box,
  Container,
  Heading,
  Stack,
  SimpleGrid,
} from "@chakra-ui/react";
import { gql, ApolloClient, InMemoryCache } from "@apollo/client";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import Head from "next/head";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/landingPage/Hero";
import Features from "../components/landingPage/Features";
import FilecoinStats from "../components/landingPage/FilecoinStats";
import JoinNetwork from "../components/landingPage/JoinNetwork";
import Footer from "../components/landingPage/Footer";
import Faq from "../components/Faq";
import { GetSimpleUSDUnits } from "../util/util";

const IndexPage = ({ stats, filecoinUSDRate }) => {
  const router = useRouter();

  const [btnLoading, setBtnLoading] = useState(false);

  return (
    <>
      <Head>
        <title>
          Explore Storage Providers, Get Financial Stats - DataStation
        </title>
        <meta
          name="title"
          content="Explore Storage Providers, Get Financial Stats - DataStation"
        />
        <meta
          name="description"
          content="Enhancing the Experience of Decentralised Storage on Filecoin."
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://datastation.app/" />
        <meta
          property="twitter:title"
          content="Explore Storage Providers, Get Financial Stats - DataStation"
        />
        <meta
          property="twitter:description"
          content="Enhancing the Experience of Decentralised Storage on Filecoin."
        />
        <meta property="twitter:image" content="images/thumbnail.jpg" />
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

          {/* Filecoin Stats */}
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
                  count={GetSimpleUSDUnits(
                    (parseInt(stats.totalBlockRewards24H, 10) / 10 ** 18) *
                      filecoinUSDRate
                  )}
                  countText=""
                  subtext="Block Rewards earned in the past 24 hrs"
                />
                <FilecoinStats
                  count={GetSimpleUSDUnits(
                    (parseInt(stats.topMinerBlockRewards24H, 10) / 10 ** 18) *
                      filecoinUSDRate
                  )}
                  countText=""
                  subtext="Earned by top storage provider in the past 24 hrs"
                />
                <FilecoinStats
                  count={stats.dataStored}
                  countText=""
                  subtext="Total Data Stored so far"
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
              featureImg="\images\gif\Earnings.gif"
              featureTitle="Get Aggregated & Predicted Earning Stats"
              featureDescription="As a Storage Provider it’s useful to have a track of your past and future earnings. At DataStation you can check your current net aggregated earnings and net estimated earnings along with your estimated expenditures & estimated income."
            />
            <Features
              featureImg="\images\gif\txn.gif"
              featureTitle="Simplified Transaction History"
              featureDescription="With a more simplified view of Transaction history you can quickly scroll through your recent transactions. Want more details? We got you covered with the advanced view of transaction history for the advanced data analysis purposes."
            />
            {/* <Features
              featureImg="\images\gif\TRscores.gif"
              featureTitle="Stand out from other Storage Providers by improving your Scores"
              featureDescription="Improve your Transparency & Reputation scores by adding off chain attributes. This helps to build trust amongst potential clients."
            />
             */}
            <Center py="12">
              <HStack
                alignItems="center"
                textAlign="center"
                spacing="24"
                maxW={{ lg: "80%", md: "50%" }}
              >
                <Stack textAlign="left">
                  <Heading size="lg">
                    Stand out from other Storage Providers by improving your
                    Scores
                  </Heading>
                  <Text size="xs">
                    Improve your Transparency & Reputation scores by adding off
                    chain attributes. This helps to build trust amongst
                    potential clients.
                  </Text>
                </Stack>
                <Box>
                  <Image
                    src="\images\gif\TRscores.gif"
                    w="56rem"
                    objectFit="cover"
                    alt="feature GIF"
                  />
                </Box>
              </HStack>
            </Center>
          </Stack>

          {/* Join Network */}

          <JoinNetwork
            cardHeading="Storage Provider Stats, made simple. Get Started with DataStation"
            ctaText="Setup Profile"
            ctaRoute={() => {
              router.push("/miners");
              setBtnLoading(true);
            }}
          />

          {/* FAQ */}
          <Stack textAlign="center" alignItems="center" spacing="16">
            <Heading size="lg">Frequently Asked Questions</Heading>
            <Stack w={{ base: "80vw", md: "48rem" }} textAlign="left">
              <Accordion allowToggle="false">
                <Faq
                  question="What is Filecoin?"
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

IndexPage.propTypes = {
  stats: PropTypes.instanceOf(Object).isRequired,
  filecoinUSDRate: PropTypes.number.isRequired,
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
          topMinerBlockRewards24H
          totalBlockRewards24H
          averageDealPrice
        }
      }
    `,
  });

  const res1 = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=filecoin&vs_currencies=usd"
  );
  const res2 = await res1.json();

  return {
    props: {
      stats: data.networkStats,
      filecoinUSDRate: res2.filecoin.usd,
    },
  };
}
