import { Heading, Stack, Tag, Text, HStack, Wrap } from "@chakra-ui/react";
import React from "react";

function ServiceDetails(props) {
  let serviceType = [];
  if (props.storage)
    serviceType.push(
      <Tag key="str" size="lg" borderRadius="full" colorScheme="yellow">
        Storage
      </Tag>,
    );
  if (props.retrieval)
    serviceType.push(
      <Tag key="ret" size="lg" borderRadius="full" colorScheme="purple">
        Retrieval
      </Tag>,
    );
  if (props.repair)
    serviceType.push(
      <Tag key="rep" size="lg" borderRadius="full" colorScheme="pink">
        Repair
      </Tag>,
    );

  let dataTransferMechanism = [];
  if (props.online)
    dataTransferMechanism.push(
      <Tag key="online" size="lg" borderRadius="full" colorScheme="green">
        Online
      </Tag>,
    );
  if (props.offline)
    dataTransferMechanism.push(
      <Tag key="offline" size="lg" borderRadius="full" colorScheme="orange">
        Offline
      </Tag>,
    );

  return (
    <>
      <Stack alignItems="flex-start" spacing="8" mt="8">
        <Heading size="lg" color="blue.700">
          Service Offering
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
              Location
            </Text>
          </Stack>
          <Stack spacing="4">
            <Wrap>{serviceType}</Wrap>
            <Wrap>{dataTransferMechanism}</Wrap>
            <Wrap>
              <Text color="blue.600" fontWeight="medium">
                {props.serviceLocation}
              </Text>
            </Wrap>
          </Stack>
        </HStack>

        <Heading size="lg" color="blue.700" my="8" pt="6">
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
                {props.storageAskPrice / 10 ** 18}
              </Text>
              <Text fontSize="sm" color="gray.500">
                FIL/GiB/epoch
              </Text>
            </Wrap>
            <Wrap>
              <Text fontSize="2xl" color="gray.700">
                {props.verifiedAskPrice / 10 ** 18}
              </Text>
              <Text fontSize="sm" color="gray.500">
                FIL/GiB/epoch
              </Text>
            </Wrap>
            <Wrap>
              <Text fontSize="2xl" color="gray.700">
                {props.retrievalAskPrice}
              </Text>
              <Text fontSize="sm" color="gray.500">
                FIL/B
              </Text>
            </Wrap>
          </Stack>
        </HStack>
      </Stack>
    </>
  );
}

export default ServiceDetails;
