import {
  Heading,
  Stack,
  Tag,
  Text,
  HStack,
  Wrap,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import {
  GetFormattedStorageUnits,
  GetFormattedFILUnits,
  GetSimpleFILUnits,
  GetSimpleUSDUnits,
} from "../../util/util";
import { Countries } from "../../util/raw";

let countries = Countries();

function ServiceDetails(props) {
  let serviceType = [];
  if (props.storage)
    serviceType.push(
      <Tag
        key="str"
        size="lg"
        borderRadius="full"
        bg="blue.50"
        color="blue.700"
      >
        Storage
      </Tag>
    );
  if (props.retrieval)
    serviceType.push(
      <Tag
        key="ret"
        size="lg"
        borderRadius="full"
        bg="purple.50"
        color="purple.700"
      >
        Retrieval
      </Tag>
    );
  if (props.repair)
    serviceType.push(
      <Tag key="rep" size="lg" borderRadius="full" colorScheme="gray">
        Repair
      </Tag>
    );

  let dataTransferMechanism = [];
  if (props.online)
    dataTransferMechanism.push(
      <Tag key="online" size="lg" borderRadius="full" colorScheme="green">
        Online
      </Tag>
    );
  if (props.offline)
    dataTransferMechanism.push(
      <Tag key="offline" size="lg" borderRadius="full" colorScheme="gray">
        Offline
      </Tag>
    );

  return (
    <>
      <Stack alignItems="flex-start" spacing="8" my="8" ml="-3" pb="24">
        <Heading size="lg" color="blue.700">
          Service Offering
        </Heading>
        <HStack spacing="16">
          <Stack spacing="6">
            <Text size="lg" color="blue.900">
              Data Transfer Mechanism
            </Text>
            <Text size="lg" color="blue.900">
              Type of Service
            </Text>
            <Text size="lg" color="blue.900">
              Location
            </Text>
          </Stack>
          <Stack spacing="4">
            <Wrap>{dataTransferMechanism}</Wrap>
            <Wrap>{serviceType}</Wrap>
            <Wrap>
              {props.region && (
                <Text color="blue.600" fontWeight="medium">
                  {countries[props.country]} ({props.region})
                </Text>
              )}
              {!props.region && (
                <Text color="blue.600" fontWeight="medium">
                  -
                </Text>
              )}
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
            <HStack>
              <Text fontSize="2xl" color="gray.700">
                {GetFormattedFILUnits(props.storageAskPrice).split(" ")[0]}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {GetFormattedFILUnits(props.storageAskPrice).split(" ")[1]}
                /GiB/epoch
              </Text>
            </HStack>
            <HStack>
              {/*<Text fontSize="2xl" color="gray.700">
                {props.verifiedAskPrice / 10 ** 18}
              </Text>*/}
              <Text fontSize="sm" color="gray.500" textAlign="left">
                Requirement dependent. Contact storage provider directly for
                estimates
              </Text>
            </HStack>
            <HStack>
              {/*<Text fontSize="2xl" color="gray.700">
                {props.retrievalAskPrice}
              </Text>*/}
              <Text fontSize="sm" color="gray.500" textAlign="left">
                Requirement dependent. Contact storage provider directly for
                estimates
              </Text>
            </HStack>
          </Stack>
        </HStack>
      </Stack>
    </>
  );
}

export default ServiceDetails;
