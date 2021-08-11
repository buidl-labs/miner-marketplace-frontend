import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
  AccordionIcon,
  Button,
  Box,
  Center,
  Heading,
  Image,
  Stack,
  Grid,
  GridItem,
  IconButton,
  Input,
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
  Spacer,
  Stat,
  Switch,
  StatLabel,
  StatNumber,
  StatHelpText,
} from "@chakra-ui/react";
import React, { useEffect, useState, useRef } from "react";
import {
  Icon,
  IconProps,
  Search2Icon,
  ArrowDownIcon,
  ArrowUpIcon,
} from "@chakra-ui/icons";
import { ApolloClient, InMemoryCache, gql, useApolloClient } from "@apollo/client";
import { createHttpLink } from "apollo-link-http";
import { TableProps } from "antd/lib/table";
import "antd/dist/antd.css";
import NxLink from "next/link";
import { Table, Space } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  GetFormattedStorageUnits,
  GetFormattedFILUnits,
} from "../../../util/util";

function AdvanceView(props) {

  const [transactions, setTransactions] = useState([]);
  const [finalFromArr, setFinalFromArr] = useState([]);
  const [finalToArr, setFinalToArr] = useState([]);

  const BACKEND_URL = "https://miner-marketplace-backend-2.onrender.com/query";
  const client = new ApolloClient({
    uri: BACKEND_URL,
    cache: new InMemoryCache(),
  });
  // const { data } = await 
  client
    .query({
      query: gql`
      query {
        miner(id: "${props.minerID}") {
          id
          transactions (first: 1000, orderBy: { param: timestamp, sort: DESC }) {
            id
            value
            methodName
            from
            to
            minerFee
            burnFee
            transactionType
            exitCode
            height
            timestamp
          }
        }
      }
    `,
    })
    .then((data) => {
      return data.data;
    })
    .then((d) => {
      return d.miner;
    })
    .then((m) => {
      setTransactions(m.transactions);
      let fromArr = [];
      let toArr = [];
      m.transactions.forEach((txn) => {
        fromArr.push(txn.from); //{ text: txn.from, value: txn.from });
        toArr.push(txn.to); //{ text: txn.to, value: txn.to });
      });
      fromArr = [...new Set(fromArr)];
      toArr = [...new Set(toArr)];
      fromArr = fromArr.map((fa) => {
        return { text: fa, value: fa };
      });
      toArr = toArr.map((ta) => {
        return { text: ta, value: ta };
      });
      setFinalFromArr(fromArr);
      setFinalToArr(toArr);
    });


  const dataSource = transactions.map((txn) => {
    let txntype = "message";
    if (txn.methodName == "ApplyRewards") {
      txntype = "block";
    }

    return {
      key: txn.id,
      id: {
        mid: txn.id,
        txntype: txntype,
      },
      value: {
        val: Number(txn.value),
        display: GetFormattedFILUnits(Number(txn.value)),
      },
      methodName: txn.methodName,
      from: txn.from,
      to: txn.to,
      minerFee: {
        val: Number(txn.minerFee),
        display: GetFormattedFILUnits(Number(txn.minerFee)),
      },
      burnFee: {
        val: Number(txn.burnFee),
        display: GetFormattedFILUnits(Number(txn.burnFee)),
      },
      transactionType: txn.transactionType,
      exitCode: txn.exitCode,
      height: txn.height,
      timestamp: txn.timestamp,
    };
  });

  //const [pagination, setPagination] = useState({});

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id) => {
        return (
          <div>
            <a
              href={"https://filfox.info/en/" + id.txntype + "/" + id.mid}
              style={{ cursor: "pointer" }}
              target="_blank"
            >
              <Text maxW="10" isTruncated>
                {id.mid}
              </Text>
            </a>
          </div>
        );
      },
    },
    {
      title: "Height",
      dataIndex: "height",
      key: "height",
      sorter: {
        compare: (a, b) => parseInt(a.height) - parseInt(b.height),
      },
    },
    {
      title: "Timestamp",
      dataIndex: "timestamp",
      key: "timestamp",
      sorter: {
        compare: (a, b) => parseInt(a.timestamp) - parseInt(b.timestamp),
      },
      render: (dateProps) => {
        const miliseconds = dateProps * 1000;
        const dateObject = new Date(miliseconds);
        const txnDate = dateObject.toLocaleString();
        return <p>{txnDate}</p>;
      },
    },
    {
      title: "Type",
      dataIndex: "transactionType",
      key: "transactionType",
      filters: [
        { text: "Collateral Deposit", value: "Collateral Deposit" },
        { text: "Block Reward", value: "Block Reward" },
        { text: "Penalty", value: "Penalty" },
        { text: "Transfer", value: "Transfer" },
        { text: "Others", value: "Others" },
      ],
      onFilter: (value, record) => {
        return record.transactionType.includes(value);
      },
    },
    {
      title: "Method",
      dataIndex: "methodName",
      key: "methodName",
      filters: [
        { text: "AddBalance", value: "AddBalance" },
        { text: "PreCommitSector", value: "PreCommitSector" },
        { text: "ProveCommitSector", value: "ProveCommitSector" },
        { text: "ApplyRewards", value: "ApplyRewards" },
        { text: "PublishStorageDeals", value: "PublishStorageDeals" },
        { text: "TerminateSectors", value: "TerminateSectors" },
        { text: "RepayDebt", value: "RepayDebt" },
        { text: "ReportConsensusFault", value: "ReportConsensusFault" },
        { text: "DisputeWindowedPoSt", value: "DisputeWindowedPoSt" },
        {
          text: "WithdrawBalance (miner)",
          value: "WithdrawBalance (miner)",
        },
        {
          text: "WithdrawBalance (market)",
          value: "WithdrawBalance (market)",
        },
      ],
      onFilter: (value, record) => {
        return record.methodName.includes(value);
      },
    },
    {
      title: "From",
      dataIndex: "from",
      key: "from",
      filters: finalFromArr,
      onFilter: (value, record) => {
        return record.from.includes(value);
      },
      render: (m) => {
        return (
          <div>
            <a
              href={"https://filfox.info/en/address/" + m}
              style={{ cursor: "pointer" }}
              target="_blank"
            >
              <Text maxW="10" isTruncated>
                {m}
              </Text>
            </a>
          </div>
        );
      },
    },
    {
      title: "To",
      dataIndex: "to",
      key: "to",
      filters: finalToArr,
      onFilter: (value, record) => {
        return record.to.includes(value);
      },
      render: (m) => {
        return (
          <div>
            <a
              href={"https://filfox.info/en/address/" + m}
              style={{ cursor: "pointer" }}
              target="_blank"
            >
              <Text maxW="10" isTruncated>
                {m}
              </Text>
            </a>
          </div>
        );
      },
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      sorter: {
        compare: (a, b) => parseInt(a.value.val) - parseInt(b.value.val),
      },
      render: (v) => {
        return <p>{v.display}</p>;
      },
    },
    {
      title: "Miner Fee",
      dataIndex: "minerFee",
      key: "minerFee",
      sorter: {
        compare: (a, b) => parseInt(a.minerFee.val) - parseInt(b.minerFee.val),
      },
      render: (v) => {
        return <p>{v.display}</p>;
      },
    },
    {
      title: "Burn Fee",
      dataIndex: "burnFee",
      key: "burnFee",
      sorter: {
        compare: (a, b) => parseInt(a.burnFee.val) - parseInt(b.burnFee.val),
      },
      render: (v) => {
        return <p>{v.display}</p>;
      },
    },
    {
      title: "Exit Code",
      dataIndex: "exitCode",
      key: "exitCode",
      filters: [
        { text: 0, value: 0 },
        { text: 1, value: 1 },
        { text: 2, value: 2 },
      ],
      onFilter: (value, record) => {
        return record.exitCode == value;
      },
    },
  ];

  // const [transactions, setTransactions] = useState([]);
  // const [finalFromArr, setFinalFromArr] = useState([]);
  // const [finalToArr, setFinalToArr] = useState([]);

  const [next, setNext] = useState(10);
  // function handleLoadMore() {
  //   setNext(next + 10);
  // }

  return (
    <>
      <Box>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={{defaultPageSize:50}}
          scroll={{ y: 480 }}
        />
      </Box>
    </>
  );
}

export default AdvanceView;