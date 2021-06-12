import {
  Button,
  Heading,
  Stack,
  Grid,
  GridItem,
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
  CheckboxGroup,
  Checkbox,
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
import { Table, Space } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

export default function TransactionHistory(props) {
  const [pagination, setPagination] = useState({});
  const dataSource = props.transactions.map((txn) => {
    // Math.round((Number(txn.value) / 10 ** 18 + Number.EPSILON) * 1000) / 1000;
    // if (txn.minerFee > 0)
    //   console.log("MF", txn.minerFee, Number(txn.minerFee) / 10 ** 18);
    // TODO: convert value, minerFee, burnFee to nanoFIL/attoFIL etc based on their size
    // right now all are in FIL
    return {
      key: txn.id,
      id: txn.id,
      value: (Number(txn.value) / 10 ** 18).toFixed(3),
      methodName: txn.methodName,
      from: txn.from,
      to: txn.to,
      minerFee: (Number(txn.minerFee) / 10 ** 18).toFixed(3),
      burnFee: (Number(txn.burnFee) / 10 ** 18).toFixed(3),
      transactionType: txn.transactionType,
      exitCode: txn.exitCode,
      height: txn.height,
    };
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (m) => {
        return (
          <div>
            <a
              href={"https://filfox.info/en/message/" + m}
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
      title: "Height",
      dataIndex: "height",
      key: "height",
      sorter: {
        compare: (a, b) => parseInt(a.height) - parseInt(b.height),
      },
    },
    {
      title: "Type",
      dataIndex: "transactionType",
      key: "transactionType",
      filters: [
        { text: "Collateral Deposit", value: "Collateral Deposit" },
        { text: "Block Reward", value: "Block Reward" },
        { text: "Deals Publish", value: "Deals Publish" },
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
        { text: "PreCommitSector", value: "PreCommitSector" },
        { text: "ProveCommitSector", value: "ProveCommitSector" },
        { text: "ApplyRewards", value: "ApplyRewards" },
        { text: "TerminateSectors", value: "TerminateSectors" },
        { text: "RepayDebt", value: "RepayDebt" },
        {
          text: "WithdrawBalance (minerActor)",
          value: "WithdrawBalance (minerActor)",
        },
        { text: "ReportConsensusFault", value: "ReportConsensusFault" },
        { text: "DisputeWindowedPoSt", value: "DisputeWindowedPoSt" },
      ],
      onFilter: (value, record) => {
        return record.methodName.includes(value);
      },
    },
    {
      title: "From",
      dataIndex: "from",
      key: "from",
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
        compare: (a, b) => parseInt(a.value) - parseInt(b.value),
      },
    },
    {
      title: "Miner Fee",
      dataIndex: "minerFee",
      key: "minerFee",
      sorter: {
        compare: (a, b) => parseInt(a.minerFee) - parseInt(b.minerFee),
      },
    },
    {
      title: "Burn Fee",
      dataIndex: "burnFee",
      key: "burnFee",
      sorter: {
        compare: (a, b) => parseInt(a.burnFee) - parseInt(b.burnFee),
      },
    },
    {
      title: "ExitCode",
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

  return (
    <>
      <div>
        <p>Transaction History of miner {props.minerID}</p>

        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={pagination}
        />
      </div>
    </>
  );
}

// export default TransactionHistory;
// export async function getStaticProps()
