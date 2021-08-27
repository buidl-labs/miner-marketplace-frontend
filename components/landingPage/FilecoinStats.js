import {
  Box,
  Stack,
  HStack,
  VStack,
  Center,
  Text,
  Heading,
  WrapItem,
} from "@chakra-ui/react";
import React from "react";

const FilecoinStats = (props) => (
    <>
      <Center>
        <Stack alignItems="center">
          <HStack>
            <Heading size="3xl" color="white">
              {props.count}
            </Heading>
            <Text size="md" color="white">
              {props.countText}
            </Text>
          </HStack>
          <Text size="xs" color="white">
            {props.subtext}
          </Text>
        </Stack>
      </Center>
    </>
  );

export default FilecoinStats;
