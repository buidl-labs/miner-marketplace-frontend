import {
  Box,
  Heading,
  HStack,
  VStack,
  Stack,
  Text,
  Button,
  Input,
  InputGroup,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import Select from "react-select";
import React, { useState, useEffect } from "react";

import {
  GetFormattedStorageUnits,
  GetFormattedFILUnits,
} from "../../util/util";

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
        //console.log(r.filecoin.usd);
        setFilecoinUSDRate(r.filecoin.usd);
      });
  }, []);

  let storageAskPrice = props.storageAskPrice;
  if (props.storageAskPrice == "") {
    storageAskPrice = 0;
  }

  const dStorageAmount = [
    { label: "MB", value: "MB" },
    { label: "GB", value: "GB" },
    { label: "TB", value: "TB" },
    { label: "PB", value: "PB" },
  ];
  const dStorageDuration = [
    { label: "Months", value: "Months" },
    { label: "Years", value: "Years" },
  ];

  const customStyles = {
    control: (Base) => ({
      ...Base,
      backgroundColor: "#F7FAFC",
      width: "6.4rem",
      height: "3rem",
      borderRadius: "0rem 0.4rem 0.4rem 0rem",
      borderLeft: "none",
      borderColor: "#E2E8F0",
    }),
  };

  return (
    <>
      <Box
        bg="gray.100"
        borderRadius="2xl"
        p="10"
        w={{ base: "auto", lg: "30vw" }}
      >
        <Heading size="lg" color="blue.700">
          Quote Calculator
        </Heading>
        <HStack spacing="2" alignItems="center">
          <Text fontSize="5xl" color="blue.900">
            {
              GetFormattedFILUnits(
                storageDuration *
                  30 *
                  2880 *
                  storageAmount *
                  parseInt(storageAskPrice)
              ).split(" ")[0]
            }
            {/*{Math.round(
              ((storageDuration *
                30 *
                2880 *
                storageAmount *
                props.storageAskPrice) /
                10 ** 18 +
                Number.EPSILON) *
                100,
              ) / 100}*/}
          </Text>
          <Text fontSize="2xl" color="gray.600">
            {
              GetFormattedFILUnits(
                storageDuration *
                  30 *
                  2880 *
                  storageAmount *
                  parseInt(storageAskPrice)
              ).split(" ")[1]
            }
          </Text>
        </HStack>
        <Stack color="gray.600" size="md">
          <Text>
            $
            {Math.round(
              ((storageDuration *
                30 *
                2880 *
                storageAmount *
                props.storageAskPrice *
                filecoinUSDRate) /
                10 ** 18 +
                Number.EPSILON) *
                100
            ) / 100}
          </Text>
          <Text>Estimated Quote</Text>
        </Stack>
        <VStack spacing="6" pt="6" alignItems="flex-start">
          <FormControl id="storage">
            <FormLabel>Amount of Storage (in GiB)</FormLabel>
            <InputGroup
              height="fit-content"
              alignContent="center"
              alignItems="center"
            >
              <Input
                bg="white"
                type="number"
                size="lg"
                placeholder="Enter amount of Storage"
                value={storageAmount}
                onChange={(event) => setStorageAmount(event.target.value)}
                borderRight="none"
                borderRadius="0.4rem 0rem 0rem 0.4rem"
              />
              <Select
                options={dStorageAmount}
                defaultValue={dStorageAmount[1]}
                isClearable={false}
                isSearchable={false}
                styles={customStyles}
              />
            </InputGroup>
          </FormControl>
          <FormControl id="time">
            <FormLabel>Duration of Storage (in months)</FormLabel>
            <InputGroup
              height="fit-content"
              alignContent="center"
              alignItems="center"
            >
              <Input
                bg="white"
                type="number"
                size="lg"
                placeholder="Enter duration of Storage"
                value={storageDuration}
                onChange={(event) => setStorageDuration(event.target.value)}
                borderRight="none"
                borderRadius="0.4rem 0rem 0rem 0.4rem"
              />
              <Select
                options={dStorageDuration}
                defaultValue={dStorageDuration[0]}
                isClearable={false}
                isSearchable={false}
                styles={customStyles}
              />
            </InputGroup>
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
