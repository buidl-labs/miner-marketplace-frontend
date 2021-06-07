import {
  Accordion,
  Button,
  Box,
  Container,
  Link,
  Heading,
  HStack,
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

const IndexPage = () => {
  return (
    <>
      <Navbar />

      <Container
        maxW={{ lg: "container.xl", md: "container.lg", sm: "container.md" }}
        mb="16"
      >
        <SimpleGrid gap="12">
          {/* Hero Section */}
          <Hero
            heroImg="/images/heroGlobe.svg"
            heroHeading="Decentralised Storage Solution for all your needs"
            heroText="Filecoin is a decentralised storage network designed to store
            humanity’s most important information. Sounds interesting? head over
            to link below to learn more."
            ctaText="Learn more about Filecoin Network"
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
              featureTitle="Secure"
              featureDescription="Miners storing data have to encrypt data which makes storing data on Filecoin more secure"
            />
            <Features
              featureIcon="/images/rewards.svg"
              featureTitle="Rewards"
              featureDescription="Rewards are directly proportional to amount of storage you provide,
            hence more storage means more rewards"
            />
            <Features
              featureIcon="/images/decentralised.svg"
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
                  count="2194+"
                  countText=""
                  subtext="Active Miners and counting"
                />
                <FilecoinStats
                  count="5489"
                  countText="PB"
                  subtext="Network Storage Capacity"
                />
                <FilecoinStats
                  count="3746"
                  countText="PB"
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
              />
              <JoinNetwork
                cardHeading="Looking to Store Data"
                cardText="Explore miners according to your needs and start storing your data
            securely on Filecoin Network."
                ctaText="Explore Miners"
                ctaVariant="outline"
              />
            </SimpleGrid>
          </Stack>

          {/*FAQ*/}
          <Stack textAlign="center" alignItems="center" spacing="16">
            <Heading size="lg">Frequently Asked Questions</Heading>
            <Stack w={{ md: "48rem", sm: "36rem" }} textAlign="left">
              <Accordion allowToggle="false">
                <Faq question="What?" answer="this is what" />
                <Faq question="What?" answer="this is what" />
                <Faq question="What?" answer="this is what" />
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
