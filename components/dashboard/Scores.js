import {
  Box,
  Heading,
  Text,
  Spacer,
  Wrap,
  WrapItem,
  Stack,
  HStack,
  VStack,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import { Info } from "react-feather";

function Scores(props) {
  return (
    <>
      <Box border="solid 2px #E2E8F0" borderRadius="2xl" p="12" ml="6" h="full">
        <Heading color="blue.700" size="lg" fontWeight="bold" pb="4">
          Scores
        </Heading>

        <HStack spacing="12">
          <VStack alignItems="left">
            <WrapItem alignItems="baseline">
              <Text fontSize="4xl" color="blue.600" pr="1">
                {props.reputationScore}
              </Text>
              <Text size="sm" color="gray.500">
                /100
              </Text>
            </WrapItem>
            <WrapItem alignItems="center" color="gray.600">
              <Text size="md" pr="2">
                Reputation Score
              </Text>
              <Tooltip
                label="Reputation scores are based on..."
                aria-label="Reputation Scores"
              >
                <Info width="18" />
              </Tooltip>
            </WrapItem>
          </VStack>
          <Spacer />
          <VStack alignItems="left">
            <WrapItem alignItems="baseline">
              <Text fontSize="4xl" color="blue.600" pr="1">
                {props.transparencyScore}
              </Text>
              <Text size="sm" color="gray.500">
                /100
              </Text>
            </WrapItem>
            <WrapItem alignItems="center" color="gray.600">
              <Text size="md" pr="2">
                Transparency Score
              </Text>
              <Tooltip
                label="Transparency scores are based on..."
                aria-label="Transparency Scores"
              >
                <Info width="18" />
              </Tooltip>
            </WrapItem>
          </VStack>
        </HStack>
      </Box>
    </>
  );
}

export default Scores;
