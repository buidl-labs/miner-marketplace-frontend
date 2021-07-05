import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Grid,
  GridItem,
  Heading,
  Text,
  WrapItem,
  Input,
  Box,
  InputGroup,
  InputRightElement,
  Stack,
  HStack,
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Textarea,
  Switch,
  Spacer,
  Button,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
} from "@chakra-ui/react";
import { Icon, IconProps, ArrowBackIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import DashboardMenu from "../components/dashboard/DashboardMenu";
import { Search } from "react-feather";
import { useGlobalState } from "../state";
import { useRouter } from "next/router";
import TransparencyScore from "../components/dashboard/TransparencyScore";

function ProfileSettings(props) {
  const [minerName, setMinerName] = useState(props.minerName);
  const [minerMail, setMinerMail] = useState(props.minerMail);
  const [minerWebsite, setMinerWebsite] = useState(props.minerWebsite);
  const [minerSlack, setMinerSlack] = useState(props.minerSlack);
  const [minerTwitter, setMinerTwitter] = useState(props.minerTwitter);
  const [minerBio, setMinerBio] = useState(props.minerBio);
  const [country, setCountry] = useState(props.country);
  const [region, setRegion] = useState(props.region);
  const [storageAskPrice, setStorageAskPrice] = useState(props.storageAskPrice);
  const [verifiedAskPrice, setVerifiedAskPrice] = useState(
    props.verifiedAskPrice,
  );
  const [retrievalAskPrice, setRetrievalAskPrice] = useState(
    props.retrievalAskPrice,
  );
  const [storage, setStorage] = useState(props.storage);
  const [retrieval, setRetrieval] = useState(props.retrieval);
  const [repair, setRepair] = useState(props.repair);
  const [online, setOnline] = useState(props.online);
  const [offline, setOffline] = useState(props.offline);

  const handleMinerNameChange = (e) => setMinerName(e.target.value);
  const handleMinerMailChange = (e) => setMinerMail(e.target.value);
  const handleMinerWebsiteChange = (e) => setMinerWebsite(e.target.value);
  const handleMinerBioChange = (e) => setMinerBio(e.target.value);
  const handleMinerSlackChange = (e) => setMinerSlack(e.target.value);
  const handleMinerTwitterChange = (e) => setMinerTwitter(e.target.value);
  const handleCountryChange = (e) => setCountry(e.target.value);
  const handleRegionChange = (e) => setRegion(e.target.value);

  const handleStorageAskPriceChange = (event) =>
    setStorageAskPrice(event.target.value);
  const handleVerifiedAskPriceChange = (event) =>
    setVerifiedAskPrice(event.target.value);
  const handleRetrievalAskPriceChange = (event) =>
    setRetrievalAskPrice(event.target.value);

  const handleStorageChange = (e) => setStorage(e.target.checked);
  const handleRetrievalChange = (e) => {
    console.log("hh", retrieval);
    console.log("evvvvvvvv", e.target.checked);
    setRetrieval(e.target.checked);
  };
  const handleRepairChange = (e) => setRepair(e.target.checked);
  const handleOnlineChange = (e) => setOnline(e.target.checked);
  const handleOfflineChange = (e) => setOffline(e.target.checked);

  const [ledgerAddress, setLedgerAddress] = useGlobalState("ledgerAddr");

  const toast = useToast();
  const router = useRouter();
  return (
    <>
      <Grid
        templateRows="repeat(1, 1fr)"
        templateColumns="repeat(12, 1fr)"
        gap="0.5"
        pr="8"
      >
        {/*<GridItem colSpan="8">
          <Button
            mt="28"
            colorScheme="blue"
            variant="link"
            textDecoration="underline"
            // onClick={() => router.push("/miners/")}
          >
            <ArrowBackIcon
              w={5}
              h={5}
              color="gray.600"
              mr="1"
              color="blue.500"
            />
            Back to Miner Profile
          </Button>
          <Alert
            status="info"
            bg="blue.50"
            rounded="lg"
            color="blue.700"
            fontWeight="semibold"
            w="full"
            mt="4"
          >
            <AlertIcon color="blue.400" />
            You will need to connect wallet to edit.
          </Alert>
  </GridItem>*/}
        <GridItem colSpan="15">
          <TransparencyScore
            transparencyScore={props.transparencyScore}
            name={props.minerName}
            email={props.minerMail}
            website={props.minerWebsite}
            slack={props.minerSlack}
            twitter={props.minerTwitter}
            bio={props.minerBio}
            storage={props.storage}
            retrieval={props.retrieval}
            repair={props.repair}
            online={props.online}
            offline={props.offline}
          />
        </GridItem>

        <GridItem colSpan="10" mt={8}>
          <VStack alignItems="flex-start" spacing="8">
            {/*<VStack alignItems="flex-start">
              <Heading size="lg" color="gray.700" alignContent="center">
                {props.minerID}
              </Heading>
            </VStack>*/}

            {/*Basic Settings */}
            <VStack alignItems="left" spacing="4" w="24rem">
              <Heading size="lg" color="gray.700">
                Personal Details
              </Heading>
              <FormControl id="fullName">
                <FormLabel>Full Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Juan Benet"
                  // defaultValue={props.minerName}
                  value={minerName}
                  onChange={handleMinerNameChange}
                />
              </FormControl>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  placeholder="juan@benet.io"
                  // defaultValue={props.minerMail}
                  value={minerMail}
                  onChange={handleMinerMailChange}
                />
              </FormControl>
              <FormControl id="website">
                <FormLabel>Website</FormLabel>
                <Input
                  type="website"
                  placeholder="https://juanbenet.io"
                  // defaultValue={props.minerWebsite}
                  value={minerWebsite}
                  onChange={handleMinerWebsiteChange}
                />
              </FormControl>
              <FormControl id="twitter">
                <FormLabel>Twitter</FormLabel>
                <Input
                  type="link"
                  placeholder="Twitter handle"
                  // defaultValue={props.minerTwitter}
                  value={minerTwitter}
                  onChange={handleMinerTwitterChange}
                />
              </FormControl>
              <FormControl id="slack">
                <FormLabel>Slack</FormLabel>
                <Input
                  type="text"
                  placeholder="Filecoin Slack handle"
                  // defaultValue={props.minerSlack}
                  value={minerSlack}
                  onChange={handleMinerSlackChange}
                />
              </FormControl>
              <FormControl id="bio">
                <FormLabel>Bio</FormLabel>
                <Textarea
                  placeholder="Write a short bio"
                  // defaultValue={props.minerBio}
                  value={minerBio}
                  onChange={handleMinerBioChange}
                />
              </FormControl>
            </VStack>

            {/*Service Settings*/}
            <VStack alignItems="left" spacing="8">
              <Heading size="lg" color="gray.700">
                Service Details
              </Heading>
              <Stack spacing="4">
                <Text fontSize="lg" fontWeight="medium" color="blue.900">
                  Type of Service
                </Text>
                <FormControl display="flex" alignItems="center">
                  <FormLabel htmlFor="storage" mb="0">
                    Storage
                  </FormLabel>
                  <Switch
                    id="storage"
                    defaultChecked={storage}
                    value={storage}
                    onChange={handleStorageChange}
                  />
                  <Text>{storage}</Text>
                </FormControl>
                <FormControl display="flex" alignItems="center">
                  <FormLabel htmlFor="retrieval" mb="0">
                    Retrieval
                  </FormLabel>
                  <Switch
                    id="retrieval"
                    // defaultChecked={retrieval}
                    // isChecked={retrieval}
                    value={retrieval}
                    onChange={handleRetrievalChange}
                  />
                  <Text>{retrieval}</Text>
                </FormControl>
                <FormControl display="flex" alignItems="center">
                  <FormLabel htmlFor="repair" mb="0">
                    Repair
                  </FormLabel>
                  <Switch
                    id="repair"
                    defaultChecked={repair}
                    value={repair}
                    onChange={handleRepairChange}
                  />
                </FormControl>
              </Stack>
              <Stack spacing="4">
                <Text fontSize="lg" fontWeight="medium" color="blue.900">
                  Data Transfer Mechanism
                </Text>
                <FormControl display="flex" alignItems="center">
                  <FormLabel htmlFor="online" mb="0">
                    Online
                  </FormLabel>
                  <Switch
                    id="online"
                    defaultChecked={online}
                    value={online}
                    onChange={handleOnlineChange}
                  />
                </FormControl>
                <FormControl display="flex" alignItems="center">
                  <FormLabel htmlFor="offline" mb="0">
                    Offline
                  </FormLabel>
                  <Switch
                    id="offline"
                    defaultChecked={offline}
                    value={offline}
                    onChange={handleOfflineChange}
                  />
                </FormControl>
              </Stack>
              {/* <Stack spacing="4">
                <Text fontSize="lg" fontWeight="medium" color="blue.900">
                  Country
                </Text>
                <Input
                  type="text"
                  placeholder="Enter Country"
                  value={country}
                  onChange={handleCountryChange}
                />
              </Stack>
              <Stack spacing="4">
                <Text fontSize="lg" fontWeight="medium" color="blue.900">
                  Region
                </Text>
                <Input
                  type="text"
                  placeholder="Enter Region"
                  value={region}
                  onChange={handleRegionChange}
                />
              </Stack> */}
              {/*<Stack spacing="4">
                <Text fontSize="lg" fontWeight="medium" color="blue.900">
                  Ask Price
                </Text>
                <HStack alignItems="baseline" spacing="4">
                  <Text color="gray.800" fontWeight="medium" fontSize="md">
                    Storage Ask Price
                  </Text>
                  <Spacer />
                  <VStack alignItems="left">
                    <Input
                      placeholder="Enter amount"
                      value={storageAskPrice}
                      onChange={handleStorageAskPriceChange}
                    />
                  </VStack>
                  <Text size="sm" color="gray.600">
                    attoFIL/GiB/epoch
                  </Text>
                </HStack>
                <HStack alignItems="baseline" spacing="4">
                  <Text color="gray.800" fontWeight="medium" fontSize="md">
                    Verified Ask Price
                  </Text>
                  <Spacer />
                  <VStack alignItems="left">
                    <Input
                      placeholder="Enter amount"
                      value={verifiedAskPrice}
                      onChange={handleVerifiedAskPriceChange}
                    />
                  </VStack>
                  <Text size="sm" color="gray.600">
                    attoFIL/GiB/epoch
                  </Text>
                </HStack>
                <HStack alignItems="baseline" spacing="4">
                  <Text color="gray.800" fontWeight="medium" fontSize="md">
                    Retrieval Ask Price
                  </Text>
                  <Spacer />
                  <VStack alignItems="left">
                    <Input
                      placeholder="Enter amount"
                      value={retrievalAskPrice}
                      onChange={handleRetrievalAskPriceChange}
                    />
                  </VStack>
                  <Text size="sm" color="gray.600">
                    attoFIL/B
                  </Text>
                </HStack>
              </Stack>*/}
            </VStack>
          </VStack>
        </GridItem>
      </Grid>
      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        <Box w="100%" h="10" bg="" />
        <Box w="100%" h="10" bg="" />
        <Box w="100%" h="10" bg="" />
        <Box w="100%" h="10" bg="" />

        <HStack>
          <Button variant="ghost" onClick={props.onClickFunc}>
            Discard
          </Button>
          <Button
            colorScheme="blue"
            // type="submit"
            onClick={() => {
              console.log(
                "onsubmit",
                props.minerID,
                ledgerAddress,
                minerName,
                minerBio,
                retrieval,
                minerTwitter,
              );
              console.log("props", props, "url", process.env.BACKEND_URL);
              fetch("https://miner-marketplace-backend-2.onrender.com/query", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  query: `mutation {
                      editProfile(
                        input: {
                          minerID: "${props.minerID}"
                          ledgerAddress: "${ledgerAddress}"
                          name: "${minerName}"
                          bio: "${minerBio}"
                          email: "${minerMail}"
                          website: "${minerWebsite}"
                          twitter: "${minerTwitter}"
                          slack: "${minerSlack}"
                          storage: ${storage}
                          retrieval: ${retrieval}
                          repair: ${repair}
                          online: ${online}
                          offline: ${offline}
                        }
                      )
                    }`,
                }),
              })
                .then((r) => {
                  console.log("rrrr", r);
                  return r.json();
                })
                .then((data) => {
                  console.log("data returned:", data);
                  if (data.data.editProfile) {
                    toast({
                      title: "Changes saved.",
                      description: "Reload to view changes.",
                      status: "success",
                      duration: 9000,
                      isClosable: true,
                    });
                  } else {
                    toast({
                      title: "Failed to update profile.",
                      description:
                        "There was an issue updating the miner profile.",
                      status: "error",
                      duration: 9000,
                      isClosable: true,
                    });
                  }
                  // const reqClaim = data.data.claimProfile;
                  // if (reqClaim) setClval("✅ success");
                  // else setClval("❌ failed");
                })
                .catch((e) => {
                  console.log(e);
                  // setClval("❌ failed");
                });
            }}
          >
            Save Changes
          </Button>
        </HStack>
      </Grid>
      <Box w="100%" h="2" bg="" />
    </>
  );
}

export default ProfileSettings;
