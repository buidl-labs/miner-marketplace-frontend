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

function PredictedEarnings(props) {
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
      <VStack textAlign="left" alignItems="left">
        <Heading size="lg" color="blue.700" my={6}>
          Predicted Earnings
        </Heading>

        <Stack>
          <VStack alignItems="left">
            <Stat pl={4}>
              <StatLabel fontSize="md" color="gray.600" mb="2">
                Net Estimated Earnings (next 60 days)
              </StatLabel>
              <StatNumber color="blue.700">
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
                        Total Estimated Income (next 60 days)
                      </StatLabel>
                      <StatNumber color="green.600">
                        {(Number(props.totalIncome) / 10 ** 18).toFixed(3)} FIL
                      </StatNumber>
                    </Stat>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <VStack textAlign="left" alignItems="left">
                    <HStack>
                      <Text>Existing Deals:</Text>
                      <Text>
                        {(Number(props.existing) / 10 ** 18).toFixed(3)}
                      </Text>
                    </HStack>
                    <HStack>
                      <Text>Potential Future Deals:</Text>
                      <Text>
                        {(Number(props.potential) / 10 ** 18).toFixed(3)}
                      </Text>
                    </HStack>
                    <HStack>
                      <Text>Block Rewards:</Text>
                      <Text>
                        {(Number(props.blockRewards) / 10 ** 18).toFixed(3)}
                      </Text>
                    </HStack>
                    <HStack>
                      <Text>Days until eligible for block rewards:</Text>
                      <Text>{props.days}</Text>
                    </HStack>
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
                      <StatNumber color="red.600">
                        {(Number(props.totalExpenditure) / 10 ** 18).toFixed(3)}{" "}
                        FIL
                      </StatNumber>
                    </Stat>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <VStack textAlign="left" alignItems="left">
                    <HStack>
                      <Text>Collateral Deposit:</Text>
                      <Text>
                        {(Number(props.deposits) / 10 ** 18).toFixed(3)}
                      </Text>
                    </HStack>
                    <HStack>
                      <Text>Gas:</Text>
                      <Text>{(Number(props.gas) / 10 ** 18).toFixed(3)}</Text>
                    </HStack>
                    <HStack>
                      <Text>Penalty:</Text>
                      <Text>
                        {(Number(props.penalty) / 10 ** 18).toFixed(3)}
                      </Text>
                    </HStack>
                    <HStack>
                      <Text>Others:</Text>
                      <Text>
                        {(Number(props.others) / 10 ** 18).toFixed(3)}
                      </Text>
                    </HStack>
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
