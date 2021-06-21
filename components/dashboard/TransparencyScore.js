import { Flex, HStack, Progress, Stack, Text } from "@chakra-ui/react";
import { Icon, IconProps, CheckCircleIcon } from "@chakra-ui/icons";
import React from "react";

function TransparencyScore() {
  return (
    <>
      <Stack py="8">
        <HStack alignItems="center">
          <Text fontSize="md" fontWeight="medium" color="gray.600">
            Complete your Profile to increase your Transparency-Score:
          </Text>
          <Text fontWeight="bold" color="blue.600" fontSize="3xl">
            64
          </Text>
          <Text fontSize="sm" color="gray.600">
            /100
          </Text>
        </HStack>
        <Progress value={64} borderRadius="xl" colorScheme="blue" />
        <Flex justifyContent="space-between">
          <HStack color="gray.400">
            <CheckCircleIcon h={4} w={4} />
            <Text>Verified</Text>
          </HStack>
          <HStack color="gray.400">
            <CheckCircleIcon h={4} w={4} />
            <Text>Name</Text>
          </HStack>
          <HStack color="gray.400">
            <CheckCircleIcon h={4} w={4} />
            <Text>Email Address</Text>
          </HStack>
          <HStack color="gray.400">
            <CheckCircleIcon h={4} w={4} />
            <Text>Website</Text>
          </HStack>
          <HStack color="gray.400">
            <CheckCircleIcon h={4} w={4} />
            <Text>Slack</Text>
          </HStack>
          <HStack color="gray.400">
            <CheckCircleIcon h={4} w={4} />
            <Text>Twitter</Text>
          </HStack>
          <HStack color="gray.400">
            <CheckCircleIcon h={4} w={4} />
            <Text>Bio</Text>
          </HStack>
          <HStack color="gray.400">
            <CheckCircleIcon h={4} w={4} />
            <Text>Service Details</Text>
          </HStack>
        </Flex>
      </Stack>
    </>
  );
}

export default TransparencyScore;
