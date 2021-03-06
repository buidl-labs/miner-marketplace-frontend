import { Flex, HStack, Progress, Stack, Text } from "@chakra-ui/react";
import { Icon, IconProps, CheckCircleIcon } from "@chakra-ui/icons";
import React from "react";

function TransparencyScore(props) {
  return (
    <>
      <Stack py="8">
        <HStack alignItems="center">
          <Text fontSize="md" fontWeight="medium" color="gray.600">
            Complete your Profile to increase your Transparency Score:
          </Text>
          <Text fontWeight="bold" color="blue.600" fontSize="3xl">
            {props.transparencyScore}
          </Text>
          <Text fontSize="sm" color="gray.600">
            /100
          </Text>
        </HStack>
        <Progress
          value={props.transparencyScore}
          borderRadius="xl"
          colorScheme="orange"
        />
        <Flex justifyContent="space-between">
          <HStack color={props.transparencyScore > 0 ? "orange" : "gray.400"}>
            <CheckCircleIcon h={4} w={4} />
            <Text>Verified</Text>
          </HStack>
          <HStack
            color={
              props.name != "" && props.name != null ? "orange" : "gray.400"
            }
          >
            <CheckCircleIcon h={4} w={4} />
            <Text>Name</Text>
          </HStack>
          <HStack
            color={
              props.email != "" && props.email != null ? "orange" : "gray.400"
            }
          >
            <CheckCircleIcon h={4} w={4} />
            <Text>Email Address</Text>
          </HStack>
          <HStack
            color={
              props.website != "" && props.website != null
                ? "orange"
                : "gray.400"
            }
          >
            <CheckCircleIcon h={4} w={4} />
            <Text>Website</Text>
          </HStack>
          <HStack
            color={
              props.slack != "" && props.slack != null ? "orange" : "gray.400"
            }
          >
            <CheckCircleIcon h={4} w={4} />
            <Text>Slack</Text>
          </HStack>
          <HStack
            color={
              props.twitter != "" && props.twitter != null
                ? "orange"
                : "gray.400"
            }
          >
            <CheckCircleIcon h={4} w={4} />
            <Text>Twitter</Text>
          </HStack>
          <HStack
            color={props.bio != "" && props.bio != null ? "orange" : "gray.400"}
          >
            <CheckCircleIcon h={4} w={4} />
            <Text>Bio</Text>
          </HStack>
          <HStack color={props.transparencyScore > 0 ? "orange" : "gray.400"}>
            <CheckCircleIcon h={4} w={4} />
            <Text>Service Details</Text>
          </HStack>
        </Flex>
      </Stack>
    </>
  );
}

export default TransparencyScore;
