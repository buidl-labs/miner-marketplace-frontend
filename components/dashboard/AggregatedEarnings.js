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
import * as Fathom from "fathom-client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import {
  GetFormattedFILUnits,
  GetSimpleFILUnits,
  GetSimpleUSDUnits,
} from "../../util/util";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

function AggregatedEarnings(props, { filecoinToUSDRate }) {
  const [filecoinUSDRate, setFilecoinUSDRate] = useState(filecoinToUSDRate);

  return (
    <>
      <VStack textAlign="left" alignItems="left" pb="24">
        <Heading size="lg" color="blue.700" my={6} pl="4">
          Aggregated Earnings
        </Heading>

        {/* <Text>Quality Adjusted Power</Text>
        <Text>{props.qap}</Text> */}

        <Stack>
          <VStack alignItems="left">
            <Accordion allowMultiple>
              <AccordionItem py={2}>
                <h2>
                  <AccordionButton>
                    <Stat alignItems="left" textAlign="left">
                      <StatLabel fontSize="md" color="gray.600" mb="2">
                        Aggregate Income
                      </StatLabel>
                      <StatNumber
                        color="green.600"
                        fontWeight="normal"
                        fontSize="3xl"
                      >
                        {GetSimpleFILUnits(props.totalIncome)}
                      </StatNumber>
                      <StatHelpText>$filecoinToUSDRate</StatHelpText>
                    </Stat>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <HStack textAlign="left" alignItems="left" spacing="24">
                    <Stack>
                      <Text fontSize="md" color="gray.600">
                        Storage Deals Payments:
                      </Text>
                      <Text color="gray.700" fontWeight="medium" fontSize="lg">
                        {GetSimpleFILUnits(props.storageDeal)}
                      </Text>
                      <Text color="gray.600">$filecoinToUSDRate</Text>
                    </Stack>
                    <Stack>
                      <Text fontSize="md" color="gray.600">
                        Block Rewards:
                      </Text>
                      <Text color="gray.700" fontWeight="medium" fontSize="lg">
                        {GetSimpleFILUnits(props.blockRewards)}
                      </Text>
                      <Text color="gray.600">$filecoinToUSDRate</Text>
                    </Stack>
                  </HStack>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem py={2}>
                <h2>
                  <AccordionButton>
                    <Stat textAlign="left">
                      <StatLabel fontSize="md" color="gray.600" mb="2">
                        Aggregate Expenditure
                      </StatLabel>
                      <StatNumber
                        color="red.600"
                        fontWeight="normal"
                        fontSize="3xl"
                      >
                        {GetSimpleFILUnits(props.totalExpenditure)}
                      </StatNumber>
                      <StatHelpText>$filecoinToUSDRate</StatHelpText>
                    </Stat>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <HStack
                    textAlign="left"
                    alignItems="left"
                    justify="space-between"
                    alignItems="left"
                  >
                    <Stack>
                      <Text fontSize="md" color="gray.600">
                        Collateral Deposit:
                      </Text>
                      <Text color="gray.700" fontWeight="medium" fontSize="lg">
                        {GetSimpleFILUnits(props.deposits)}
                      </Text>
                      <Text color="gray.600">$filecoinToUSDRate</Text>
                    </Stack>
                    <Stack>
                      <Text fontSize="md" color="gray.600">
                        Gas:
                      </Text>
                      <Text color="gray.700" fontWeight="medium" fontSize="lg">
                        {GetSimpleFILUnits(props.gas)}
                      </Text>
                      <Text color="gray.600">$filecoinToUSDRate</Text>
                    </Stack>
                    <Stack>
                      <Text fontSize="md" color="gray.600">
                        Penalty:
                      </Text>
                      <Text color="gray.700" fontWeight="medium" fontSize="lg">
                        {GetSimpleFILUnits(props.penalty)}
                      </Text>
                      <Text color="gray.600">$filecoinToUSDRate</Text>
                    </Stack>
                    <Stack>
                      <Text fontSize="md" color="gray.600">
                        Others:
                      </Text>
                      <Text color="gray.700" fontWeight="medium" fontSize="lg">
                        {GetSimpleFILUnits(props.others)}
                      </Text>
                      <Text color="gray.600">$filecoinToUSDRate</Text>
                    </Stack>
                  </HStack>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>

            <Stat pl="4">
              <StatLabel fontSize="md" color="gray.600" mb="2">
                Net Aggregate Earnings
              </StatLabel>
              <StatNumber color="blue.700" fontWeight="normal" fontSize="3xl">
                {GetSimpleFILUnits(props.netEarnings)}
              </StatNumber>
              <StatHelpText>$filecoinToUSDRate</StatHelpText>
            </Stat>
          </VStack>
        </Stack>
      </VStack>
    </>
  );
}

export default AggregatedEarnings;

export async function getServerSideProps() {
  console.log(process.env.BACKEND_URL);
  const client = new ApolloClient({
    uri: process.env.BACKEND_URL,
    cache: new InMemoryCache(),
  });
  let res1 = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=filecoin&vs_currencies=usd"
  );
  console.log("ressssS", res1);
  const res2 = await res1.json();
  console.log("rjsoon", res2);
  console.log("fusd", res2.filecoin.usd);
  // .then((res) => res.json())
  // .then((r) => {
  //   // console.log(r.filecoin.usd);
  //   setFilecoinUSDRate(r.filecoin.usd);
  // });

  return {
    props: {
      filecoinToUSDRate: res2.filecoin.usd,
    },
  };
}
