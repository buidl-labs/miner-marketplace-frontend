import {
  Box,
  Heading,
  HStack,
  VStack,
  Stack,
  Text,
  Input,
  InputGroup,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import Select from "react-select";
import React, { useState, useEffect } from "react";

import { GetSimpleFILUnits, GetSimpleUSDUnits } from "../../util/util";

function QuoteCalculator(props) {
  const [storageDuration, setStorageDuration] = useState(6);
  const [storageAmount, setStorageAmount] = useState(10);
  const [storageDurationText, setStorageDurationText] = useState(6);
  const [storageAmountText, setStorageAmountText] = useState(10);

  const [filecoinUSDRate, setFilecoinUSDRate] = useState(0);

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=filecoin&vs_currencies=usd",
    )
      .then((res) => res.json())
      .then((r) => {
        setFilecoinUSDRate(r.filecoin.usd);
      });
  }, []);

  let { storageAskPrice } = props;
  if (props.storageAskPrice === "") {
    storageAskPrice = 0;
  }

  const dStorageUnitsArr = [
    { label: "MB", value: "MB" },
    { label: "GB", value: "GB" },
    { label: "TB", value: "TB" },
    { label: "PB", value: "PB" },
  ];
  const dStorageDurationUnitsArr = [
    { label: "Months", value: "Months" },
    { label: "Years", value: "Years" },
  ];

  const [dStorageUnits, setDStorageUnits] = useState(dStorageUnitsArr[1]);
  const [dStorageDurationUnits, setDStorageDurationUnits] = useState(
    dStorageDurationUnitsArr[0],
  );

  const handleStorageUnitsChange = (event) => {
    setDStorageUnits(event);
    let finalSA = storageAmountText;

    if (event.value === "MB") {
      finalSA *= 0.001 * 0.931323;
    } else if (event.value === "GB") {
      finalSA *= 0.931323;
    } else if (event.value === "TB") {
      finalSA *= 1000 * 0.931323;
    } else if (event.value === "PB") {
      finalSA *= 1000000 * 0.931323;
    }
    setStorageAmount(finalSA);
  };
  const handleStorageDurationUnitsChange = (event) => {
    setDStorageDurationUnits(event);
    let finalSD = storageDurationText;

    if (event.value === "Years") {
      finalSD *= 12;
    }
    setStorageDuration(finalSD);
  };

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
        mr="-3"
        w={{ base: "auto", lg: "30vw" }}
        mb="24"
      >
        <Heading size="lg" color="blue.700">
          Estimated Quote
        </Heading>
        <HStack spacing="2" alignItems="center">
          <Text fontSize="5xl" color="blue.900">
            {
              GetSimpleFILUnits(
                storageDuration *
                  30 *
                  2880 *
                  storageAmount *
                  parseInt(storageAskPrice, 10),
              ).split(" ")[0]
            }
            {/* {Math.round(
              ((storageDuration *
                30 *
                2880 *
                storageAmount *
                props.storageAskPrice) /
                10 ** 18 +
                Number.EPSILON) *
                100,
            ) / 100} */}
          </Text>
          <Text fontSize="2xl" color="gray.600">
            {
              GetSimpleFILUnits(
                storageDuration *
                  30 *
                  2880 *
                  storageAmount *
                  parseInt(storageAskPrice, 10),
              ).split(" ")[1]
            }
          </Text>
        </HStack>
        <Stack color="gray.600" size="md">
          <Text fontSize="xl">
            {GetSimpleUSDUnits(
              Math.round(
                ((storageDuration *
                  30 *
                  2880 *
                  storageAmount *
                  props.storageAskPrice *
                  filecoinUSDRate) /
                  10 ** 18 +
                  Number.EPSILON) *
                  100,
              ) / 100,
            )}
          </Text>
          {/* <Text>Estimated Quote</Text> */}
        </Stack>
        <VStack spacing="6" pt="6" alignItems="flex-start">
          <FormControl id="storage">
            <FormLabel>Storage Amount</FormLabel>
            <InputGroup
              height="fit-content"
              alignContent="center"
              alignItems="center"
            >
              <Input
                bg="white"
                type="number"
                size="lg"
                placeholder={`Storage amount in ${dStorageUnits.value}`}
                value={storageAmountText}
                onChange={(event) => {
                  let finalSA = event.target.value;
                  setStorageAmountText(event.target.value);
                  if (dStorageUnits.value === "MB") {
                    finalSA *= 0.001 * 0.931323;
                  } else if (dStorageUnits.value === "GB") {
                    finalSA *= 0.931323;
                  } else if (dStorageUnits.value === "TB") {
                    finalSA *= 1000 * 0.931323;
                  } else if (dStorageUnits.value === "PB") {
                    finalSA *= 1000000 * 0.931323;
                  }

                  setStorageAmount(finalSA);
                }}
                borderRight="none"
                borderRadius="0.4rem 0rem 0rem 0.4rem"
              />
              <Select
                options={dStorageUnitsArr}
                value={dStorageUnits}
                onChange={handleStorageUnitsChange}
                isClearable={false}
                isSearchable={false}
                styles={customStyles}
              />
            </InputGroup>
          </FormControl>
          <FormControl id="time">
            <FormLabel>Storage Duration</FormLabel>
            <InputGroup
              height="fit-content"
              alignContent="center"
              alignItems="center"
            >
              <Input
                bg="white"
                type="number"
                size="lg"
                placeholder={`Storage duration in ${dStorageDurationUnits.value}`}
                value={storageDurationText}
                onChange={(event) => {
                  let finalSD = event.target.value;
                  setStorageDurationText(event.target.value);
                  if (dStorageDurationUnits.value === "Years") {
                    finalSD *= 12;
                  }

                  setStorageDuration(finalSD);
                }}
                borderRight="none"
                borderRadius="0.4rem 0rem 0rem 0.4rem"
              />
              <Select
                options={dStorageDurationUnitsArr}
                value={dStorageDurationUnits}
                onChange={handleStorageDurationUnitsChange}
                isClearable={false}
                isSearchable={false}
                styles={customStyles}
              />
            </InputGroup>
          </FormControl>
        </VStack>
      </Box>
    </>
  );
}

export default QuoteCalculator;
