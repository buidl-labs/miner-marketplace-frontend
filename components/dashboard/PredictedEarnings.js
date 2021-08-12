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
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { GetFormattedFILUnits, GetSimpleFILUnits } from "../../util/util";

function PredictedEarnings(props) {
  const [filecoinUSDRate, setFilecoinUSDRate] = useState(0);

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=filecoin&vs_currencies=usd",
    )
      .then((res) => res.json())
      .then((r) => {
        //console.log(r.filecoin.usd);
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
          Predicted Earnings
        </Heading>

        <Stack>
          <VStack alignItems="left">
            <Stat pl={4}>
              <StatLabel fontSize="md" color="gray.600" mb="2">
                Net Estimated Earnings (next 60 days)
              </StatLabel>
              <StatNumber color="blue.700" fontWeight="normal" fontSize="3xl">
                {GetSimpleFILUnits(props.netEarnings)}
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
                        Total Estimated Income (next 60 days)
                      </StatLabel>
                      <StatNumber
                        color="green.600"
                        fontWeight="normal"
                        fontSize="3xl"
                      >
                        {GetSimpleFILUnits(props.totalIncome)}
                      </StatNumber>
                    </Stat>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <VStack textAlign="left" alignItems="left" spacing="4">
                    <Stack>
                      <Text fontSize="md" color="gray.600" mb="-2">
                        Existing Deals:
                      </Text>
                      <Text color="gray.700" fontWeight="medium" fontSize="lg">
                        {GetSimpleFILUnits(props.existing)}
                      </Text>
                    </Stack>
                    <Stack>
                      <Text fontSize="md" color="gray.600" mb="-2">
                        Potential Future Deals:
                      </Text>
                      <Text color="gray.700" fontWeight="medium" fontSize="lg">
                        {GetSimpleFILUnits(props.potential)}
                      </Text>
                    </Stack>
                    <Stack>
                      <Text fontSize="md" color="gray.600" mb="-2">
                        Block Rewards:
                      </Text>
                      <Text color="gray.700" fontWeight="medium" fontSize="lg">
                        {GetSimpleFILUnits(props.blockRewards)}
                      </Text>
                    </Stack>
                    <Stack>
                      <Text fontSize="md" color="gray.600" mb="-2">
                        Days until eligible for block rewards:
                      </Text>
                      <Text color="gray.700" fontWeight="medium" fontSize="lg">
                        {props.days}
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
                        Total Estimated Expenditure (next 60 days)
                      </StatLabel>
                      <StatNumber
                        color="red.600"
                        fontWeight="normal"
                        fontSize="3xl"
                      >
                        {GetSimpleFILUnits(props.totalExpenditure)}
                      </StatNumber>
                    </Stat>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <VStack textAlign="left" alignItems="left" spacing="4">
                    <Stack>
                      <Text fontSize="md" color="gray.600" mb="-2">
                        Collateral Deposit:
                      </Text>
                      <Text color="gray.700" fontWeight="medium" fontSize="lg">
                        {GetSimpleFILUnits(props.deposits)}
                      </Text>
                    </Stack>
                    <Stack>
                      <Text fontSize="md" color="gray.600" mb="-2">
                        Gas:
                      </Text>
                      <Text color="gray.700" fontWeight="medium" fontSize="lg">
                        {GetSimpleFILUnits(props.gas)}
                      </Text>
                    </Stack>
                    <Stack>
                      <Text fontSize="md" color="gray.600" mb="-2">
                        Penalty:
                      </Text>
                      <Text color="gray.700" fontWeight="medium" fontSize="lg">
                        {GetSimpleFILUnits(props.penalty)}
                      </Text>
                    </Stack>
                    <Stack>
                      <Text fontSize="md" color="gray.600" mb="-2">
                        Others:
                      </Text>
                      <Text color="gray.700" fontWeight="medium" fontSize="lg">
                        {GetSimpleFILUnits(props.others)}
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

export default PredictedEarnings;
