import {
  Box,
  Heading,
  HStack,
  VStack,
  Stack,
  Text,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import React from "react";

function QuoteCalculator() {
  return (
    <>
      <Box mt="4">
        <Heading size="lg" color="blue.900">
          Quote Calculator
        </Heading>
        <HStack spacing="2" alignItems="center">
          <Text fontSize="5xl" color="blue.900">
            0
          </Text>
          <Text fontSize="2xl" color="gray.600">
            FIL
          </Text>
        </HStack>
        <Stack color="gray.600" size="md">
          <Text>($0)</Text>
          <Text>Estimated Quote</Text>
        </Stack>
        <VStack spacing="2" pt="6" alignItems="left">
          <FormControl id="storage">
            <FormLabel>Amount of Storage (in Gib)</FormLabel>
            <Input type="number" placeholder="Enter amount of Storage" />
          </FormControl>
          <FormControl id="time">
            <FormLabel>Duration of Storage (in months)</FormLabel>
            <Input type="number" placeholder="Enter duration of Storage" />
          </FormControl>
          <Button colorScheme="blue"> Calculate Quote</Button>
        </VStack>
      </Box>
    </>
  );
}

export default QuoteCalculator;
