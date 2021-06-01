import {
  Grid,
  GridItem,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import React from "react";
import DashboardMenu from "../components/dashboard/DashboardMenu";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import PersonalDetails from "../components/dashboard/PersonalDetails";
import QuoteCalculator from "../components/dashboard/QuoteCalculator";
import Scores from "../components/dashboard/Scores";
import ServiceDetails from "../components/dashboard/ServiceDetails";

const minerDetails = () => {
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

        <GridItem colSpan="5" pt="28">
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
        <GridItem colSpan="5" pt="28">
          <Scores reputationScore="64" transparencyScore="92" />
        </GridItem>

        <GridItem colSpan="7" pr="4" pt="8">
          <Tabs>
            <TabList>
              <Tab>Service Details</Tab>
              <Tab>Aggregated Earnings</Tab>
              <Tab>Predicted Earnings</Tab>
              <Tab>Transaction History</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <ServiceDetails
                  serviceLocation="Hongkong, India, Australia"
                  storageAskPrice="0.65"
                  verifiedAskPrice="0.8"
                  retrievalAskPrice="0.17"
                />
              </TabPanel>
              <TabPanel>
                <p>two!</p>
              </TabPanel>
              <TabPanel>
                <p>three!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </GridItem>
        <GridItem colSpan="3" pt="24">
          <QuoteCalculator />
        </GridItem>
      </Grid>
    </>
  );
};

export default minerDetails;
