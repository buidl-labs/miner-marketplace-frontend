import {
  Box,
  Heading,
  HStack,
  VStack,
  Stack,
  Text,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

function QuoteCalculator(props) {
  const [storageDuration, setStorageDuration] = useState(6);
  const [storageAmount, setStorageAmount] = useState(10);
  const [filecoinUSDRate, setFilecoinUSDRate] = useState(0);

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=filecoin&vs_currencies=usd"
    )
      .then((res) => res.json())
      .then((r) => {
        console.log(r.filecoin.usd);
        setFilecoinUSDRate(r.filecoin.usd);
      });
  }, []);

  return (
    <>
      <Box
        border="solid 2px #E2E8F0"
        borderRadius="2xl"
        p="10"
        w={{ base: "auto", lg: "30vw" }}
      >
        <Heading size="lg" color="blue.700">
          Quote Calculator
        </Heading>
        <HStack spacing="2" alignItems="center">
          <Text fontSize="5xl" color="blue.900">
            {Math.round(
              ((storageDuration *
                30 *
                2880 *
                storageAmount *
                props.storageAskPrice) /
                10 ** 18 +
                Number.EPSILON) *
                1000
            ) / 1000}
          </Text>
          <Text fontSize="2xl" color="gray.600">
            FIL
          </Text>
        </HStack>
        <Stack color="gray.600" size="md">
          <Text>
            (${" "}
            {Math.round(
              ((storageDuration *
                30 *
                2880 *
                storageAmount *
                props.storageAskPrice *
                filecoinUSDRate) /
                10 ** 18 +
                Number.EPSILON) *
                1000
            ) / 1000}
            )
          </Text>
          <Text>Estimated Quote</Text>
        </Stack>
        <VStack spacing="6" pt="6" alignItems="flex-start">
          <FormControl id="storage">
            <FormLabel>Amount of Storage (in GiB)</FormLabel>
            <Input
              type="number"
              placeholder="Enter amount of Storage"
              value={storageAmount}
              onChange={(event) => setStorageAmount(event.target.value)}
            />
          </FormControl>
          <FormControl id="time">
            <FormLabel>Duration of Storage (in months)</FormLabel>
            <Input
              type="number"
              placeholder="Enter duration of Storage"
              value={storageDuration}
              onChange={(event) => setStorageDuration(event.target.value)}
            />
          </FormControl>
          {/*<Button colorScheme="blue" px="8">
            {" "}
            Calculate Quote
            </Button>*/}
        </VStack>
      </Box>
    </>
  );
}

export default QuoteCalculator;
