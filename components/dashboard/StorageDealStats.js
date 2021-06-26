import {
  Grid,
  GridItem,
  Heading,
  Stack,
  VStack,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  HStack,
  Text,
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

        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(3, 1fr)" }}
          gap={1}
        >
          <GridItem colSpan="1" pb={{ base: 8, lg: 2 }}>
            <VStack textAlign="left" alignItems="left" spacing="7">
              <Stat>
                <StatLabel fontSize="lg" fontWeigth="medium" color="gray.700">
                  Average Deal Price
                </StatLabel>
                <StatNumber color="blue.700" fontWeight="normal" fontSize="3xl">
                  {(Number(props.averagePrice) / 10 ** 9).toFixed(3)} nanoFIL
                </StatNumber>
              </Stat>
              <Stat>
                <StatLabel fontSize="lg" color="gray.600">
                  Amount of Data Stored
                </StatLabel>
                <StatNumber color="blue.700" fontWeight="normal" fontSize="3xl">
                  {(parseInt(props.dataStored) / 10 ** 12).toFixed(3)} TB
                </StatNumber>
              </Stat>
              <Stat>
                <StatLabel fontSize="lg" color="gray.600">
                  Success Rate
                </StatLabel>
                <StatNumber
                  color="green.600"
                  fontWeight="normal"
                  fontSize="3xl"
                >
                  {(parseFloat(props.successRate) * 100).toFixed(3)}%
                </StatNumber>
              </Stat>
            </VStack>
          </GridItem>
          {/*<Stat pl="4">
              <StatLabel fontSize="md" color="gray.600" >
                faultTerminated
              </StatLabel>
              <StatNumber color="blue.700">{props.faultTerminated}</StatNumber>
            </Stat>*/}
          <GridItem>
            <VStack textAlign="left" alignItems="left" spacing="4">
              <Stat>
                <StatLabel fontSize="md" color="gray.600">
                  Number of Times Slashed
                </StatLabel>
                <StatNumber color="gray.700" fontWeight="medium" fontSize="lg">
                  {props.slashed}
                </StatNumber>
              </Stat>
              <Stat>
                <StatLabel fontSize="md" color="gray.600">
                  Number of Successful Storage Deals
                </StatLabel>
                <StatNumber color="gray.700" fontWeight="medium" fontSize="lg">
                  {props.noPenalties}
                </StatNumber>
              </Stat>
              <Stat>
                <StatLabel fontSize="md" color="gray.600">
                  Number of Terminated Deals
                </StatLabel>
                <StatNumber color="gray.700" fontWeight="medium" fontSize="lg">
                  {props.terminated}
                </StatNumber>
              </Stat>
              <Stat>
                <StatLabel fontSize="md" color="gray.600">
                  Total Number of Storage Deals
                </StatLabel>
                <StatNumber color="gray.700" fontWeight="medium" fontSize="lg">
                  {props.total}
                </StatNumber>
              </Stat>
            </VStack>
          </GridItem>
        </Grid>
      </VStack>
    </>
  );
}

export default StorageDealStats;
