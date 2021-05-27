import {
  Stack,
  Heading,
  Text,
  Box,
  AccordionPanel,
  AccordionButton,
  Accordion,
  AccordionItem,
  AccordionIcon,
} from "@chakra-ui/react";
import React from "react";

const Faq = () => {
  return (
    <Stack textAlign="center" alignItems="center" spacing="16">
      <Heading size="lg">Frequently Asked Questions</Heading>
      <Stack w="48rem" textAlign="left">
        <Accordion allowToggle="false">
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Question 1
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Question2
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Stack>
    </Stack>
  );
};

export default Faq;
