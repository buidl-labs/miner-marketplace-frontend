import {
  Heading,
  HStack,
  Stack,
  Text,
  Image,
  Box,
  Center,
} from "@chakra-ui/react";
import React from "react";

const Features = (props) => (
  <>
    <Center py="12">
      <HStack
        alignItems="center"
        textAlign="center"
        spacing="24"
        maxW={{ lg: "80%", md: "50%" }}
      >
        <Stack textAlign="left">
          <Heading size="lg">{props.featureTitle}</Heading>
          <Text size="xs">{props.featureDescription}</Text>
        </Stack>
        <Box>
          <Image
            src={props.featureImg}
            maxW="28rem"
            objectFit="cover"
            alt="feature GIF"
          />
        </Box>
      </HStack>
    </Center>
  </>
);

export default Features;
