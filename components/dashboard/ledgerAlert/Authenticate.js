import {
  Button,
  Box,
  Text,
  Spacer,
  Heading,
  Image,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  HStack,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ApolloClient, InMemoryCache, gql, useMutation } from "@apollo/client";
import { request } from "graphql-request";
import useSwr, { mutate, trigger } from "swr";
import { useGlobalState } from "../../../state";

const Authenticate = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [clval, setClval] = useState("");
  const [clIcon, setClIcon] = useState("");
  const [clText, setClText] = useState(
    "Please accept the address displayed on your ledger device",
  );
  // "Please connect your ledger device of the same address to authenticate",

  // const [currMinerID, setCurrMinerID] = useState("");
  // const [currLedgerAddress, setCurrLedgerAddress] = useState("");
  const [isSignedIn, setIsSignedIn] = useGlobalState("isSignedIn");
  return (
    <>
      <ModalContent textAlign="center" p="5">
        <ModalHeader alignItems="center">
          <Heading size="lg" color="gray.900">
            Authentication {clval}
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack>
            <Image src={clIcon} pb="6" mx="auto" w="20" />
            <HStack>
              <Box
                p="2"
                width="80%"
                borderRadius="full"
                bg="blue.100"
                color="blue.900"
                mb="6"
                mx="auto"
              >
                <Text fontWeight="bold">{props.ledgerAddress}</Text>
              </Box>
            </HStack>
            <Text justifyContent="justify" color="gray.600">
              {/* Above address will be used for authentication. Please check that you
            have ledger device of the above address. */}
              {clText}
            </Text>
          </VStack>
        </ModalBody>

        <ModalFooter>
          {/* <Button onClick={onClose} w="36">
            Discard
          </Button> 
          <Spacer />*/}
          <Button
            colorScheme="blue"
            w="50vw"
            onClick={() => {
              console.log("props", props, "url", process.env.BACKEND_URL);
              fetch("https://miner-marketplace-backend-2.onrender.com/query", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  query: `mutation {
                    claimProfile (
                      input: { minerID: "${props.minerID}", ledgerAddress: "${props.ledgerAddress}" }
                    )
                  }`,
                }),
              })
                .then((r) => {
                  console.log("rrrr", r);
                  return r.json();
                })
                .then((data) => {
                  console.log("data returned:", data.data.claimProfile);
                  const reqClaim = data.data.claimProfile;
                  if (reqClaim) {
                    setClval(" successful");
                    setClText(
                      "Owner authentication successful!",
                    );
                    setClIcon("/images/AuthSuccess.svg");
                    setIsSignedIn(true);
                  } else {
                    setClval(" failed");
                    setClIcon("/images/AuthFail.svg");
                    setClText(
                      "Owner authentication failed.",
                    );
                  }
                })
                .catch((e) => {
                  console.log(e);
                  setClval(" failed");
                  setClIcon("/images/AuthFail.svg");
                  setClText(
                    "Owner authentication failed.",
                  );
                });
            }}
            type="submit"
            // onSubmit={submitForClaim}
          >
            Continue
          </Button>
        </ModalFooter>
      </ModalContent>
    </>
  );
};

export default Authenticate;
