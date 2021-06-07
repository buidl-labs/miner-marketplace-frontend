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

const minerLanding = () => {
  return (
    <>
      <Navbar />
      <Container maxW="container.xl" mb="16">
        <Stack spacing="28">
          {/* Hero Section */}
          <Hero
            heroImg="/images/minerHero.svg"
            heroHeading="Provide Storage Services & Earn Rewards"
            heroText="The Filecoin network is designed to reward participants at multiple levels — from large scale data centers to local entrepreneurs with mining rigs that cover the last mile."
            ctaText="Become a Miner"
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
              featureIcon="/images/censorship.svg"
              featureTitle="Censorship resistance"
              featureDescription="Filecoin resists censorship because no central provider can be coerced into deleting files or withholding service."
            />
            <Features
              featureIcon="/images/minerrewards.svg"
              featureTitle="Rewards"
              featureDescription="Storing more files is directly related to winning more block rewards. The more storage you add, the more filecoin you’ll earn."
            />
            <Features
              featureIcon="/images/minercommunity.svg"
              featureTitle="Active community"
              featureDescription="Filecoin has an active community of contributors to answer questions and help newcomers get started."
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
              <Heading size="2xl" color="white">
                Filecoin Miners in Numbers
              </Heading>

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
              Start your Miner Journey
            </Heading>
            <HStack color="gray.700" spacing="12" justifyContent="center">
              <JoinNetwork
                cardHeading="Become a Miner"
                cardText="Want to join Filecoin network as a miner, click the link below to get started."
                ctaText="Become a Miner"
                ctaVariant="outline"
              />
              <JoinNetwork
                cardHeading="Already a Miner? Claim Profile"
                cardText="If you are already a registered miner, claim your profile to see your storage stats and earning details in intuitive way."
                ctaText="Claim Profile"
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

export default minerLanding;
