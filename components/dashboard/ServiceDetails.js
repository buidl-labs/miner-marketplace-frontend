import { Heading, Stack, Tag, Text, HStack, Wrap } from "@chakra-ui/react";
import React from "react";

function ServiceDetails(props) {
  return (
    <>
      <Stack alignItems="flex-start" spacing="8" mt="8">
        <Heading size="lg" color="blue.900">
          Service Offered
        </Heading>
        <HStack spacing="16">
          <Stack spacing="6">
            <Text size="lg" color="blue.900">
              Type of Service
            </Text>
            <Text size="lg" color="blue.900">
              Data Transfer Mechanism
            </Text>
            <Text size="lg" color="blue.900">
              Type of Service
            </Text>
          </Stack>
          <Stack spacing="4">
            <Wrap>
              <Tag size="lg" borderRadius="full" colorScheme="green">
                Online
              </Tag>
              <Tag size="lg" borderRadius="full" colorScheme="orange">
                Offline
              </Tag>
            </Wrap>
            <Wrap>
              <Tag size="lg" borderRadius="full" colorScheme="yellow">
                Storage
              </Tag>
              <Tag size="lg" borderRadius="full" colorScheme="purple">
                Retrieval
              </Tag>
              <Tag size="lg" borderRadius="full" colorScheme="pink">
                Repair
              </Tag>
            </Wrap>
            <Wrap>
              <Text color="blue.600" fontWeight="medium">
                {props.serviceLocation}
              </Text>
            </Wrap>
          </Stack>
        </HStack>

        <Heading size="lg" color="blue.900" my="8" pt="6">
          Ask Price
        </Heading>
        <HStack spacing="16">
          <Stack spacing="6">
            <Text size="lg" color="blue.900">
              Storage Ask Price
            </Text>
            <Text size="lg" color="blue.900">
              Verified Storage Ask Price
            </Text>
            <Text size="lg" color="blue.900">
              Retrieval Ask Price
            </Text>
          </Stack>
          <Stack spacing="4" textAlign="center">
            <Wrap>
              <Text fontSize="2xl" color="gray.700">
                {props.storageAskPrice}
              </Text>
              <Text fontSize="sm" color="gray.500">
                FIL/Gib/epoch
              </Text>
            </Wrap>
            <Wrap>
              <Text fontSize="2xl" color="gray.700">
                {props.verifiedAskPrice}
              </Text>
              <Text fontSize="sm" color="gray.500">
                FIL/Gib/epoch
              </Text>
            </Wrap>
            <Wrap>
              <Text fontSize="2xl" color="gray.700">
                {props.retrievalAskPrice}
              </Text>
              <Text fontSize="sm" color="gray.500">
                FIL/Gib/epoch
              </Text>
            </Wrap>
          </Stack>
        </HStack>
      </Stack>
    </>
  );
}

export default ServiceDetails;
