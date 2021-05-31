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

const Dashboard = () => {
  return (
    <>
      <DashboardNavbar />
      <Grid
        h="200px"
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap="0.5"
      >
        <GridItem rowSpan="2" colSpan="1">
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
      </Grid>
    </>
  );
};

export default Dashboard;
