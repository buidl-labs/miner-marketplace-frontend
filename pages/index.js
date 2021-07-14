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

const IndexPage = (stats) => {
  //console.log(stats);
  // console.log("active", stats.stats.activeMinersCount);
  // console.log("dataS", stats.stats.dataStored);
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Explore Miners, Get Financial Stats - Filecoin Miner Marketplace</title>
      </Head>
      <Navbar />

      <Container maxW={{ lg: "container.xl" }} mb="16">
        <SimpleGrid gap="12">
          {/* Hero Section */}
          <Hero
            heroImg="/images/heroGlobe.svg"
            heroAlt="Global Filecoin network"
            heroHeading="Decentralised Storage Solution for all your needs"
            heroText="Filecoin is a decentralised storage network designed to store
            humanity’s most important information. Sounds interesting? head over
            to link below to learn more."
            ctaText="Learn more about Filecoin Network"
            ctaLink={"https://filecoin.io"}
          />

          {/* Features Section */}
          <Stack textAlign="center" alignItems="center">
            <Heading color="gray.900" size="2xl">
              Why Filecoin?
            </Heading>
          </Stack>

          <SimpleGrid
            columns={{ md: 3, lg: 3, sm: 1 }}
            gap={{ lg: "28", md: "12", sm: "4" }}
          >
            <Features
              featureIcon="/images/secure.svg"
              imgAlt="secure"
              featureTitle="Secure"
              featureDescription="Miners storing data have to encrypt data which makes storing data on Filecoin more secure"
            />
            <Features
              featureIcon="/images/rewards.svg"
              imgAlt="rewards"
              featureTitle="Rewards"
              featureDescription="Rewards are directly proportional to amount of storage you provide,
            hence more storage means more rewards"
            />
            <Features
              featureIcon="/images/decentralised.svg"
              imgAlt="decentralised"
              featureTitle="Decentralised"
              featureDescription="It all is decentralised hence, no single point of control, no middle
            man"
            />
          </SimpleGrid>

          {/*Filecoin Stats*/}
          <Box
            bgColor="blue.600"
            py="6"
            px="12"
            borderRadius="2xl"
            color="white"
            my="16"
          >
            <Stack textAlign="center" spacing="16" my="16">
              <Heading size="2xl" color="white">
                Filecoin Network in Numbers
              </Heading>
              <SimpleGrid columns={{ sm: 1, md: 3, lg: 3 }} gap="16">
                <FilecoinStats
                  count={stats.stats.activeMinersCount + "+"}
                  countText=""
                  subtext="Active Miners and counting"
                />
                <FilecoinStats
                  count={stats.stats.networkStorageCapacity}
                  countText=""
                  subtext="Network Storage Capacity"
                />
                <FilecoinStats
                  count={stats.stats.dataStored}
                  countText=""
                  subtext="Data Stored till now"
                />
              </SimpleGrid>
            </Stack>
          </Box>

          {/*Join Network*/}
          <Stack textAlign="center" spacing="16" my="16">
            <Heading color="gray.900" size="2xl">
              Join the Filecoin Network
            </Heading>

            <SimpleGrid columns={{ lg: 2, md: 2, sm: 1 }} gap="12">
              <JoinNetwork
                cardHeading="Looking to provide Storage Services"
                cardText="Start your miner journey and become part of global network of
                fielcoin miners."
                ctaText="Become a Miner"
                ctaVariant="solid"
                ctaRoute={() => { router.push('/minerLanding') }}
              />
              <JoinNetwork
                cardHeading="Looking to Store Data"
                cardText="Explore miners according to your needs and start storing your data
            securely on Filecoin Network."
                ctaText="Explore Miners"
                ctaVariant="outline"
                ctaRoute={() => { router.push('/miners') }}
              />
            </SimpleGrid>
          </Stack>

          {/*FAQ*/}
          <Stack textAlign="center" alignItems="center" spacing="16">
            <Heading size="lg">Frequently Asked Questions</Heading>
            <Stack w={{ base: "80vw", md: "48rem" }} textAlign="left">
              <Accordion allowToggle="false">
                <Faq
                  question="What is filecoin?"
                  answer="Filecoin is a peer-to-peer network that stores files on the internet, with built-in economic incentives to ensure files are stored reliably over time." />
                <Faq
                  question="Is this platform free to use?"
                  answer="Yes" />
                <Faq
                  question="What is the difference between Filecoin & IPFS?"
                  answer="Filecoin and IPFS are two separate, complementary protocols, both created by Protocol Labs. IPFS allows peers to store, request, and transfer verifiable data with each other, while Filecoin is designed to provide a system of persistent data storage." />
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
