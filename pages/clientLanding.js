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
  WrapItem,
} from "@chakra-ui/react";
import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/landingPage/Hero";
import Features from "./components/landingPage/Features";
import FilecoinStats from "./components/landingPage/FilecoinStats";
import JoinNetwork from "./components/landingPage/JoinNetwork";
import Footer from "./components/landingPage/Footer";
import Faq from "./components/Faq";

const clientLanding = () => {
  return (
    <>
      <Navbar />
      <Container maxW="container.xl" mb="16">
        <Stack spacing="28">
          {/* Hero Section */}
          <Hero
            heroImg="/images/clientHero.svg"
            heroHeading="Powerful Decentralized Storage Network for your Data"
            heroText="The Filecoin network is made up of a large number of diverse storage providers and developers. This creates a robust and reliable service."
            ctaText="Explore Storage Providers"
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
              featureIcon="/images/selfhealing.svg"
              featureTitle="Self-healing"
              featureDescription="The Filecoin blockchain has a built-in self-healing process where if faulty miners are detected, their files are redistributed to reliable miners."
            />
            <Features
              featureIcon="/images/prices.svg"
              featureTitle="Competitive prices"
              featureDescription="Prices for storage and retrieval are determined by supply and demand, not corporate pricing departments. Filecoin makes reliable storage available at hyper-competitive prices"
            />
            <Features
              featureIcon="/images/tracker.svg"
              featureTitle="Verifiable traces"
              featureDescription="Filecoin generates verifiable traces that files have been stored correctly over time. Clients can efficiently scan these traces to confirm that their files have been stored correctly."
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
                  subtext="Verified Miners and counting"
                />
                <FilecoinStats
                  count="5489"
                  countText="PB"
                  subtext="Network Storage Capacity"
                />
                <FilecoinStats
                  count="3746"
                  countText="PB"
                  subtext="Securely Stored data"
                />
              </HStack>
            </Stack>
          </Box>

          {/*Join Network*/}
          <Stack textAlign="center" spacing="16" my="16">
            <WrapItem
              textAlign="left"
              borderRadius="xl"
              px="24"
              py="14"
              bg="gray.100"
            >
              <Stack alignItems="left" spacing="4">
                <Heading size="lg" color="blue.900">
                  Start Storing your data on Filecoin
                </Heading>
                <Text size="lg" maxW="36rem" color="gray.700">
                  Filecoin provides the foundation for critically important
                  public data, such as open access scientific data, creative
                  commons media, historical archives, preservation, and more.
                </Text>
                <Box>
                  <Button colorScheme="blue">Start Storing Data</Button>
                </Box>
              </Stack>
            </WrapItem>
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

export default clientLanding;
