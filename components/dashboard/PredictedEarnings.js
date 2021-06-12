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

function PredictedEarnings(props) {
  const [filecoinUSDRate, setFilecoinUSDRate] = useState(0);

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=filecoin&vs_currencies=usd",
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
        <Heading size="lg" color="blue.700" my={4}>
          Predicted Earnings
        </Heading>

        <Stack>
          <VStack alignItems="left">
            <Stat>
              <StatLabel fontSize="lg">
                Net Estimated Earnings (next 60 days)
              </StatLabel>
              <StatNumber color="blue.700">
                {(Number(props.netEarnings) / 10 ** 18).toFixed(3)} FIL
              </StatNumber>
              {/*<StatHelpText>
            ($ {Math.round(props.netEarnings * filecoinUSDRate)})
          </StatHelpText>*/}
            </Stat>
            <hr />
            <Stat alignItems="left">
              <StatLabel fontSize="lg">
                Total Estimated Income (next 60 days)
              </StatLabel>
              <StatNumber color="green.600">
                {(Number(props.totalIncome) / 10 ** 18).toFixed(3)} FIL
              </StatNumber>
              {/*<StatHelpText>
                ($ {Math.round(props.totalIncome * filecoinUSDRate)})
              </StatHelpText>*/}
            </Stat>
            <VStack textAlign="left" alignItems="left">
              <HStack>
                <Text>Existing Deals</Text>
                <Text>{(Number(props.existing) / 10 ** 18).toFixed(3)}</Text>
              </HStack>
              <HStack>
                <Text>Potential Future Deals</Text>
                <Text>{(Number(props.potential) / 10 ** 18).toFixed(3)}</Text>
              </HStack>
              <HStack>
                <Text>Block Rewards</Text>
                <Text>
                  {(Number(props.blockRewards) / 10 ** 18).toFixed(3)}
                </Text>
              </HStack>
              <HStack>
                <Text>Days until eligible</Text>
                <Text>{(Number(props.days) / 10 ** 18).toFixed(3)}</Text>
              </HStack>
            </VStack>
            <hr />
            <Stat>
              <StatLabel fontSize="lg">
                Total Estimated Expenditure (next 60 days)
              </StatLabel>
              <StatNumber color="red.600">
                {(Number(props.totalExpenditure) / 10 ** 18).toFixed(3)} FIL
              </StatNumber>
              {/*<StatHelpText>
                ($ {Math.round(props.totalExpenditure * filecoinUSDRate)})
              </StatHelpText>*/}
            </Stat>
            <VStack textAlign="left" alignItems="left">
              <HStack>
                <Text>Collateral Deposit</Text>
                <Text>{(Number(props.deposits) / 10 ** 18).toFixed(3)}</Text>
              </HStack>
              <HStack>
                <Text>Gas</Text>
                <Text>{(Number(props.gas) / 10 ** 18).toFixed(3)}</Text>
              </HStack>
              <HStack>
                <Text>Penalty</Text>
                <Text>{(Number(props.penalty) / 10 ** 18).toFixed(3)}</Text>
              </HStack>
              <HStack>
                <Text>Others</Text>
                <Text>{(Number(props.others) / 10 ** 18).toFixed(3)}</Text>
              </HStack>
            </VStack>
          </VStack>
        </Stack>
      </VStack>
    </>
  );
}

export default PredictedEarnings;
