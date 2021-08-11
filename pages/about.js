import {
  Image,
  Center,
  Container,
  Box,
  Flex,
  Text,
  Heading,
  Link,
  Stack,
  VStack,
  HStack,
  Spacer,
  SimpleGrid,
  GridItem,
  VisuallyHidden,
  Grid,
} from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import Footer from "../components/landingPage/Footer";
import Head from "next/head";
import { CopyIcon, Icon, IconProps, QuestionIcon } from "@chakra-ui/icons";
import { FaLinkedinIn, FaTwitter, FaGlobe, FaGithub } from "react-icons/fa";

const about = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>About Us - Team DataStation</title>
      </Head>
      <Navbar />
      <Container maxW="container.xl" mb="40" pt="28">
        <Stack textAlign="center" py="12">
          <Heading size="2xl" color="gray.900" pb="2">
            We are BUIDL-ers!
          </Heading>
          <Text color="blue.700" fontSize="lg">
            We like building, especially to help humanity get to the future
            faster.
          </Text>
          <Text size="sm" color="gray.500">
            Project DataStation's team is part of{" "}
            <Link href="https://buidllabs.io" isExternal color="blue.500">
              BUIDL Labs
            </Link>
          </Text>
        </Stack>
        <Stack alignItems="center" textAlign="center">
          <Heading size="xl" color="gray.900" textAlign="center" pt="8" pb="12">
            Core Team
          </Heading>
          {/* Team member Card */}
          <Grid
            templateColumns={{ md: "repeat(2,1fr)", base: "repeat(1,1fr)" }}
            gap={16}
          >
            <GridItem colSpan="1">
              <HStack alignItems="flex-start" spacing="6" w="32rem">
                <Image src="/images/team/saumay.png" maxW="28" alt="dp" />
                <VStack alignItems="flex-start">
                  <Heading size="md" color="gray.800">
                    Saumay Agrawal
                  </Heading>
                  <Text size="4" color="color.600" fontWeight="medium">
                    Project Lead
                  </Text>
                  <Text pb="2" textAlign="left">
                    A technopreneur thriving at the bleeding edge of cyberspace.
                    Building in Web3/blockchain space at present.
                  </Text>
                  <HStack spacing="6">
                    <Link href="https://twitter.com/saumay_agrawal" isExternal>
                      <Icon as={FaTwitter} h={5} w={5} color="gray.600" />
                    </Link>
                    <Link
                      href="https://www.linkedin.com/in/saumayagrawal/"
                      isExternal
                    >
                      <Icon as={FaLinkedinIn} h={5} w={5} color="gray.600" />
                    </Link>
                    <Link href="https://github.com/Saumay-Agrawal" isExternal>
                      <Icon as={FaGithub} h={5} w={5} color="gray.600" />
                    </Link>
                    <Link href="https://saumay.com" isExternal>
                      <Icon as={FaGlobe} h={5} w={5} color="gray.600" />
                    </Link>
                  </HStack>
                </VStack>
              </HStack>
            </GridItem>

            <GridItem colSpan="1">
              <HStack alignItems="flex-start" spacing="6" w="32rem">
                <Image src="/images/team/rajdeep.png" maxW="28" alt="dp" />
                <VStack alignItems="flex-start">
                  <Heading size="md" color="gray.800">
                    Rajdeep Bharati
                  </Heading>
                  <Text size="4" color="color.600" fontWeight="medium">
                    Research & Engineering Lead
                  </Text>
                  <Text pb="2" textAlign="left">
                    Studying crypto-economic systems that help people play
                    positive sum games.
                  </Text>
                  <HStack spacing="6">
                    <Link href="https://twitter.com/ImRajdeepB" isExternal>
                      <Icon as={FaTwitter} h={5} w={5} color="gray.600" />
                    </Link>
                    <Link
                      href="https://www.linkedin.com/in/rajdeepbharati/"
                      isExternal
                    >
                      <Icon as={FaLinkedinIn} h={5} w={5} color="gray.600" />
                    </Link>
                    <Link href="https://github.com/rajdeepbh" isExternal>
                      <Icon as={FaGithub} h={5} w={5} color="gray.600" />
                    </Link>
                    <Link href="https://rajdeepbharati.com/" isExternal>
                      <Icon as={FaGlobe} h={5} w={5} color="gray.600" />
                    </Link>
                  </HStack>
                </VStack>
              </HStack>
            </GridItem>

            <GridItem colSpan="1">
              <HStack alignItems="flex-start" spacing="6" w="32rem">
                <Image src="/images/team/aayush.png" maxW="28" alt="dp" />
                <VStack alignItems="flex-start">
                  <Heading size="md" color="gray.800">
                    Aayush Saini
                  </Heading>
                  <Text size="4" color="color.600" fontWeight="medium">
                    Design Technologist
                  </Text>
                  <Text pb="2" textAlign="left">
                    Product Designer during day, 3D Artist by Night!
                  </Text>
                  <HStack spacing="6">
                    <Link href="https://twitter.com/aayushsaini_" isExternal>
                      <Icon as={FaTwitter} h={5} w={5} color="gray.600" />
                    </Link>
                    <Link href="https://linkedin.com/in/aayushsaini" isExternal>
                      <Icon as={FaLinkedinIn} h={5} w={5} color="gray.600" />
                    </Link>
                    <Link href="https://github.com/aayushsaini1" isExternal>
                      <Icon as={FaGithub} h={5} w={5} color="gray.600" />
                    </Link>
                    <Link href="https://aayushsaini.me" isExternal>
                      <Icon as={FaGlobe} h={5} w={5} color="gray.600" />
                    </Link>
                  </HStack>
                </VStack>
              </HStack>
            </GridItem>
          </Grid>
        </Stack>

        <Stack pt="32" textAlign="center" alignItems="center" spacing="4">
          <Heading>We are backed by the Best</Heading>
          <Text pb="4" maxW="36rem">
            DataStation is funded by Filecoin.org under Wave 5 of the Filecoin
            Dev Grants Program.{" "}
            <Link
              href="https://filecoin.io/blog/posts/filecoin-dev-grants-waves-4-5-and-gitcoin-grants/"
              isExternal
              color="blue.600"
            >
              See official announcement
            </Link>
          </Text>
          <Link href="https://fil.org" isExternal alt="Filecoin org website">
            <Image
              src="/images/Filecoin-logo.svg"
              w="12rem"
              alt="Filecoin Logo"
            />
          </Link>
        </Stack>
      </Container>
      <Footer />
    </>
  );
};

export default about;
