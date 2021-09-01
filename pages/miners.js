/* eslint-disable react/destructuring-assignment */
import {
  Alert,
  AlertIcon,
  AlertDescription,
  Button,
  Heading,
  Stack,
  Flex,
  Grid,
  GridItem,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  HStack,
  Link,
  Tag,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Search2Icon } from "@chakra-ui/icons";
import Select from "react-select";
import { isMobile } from "react-device-detect";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import "antd/dist/antd.css";
import Head from "next/head";
import { Table } from "antd";

import * as Fathom from "fathom-client";
import {
  GetFormattedStorageUnits,
  GetSimpleFILUnits,
  GetSimpleUSDUnits,
} from "../util/util";
import { Countries } from "../util/raw";
import MinerListingNavbar from "../components/dashboard/MinerListingNavbar";

const countries = Countries();

export default function Miners({ filecoinUSDRate, miners }) {
  const [storageDuration, setStorageDuration] = useState(6);
  const [storageAmount, setStorageAmount] = useState(10);
  const [storageDurationText, setStorageDurationText] = useState(6);
  const [storageAmountText, setStorageAmountText] = useState(10);

  const dataSource = miners.map((fd) => {
    const serviceTypeArr = [];
    if (fd.service.serviceTypes.storage) {
      serviceTypeArr.push("Storage");
    }
    if (fd.service.serviceTypes.retrieval) {
      serviceTypeArr.push("Retrieval");
    }
    if (fd.service.serviceTypes.repair) {
      serviceTypeArr.push("Repair");
    }
    const dataTransferMechanismArr = [];
    if (fd.service.dataTransferMechanism.online) {
      dataTransferMechanismArr.push("Online");
    }
    if (fd.service.dataTransferMechanism.offline) {
      dataTransferMechanismArr.push("Offline");
    }
    let minerName = fd.personalInfo.name;
    if (fd.personalInfo.name === "") {
      minerName = "Unclaimed profile";
    }

    let { storageAskPrice } = fd.pricing;
    if (
      Number.isNaN(fd.pricing.storageAskPrice) ||
      fd.pricing.storageAskPrice == null ||
      fd.pricing.storageAskPrice === ""
    ) {
      storageAskPrice = 0; // show zero for miners who haven't mentioned askPrice
    }
    return {
      key: fd.id,
      miner: {
        id: fd.id,
        name: minerName,
      },
      reputationScore: fd.reputationScore,
      transparencyScore: fd.transparencyScore,
      serviceType: serviceTypeArr,
      dataTransferMechanism: dataTransferMechanismArr,
      location: {
        country: fd.location.country,
        region: fd.location.region,
      },
      estimatedQuote: {
        fil:
          storageDuration *
          30 *
          2880 *
          storageAmount *
          (parseInt(storageAskPrice, 10) / 10 ** 18),
        display: GetSimpleFILUnits(
          storageDuration *
            30 *
            2880 *
            storageAmount *
            parseInt(storageAskPrice, 10),
        ),
        usd:
          storageDuration *
          30 *
          2880 *
          storageAmount *
          (parseInt(storageAskPrice, 10) / 10 ** 18) *
          filecoinUSDRate,
        displayUSD: GetSimpleUSDUnits(
          storageDuration *
            30 *
            2880 *
            storageAmount *
            (parseInt(storageAskPrice, 10) / 10 ** 18) *
            filecoinUSDRate,
        ),
      },
      qap: {
        val: fd.qualityAdjustedPower,
        display: GetFormattedStorageUnits(fd.qualityAdjustedPower),
      },
    };
  });

  const mLocations = [
    { text: "Asia", value: "Asia" },
    { text: "Europe", value: "Europe" },
    { text: "Africa", value: "Africa" },
    { text: "Oceania", value: "Oceania" },
    { text: "South America", value: "South America" },
    { text: "Central America", value: "Central America" },
    { text: "North America", value: "North America" },
  ];

  const columns = [
    {
      title: "Storage Providers",
      dataIndex: "miner",
      key: "miner",
      render(m) {
        return (
          <div>
            <Link href={`/miners/${m.id}`} key={m.id} isExternal>
              <Text fontSize="lg" color="blue.700">
                {m.name}
              </Text>
              <Text
                color="blue.500"
                fontWeight="semibold"
                textDecoration="underline"
              >
                {m.id}
              </Text>
            </Link>
          </div>
        );
      },
    },
    {
      title: "Reputation Score",
      dataIndex: "reputationScore",
      key: "reputationScore",
      defaultSortOrder: "descend",
      sorter: {
        compare: (a, b) =>
          parseInt(a.reputationScore, 10) - parseInt(b.reputationScore, 10),
        multiple: 3,
      },
      render(reputationScore) {
        const color = reputationScore < 50 ? "gray.500" : "blue.600";
        return (
          <Text color={color} fontSize="lg">
            {reputationScore}
          </Text>
        );
      },
    },
    {
      title: "Transparency Score",
      dataIndex: "transparencyScore",
      key: "transparencyScore",
      defaultSortOrder: "descend",
      sorter: {
        compare: (a, b) =>
          parseInt(a.transparencyScore, 10) - parseInt(b.transparencyScore, 10),
        multiple: 4,
      },
      render(transparencyScore) {
        const color = transparencyScore < 50 ? "orange.600" : "blue.700";
        return (
          <Text color={color} fontSize="lg">
            {transparencyScore}
          </Text>
        );
      },
    },
    {
      title: "Type of Service",
      dataIndex: "serviceType",
      key: "serviceType",
      filters: [
        { text: "Storage", value: "Storage" },
        { text: "Retrieval", value: "Retrieval" },
        { text: "Repair", value: "Repair" },
      ],
      onFilter: (value, record) => record.serviceType.includes(value),
      render(serviceTypes) {
        return (
          <HStack spacing="2">
            {serviceTypes.map((service, i) => {
              let tagColor = "gray.700";
              let tagBg = "gray.100";
              if (service === "Storage") {
                tagColor = "blue.700";
                // const tagBg = "blue.50";
                tagBg = "blue.50";
              } else if (service === "Retrieval") {
                tagColor = "purple.700";
                tagBg = "purple.50";
              }
              return (
                // eslint-disable-next-line react/no-array-index-key
                <Tag key={i} color={tagColor} bg={tagBg} borderRadius="full">
                  {service}
                </Tag>
              );
            })}
          </HStack>
        );
      },
    },
    {
      title: "Data Transfer Mechanism",
      dataIndex: "dataTransferMechanism",
      key: "dataTransferMechanism",
      filters: [
        { text: "Online", value: "Online" },
        { text: "Offline", value: "Offline" },
      ],
      onFilter: (value, record) => record.dataTransferMechanism.includes(value),
      render: (dataTransferMechanism) =>
        dataTransferMechanism.map((datatype, i) => {
          let color = "gray.500";
          if (datatype === "Online") {
            color = "green.500";
          }
          return (
            // eslint-disable-next-line react/no-array-index-key
            <HStack key={i}>
              <Text color={color}>{datatype}</Text>
            </HStack>
          );
        }),
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      filters: mLocations,
      onFilter: (value, record) =>
        record.location.country.includes(value) ||
        record.location.region.includes(value),
      render(l) {
        return (
          <div color="gray.600">
            <Text>{countries[l.country]}</Text>
            {l.region && <Text fontSize="sm">({l.region})</Text>}
            {!l.region && <Text fontSize="sm">-</Text>}
          </div>
        );
      },
    },
    {
      title: "Estimated Quote",
      dataIndex: "estimatedQuote",
      key: "estimatedQuote",
      defaultSortOrder: "ascend",
      sorter: {
        compare: (a, b) => a.estimatedQuote.fil - b.estimatedQuote.fil,
        multiple: 2,
      },
      render(l) {
        return (
          <div>
            <Text fontSize="larger" fontWeight="medium" color="gray.600">
              {l.display}
            </Text>
            <Text color="gray.500">{l.displayUSD}</Text>
          </div>
        );
      },
    },
    {
      title: "Total Storage Capacity",
      dataIndex: "qap",
      key: "qap",
      defaultSortOrder: "descend",
      sorter: {
        compare: (a, b) => parseInt(a.qap.val, 10) - parseInt(b.qap.val, 10),
        multiple: 1,
      },
      render(l) {
        return <>{l.display === "NaN YB" ? <p>-</p> : <p>{l.display}</p>}</>;
      },
    },
  ];

  const [minerIdQuery, setMinerIdQuery] = useState("");
  const [filteredMiners, setFilteredMiners] = useState(dataSource);
  const filterList = () => {
    let mminers = dataSource;
    const q = minerIdQuery;
    mminers = mminers.filter(
      (m) => m.miner.id.toLowerCase().indexOf(q) !== -1, // returns true or false
    );
    setFilteredMiners(mminers);
  };
  const onChange = (event) => {
    setMinerIdQuery(event.target.value);
    filterList();
  };

  /* Options for Select Component */
  const dStorageUnitsArr = [
    { label: "MB", value: "MB" },
    { label: "GB", value: "GB" },
    { label: "TB", value: "TB" },
    { label: "PB", value: "PB" },
  ];
  const dStorageDurationUnitsArr = [
    { label: "Months", value: "Months" },
    { label: "Years", value: "Years" },
  ];

  const [dStorageUnits, setDStorageUnits] = useState(dStorageUnitsArr[1]);
  const [dStorageDurationUnits, setDStorageDurationUnits] = useState(
    dStorageDurationUnitsArr[0],
  );

  const handleStorageUnitsChange = (event) => {
    setDStorageUnits(event);
    let finalSA = storageAmountText;

    if (event.value === "MB") {
      finalSA *= 0.001 * 0.931323;
    } else if (event.value === "GB") {
      finalSA *= 0.931323;
    } else if (event.value === "TB") {
      finalSA *= 1000 * 0.931323;
    } else if (event.value === "PB") {
      finalSA *= 1000000 * 0.931323;
    }
    setStorageAmount(finalSA);
  };

  const handleStorageDurationUnitsChange = (event) => {
    setDStorageDurationUnits(event);
    let finalSD = storageDurationText;

    if (event.value === "Years") {
      finalSD *= 12;
    }
    setStorageDuration(finalSD);
  };

  const customStyles = {
    control: (Base) => ({
      ...Base,
      backgroundColor: "#F7FAFC",
      width: "6.4rem",
      height: "2.5rem",
      borderRadius: "0rem 0.4rem 0.4rem 0rem",
      borderLeft: "none",
      borderColor: "#E2E8F0",
    }),
  };

  function track() {
    if (typeof window !== "undefined") {
      Fathom.trackGoal("HACMMY00", 0);
    }
  }

  const [quoteAlert, showQuoteAlert] = useState("none");

  if (isMobile) {
    return (
      <>
        <Stack textAlign="center" alignItems="center" mt="24" p="4">
          <Image src="/images/Logo-b.svg" alt="datastation logo" maxW="60vw" />
          <Heading size="xl" color="blue.800" pt="12">
            Device Not Supported
          </Heading>
          <Text size="md" color="gray.700" maxW="80%">
            Please visit DataStation via a personal Computer or a Laptop device
          </Text>
        </Stack>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Storage Provider Listing - DataStation</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <MinerListingNavbar />
      <Grid
        templateColumns={{
          lg: "repeat(12, 1fr)",
          md: "repeat(6,1fr)",
        }}
      >
        <GridItem colSpan="12" pt="28" bg="white" px="8">
          <Flex justifyContent="space-between">
            <Stack spacing="8" w="36rem">
              <Heading color="gray.700" size="lg">
                Search Storage Providers
              </Heading>
              <Stack spacing="4" pb="4">
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="visible"
                    // eslint-disable-next-line react/no-children-prop
                    children={<Search2Icon w={5} h={5} color="gray.400" />}
                  />
                  <Input
                    type="text"
                    size="md"
                    placeholder="Search by Storage Provider ID (Miner ID)"
                    value={minerIdQuery}
                    onChange={onChange}
                  />
                </InputGroup>
              </Stack>
            </Stack>

            <GridItem colSpan="4" bg="white" px="8">
              <Stack bg="gray.100" borderRadius="xl" p="6">
                <HStack spacing="4" alignItems="flex-end" pb="2">
                  <Stack spacing="2">
                    <Heading size="md" fontWeight="semibold" color="gray.700">
                      Estimated Quote
                    </Heading>
                    <Text fontWeight="medium" color="gray.700">
                      Storage Amount
                    </Text>
                    <InputGroup
                      height="fit-content"
                      alignContent="center"
                      alignItems="center"
                    >
                      <Input
                        bg="white"
                        type="number"
                        w="36"
                        placeholder={`Storage amount in ${dStorageUnits.value}`}
                        value={storageAmountText}
                        onChange={(event) => {
                          let finalSA = event.target.value;
                          setStorageAmountText(event.target.value);
                          if (dStorageUnits.value === "MB") {
                            finalSA *= 0.001 * 0.931323;
                          } else if (dStorageUnits.value === "GB") {
                            finalSA *= 0.931323;
                          } else if (dStorageUnits.value === "TB") {
                            finalSA *= 1000 * 0.931323;
                          } else if (dStorageUnits.value === "PB") {
                            finalSA *= 1000000 * 0.931323;
                          }
                          setStorageAmount(finalSA);
                        }}
                        borderRight="none"
                        borderRadius="0.4rem 0rem 0rem 0.4rem"
                      />

                      <Select
                        options={dStorageUnitsArr}
                        value={dStorageUnits}
                        onChange={handleStorageUnitsChange}
                        isClearable={false}
                        isSearchable={false}
                        styles={customStyles}
                      />
                    </InputGroup>
                  </Stack>
                  <Stack spacing="1">
                    <Text fontWeight="medium" color="gray.700">
                      Storage Duration
                    </Text>
                    <InputGroup>
                      <Input
                        bg="white"
                        type="number"
                        w="36"
                        placeholder={`Storage duration in ${dStorageDurationUnits.value}`}
                        value={storageDurationText}
                        onChange={(event) => {
                          let finalSD = event.target.value;
                          setStorageDurationText(event.target.value);
                          if (dStorageDurationUnits.value === "Years") {
                            finalSD *= 12;
                          }
                          setStorageDuration(finalSD);
                        }}
                        borderRight="none"
                        borderRadius="0.4rem 0rem 0rem 0.4rem"
                      />
                      <Select
                        options={dStorageDurationUnitsArr}
                        value={dStorageDurationUnits}
                        onChange={handleStorageDurationUnitsChange}
                        isClearable={false}
                        isSearchable={false}
                        styles={customStyles}
                      />
                    </InputGroup>
                  </Stack>
                </HStack>
                <Button
                  w="fit-content"
                  colorScheme="blue"
                  variant="solid"
                  borderRadius="full"
                  px="6"
                  onClick={() => {
                    filterList();
                    track();
                    showQuoteAlert("visible");
                  }}
                >
                  Update Estimated Quote
                </Button>
                <Alert
                  status="info"
                  borderRadius="lg"
                  bg="none"
                  display={quoteAlert}
                >
                  <HStack>
                    <AlertIcon color="gray.600" />
                    <AlertDescription fontWeight="medium">
                      See updated Quote in the Estimated Quote column below
                    </AlertDescription>
                  </HStack>
                </Alert>
              </Stack>
            </GridItem>
          </Flex>
        </GridItem>
        <GridItem colSpan="12" px="8">
          <Stack spacing="8" mt="6">
            <Table
              columns={columns}
              dataSource={filteredMiners}
              pagination={{ defaultPageSize: 50 }}
              scroll={{ y: 480 }}
            />
          </Stack>
        </GridItem>
      </Grid>
    </>
  );
}

export async function getServerSideProps() {
  const client = new ApolloClient({
    uri: process.env.BACKEND_URL,
    cache: new InMemoryCache(),
  });
  const { data: fmmData } = await client.query({
    query: gql`
      query {
        miners(first: 10000) {
          id
          claimed
          personalInfo {
            name
          }
          reputationScore
          transparencyScore
          location {
            country
            region
          }
          service {
            serviceTypes {
              storage
              retrieval
              repair
            }
            dataTransferMechanism {
              online
              offline
            }
          }
          pricing {
            storageAskPrice
          }
          qualityAdjustedPower
        }
      }
    `,
  });

  const res1 = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=filecoin&vs_currencies=usd",
  );
  const res2 = await res1.json();

  return {
    props: {
      filecoinUSDRate: res2.filecoin.usd,
      miners: fmmData.miners,
    },
  };
}

Miners.propTypes = {
  filecoinUSDRate: PropTypes.number.isRequired,
  miners: PropTypes.instanceOf(Array).isRequired,
};
