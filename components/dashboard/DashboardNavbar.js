import {
  Button,
  Flex,
  Link,
  Image,
  IconButton,
  HStack,
  Spacer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Tooltip,
} from "@chakra-ui/react";
import { Icon, SettingsIcon } from "@chakra-ui/icons";
import { FiSettings } from "react-icons/fi";
import { BiBug } from "react-icons/bi";

import React, { useState, useRef } from "react";
import { useRouter } from "next/router";

import Authenticate from "./ledgerAlert/Authenticate";
import AuthFail from "./ledgerAlert/AuthFail";
import AuthSuccess from "./ledgerAlert/AuthSuccess";
import LedgerConfirm from "./ledgerAlert/LedgerConfirm";
import AuthMode from "./ledgerAlert/AuthMode";

import createTransport from "./ledger/ct";
import * as wasm from "@zondax/filecoin-signing-tools/js";
import * as bip39 from "bip39";
import FilecoinApp from "@zondax/ledger-filecoin";
import TransportWebUSB from "@ledgerhq/hw-transport-webusb";
import { mapSeries } from "bluebird";
import { useGlobalState } from "../../state";
import ProfileSettings from "../../pages/profileSettings";
import * as Fathom from "fathom-client";
import { trackGoal } from "../../util/analytics";
import Signature from "./ledgerAlert/Signature";

const CustomModal = ({
  showModalButtonText,
  modalHeader,
  modalBody,
  minerID,
  minerName,
  minerMail,
  minerWebsite,
  minerSlack,
  minerTwitter,
  minerBio,
  country,
  region,
  storageAskPrice,
  verifiedAskPrice,
  retrievalAskPrice,
  storage,
  retrieval,
  repair,
  online,
  offline,
  transparencyScore,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <IconButton
        variant="ghost"
        colorScheme="gray"
        fontSize="24px"
        icon={<FiSettings />}
        onClick={onOpen}
      />

      <Modal size="5xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {modalHeader}: {minerID}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ProfileSettings
              minerID={minerID}
              minerName={minerName}
              minerMail={minerMail}
              minerWebsite={minerWebsite}
              minerSlack={minerSlack}
              minerTwitter={minerTwitter}
              minerBio={minerBio}
              country={country}
              region={region}
              storageAskPrice={storageAskPrice}
              verifiedAskPrice={verifiedAskPrice}
              retrievalAskPrice={retrievalAskPrice}
              storage={storage}
              retrieval={retrieval}
              repair={repair}
              online={online}
              offline={offline}
              transparencyScore={transparencyScore}
              onClickFunc={onClose}
            />
          </ModalBody>

          {/*<ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Discard
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => {
                alert(1);
              }}
            >
              Save Changes
            </Button>
            </ModalFooter>*/}
        </ModalContent>
      </Modal>
    </>
  );
};

const DashboardNavbar = (props) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const {
  //   isProfileSettingsOpen,
  //   onProfileSettingsOpen,
  //   onProfileSettingsClose,
  // } = useDisclosure();

  const [isSignedIn, setIsSignedIn] = useGlobalState("isSignedIn");
  const [authMode, setAuthMode] = useGlobalState("authMode");

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
      const res = await ledgerApp.showAddressAndPubKey(`m/44\'/461\'/0/0/${0}`);
      setLedgerAddress(res.addrString);
      console.log("resd", res);
    } catch (err) {
      console.log("errd", err);
    }
  };

  function DisplayButton() {
    if (isSignedIn) return props.minerID;
    return "Authenticate";
  }
  function DisplaySettings() {
    if (isSignedIn)
      return (
        <>
          <CustomModal
            showModalButtonText="Edit"
            modalHeader="Profile Settings"
            modalBody="Edit Modal"
            minerID={props.minerID}
            minerName={props.minerName}
            minerMail={props.minerMail}
            minerWebsite={props.minerWebsite}
            minerSlack={props.minerSlack}
            minerTwitter={props.minerTwitter}
            minerBio={props.minerBio}
            country={props.country}
            region={props.region}
            storageAskPrice={props.storageAskPrice}
            verifiedAskPrice={props.verifiedAskPrice}
            retrievalAskPrice={props.retrievalAskPrice}
            storage={props.storage}
            retrieval={props.retrieval}
            repair={props.repair}
            online={props.online}
            offline={props.offline}
            transparencyScore={props.transparencyScore}
          />
        </>
      );
    return "Connect Wallet";
  }
  function track() {
    if (typeof window != "undefined") {
      Fathom.trackGoal("OZHGANFZ", 0);
    }
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
          <Image
            src="/images/Logo-b.svg"
            maxH="10"
            alt="Miner Marketplace Logo"
          />
        </Link>
        <Spacer />
        <HStack spacing="12" color="gray.700">
          {/* <IconButton
            variant="ghost"
            colorScheme="gray"
            fontSize="24px"
            icon={<FiSettings />}
            onClick={() => router.push("/profileSettings")}
          /> */}
          <Tooltip
            label="Report a Bug or Request a Feature / Enhancement"
            aria-label="report bug"
            p={4}
            borderRadius="lg"
            hasArrow
          >
            <Link
              href="https://github.com/buidl-labs/miner-marketplace-frontend/issues/new/choose"
              isExternal
              alt="report-bug"
            >
              <Icon color="gray.600" as={BiBug} w={6} h={6} />
            </Link>
          </Tooltip>

          {DisplaySettings()}
          <Button
            colorScheme="blue"
            size="md"
            variant="solid"
            onClick={() => {
              onOpen();
              console.log("heyyyy there");
              // getAddress();
              track();
            }}
          >
            <DisplayButton />
          </Button>

          <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
            <ModalOverlay />
            {authMode == "" ? (
              <AuthMode
                minerID={router.asPath.split("/")[2]}
                ledgerAddress={ledgerAddress}
                onOpen={onOpen}
                getAddress={getAddress}
                ownerAddress={props.ownerAddress}
              />
            ) : authMode == "ledger" ? (
              <Authenticate
                minerID={router.asPath.split("/")[2]}
                ledgerAddress={ledgerAddress}
                ownerAddress={props.ownerAddress}
              />
            ) : (
              <Signature
                minerID={router.asPath.split("/")[2]}
                ledgerAddress={ledgerAddress}
                ownerAddress={props.ownerAddress}
              />
            )}
            {/* <Signature /> */}
            {/*<AuthMode
              minerID={router.asPath.split("/")[2]}
              ledgerAddress={ledgerAddress}
              onOpen={onOpen}
              getAddress={getAddress}
            />*/}

            {/* <LedgerConfirm />
            <AuthSuccess />
            <AuthFail /> */}
          </Modal>
        </HStack>
      </Flex>
      {/*<Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>jfhdfjfhjdhfjdhf</p>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
          </Modal>*/}
    </>
  );
};

export default DashboardNavbar;
