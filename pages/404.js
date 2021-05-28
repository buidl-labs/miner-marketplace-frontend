import {
  Box,
  Container,
  Image,
  Stack,
  Heading,
  Button,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/landingPage/Footer";
import { useRouter } from "next/router";

const Error = () => {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <Container
        maxW="container.lg"
        alignItems="center"
        textAlign="center"
        justifyContent="center"
      >
        <Stack textAlign="center" alignItems="center" mb="12" mt="-4">
          <Image src="images/Error.svg" maxW="72" />
          <VStack spacing="4">
            <h1
              style={{
                fontSize: "8rem",
                fontWeight: "900",
                margin: "-4rem 0 -2rem 0",
                color: "#1A365D",
              }}
            >
              404
            </h1>
            <Text size="2xl" color="gray.700">
              We can’t seem to find the page you are looking for
            </Text>
            <Box>
              <Button
                colorScheme="blue"
                variant="outline"
                onClick={() => router.push("/minerLanding")}
              >
                Go to Homepage
              </Button>
            </Box>
          </VStack>
        </Stack>
      </Container>

      <Footer />
    </>
  );
};

export default Error;
