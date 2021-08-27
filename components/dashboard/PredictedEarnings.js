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
import { GetSimpleFILUnits, GetSimpleUSDUnits } from "../../util/util";

function PredictedEarnings(props) {
  const [filecoinUSDRate, setFilecoinUSDRate] = useState(0);

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=filecoin&vs_currencies=usd"
    )
      .then((res) => res.json())
      .then((r) => {
        setFilecoinUSDRate(r.filecoin.usd);
      });
  }, []);

  function earningColor() {
    if (props.netEarnings >= 0) {
      return "green.600";
    } else {
      return "red.600";
    }
  }

  return (
    <>
      <VStack textAlign="left" alignItems="left" pb="24">
        <Heading size="lg" color="blue.700" my={6} pl="4">
          Predicted Earnings
        </Heading>

        <Stack>
          <VStack alignItems="left">
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
                      <StatHelpText>
                        {GetSimpleUSDUnits(
                          Math.round(
                            ((props.totalIncome * filecoinUSDRate) / 10 ** 18 +
                              Number.EPSILON) *
                              100
                          ) / 100
                        )}
                      </StatHelpText>
                    </Stat>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <HStack
                    textAlign="left"
                    alignItems="left"
                    justify="space-between"
                  >
                    <Stack>
                      <Text fontSize="md" color="gray.600">
                        Existing Deals:
                      </Text>
                      <Text color="gray.700" fontWeight="medium" fontSize="lg">
                        {GetSimpleFILUnits(props.existing)}
                      </Text>
                      <Text color="gray.600">
                        {GetSimpleUSDUnits(
                          Math.round(
                            ((props.existing * filecoinUSDRate) / 10 ** 18 +
                              Number.EPSILON) *
                              100
                          ) / 100
                        )}
                      </Text>
                    </Stack>
                    <Stack>
                      <Text fontSize="md" color="gray.600">
                        Potential Future Deals:
                      </Text>
                      <Text color="gray.700" fontWeight="medium" fontSize="lg">
                        {GetSimpleFILUnits(props.potential)}
                      </Text>
                      <Text color="gray.600">
                        {GetSimpleUSDUnits(
                          Math.round(
                            ((props.potential * filecoinUSDRate) / 10 ** 18 +
                              Number.EPSILON) *
                              100
                          ) / 100
                        )}
                      </Text>
                    </Stack>
                    <Stack>
                      <Text fontSize="md" color="gray.600">
                        Block Rewards:
                      </Text>
                      <Text color="gray.700" fontWeight="medium" fontSize="lg">
                        {GetSimpleFILUnits(props.blockRewards)}
                      </Text>
                      <Text color="gray.600">
                        {GetSimpleUSDUnits(
                          Math.round(
                            ((props.blockRewards * filecoinUSDRate) / 10 ** 18 +
                              Number.EPSILON) *
                              100
                          ) / 100
                        )}
                      </Text>
                    </Stack>
                    <Stack>
                      <Text fontSize="md" color="gray.600">
                        Days until eligible for block rewards:
                      </Text>
                      <Text color="gray.700" fontWeight="medium" fontSize="lg">
                        {props.days}
                      </Text>
                    </Stack>
                  </HStack>
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
                      <StatHelpText>
                        {GetSimpleUSDUnits(
                          Math.round(
                            ((props.totalExpenditure * filecoinUSDRate) /
                              10 ** 18 +
                              Number.EPSILON) *
                              100
                          ) / 100
                        )}
                      </StatHelpText>
                    </Stat>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <HStack
                    textAlign="left"
                    alignItems="left"
                    justify="space-between"
                  >
                    <Stack>
                      <Text fontSize="md" color="gray.600">
                        Collateral Deposit:
                      </Text>
                      <Text color="gray.700" fontWeight="medium" fontSize="lg">
                        {GetSimpleFILUnits(props.deposits)}
                      </Text>
                      <Text color="gray.600">
                        {GetSimpleUSDUnits(
                          Math.round(
                            ((props.deposits * filecoinUSDRate) / 10 ** 18 +
                              Number.EPSILON) *
                              100
                          ) / 100
                        )}
                      </Text>
                    </Stack>
                    <Stack>
                      <Text fontSize="md" color="gray.600">
                        Gas:
                      </Text>
                      <Text color="gray.700" fontWeight="medium" fontSize="lg">
                        {GetSimpleFILUnits(props.gas)}
                      </Text>
                      <Text color="gray.600">
                        {GetSimpleUSDUnits(
                          Math.round(
                            ((props.gas * filecoinUSDRate) / 10 ** 18 +
                              Number.EPSILON) *
                              100
                          ) / 100
                        )}
                      </Text>
                    </Stack>
                    <Stack>
                      <Text fontSize="md" color="gray.600">
                        Penalty:
                      </Text>
                      <Text color="gray.700" fontWeight="medium" fontSize="lg">
                        {GetSimpleFILUnits(props.penalty)}
                      </Text>
                      <Text color="gray.600">
                        {GetSimpleUSDUnits(
                          Math.round(
                            ((props.penalty * filecoinUSDRate) / 10 ** 18 +
                              Number.EPSILON) *
                              100
                          ) / 100
                        )}
                      </Text>
                    </Stack>
                    <Stack>
                      <Text fontSize="md" color="gray.600">
                        Others:
                      </Text>
                      <Text color="gray.700" fontWeight="medium" fontSize="lg">
                        {GetSimpleFILUnits(props.others)}
                      </Text>
                      <Text color="gray.600">
                        {GetSimpleUSDUnits(
                          Math.round(
                            ((props.others * filecoinUSDRate) / 10 ** 18 +
                              Number.EPSILON) *
                              100
                          ) / 100
                        )}
                      </Text>
                    </Stack>
                  </HStack>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>

            <Stat pl={4}>
              <StatLabel fontSize="md" color="gray.600" mb="2">
                Net Estimated Earnings (next 60 days)
              </StatLabel>
              <StatNumber
                color={earningColor()}
                fontWeight="normal"
                fontSize="3xl"
              >
                {GetSimpleFILUnits(props.netEarnings)}
              </StatNumber>
              <StatHelpText>
                {GetSimpleUSDUnits(
                  Math.round(
                    ((props.netEarnings * filecoinUSDRate) / 10 ** 18 +
                      Number.EPSILON) *
                      100
                  ) / 100
                )}
              </StatHelpText>
            </Stat>
          </VStack>
        </Stack>
      </VStack>
    </>
  );
}

export default PredictedEarnings;
