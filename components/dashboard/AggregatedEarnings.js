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

function AggregatedEarnings(props) {
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
      <VStack
        textAlign="left"
        alignItems="left"
        w={{ base: "full", lg: "60%" }}
      >
        <Heading size="lg" color="blue.800" my={6} pl="4">
          Aggregated Earnings
        </Heading>

        {/* <Text>Quality Adjusted Power</Text>
        <Text>{props.qap}</Text> */}

        <Stack>
          <VStack alignItems="left">
            <Stat pl="4">
              <StatLabel fontSize="md" color="gray.600" mb="2">
                Net Aggregate Earnings
              </StatLabel>
              <StatNumber color="blue.700" fontWeight="normal" fontSize="3xl">
                {(Number(props.netEarnings) / 10 ** 18).toFixed(3)} FIL
              </StatNumber>
              {/*<StatHelpText>
              ($ {Math.round(props.netEarnings * filecoinUSDRate)})
            </StatHelpText>*/}
            </Stat>

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
                        {(Number(props.totalIncome) / 10 ** 18).toFixed(3)} FIL
                      </StatNumber>
                    </Stat>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <VStack textAlign="left" alignItems="left">
                    <Stack>
                      <Text fontSize="md" color="gray.600">
                        Storage Deals Payments:
                      </Text>
                      <Text color="gray.700" fontWeight="medium" fontSize="lg">
                        {(Number(props.storageDeal) / 10 ** 18).toFixed(3)}
                      </Text>
                    </Stack>
                    <Stack>
                      <Text fontSize="md" color="gray.600">
                        Block Rewards:
                      </Text>
                      <Text color="gray.700" fontWeight="medium" fontSize="lg">
                        {(Number(props.blockRewards) / 10 ** 18).toFixed(3)}
                      </Text>
                    </Stack>
                  </VStack>
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
                        {(Number(props.totalExpenditure) / 10 ** 18).toFixed(3)}{" "}
                        FIL
                      </StatNumber>
                    </Stat>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <VStack
                    textAlign="left"
                    alignItems="left"
                    spacing="4"
                    alignItems="left"
                  >
                    <Stack>
                      <Text fontSize="md" color="gray.600">
                        Collateral Deposit:
                      </Text>
                      <Text color="gray.700" fontWeight="medium" fontSize="lg">
                        {(Number(props.deposits) / 10 ** 18).toFixed(3)}
                      </Text>
                    </Stack>
                    <Stack>
                      <Text fontSize="md" color="gray.600">
                        Gas:
                      </Text>
                      <Text color="gray.700" fontWeight="medium" fontSize="lg">
                        {(Number(props.gas) / 10 ** 18).toFixed(3)}
                      </Text>
                    </Stack>
                    <Stack>
                      <Text fontSize="md" color="gray.600">
                        Penalty:
                      </Text>
                      <Text color="gray.700" fontWeight="medium" fontSize="lg">
                        {(Number(props.penalty) / 10 ** 18).toFixed(3)}
                      </Text>
                    </Stack>
                    <Stack>
                      <Text fontSize="md" color="gray.600">
                        Others:
                      </Text>
                      <Text color="gray.700" fontWeight="medium" fontSize="lg">
                        {(Number(props.others) / 10 ** 18).toFixed(3)}
                      </Text>
                    </Stack>
                  </VStack>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </VStack>
        </Stack>
      </VStack>
    </>
  );
}

export default AggregatedEarnings;
