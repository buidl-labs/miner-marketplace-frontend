import {
  Button,
  Box,
  Container,
  Link,
  Heading,
  HStack,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import DashboardMenu from "../components/dashboard/DashboardMenu";
import DashboardNavbar from "../components/dashboard/DashboardNav";

const Dashboard = () => {
  return (
    <>
      <DashboardNavbar />
      <DashboardMenu />
    </>
  );
};

export default Dashboard;
