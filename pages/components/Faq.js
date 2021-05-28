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

const Faq = (props) => {
  return (
    <AccordionItem p="2">
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            {props.question}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>{props.answer}</AccordionPanel>
    </AccordionItem>
  );
};

export default Faq;
