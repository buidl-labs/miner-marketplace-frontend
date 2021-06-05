import {
  Button,
  Flex,
  Link,
  Image,
  HStack,
  Spacer,
  Modal,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Authenticate from "./ledgerAlert/Authenticate";
import AuthFail from "./ledgerAlert/AuthFail";
import AuthSuccess from "./ledgerAlert/AuthSuccess";
import LedgerConfirm from "./ledgerAlert/LedgerConfirm";

import createTransport from "./ledger/ct";
import * as wasm from "@zondax/filecoin-signing-tools/js";
import * as bip39 from "bip39";
import FilecoinApp from "@zondax/ledger-filecoin";
import TransportWebUSB from "@ledgerhq/hw-transport-webusb";
import { mapSeries } from "bluebird";
import { useGlobalState } from "../../state";

const DashboardNavbar = (props) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isSignedIn, setIsSignedIn] = useGlobalState("isSignedIn");

  // const [isSignedIn, setIsSignedIn] = useState(false);
  // const [isClaimed, setIsClaimed] = useState(miner.claimed);

  // function handleIsSignedInChange(event) {
  //   props.onIsSignedInChange(event.target.value);
  //   // setIsSignedIn(newValue);
  // }
  // function handleIsClaimedChange(newValue) {
  //   props.onisClaimedChange(event.target.value);
  //   // setIsClaimed(newValue);
  // }

  const [ledgerConnected, setLedgerConnected] = useState(false);
  const [addressConfirmed, setAddressConfirmed] = useState(false);
  const [receivedVerificationResult, setReceivedVerificationResult] =
    useState(false);

  // const [ledgerAddress, setLedgerAddress] = useState("");
  const [ledgerAddress, setLedgerAddress] = useGlobalState("ledgerAddr");

  const getAddress = async () => {
    try {
      const transport = await createTransport();
      const ledgerApp = new FilecoinApp(transport);
      // const paths = [];
      // for (let i = 0; i < 5; i += 1) {
      //   paths.push(`m/44\'/461\'/0/0/${i}`);
      // }
      // const addresses = await mapSeries(paths, async (path) => {
      //   const { addrString } = await ledgerApp.showAddressAndPubKey(path);
      //   return addrString;
      // });
      // console.log("addresses", addresses);
      const res = await ledgerApp.getAddressAndPubKey(`m/44\'/461\'/0/0/${0}`);
      setLedgerAddress(res.addrString);
      console.log("res", res);
    } catch (err) {
      console.log("err", err);
    }
  };

  function DisplayButton() {
    if (isSignedIn) return props.minerID;
    return "Connect Wallet";
  }

  return (
    <>
      <Flex
        bg="white"
        borderBottom="solid 1px #E2E8F0"
        p="4"
        w="full"
        overflow="hidden"
        position="fixed"
        zIndex="20"
      >
        <Link onClick={() => router.push("/")}>
          <Image src="/images/Logo.svg" maxH="12" />
        </Link>
        <Spacer />
        <HStack spacing="12" color="gray.700">
          <Button
            colorScheme="blue"
            size="md"
            variant="solid"
            onClick={() => {
              onOpen();
              getAddress();
            }}
          >
            <DisplayButton />
          </Button>

          <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
            <ModalOverlay />
            <Authenticate
              minerID={router.asPath.split("/")[2]}
              ledgerAddress={ledgerAddress}
              // isSignedIn={props.isSignedIn}
              // isClaimed={props.isClaimed}
              // onIsSignedInChange={handleIsSignedInChange}
              // onisClaimedChange={handleIsClaimedChange}
            />
            {/* <LedgerConfirm />
            <AuthSuccess />
            <AuthFail /> */}
          </Modal>
        </HStack>
      </Flex>
    </>
  );
};

export default DashboardNavbar;
