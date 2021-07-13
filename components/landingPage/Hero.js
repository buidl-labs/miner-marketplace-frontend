import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Image,
  Link,
  VStack,
  Stack,
  Heading,
  Text,
  Spacer,
  SimpleGrid,
  WrapItem,
  Center,
  GridItem,
} from "@chakra-ui/react";
import React from "react";
import { Icon, IconProps, ArrowForwardIcon } from "@chakra-ui/icons";
import * as Fathom from "fathom-client";
import { trackGoal } from "../../util/analytics";

const Hero = (props) => {
  return (
    <Stack pt="36" pb={{ base: 16, md: 0 }}>
      <HStack>
        <Stack spacing="4">
          <Heading size="3xl" lineHeight="1.2" color="gray.900">
            {props.heroHeading}
          </Heading>
          <Text maxW={{ base: "full", md: "75%" }} color="gray.700">
            {props.heroText}
          </Text>
          <Box>
            <Button
              size="lg"
              variant="link"
              colorScheme="blue"
              textDecoration="underline"
              onClick={typeof window != "undefined" && Fathom.trackGoal('HNOIHGME', 0)}
            >
              <Link href={props.ctaLink} onClick={props.ctaRoute} isExternal>
                {props.ctaText} <ArrowForwardIcon h={6} w={6} marginLeft={2} /></Link>
            </Button>
          </Box>
        </Stack>
        <Image
          src={props.heroImg}
          alt={props.heroAlt}
          width={{ base: "0%", md: "50%" }}
          display={{ base: "none", md: "block" }}
        />
      </HStack>
    </Stack>
  );
};

export default Hero;
