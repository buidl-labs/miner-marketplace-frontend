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
import { GetFormattedFILUnits } from "../../util/util";

function AggregatedEarnings(props) {
  const [filecoinUSDRate, setFilecoinUSDRate] = useState(0);

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=filecoin&vs_currencies=usd",
    )
      .then((res) => res.json())
      .then((r) => {
        // console.log(r.filecoin.usd);
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
        <Heading size="lg" color="blue.700" my={6} pl="4">
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
                {GetFormattedFILUnits(props.netEarnings)}
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
                        {GetFormattedFILUnits(props.totalIncome)}
                      </StatNumber>
                    </Stat>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <VStack textAlign="left" alignItems="left" spacing="4">
                    <Stack>
                      <Text fontSize="md" color="gray.600" mb="-2">
                        Storage Deals Payments:
                      </Text>
                      <Text color="gray.700" fontWeight="medium" fontSize="lg">
                        {GetFormattedFILUnits(props.storageDeal)}
                      </Text>
                    </Stack>
                    <Stack>
                      <Text fontSize="md" color="gray.600" mb="-2">
                        Block Rewards:
                      </Text>
                      <Text color="gray.700" fontWeight="medium" fontSize="lg">
                        {GetFormattedFILUnits(props.blockRewards)}
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
                        {GetFormattedFILUnits(props.totalExpenditure)}
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
                      <Text fontSize="md" color="gray.600" mb="-2">
                        Collateral Deposit:
                      </Text>
                      <Text color="gray.700" fontWeight="medium" fontSize="lg">
                        {GetFormattedFILUnits(props.deposits)}
                      </Text>
                    </Stack>
                    <Stack>
                      <Text fontSize="md" color="gray.600" mb="-2">
                        Gas:
                      </Text>
                      <Text color="gray.700" fontWeight="medium" fontSize="lg">
                        {GetFormattedFILUnits(props.gas)}
                      </Text>
                    </Stack>
                    <Stack>
                      <Text fontSize="md" color="gray.600" mb="-2">
                        Penalty:
                      </Text>
                      <Text color="gray.700" fontWeight="medium" fontSize="lg">
                        {GetFormattedFILUnits(props.penalty)}
                      </Text>
                    </Stack>
                    <Stack>
                      <Text fontSize="md" color="gray.600" mb="-2">
                        Others:
                      </Text>
                      <Text color="gray.700" fontWeight="medium" fontSize="lg">
                        {GetFormattedFILUnits(props.others)}
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
