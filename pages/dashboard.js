import {
  Button,
  Box,
  Container,
  Link,
  Heading,
  HStack,
  Stack,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import React from "react";
import DashboardMenu from "../components/dashboard/DashboardMenu";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import PersonalDetails from "../components/dashboard/PersonalDetails";
import QuoteCalculator from "../components/dashboard/QuoteCalculator";
import Scores from "../components/dashboard/Scores";

const Dashboard = () => {
  return (
    <>
      <DashboardNavbar />
      <Grid
        h="200px"
        templateRows="repeat(4, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap="0.5"
        pr="12"
      >
        <GridItem rowSpan="4" colSpan="1">
          <DashboardMenu />
        </GridItem>
        <GridItem colSpan="2" pt="8">
          <PersonalDetails
            minerName="Bruce Wayne"
            minerAddress="f0123456"
            minerMail="#"
            minerWebsite="#"
            minerSlack="#"
            minerTwitter="#"
            workerAddress="1234455"
            ownerAddress="1234556"
            minerBio="this is miner's bio"
          />
        </GridItem>
        <GridItem colSpan="2" pt="8">
          <Scores reputationScore="64" transparencyScore="92" />
        </GridItem>
        <GridItem colSpan="1">
          <QuoteCalculator />
        </GridItem>
      </Grid>
    </>
  );
};

export default Dashboard;
