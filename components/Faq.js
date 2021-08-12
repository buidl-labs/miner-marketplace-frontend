import {
  Box,
  AccordionPanel,
  AccordionButton,
  AccordionItem,
  AccordionIcon,
} from "@chakra-ui/react";
import React from "react";

const Faq = (props) => {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton py="4">
          <Box flex="1" textAlign="left" mx="1">
            {props.question}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel mb={2}>{props.answer}</AccordionPanel>
    </AccordionItem>
  );
};

export default Faq;
