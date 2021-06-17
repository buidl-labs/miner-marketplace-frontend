import {
  Heading,
  Stack,
  VStack,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  HStack,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

function StorageDealStats(props) {
  return (
    <>
      <VStack textAlign="left" alignItems="left">
        <Heading size="lg" color="blue.700" my={6}>
          Storage Deal Stats
        </Heading>

        <Stack>
          <VStack alignItems="left">
            <Stat pl="4">
              <StatLabel fontSize="md" color="gray.600" mb="2">
                Average Deal Price
              </StatLabel>
              <StatNumber color="blue.700">
                {(Number(props.averagePrice) / 10 ** 9).toFixed(3)} nanoFIL
              </StatNumber>
            </Stat>
            <Stat pl="4">
              <StatLabel fontSize="md" color="gray.600" mb="2">
                Amount of Data Stored
              </StatLabel>
              <StatNumber color="blue.700">
                {(parseInt(props.dataStored) / 10 ** 12).toFixed(3)} TB
              </StatNumber>
            </Stat>
            <Stat pl="4">
              <StatLabel fontSize="md" color="gray.600" mb="2">
                Success Rate
              </StatLabel>
              <StatNumber color="blue.700">
                {(parseFloat(props.successRate) * 100).toFixed(3)}%
              </StatNumber>
            </Stat>
            {/*<Stat pl="4">
              <StatLabel fontSize="md" color="gray.600" mb="2">
                faultTerminated
              </StatLabel>
              <StatNumber color="blue.700">{props.faultTerminated}</StatNumber>
            </Stat>*/}
            <Stat pl="4">
              <StatLabel fontSize="md" color="gray.600" mb="2">
                Number of Times Slashed
              </StatLabel>
              <StatNumber color="blue.700">{props.slashed}</StatNumber>
            </Stat>
            <Stat pl="4">
              <StatLabel fontSize="md" color="gray.600" mb="2">
                Number of Successful Storage Deals
              </StatLabel>
              <StatNumber color="blue.700">{props.noPenalties}</StatNumber>
            </Stat>
            <Stat pl="4">
              <StatLabel fontSize="md" color="gray.600" mb="2">
                Number of Terminated Deals
              </StatLabel>
              <StatNumber color="blue.700">{props.terminated}</StatNumber>
            </Stat>
            <Stat pl="4">
              <StatLabel fontSize="md" color="gray.600" mb="2">
                Total Number of Storage Deals
              </StatLabel>
              <StatNumber color="blue.700">{props.total}</StatNumber>
            </Stat>
          </VStack>
        </Stack>
      </VStack>
    </>
  );
}

export default StorageDealStats;
