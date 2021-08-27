import {
  Heading,
  Stack,
  IconButton,
  VStack,
  HStack,
  Text,
  Switch,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ArrowUpIcon } from "@chakra-ui/icons";
import * as Fathom from "fathom-client";
import "antd/dist/antd.css";
import PropTypes from "prop-types";

import BasicView from "./dashboard/transaction/BasicView";
import AdvanceView from "./dashboard/transaction/AdvanceView";

export default function TransactionHistory({ minerID }) {
  const [toggle, setToggle] = useState(false);

  function handleTxnToggle() {
    return toggle ? setToggle(false) : setToggle(true);
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <>
      <Stack pb="16">
        <IconButton
          icon={<ArrowUpIcon h={8} w={8} />}
          aria-label="go to top"
          color="gray.600"
          bg="gray.100"
          border="2px solid #CBD5E0"
          boxShadow="xl"
          isRound
          onClick={scrollToTop}
          right="8"
          bottom="8"
          position="fixed"
          w={12}
          h={12}
          zIndex="10"
        />
        <HStack justifyContent="space-between" mb="8" alignItems="center">
          <VStack alignItems="left">
            <Heading size="lg" color="blue.700" mt="6" pl="4">
              Transaction History
            </Heading>
          </VStack>
          <HStack>
            <Switch
              id="transactionView"
              onChange={handleTxnToggle}
              isChecked={toggle}
              onClick={() => {
                if (typeof window !== "undefined") {
                  Fathom.trackGoal("ZV5EW6GM", 0);
                }
              }}
            />
            <Text fontSize="lg" fontWeight="medium" color="gray.600">
              Advanced view
            </Text>
          </HStack>
        </HStack>
        {toggle && (
          <>
            <AdvanceView minerID={minerID} />
          </>
        )}
        {!toggle && (
          <>
            <BasicView minerID={minerID} />
          </>
        )}
      </Stack>
    </>
  );
}

TransactionHistory.propTypes = {
  minerID: PropTypes.string.isRequired,
};
