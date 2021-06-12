import {
  Heading,
  Stack,
  VStack,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  HStack,
  Text,
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
      <VStack textAlign="left" alignItems="left">
        <Heading mb={4}>Aggregated Earnings</Heading>
        <Text>Quality Adjusted Power</Text>
        <Text>{props.qap}</Text>

        <Stack>
          <VStack alignItems="left">
            <Stat alignItems="left">
              <StatLabel>Total Estimated Income</StatLabel>
              <StatNumber>{props.totalIncome}FIL</StatNumber>
              <StatHelpText>
                ($ {Math.round(props.totalIncome * filecoinUSDRate)})
              </StatHelpText>
            </Stat>
            <VStack textAlign="left" alignItems="left">
              <HStack>
                <Text>Storage Deals Payments</Text>
                <Text>{props.storageDeal}</Text>
              </HStack>
              <HStack>
                <Text>Block Rewards</Text>
                <Text>{props.blockRewards}</Text>
              </HStack>
            </VStack>
            <hr />
            <Stat>
              <StatLabel>Total Estimated Expenditure</StatLabel>
              <StatNumber>{props.totalExpenditure} FIL</StatNumber>
              <StatHelpText>
                ($ {Math.round(props.totalExpenditure * filecoinUSDRate)})
              </StatHelpText>
            </Stat>
            <VStack textAlign="left" alignItems="left">
              <HStack>
                <Text>Collateral Deposit</Text>
                <Text>{props.deposits}</Text>
              </HStack>
              <HStack>
                <Text>Gas</Text>
                <Text>{props.gas}</Text>
              </HStack>
              <HStack>
                <Text>Penalty</Text>
                <Text>{props.penalty}</Text>
              </HStack>
              <HStack>
                <Text>Others</Text>
                <Text>{props.others}</Text>
              </HStack>
            </VStack>
            <hr />
            <Stat>
              <StatLabel>Net Estimated Income</StatLabel>
              <StatNumber>{props.netEarnings} FIL</StatNumber>
              <StatHelpText>
                ($ {Math.round(props.netEarnings * filecoinUSDRate)})
              </StatHelpText>
            </Stat>
          </VStack>
        </Stack>
      </VStack>
    </>
  );
}

export default AggregatedEarnings;
