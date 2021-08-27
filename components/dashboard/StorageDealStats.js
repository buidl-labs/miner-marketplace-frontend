import {
  Grid,
  GridItem,
  Heading,
  VStack,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  HStack,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import {
  GetFormattedFILUnits,
  GetFormattedStorageUnits,
  GetSimpleUSDUnits,
} from "../../util/util";

function StorageDealStats(props) {
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

  return (
    <>
      <VStack textAlign="left" alignItems="left" pb="24">
        <Heading size="lg" color="blue.700" my={6}>
          Storage Deal Stats
        </Heading>

        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(3, 1fr)" }}
          gap={1}
        >
          <GridItem colSpan="3" pb={{ base: 8, lg: 4 }}>
            <HStack textAlign="left" alignItems="left" spacing="7">
              <Stat>
                <StatLabel fontSize="lg" fontWeight="medium" color="gray.700">
                  Average Deal Price
                </StatLabel>
                <StatNumber color="blue.700" fontWeight="normal" fontSize="3xl">
                  {GetFormattedFILUnits(props.averagePrice)}
                </StatNumber>
                <StatHelpText color="gray.600" fontSize="lg" pt="2">
                  {GetSimpleUSDUnits(
                    Math.round(
                      ((props.averagePrice * filecoinUSDRate) / 10 ** 18 +
                        Number.EPSILON) *
                        100,
                    ) / 100,
                  )}
                </StatHelpText>
              </Stat>
              <Stat>
                <StatLabel fontSize="lg" color="gray.600">
                  Amount of Data Stored
                </StatLabel>
                <StatNumber color="blue.700" fontWeight="normal" fontSize="3xl">
                  {GetFormattedStorageUnits(props.dataStored)}
                </StatNumber>
                <StatHelpText color="gray.600" fontSize="lg" pt="2">
                  / {GetFormattedStorageUnits(props.qap)}
                </StatHelpText>
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
                  {(parseFloat(props.successRate) * 100).toFixed(2)}%
                </StatNumber>
              </Stat>
            </HStack>
          </GridItem>

          <GridItem colSpan="2">
            <hr />
          </GridItem>

          <GridItem colSpan="3" pt="8">
            <HStack textAlign="left" alignItems="left" spacing="4" pb="6">
              <Stat>
                <StatLabel fontSize="md" color="gray.600">
                  Total Number of Storage Deals
                </StatLabel>
                <StatNumber color="gray.700" fontWeight="medium" fontSize="lg">
                  {props.total}
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
            </HStack>

            <HStack textAlign="left" alignItems="left" spacing="4">
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
                  Number of Terminated Deals
                </StatLabel>
                <StatNumber color="gray.700" fontWeight="medium" fontSize="lg">
                  {props.terminated}
                </StatNumber>
              </Stat>
            </HStack>
          </GridItem>
        </Grid>
      </VStack>
    </>
  );
}

export default StorageDealStats;
