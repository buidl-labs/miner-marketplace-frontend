import {
  Heading,
  Stack,
  // Input,
  Grid,
  GridItem,
  InputGroup,
  InputRightElement,
  Select,
  VStack,
  HStack,
  Link,
  Tag,
  // Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Wrap,
  WrapItem,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState, useRef } from "react";
import { Icon, IconProps, Search2Icon } from "@chakra-ui/icons";
import DashboardMenu from "../components/dashboard/DashboardMenu";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { createHttpLink } from "apollo-link-http";
import { TableProps } from "antd/lib/table";
import "antd/dist/antd.css";
import NxLink from "next/link";
import { Table, Input, Button, Space } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

export default function Miners({ miners, href }) {
  // const [miners, setMiners] = useState([]);

  // useEffect(() => {
  //   async function fetchMyAPI() {
  //     const link = createHttpLink({
  //       uri: "https://miner-marketplace-backend.onrender.com/query",
  //       credentials: "same-origin",
  //     });
  //     const client = new ApolloClient({
  //       uri: "https://miner-marketplace-backend.onrender.com/query",
  //       cache: new InMemoryCache(),
  //       // link,
  //       // fetchOptions: {
  //       //   mode: "no-cors",
  //       // },
  //       // headers: {
  //       //   "Access-Control-Allow-Credentials": true,
  //       // },
  //     });

  //     const { data } = await client.query({
  //       query: gql`
  //         query {
  //           miners {
  //             id
  //             owner {
  //               address
  //             }
  //           }
  //         }
  //       `,
  //     });
  //     setMiners(data.miners);
  //   }
  //   fetchMyAPI();
  // }, []);

  const router = useRouter();
  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
  };

  const [storageDuration, setStorageDuration] = useState(6);
  const [storageAmount, setStorageAmount] = useState(10);

  const [pagination, setPagination] = useState({});
  // const [filteredInfo, setFilteredInfo] = useState({});
  // const [sortedInfo, setSortedInfo] = useState(null);

  // const handleTableChange = (pagination, filters, sorter) => {
  //   setPagination(pagination);
  // };
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  function handleSearch(selectedKeys, confirm, dataIndex) {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  }

  function handleReset(clearFilters) {
    clearFilters();
    setSearchText("");
  }

  // console.log(miners);
  const fetchedData = [
    {
      id: "f02770",
      claimed: true,
      personalInfo: {
        name: "john doe",
      },
      reputationScore: 30,
      transparencyScore: 0,
      location: {
        country: "CN",
        region: "Asia",
      },
      service: {
        serviceTypes: {
          storage: true,
          retrieval: false,
          repair: false,
        },
        dataTransferMechanism: {
          online: true,
          offline: false,
        },
      },
      pricing: {
        storageAskPrice: 1.5,
      },
      qualityAdjustedPower: "81775868078194688",
    },
    {
      id: "f083273827",
      claimed: true,
      personalInfo: {
        name: "",
      },
      reputationScore: 50,
      transparencyScore: 10,
      location: {
        country: "NL",
        region: "Europe",
      },
      service: {
        serviceTypes: {
          storage: true,
          retrieval: false,
          repair: false,
        },
        dataTransferMechanism: {
          online: true,
          offline: true,
        },
      },
      pricing: {
        storageAskPrice: 3.14,
      },
      qualityAdjustedPower: "11775868078194688",
    },
    {
      id: "f037288",
      claimed: true,
      personalInfo: {
        name: "jeff",
      },
      reputationScore: 15,
      transparencyScore: 90,
      location: {
        country: "CA",
        region: "North America",
      },
      service: {
        serviceTypes: {
          storage: true,
          retrieval: true,
          repair: false,
        },
        dataTransferMechanism: {
          online: true,
          offline: false,
        },
      },
      pricing: {
        storageAskPrice: 13.14,
      },
      qualityAdjustedPower: "51775868078194688",
    },
  ];
  const dataSource = miners.map((fd) => {
    let serviceTypeArr = [];
    if (fd.service.serviceTypes.storage) {
      serviceTypeArr.push("Storage");
    }
    if (fd.service.serviceTypes.retrieval) {
      serviceTypeArr.push("Retrieval");
    }
    if (fd.service.serviceTypes.repair) {
      serviceTypeArr.push("Repair");
    }
    let dataTransferMechanismArr = [];
    if (fd.service.dataTransferMechanism.online) {
      dataTransferMechanismArr.push("Online");
    }
    if (fd.service.dataTransferMechanism.offline) {
      dataTransferMechanismArr.push("Offline");
    }
    let minerName = fd.personalInfo.name;
    if (fd.personalInfo.name == "") {
      minerName = "Unclaimed Miner";
    }
    return {
      key: fd.id,
      // sno: 1,
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
      estimatedQuote:
        storageDuration *
        30 *
        2880 *
        storageAmount *
        (parseInt(fd.pricing.storageAskPrice) / 10 ** 18),
      qap: fd.qualityAdjustedPower,
    };
  });

  const mLocations = [
    { text: "Asia", value: "Asia" },
    { text: "North America", value: "North America" },
    { text: "Europe", value: "Europe" },
    { text: "Africa", value: "Africa" },
    { text: "Americas", value: "Americas" },
    { text: "Oceania", value: "Oceania" },
    // ...new Set(
    //   miners.map((m) => {
    //     return {
    //       text: m.location.country + " (" + m.location.region + ")",
    //       value: m.location.country + " (" + m.location.region + ")",
    //     };
    //   }),
    // ),
  ];
  const columns = [
    // {
    //   title: "S.No.",
    //   dataIndex: "sno",
    //   key: "sno",
    // },
    {
      title: "Miner",
      dataIndex: "miner",
      key: "miner",
      render: (m) => {
        return (
          <div>
            <NxLink
              href={`/miners/${m.id}`}
              style={{ cursor: "pointer" }}
              key={m.id}
              isExternal
            >
              {m.id}
            </NxLink>
            {/*<a
              onClick={() => {
                router.push({
                  pathname: "/miners/[id]",
                  query: { minerId: m.id },
                });
              }}
            >
              <b>{m.id}</b>
            </a>*/}
            <h1>{m.name}</h1>
          </div>
        );
      },
    },
    {
      title: "Reputation Score",
      dataIndex: "reputationScore",
      key: "reputationScore",
      sorter: {
        compare: (a, b) =>
          parseInt(a.reputationScore) - parseInt(b.reputationScore),
      },
    },
    {
      title: "Transparency Score",
      dataIndex: "transparencyScore",
      key: "transparencyScore",
      sorter: {
        compare: (a, b) =>
          parseInt(a.transparencyScore) - parseInt(b.transparencyScore),
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
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      filters: mLocations,
      // https://gist.githubusercontent.com/ssskip/5a94bfcd2835bf1dea52/raw/3b2e5355eb49336f0c6bc0060c05d927c2d1e004/ISO3166-1.alpha2.json
      // filters: [
      //   { text: "SG", value: "SG" },
      //   { text: "IN", value: "IN" },
      //   { text: "CN", value: "CN" },
      //   { text: "NL", value: "NL" },
      //   { text: "CA", value: "CA" },
      // ],
      onFilter: (value, record) => {
        return (
          record.location.country.includes(value) ||
          record.location.region.includes(value)
        );
      },
      render: (l) => {
        return (
          <div>
            <h1>{l.country}</h1>
            <h1>({l.region})</h1>
          </div>
        );
      },
    },
    {
      title: "Estimated Quote (FIL)",
      dataIndex: "estimatedQuote",
      key: "estimatedQuote",
      sorter: {
        compare: (a, b) =>
          parseInt(a.estimatedQuote) - parseInt(b.estimatedQuote),
      },
    },
    {
      title: "QAP",
      dataIndex: "qap",
      key: "qap",
      sorter: {
        compare: (a, b) => parseInt(a.qap) - parseInt(b.qap),
      },
    },
  ];

  const [minerIdQuery, setMinerIdQuery] = useState("");
  const [filteredMiners, setFilteredMiners] = useState(dataSource);
  const filterList = (event) => {
    let mminers = dataSource;
    let q = minerIdQuery;
    if (q == "") {
      console.log("");
    }
    mminers = mminers.filter(function (m) {
      // console.log("m", m.miner.id, "ido", m.miner.id.indexOf(q), "q", q);
      return m.miner.id.toLowerCase().indexOf(q) != -1; // returns true or false
      // return m.miner.id.includes(q);
    });

    // console.log("MMiners", mminers);
    setFilteredMiners(mminers);
  };
  const onChange = (event) => {
    console.log(
      "qupdated",
      minerIdQuery,
      "q",
      event.target.value,
      "qlc",
      event.target.value.toLowerCase(),
    );

    const q = event.target.value.toLowerCase();
    // if (q == "") {
    //   console.log("qempty");
    //   setFilteredMiners(miners);
    // } else {
    setMinerIdQuery(event.target.value);
    filterList(event);
    // }
  };
  return (
    <>
      <DashboardNavbar />
      <Grid
        h="200px"
        templateRows="repeat(4, 1fr)"
        templateColumns="repeat(12, 1fr)"
        gap="0.5"
        pr="8"
      >
        <GridItem rowSpan="8" colSpan="2">
          <DashboardMenu />
        </GridItem>

        <GridItem colSpan="10" pt="28">
          <Stack spacing="4">
            <input
              type="text"
              placeholder="Search by miner id"
              value={minerIdQuery}
              onChange={onChange}
            />
          </Stack>
          <br></br>
          storage duration(months):{" "}
          <Stack spacing="4">
            <input
              type="number"
              placeholder="Storage duration (in months)"
              value={storageDuration}
              onChange={(event) => setStorageDuration(event.target.value)}
            />
          </Stack>
          <br></br>
          storage amount(in GiB):{" "}
          <Stack spacing="4">
            <input
              type="number"
              placeholder="Storage amount (in GiB)"
              value={storageAmount}
              onChange={(event) => setStorageAmount(event.target.value)}
            />
          </Stack>
          <br></br>
          <button
            onClick={(event) => {
              filterList(event);
            }}
          >
            {" "}
            update quote
          </button>
          <Stack spacing="8">
            <Table
              columns={columns}
              dataSource={filteredMiners}
              // onChange={handleTableChange}
              pagination={pagination}
            />
            <Heading size="lg" color="gray.700">
              Search Miners
            </Heading>
            {/*Search*/}
            <InputGroup w="50%">
              <InputRightElement
                pointerEvents="none"
                children={<Search2Icon color="gray" />}
              />
              <Input type="text" placeholder="Search Miners by Address" />
            </InputGroup>
            <Wrap spacing="16">
              {/*Type of Service*/}
              <WrapItem>
                <VStack alignItems="left">
                  <Select placeholder="Type of Service">
                    <option value="option1">Storage</option>
                    <option value="option2">Retrieval</option>
                    <option value="option2">Repair</option>
                  </Select>
                  <HStack>
                    <Tag size="lg" borderRadius="full" colorScheme="yellow">
                      Storage
                    </Tag>
                    <Tag size="lg" borderRadius="full" colorScheme="purple">
                      Retrieval
                    </Tag>
                    <Tag size="lg" borderRadius="full" colorScheme="pink">
                      Repair
                    </Tag>
                  </HStack>
                </VStack>
              </WrapItem>

              {/*Data Transfer Mechanism*/}
              <WrapItem>
                <VStack alignItems="left">
                  <Select placeholder="Data Transfer Mechanism">
                    <option value="option1">Online</option>
                    <option value="option2">Offline</option>
                  </Select>
                  <HStack>
                    <Tag size="lg" borderRadius="full" colorScheme="green">
                      Online
                    </Tag>
                    <Tag size="lg" borderRadius="full" colorScheme="orange">
                      Offline
                    </Tag>
                  </HStack>
                </VStack>
              </WrapItem>

              {/*Location*/}
              <WrapItem>
                <VStack alignItems="left">
                  <InputGroup>
                    <InputRightElement
                      pointerEvents="none"
                      children={<Search2Icon color="gray" />}
                    />
                    <Input type="text" placeholder="Location" color="#4A5568" />
                  </InputGroup>
                  <HStack>
                    <Tag size="lg" borderRadius="full" colorScheme="gray">
                      Online
                    </Tag>
                  </HStack>
                </VStack>
              </WrapItem>
              {/*Estimated Quote */}

              <WrapItem>
                <VStack alignItems="left">
                  <Select placeholder="Estimated Quote Price">
                    <option value="option1">Online</option>
                    <option value="option2">Offline</option>
                  </Select>
                  <HStack>
                    <Tag size="lg" borderRadius="full" colorScheme="blue">
                      1000GiB / 24month
                    </Tag>
                  </HStack>
                </VStack>
              </WrapItem>
            </Wrap>
          </Stack>
        </GridItem>
      </Grid>
    </>
  );
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: "https://miner-marketplace-backend.onrender.com/query",
    cache: new InMemoryCache(),
  });
  // fetchedData
  const { data } = await client.query({
    query: gql`
      query {
        miners {
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
  return {
    props: {
      miners: data.miners,
    },
  };
}

// {
//   /*Miner Listing Table*/
// }
// <Table variant="simple">
//   {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
//   <Thead>
//     <Tr>
//       <Th>S.No.</Th>
//       <Th>Miner</Th>
//       <Th>Reputation Score</Th>
//       <Th>Transparency Score</Th>
//       <Th>Type of Service</Th>
//       <Th>Data Transfer Mechanism</Th>
//       <Th>Location</Th>
//       <Th>Estimated Quote Price</Th>
//       <Th>QAP</Th>
//     </Tr>
//   </Thead>
//   <Tbody>
//     <Tr>
//       <Td>SerialNo</Td>
//       <Td>
//         <Text>UserName</Text>
//         <Link>minerAddress</Link>
//       </Td>
//     </Tr>
//   </Tbody>
//   <Tfoot>
//     {/*Probably Pagination will go here!
//             <Tr>
//               <Th>To convert</Th>
//               <Th>into</Th>
//               <Th isNumeric>multiply by</Th>
//             </Tr> */}
//   </Tfoot>
// </Table>;
