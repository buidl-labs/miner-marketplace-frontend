import {
  Button,
  Heading,
  Stack,
  Flex,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputRightElement,
  InputLeftElement,
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
  Text,
  CheckboxGroup,
  Checkbox,
  Circle,
  Spacer,
} from "@chakra-ui/react";
import React, { useEffect, useState, useRef } from "react";
import { Icon, IconProps, Search2Icon } from "@chakra-ui/icons";
import Select from "react-select";

import DashboardMenu from "../components/dashboard/DashboardMenu";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";

import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { createHttpLink } from "apollo-link-http";
import { TableProps } from "antd/lib/table";
import "antd/dist/antd.css";
import NxLink from "next/link";
import { Table, Space } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

import { useRouter } from "next/router";

import { GetFormattedStorageUnits, GetFormattedFILUnits, GetSimpleFILUnits, GetSimpleUSDUnits } from "../util/util";
import Base from "antd/lib/typography/Base";

export default function Miners({ miners, href }) {
  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=filecoin&vs_currencies=usd",
    )
      .then((res) => res.json())
      .then((r) => {
        // console.log(r.filecoin.usd);
        setFilecoinUSDRate(r.filecoin.usd);
      });
  }, []);
  const [filecoinUSDRate, setFilecoinUSDRate] = useState(0);

  const router = useRouter();
  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
  };

  const [storageDuration, setStorageDuration] = useState(6);
  const [storageAmount, setStorageAmount] = useState(10);
  const [storageDurationText, setStorageDurationText] = useState(6);
  const [storageAmountText, setStorageAmountText] = useState(10);

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

    let storageAskPrice = fd.pricing.storageAskPrice;
    if (
      isNaN(fd.pricing.storageAskPrice) ||
      fd.pricing.storageAskPrice == null ||
      fd.pricing.storageAskPrice == ""
    ) {
      // console.log(
      //   "fd.pricing.storageAskPrice invalid",
      //   fd.pricing.storageAskPrice
      // );
      storageAskPrice = 0; // show zero for miners who haven't mentioned askPrice
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
      estimatedQuote: {
        fil:
          storageDuration *
          30 *
          2880 *
          storageAmount *
          (parseInt(storageAskPrice) / 10 ** 18),
        display: GetSimpleFILUnits(
          storageDuration *
          30 *
          2880 *
          storageAmount *
          parseInt(storageAskPrice),
        ),
        usd:
          storageDuration *
          30 *
          2880 *
          storageAmount *
          (parseInt(storageAskPrice) / 10 ** 18) *
          filecoinUSDRate,
        displayUSD:
          GetSimpleUSDUnits(storageDuration *
            30 *
            2880 *
            storageAmount *
            (parseInt(storageAskPrice) / 10 ** 18) *
            filecoinUSDRate)
      },
      qap: {
        val: fd.qualityAdjustedPower,
        display: GetFormattedStorageUnits(fd.qualityAdjustedPower),
      },
    };
  });

  let c = {
    "AF": "Afghanistan",
    "AX": "Aland Islands",
    "AL": "Albania",
    "DZ": "Algeria",
    "AS": "American Samoa",
    "AD": "Andorra",
    "AO": "Angola",
    "AI": "Anguilla",
    "AQ": "Antarctica",
    "AG": "Antigua And Barbuda",
    "AR": "Argentina",
    "AM": "Armenia",
    "AW": "Aruba",
    "AU": "Australia",
    "AT": "Austria",
    "AZ": "Azerbaijan",
    "BS": "Bahamas",
    "BH": "Bahrain",
    "BD": "Bangladesh",
    "BB": "Barbados",
    "BY": "Belarus",
    "BE": "Belgium",
    "BZ": "Belize",
    "BJ": "Benin",
    "BM": "Bermuda",
    "BT": "Bhutan",
    "BO": "Bolivia",
    "BA": "Bosnia And Herzegovina",
    "BW": "Botswana",
    "BV": "Bouvet Island",
    "BR": "Brazil",
    "IO": "British Indian Ocean Territory",
    "BN": "Brunei Darussalam",
    "BG": "Bulgaria",
    "BF": "Burkina Faso",
    "BI": "Burundi",
    "KH": "Cambodia",
    "CM": "Cameroon",
    "CA": "Canada",
    "CV": "Cape Verde",
    "KY": "Cayman Islands",
    "CF": "Central African Republic",
    "TD": "Chad",
    "CL": "Chile",
    "CN": "China",
    "CX": "Christmas Island",
    "CC": "Cocos (Keeling) Islands",
    "CO": "Colombia",
    "KM": "Comoros",
    "CG": "Congo",
    "CD": "Congo, Democratic Republic",
    "CK": "Cook Islands",
    "CR": "Costa Rica",
    "CI": "Cote D\"Ivoire",
    "HR": "Croatia",
    "CU": "Cuba",
    "CY": "Cyprus",
    "CZ": "Czech Republic",
    "DK": "Denmark",
    "DJ": "Djibouti",
    "DM": "Dominica",
    "DO": "Dominican Republic",
    "EC": "Ecuador",
    "EG": "Egypt",
    "SV": "El Salvador",
    "GQ": "Equatorial Guinea",
    "ER": "Eritrea",
    "EE": "Estonia",
    "ET": "Ethiopia",
    "FK": "Falkland Islands (Malvinas)",
    "FO": "Faroe Islands",
    "FJ": "Fiji",
    "FI": "Finland",
    "FR": "France",
    "GF": "French Guiana",
    "PF": "French Polynesia",
    "TF": "French Southern Territories",
    "GA": "Gabon",
    "GM": "Gambia",
    "GE": "Georgia",
    "DE": "Germany",
    "GH": "Ghana",
    "GI": "Gibraltar",
    "GR": "Greece",
    "GL": "Greenland",
    "GD": "Grenada",
    "GP": "Guadeloupe",
    "GU": "Guam",
    "GT": "Guatemala",
    "GG": "Guernsey",
    "GN": "Guinea",
    "GW": "Guinea-Bissau",
    "GY": "Guyana",
    "HT": "Haiti",
    "HM": "Heard Island & Mcdonald Islands",
    "VA": "Holy See (Vatican City State)",
    "HN": "Honduras",
    "HK": "Hong Kong",
    "HU": "Hungary",
    "IS": "Iceland",
    "IN": "India",
    "ID": "Indonesia",
    "IR": "Iran, Islamic Republic Of",
    "IQ": "Iraq",
    "IE": "Ireland",
    "IM": "Isle Of Man",
    "IL": "Israel",
    "IT": "Italy",
    "JM": "Jamaica",
    "JP": "Japan",
    "JE": "Jersey",
    "JO": "Jordan",
    "KZ": "Kazakhstan",
    "KE": "Kenya",
    "KI": "Kiribati",
    "KR": "Korea",
    "KP": "North Korea",
    "KW": "Kuwait",
    "KG": "Kyrgyzstan",
    "LA": "Lao People\"s Democratic Republic",
    "LV": "Latvia",
    "LB": "Lebanon",
    "LS": "Lesotho",
    "LR": "Liberia",
    "LY": "Libyan Arab Jamahiriya",
    "LI": "Liechtenstein",
    "LT": "Lithuania",
    "LU": "Luxembourg",
    "MO": "Macao",
    "MK": "Macedonia",
    "MG": "Madagascar",
    "MW": "Malawi",
    "MY": "Malaysia",
    "MV": "Maldives",
    "ML": "Mali",
    "MT": "Malta",
    "MH": "Marshall Islands",
    "MQ": "Martinique",
    "MR": "Mauritania",
    "MU": "Mauritius",
    "YT": "Mayotte",
    "MX": "Mexico",
    "FM": "Micronesia, Federated States Of",
    "MD": "Moldova",
    "MC": "Monaco",
    "MN": "Mongolia",
    "ME": "Montenegro",
    "MS": "Montserrat",
    "MA": "Morocco",
    "MZ": "Mozambique",
    "MM": "Myanmar",
    "NA": "Namibia",
    "NR": "Nauru",
    "NP": "Nepal",
    "NL": "Netherlands",
    "AN": "Netherlands Antilles",
    "NC": "New Caledonia",
    "NZ": "New Zealand",
    "NI": "Nicaragua",
    "NE": "Niger",
    "NG": "Nigeria",
    "NU": "Niue",
    "NF": "Norfolk Island",
    "MP": "Northern Mariana Islands",
    "NO": "Norway",
    "OM": "Oman",
    "PK": "Pakistan",
    "PW": "Palau",
    "PS": "Palestinian Territory, Occupied",
    "PA": "Panama",
    "PG": "Papua New Guinea",
    "PY": "Paraguay",
    "PE": "Peru",
    "PH": "Philippines",
    "PN": "Pitcairn",
    "PL": "Poland",
    "PT": "Portugal",
    "PR": "Puerto Rico",
    "QA": "Qatar",
    "RE": "Reunion",
    "RO": "Romania",
    "RU": "Russian Federation",
    "RW": "Rwanda",
    "BL": "Saint Barthelemy",
    "SH": "Saint Helena",
    "KN": "Saint Kitts And Nevis",
    "LC": "Saint Lucia",
    "MF": "Saint Martin",
    "PM": "Saint Pierre And Miquelon",
    "VC": "Saint Vincent And Grenadines",
    "WS": "Samoa",
    "SM": "San Marino",
    "ST": "Sao Tome And Principe",
    "SA": "Saudi Arabia",
    "SN": "Senegal",
    "RS": "Serbia",
    "SC": "Seychelles",
    "SL": "Sierra Leone",
    "SG": "Singapore",
    "SK": "Slovakia",
    "SI": "Slovenia",
    "SB": "Solomon Islands",
    "SO": "Somalia",
    "ZA": "South Africa",
    "GS": "South Georgia And Sandwich Isl.",
    "ES": "Spain",
    "LK": "Sri Lanka",
    "SD": "Sudan",
    "SR": "Suriname",
    "SJ": "Svalbard And Jan Mayen",
    "SZ": "Swaziland",
    "SE": "Sweden",
    "CH": "Switzerland",
    "SY": "Syrian Arab Republic",
    "TW": "Taiwan",
    "TJ": "Tajikistan",
    "TZ": "Tanzania",
    "TH": "Thailand",
    "TL": "Timor-Leste",
    "TG": "Togo",
    "TK": "Tokelau",
    "TO": "Tonga",
    "TT": "Trinidad And Tobago",
    "TN": "Tunisia",
    "TR": "Turkey",
    "TM": "Turkmenistan",
    "TC": "Turks And Caicos Islands",
    "TV": "Tuvalu",
    "UG": "Uganda",
    "UA": "Ukraine",
    "AE": "United Arab Emirates",
    "GB": "United Kingdom",
    "US": "United States",
    "UM": "United States Outlying Islands",
    "UY": "Uruguay",
    "UZ": "Uzbekistan",
    "VU": "Vanuatu",
    "VE": "Venezuela",
    "VN": "Vietnam",
    "VG": "Virgin Islands, British",
    "VI": "Virgin Islands, U.S.",
    "WF": "Wallis And Futuna",
    "EH": "Western Sahara",
    "YE": "Yemen",
    "ZM": "Zambia",
    "ZW": "Zimbabwe"
  }

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
      title: "Miner",
      dataIndex: "miner",
      key: "miner",
      render: (m) => {
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
      render: (reputationScore) => {
        var color = reputationScore < 50 ? "gray.500" : "blue.600";
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
      sorter: {
        compare: (a, b) =>
          parseInt(a.transparencyScore) - parseInt(b.transparencyScore),
      },
      render: (transparencyScore) => {
        var color = transparencyScore < 50 ? "orange.600" : "blue.700";
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
      onFilter: (value, record) => {
        //console.log("VR", value, record);
        return record.serviceType.includes(value);
      },
      render: (serviceTypes) => (
        <HStack spacing="2">
          {serviceTypes.map((service) => {
            let tagColor = "gray.700";
            let tagBg = "gray.100";
            if (service === "Storage") {
              tagColor = "blue.700";
              let tagBg = "blue.50";
            } else if (service === "Retrieval") {
              tagColor = "purple.700";
              tagBg = "purple.50";
            }
            return (
              <Tag color={tagColor} bg={tagBg} borderRadius="full">
                {service}
              </Tag>
            );
          })}
        </HStack>
      ),
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
        dataTransferMechanism.map((datatype) => {
          let color = "gray.500";
          if (datatype === "Online") {
            color = "green.500";
          }
          return (
            <HStack>
              {/* <Circle size="0.8rem" bg={color} /> */}
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
          <div color="gray.600">
            <Text>{c[l.country]}</Text>
            {l.region && (<Text fontSize="sm">({l.region})</Text>)}
            {!l.region && (<Text fontSize="sm">-</Text>)}
          </div>
        );
      },
    },
    {
      title: "Estimated Quote",
      dataIndex: "estimatedQuote",
      key: "estimatedQuote",
      sorter: {
        compare: (a, b) => a.estimatedQuote.fil - b.estimatedQuote.fil,
        // parseInt(a.estimatedQuote.fil) - parseInt(b.estimatedQuote.fil),
      },
      render: (l) => {
        return (
          <div>
            <Text fontSize="larger" fontWeight="medium" color="gray.600">
              {/*{Math.round((l.fil + Number.EPSILON) * 1000) / 1000} FIL*/}
              {l.display}
            </Text>
            <Text color="gray.500">
              {l.displayUSD}
            </Text>
          </div>
        );
      },
    },
    {
      title: "QAP",
      dataIndex: "qap",
      key: "qap",
      sorter: {
        compare: (a, b) => parseInt(a.qap.val) - parseInt(b.qap.val),
      },
      render: (l) => {
        return (<>
          {/* {!l.display && (<p>{l.display}</p>)} */}
          {l.display == "NaN YB" ? (<p>-</p>) : (<p>{l.display}</p>)}
        </>);
      },
    },
  ];

  const [minerIdQuery, setMinerIdQuery] = useState("");
  const [filteredMiners, setFilteredMiners] = useState(dataSource);
  const filterList = (event) => {
    let mminers = dataSource;
    let q = minerIdQuery;
    if (q == "") {
      // console.log("");
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
    // console.log(
    //   "qupdated",
    //   minerIdQuery,
    //   "q",
    //   event.target.value,
    //   "qlc",
    //   event.target.value.toLowerCase()
    // );

    const q = event.target.value.toLowerCase();
    // if (q == "") {
    //   console.log("qempty");
    //   setFilteredMiners(miners);
    // } else {
    setMinerIdQuery(event.target.value);
    filterList(event);
    // }
  };

  /* Options for Select Component */
  const mServices = [
    { label: "Storage", value: "Storage" },
    { label: "Retrieval", value: "Retrieval" },
    { label: "Repair", value: "Repair" },
  ];

  const mDataMechanism = [
    { label: "Online", value: "Online" },
    { label: "Offline", value: "Offline" },
  ];

  const mLocationSelect = [
    { label: "Asia", value: "Asia" },
    { label: "Europe", value: "Europe" },
    { label: "Africa", value: "Africa" },
    { label: "Oceania", value: "Oceania" },
    { label: "South America", value: "South America" },
    { label: "Central America", value: "Central America" },
    { label: "North America", value: "North America" },
  ];

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
    console.log("setDStorageUnits", dStorageUnits, event);
    setDStorageUnits(event);

    let finalSA = storageAmountText;
    console.log("storageAmountText", storageAmountText);
    if (event.value == "MB") {
      finalSA *= 0.001 * 0.931323;
    } else if (event.value == "GB") {
      finalSA *= 0.931323;
    } else if (event.value == "TB") {
      finalSA *= 1000 * 0.931323;
    } else if (event.value == "PB") {
      finalSA *= 1000000 * 0.931323;
    }
    console.log("finalSA", finalSA);
    setStorageAmount(finalSA);
  };
  const handleStorageDurationUnitsChange = (event) => {
    console.log("setDStorageDurationUnits", dStorageDurationUnits, event);
    setDStorageDurationUnits(event);

    let finalSD = storageDurationText;
    console.log("storageDurationText", storageDurationText);
    if (event.value == "Years") {
      // && dStorageDurationUnits.value != "Years") {
      finalSD *= 12;
    }
    console.log("finalSD", finalSD);
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

  const customStylesAlt = {
    control: (Base) => ({
      ...Base,
      height: "2rem",
      borderRadius: "0.4rem",

      borderColor: "#E2E8F0",
    }),
  };

  return (
    <>
      <DashboardNavbar isMinerProfile={false} />
      <Grid
        h="200px"
        templateRows="repeat(4, 1fr)"
        templateColumns="repeat(12, 1fr)"
      >
        {/* <GridItem rowSpan="8" colSpan="2">
          <DashboardMenu />
        </GridItem> */}

        <GridItem colSpan="12" pt="28" bg="white" px="8">
          <Flex justifyContent="space-between">
            <Stack spacing="6" w="36rem">
              <Heading color="gray.700" size="lg">
                Search Miners
              </Heading>
              <Stack spacing="4" pb="4">
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="visible"
                    children={<Search2Icon w={5} h={5} color="gray.500" />}
                  />
                  <Input
                    type="text"
                    size="lg"
                    placeholder="Search by Miner Address"
                    value={minerIdQuery}
                    onChange={onChange}
                  />
                </InputGroup>
              </Stack>
            </Stack>

            <Stack
              bg="gray.100"
              borderRadius="xl"
              p="6"
            >
              <HStack
                spacing="4"
                alignItems="flex-end"
                pb="2"
              >
                <Stack spacing="2" >
                  <Heading size="sm" fontWeight="semibold" color="gray.700">
                    Estimated Quote
                  </Heading>
                  <Text fontWeight="medium" color="gray.700">
                    Storage amount
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
                      placeholder="Enter amount of storage"
                      value={storageAmountText}
                      onChange={(event) => {
                        console.log("amt changed");
                        let finalSA = event.target.value;
                        setStorageAmountText(event.target.value);
                        if (dStorageUnits.value == "MB") {
                          finalSA *= 0.001 * 0.931323;
                        } else if (dStorageUnits.value == "GB") {
                          finalSA *= 0.931323;
                        } else if (dStorageUnits.value == "TB") {
                          finalSA *= 1000 * 0.931323;
                        } else if (dStorageUnits.value == "PB") {
                          finalSA *= 1000000 * 0.931323;
                        }
                        console.log("finalSA", finalSA);

                        setStorageAmount(finalSA);
                        console.log(
                          "storageAmount",
                          storageAmount,
                          event.target.value,
                        );
                        console.log("dStorageUnits", dStorageUnits);
                        console.log(
                          "dStorageDurationUnits",
                          dStorageDurationUnits,
                        );
                      }}
                      borderRight="none"
                      borderRadius="0.4rem 0rem 0rem 0.4rem"
                    />

                    <Select
                      options={dStorageUnitsArr}
                      value={dStorageUnits}
                      onChange={handleStorageUnitsChange}
                      // defaultValue={dStorageUnitsArr[1]}
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
                      placeholder="Enter duration of storage"
                      value={storageDurationText}
                      onChange={(event) => {
                        console.log("dur changed");
                        let finalSD = event.target.value;
                        setStorageDurationText(event.target.value);
                        if (dStorageDurationUnits.value == "Years") {
                          finalSD *= 12;
                        }
                        console.log("finalSD", finalSD);

                        setStorageDuration(finalSD);
                        console.log(
                          "storageDuration",
                          storageDuration,
                          event.target.value,
                        );
                        console.log("dStorageUnits", dStorageUnits);
                        console.log(
                          "dStorageDurationUnits",
                          dStorageDurationUnits,
                        );
                      }}
                      borderRight="none"
                      borderRadius="0.4rem 0rem 0rem 0.4rem"
                    />
                    <Select
                      options={dStorageDurationUnitsArr}
                      value={dStorageDurationUnits}
                      onChange={handleStorageDurationUnitsChange}
                      // defaultValue={dStorageDurationUnitsArr[0]}
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
                onClick={(event) => {
                  filterList(event);
                }}
              >
                Update Estimated Quote
              </Button>
            </Stack>
          </Flex>
          <HStack
          //py={8}
          //w="full"
          //justifyContent="space-between"
          //alignItems="top"
          >
            {/* <VStack alignItems="left" w="20rem">
              <Heading size="sm" fontWeight="medium" color="gray.700">
                Type of Service
              </Heading>
              <Select
                closeMenuOnSelect={true}
                options={mServices}
                styles={customStylesAlt}
                isMulti
              />
            </VStack> */}

            {/* <VStack alignItems="left" w="20rem">
              <Heading size="sm" fontWeight="medium" color="gray.700">
                Data Transfer Mechanism
              </Heading>
              <Select
                options={mDataMechanism}
                styles={customStylesAlt}
                isMulti
              />
            </VStack> */}

            {/* <VStack alignItems="left" w="20rem">
              <Heading size="sm" fontWeight="medium" color="gray.700">
                Location
              </Heading>
              <Select
                options={mLocationSelect}
                onInputChange={(event) => {
                  // console.log("inputchange", event)
                }}
                onChange={(event) => {
                  console.log("justchange", event);
                }}
                styles={customStylesAlt}
                isMulti
              />
            </VStack> */}

          </HStack>

          <Stack spacing="8" mt="6">
            <Table
              columns={columns}
              dataSource={filteredMiners}
              // onChange={handleTableChange}
              // pagination={pagination}
              pagination={{ pageSize: 50 }}
              scroll={{ y: 480 }}
            />
          </Stack>
        </GridItem>
      </Grid>
    </>
  );
}

export async function getStaticProps() {
  console.log(process.env.BACKEND_URL);
  const client = new ApolloClient({
    uri: process.env.BACKEND_URL,
    cache: new InMemoryCache(),
  });
  const { data: fmmData } = await client.query({
    query: gql`
      query {
        miners(first: 3000) {
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
      miners: fmmData.miners,
      // filecoinUSDRate: cgkoJson.filecoin.usd, // cgko.json().filecoin.usd,
    },
  };
}
