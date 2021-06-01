import {
  Accordion,
  Button,
  Box,
  Container,
  Link,
  Heading,
  HStack,
  Stack,
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

      <Container maxW="container.xl" mb="16">
        <Stack spacing="28">
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
          <HStack
            color="gray.700"
            spacing="36"
            justifyContent="center"
            alignItems="flex-start"
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
          </HStack>

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
              <Heading size="2xl">Filecoin Network in Numbers</Heading>

              <HStack spacing="52" justifyContent="center">
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
              </HStack>
            </Stack>
          </Box>

          {/*Join Network*/}
          <Stack textAlign="center" spacing="16" my="16">
            <Heading color="gray.900" size="2xl">
              Join the Filecoin Network
            </Heading>
            <HStack color="gray.700" spacing="12" justifyContent="center">
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
            </HStack>
          </Stack>

          {/*FAQ*/}
          <Stack textAlign="center" alignItems="center" spacing="16">
            <Heading size="lg">Frequently Asked Questions</Heading>
            <Stack w="48rem" textAlign="left">
              <Accordion allowToggle="false">
                <Faq question="What?" answer="this is what" />
                <Faq question="What?" answer="this is what" />
                <Faq question="What?" answer="this is what" />
              </Accordion>
            </Stack>
          </Stack>
        </Stack>
      </Container>
      <Footer />
    </>
  );
};

export default IndexPage;
