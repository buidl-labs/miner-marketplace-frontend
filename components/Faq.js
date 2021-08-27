import {
  Box,
  AccordionPanel,
  AccordionButton,
  AccordionItem,
  AccordionIcon,
} from "@chakra-ui/react";
import React from "react";
import PropTypes from "prop-types";

const Faq = ({ question, answer }) => (
  <AccordionItem>
    <h2>
      <AccordionButton py="4">
        <Box flex="1" textAlign="left" mx="1">
          {question}
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel mb={2}>{answer}</AccordionPanel>
  </AccordionItem>
);

Faq.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
};

export default Faq;
