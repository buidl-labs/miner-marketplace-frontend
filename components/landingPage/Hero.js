import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Image,
  VStack,
  Stack,
  Heading,
  Text,
  Spacer,
  WrapItem,
} from "@chakra-ui/react";
import React from "react";
import { Icon, IconProps, ArrowForwardIcon } from "@chakra-ui/icons";

const Hero = (props) => {
  return (
    <Stack pt="36">
      <HStack>
        <Stack spacing="4">
          <Heading size="3xl" lineHeight="1.2" color="gray.900">
            {props.heroHeading}
          </Heading>
          <Text maxW="30vw" color="gray.700">
            {props.heroText}
          </Text>
          <Box>
            <Button
              size="lg"
              variant="link"
              colorScheme="blue"
              textDecoration="underline"
            >
              {props.ctaText} <ArrowForwardIcon h={6} w={6} marginLeft={2} />
            </Button>
          </Box>
        </Stack>
        <Image src={props.heroImg} />
      </HStack>
    </Stack>
  );
};

export default Hero;
