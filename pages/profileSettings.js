import {
  Grid,
  GridItem,
  Heading,
  Text,
  WrapItem,
  Input,
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
} from "@chakra-ui/react";
import React from "react";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import DashboardMenu from "../components/dashboard/DashboardMenu";
import { Search } from "react-feather";

function profileSettings() {
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
        <GridItem colSpan="10" mt="28" pl="12">
          <VStack alignItems="flex-start" spacing="8">
            <VStack alignItems="flex-start">
              <Heading size="lg" color="gray.700">
                Miner Address
              </Heading>
              <Text>f0123456</Text>
            </VStack>

            {/*Basic Settings */}
            <VStack spacing="4" w="24rem">
              <FormControl id="fullName">
                <FormLabel>Full Name</FormLabel>
                <Input type="text" pleaceholder="Enter your Full Name" />
              </FormControl>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" placeholder="example@email.com" />
              </FormControl>
              <FormControl id="website">
                <FormLabel>Website</FormLabel>
                <Input type="website" placeholder="https://www.mywebsite.com" />
              </FormControl>
              <FormControl id="twitter">
                <FormLabel>Twitter</FormLabel>
                <Input type="link" placeholder="https://twitter.com/" />
              </FormControl>
              <FormControl id="slack">
                <FormLabel>Slack</FormLabel>
                <Input type="link" placeholder="https://" />
              </FormControl>
              <FormControl id="bio">
                <FormLabel>Bio</FormLabel>
                <Textarea placeholder="Write a short Bio" />
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
                  <FormLabel htmlFor="online" mb="0">
                    Online
                  </FormLabel>
                  <Switch id="online" />
                </FormControl>
                <FormControl display="flex" alignItems="center">
                  <FormLabel htmlFor="offline" mb="0">
                    Offline
                  </FormLabel>
                  <Switch id="offline" />
                </FormControl>
                <FormControl display="flex" alignItems="center">
                  <FormLabel htmlFor="repair" mb="0">
                    Repair
                  </FormLabel>
                  <Switch id="repair" />
                </FormControl>
              </Stack>
              <Stack spacing="4">
                <Text fontSize="lg" fontWeight="medium" color="blue.900">
                  Data Transfer Mechanism
                </Text>
                <FormControl display="flex" alignItems="center">
                  <FormLabel htmlFor="storage" mb="0">
                    Online
                  </FormLabel>
                  <Switch id="Online" />
                </FormControl>
                <FormControl display="flex" alignItems="center">
                  <FormLabel htmlFor="retrieval" mb="0">
                    Retrieval
                  </FormLabel>
                  <Switch id="retrieval" />
                </FormControl>
              </Stack>
              <Stack spacing="4">
                <Text fontSize="lg" fontWeight="medium" color="blue.900">
                  Location
                </Text>
                <InputGroup>
                  <InputRightElement
                    pointerEvents="none"
                    children={<Search color="gray" />}
                  />
                  <Input type="text" placeholder="Search Location" />
                </InputGroup>
              </Stack>
              <Stack spacing="4">
                <Text fontSize="lg" fontWeight="medium" color="blue.900">
                  Ask Price
                </Text>
                <HStack alignItems="baseline" spacing="4">
                  <Text color="blue.900" fontWeight="medium">
                    Storage Ask Price
                  </Text>
                  <Spacer />
                  <VStack alignItems="left">
                    <Input placeholder="Enter amount" />
                    <Text fontSize="sm" color="gray.700">
                      ($0)
                    </Text>
                  </VStack>
                  <Text size="sm" color="gray.600">
                    FIL/GiB/epoch
                  </Text>
                </HStack>
                <HStack alignItems="baseline" spacing="4">
                  <Text color="blue.900" fontWeight="medium">
                    Verified Ask Price
                  </Text>
                  <Spacer />
                  <VStack alignItems="left">
                    <Input placeholder="Enter amount" />
                    <Text fontSize="sm" color="gray.700">
                      ($0)
                    </Text>
                  </VStack>
                  <Text size="sm" color="gray.600">
                    FIL/GiB/epoch
                  </Text>
                </HStack>
                <HStack alignItems="baseline" spacing="4">
                  <Text color="blue.900" fontWeight="medium">
                    Retrieval Ask Price
                  </Text>
                  <Spacer />
                  <VStack alignItems="left">
                    <Input placeholder="Enter amount" />
                    <Text fontSize="sm" color="gray.700">
                      ($0)
                    </Text>
                  </VStack>
                  <Text size="sm" color="gray.600">
                    FIL/GiB/epoch
                  </Text>
                </HStack>
              </Stack>
            </VStack>
            <HStack spacing="12" w="100%">
              <Button colorScheme="gray">Discard</Button>
              <Button colorScheme="blue">Save Changes</Button>
            </HStack>
          </VStack>
        </GridItem>
      </Grid>
    </>
  );
}

export default profileSettings;
