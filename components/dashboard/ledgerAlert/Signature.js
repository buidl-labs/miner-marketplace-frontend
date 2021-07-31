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
  Stack,
  Center,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { IconProps, Icon } from "@chakra-ui/icon";
import { MdContentCopy } from "react-icons/md";
import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import { useGlobalState } from "../../../state";

import { mainnet } from "@filecoin-shipyard/lotus-client-schema";
import { BrowserProvider } from "@filecoin-shipyard/lotus-client-provider-browser";
import { LotusRPC } from "@filecoin-shipyard/lotus-client-rpc";
import * as wasm from "@zondax/filecoin-signing-tools/js";

const Signature = (props) => {
  String.prototype.hexEncode = function () {
    var hex, i;
    var result = "";
    for (i = 0; i < this.length; i++) {
      hex = this.charCodeAt(i).toString(16);
      // result += (hex).slice(-4);
      result += ("0" + hex).slice(-2);
      // result += ("000"+hex).slice(-4);
      // result += " ";
    }
    return result;
  };
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [authMode, setAuthMode] = useGlobalState("authMode");
  const [isSignedIn, setIsSignedIn] = useGlobalState("isSignedIn");
  const [messageText, setMessageText] = useState("Hello, world!");
  const [signature, setSignature] = useState("");
  const toast = useToast();

  return (
    <>
      <ModalContent textAlign="left" p="6" maxW="60vw">
        <ModalHeader alignItems="left">
          <Heading size="lg" color="gray.900">
            Lotus Signature Authentication
          </Heading>
        </ModalHeader>
        <ModalCloseButton
          onClick={() => {
            console.log("closelotussignbutton");
            setAuthMode("");
          }}
        />
        <ModalBody>
          <Stack spacing="6">
            <Stack>
              <Text fontWeight="medium">Owner Address</Text>
              <Text
                fontSize="md"
                fontWeight="semibold"
                color="blue.800"
                p="2"
                bg="blue.50"
                borderRadius="md"
              >
                {props.ownerAddress}
              </Text>
            </Stack>
            <Stack>
              <Text fontWeight="medium">Message</Text>
              <Input
                type="text"
                color="gray.800"
                p="2"
                bg="gray.50"
                borderRadius="md"
                fontFamily="monospace"
                // defaultValue="Hello world!"
                value={messageText}
                onChange={(event) => {
                  console.log("messageText changed", event.target.value);
                  // let finalSD = event.target.value;
                  setMessageText(event.target.value);
                }}
              />
              {/*Hello world!
                </Text>*/}
            </Stack>
            <Stack>
              <Text fontWeight="medium">Sign Code</Text>
              <HStack alignItems="flex-end">
                <Text
                  color="gray.800"
                  p="2"
                  bg="gray.50"
                  borderRadius="md"
                  fontFamily="monospace"
                  wordBreak="break-word"
                >
                  lotus wallet sign {props.ownerAddress}{" "}
                  {messageText.hexEncode()}
                </Text>
                <IconButton
                  colorScheme="gray"
                  aria-label="copy code"
                  icon={<MdContentCopy />}
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `lotus wallet sign ${
                        props.ownerAddress
                      } ${messageText.hexEncode()}`,
                    )
                  }
                />
              </HStack>
            </Stack>
            <Stack>
              <FormControl>
                <FormLabel>Signature</FormLabel>
                <Input
                  type="text"
                  value={signature}
                  onChange={(event) => {
                    console.log("signature changed", event.target.value);
                    setSignature(event.target.value);
                  }}
                />
                <FormHelperText color="blue.700">
                  Please copy the Sign code, generate a signature using your
                  lotus wallet and paste it here.
                </FormHelperText>
              </FormControl>
            </Stack>
            <Button
              variant="solid"
              colorScheme="blue"
              onClick={() => {
                // mutation {
                //   verifyWallet(
                //     minerID: "f04321"
                //     walletAddress: "t3uxch2zqrqvtgm23r7dqqro4ngsermw53f5iiowyje7k2s4hkdoxwgdauudn32yttltm233uwlhgkjl4aagja"
                //     hexMessage: "5369676e617475726520666f722066696c666f780a66303638383136350a323032312d30372d32395431343a30363a30392e3030305a"
                //     signature: "02983c8db926b932f6dd829e594176eceae90b20c9507aeb587687b3713602a75bc8e5f6787126dfc2ffaa53ed11a79ea517152a07d0a6a9a7caf8e45ae4a572c71dfc5983638d3da92c06c66fe121d3b67c6c8086ea92181f08a35ac4bda53981"
                //   )
                // }
                // let myquery = `mutation {
                //   verifyWallet (
                //     minerID: "${props.minerID}"
                //     walletAddress: "${props.ownerAddress}"
                //     hexMessage: "${messageText.hexEncode()}"
                //     signature: "${signature}"
                //   )
                // }`;
                // console.log("myquery", myquery);
                console.log("props", props, "url", process.env.BACKEND_URL);
                fetch(
                  "https://miner-marketplace-backend-2.onrender.com/query",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      query: `mutation {
                        verifyWallet (
                          minerID: "${props.minerID}"
                          walletAddress: "${props.ownerAddress}"
                          hexMessage: "${messageText.hexEncode()}"
                          signature: "${signature}"
                        )
                      }`,
                    }),
                  },
                )
                  .then((r) => {
                    console.log("rrrr", r);
                    return r.json();
                  })
                  .then((data) => {
                    console.log("data returned:", data);
                    const reqClaim = data.data.verifyWallet;
                    if (reqClaim) {
                      toast({
                        title: "Authentication successful",
                        description: "We've verified your signature.",
                        status: "success",
                        duration: 9000,
                        isClosable: true,
                      });
                      // setClval(" successful");
                      // setClText(
                      //   "Owner authentication successful!",
                      // );
                      // setClIcon("/images/AuthSuccess.svg");
                      setIsSignedIn(true);
                    } else {
                      toast({
                        title: "Authentication failed",
                        description: "We couldn't verify the signature.",
                        status: "error",
                        duration: 9000,
                        isClosable: true,
                      });
                      // setClval(" failed");
                      // setClIcon("/images/AuthFail.svg");
                      // setClText(
                      //   "Owner authentication failed.",
                      // );
                    }
                  })
                  .catch((e) => {
                    console.log("myerr:", e);
                    toast({
                      title: "Authentication failed",
                      description: "We couldn't verify the signature.",
                      status: "error",
                      duration: 9000,
                      isClosable: true,
                    });
                    // setClval(" failed");
                    // setClIcon("/images/AuthFail.svg");
                    // setClText(
                    //   "Owner authentication failed.",
                    // );
                  });
                /*
                // const endpointUrl = 'wss://lotus.testground.ipfs.team/api/0/node/rpc/v0'
                // const endpointUrl = 'http://experimental-full.api.filecoin.io:21234'// /rpc/v0'
                const endpointUrl = "https://api.node.glif.io";
                // To connect to your local Lotus node, try using:
                // const endpointUrl = 'ws://localhost:1234/rpc/v0'

                // Instantiate a provider for the endpoint -- wraps the http and
                // websockets transports for use in a web browser
                const provider = new BrowserProvider(endpointUrl);

                // Create a client object with callable methods using a schema and
                // our provider. Calling methods on this object will send JSON-RPC
                // requests over the websocket.
                const client = new LotusRPC(provider, {
                  schema: mainnet.fullNode,
                });

                // Using the client and the "ChainHead" method, every second,
                // retrieve the chain height and update the web page
                async function run() {
                  console.log(
                    "before sending:",
                    props.ownerAddress,
                    messageText.hexEncode(),
                    signature,
                  );
                  const { Valid: valid } = await client.walletVerify(
                    props.ownerAddress,
                    messageText.hexEncode(),
                    signature,
                    // "t3uxch2zqrqvtgm23r7dqqro4ngsermw53f5iiowyje7k2s4hkdoxwgdauudn32yttltm233uwlhgkjl4aagja",
                    // "5369676e617475726520666f722066696c666f780a66303638383136350a323032312d30372d32395431343a30363a30392e3030305a",
                    // "02983c8db926b932f6dd829e594176eceae90b20c9507aeb587687b3713602a75bc8e5f6787126dfc2ffaa53ed11a79ea517152a07d0a6a9a7caf8e45ae4a572c71dfc5983638d3da92c06c66fe121d3b67c6c8086ea92181f08a35ac4bda53981",
                  );
                  console.log("signature validity:", valid);
                  // while (true) {
                  //   const { Height: height } = await client.chainHead();
                  //   console.log("height is", height);
                  //   await new Promise((resolve) => {
                  //     setTimeout(resolve, 1000);
                  //   });
                  // }
                }
                run();
                */
              }}
            >
              Verify
            </Button>
          </Stack>
        </ModalBody>
      </ModalContent>
    </>
  );
};

export default Signature;
