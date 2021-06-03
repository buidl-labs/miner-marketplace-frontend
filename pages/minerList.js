import {
  Heading,
  Stack,
  Input,
  Grid,
  GridItem,
  InputGroup,
  InputRightElement,
  Select,
  VStack,
  HStack,
  Link,
  Tag,
  Table,
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
import React from "react";
import { Icon, IconProps, Search2Icon } from "@chakra-ui/icons";
import DashboardMenu from "../components/dashboard/DashboardMenu";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";

function minerList() {
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
          <Stack spacing="8">
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

            {/*Miner Listing Table*/}
            <Table variant="simple">
              {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
              <Thead>
                <Tr>
                  <Th>S.No.</Th>
                  <Th>Miner</Th>
                  <Th>Reputation Score</Th>
                  <Th>Transparency Score</Th>
                  <Th>Type of Service</Th>
                  <Th>Data Transfer Mechanism</Th>
                  <Th>Location</Th>
                  <Th>Estimated Quote Price</Th>
                  <Th>QAP</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>SerialNo</Td>
                  <Td>
                    <Text>UserName</Text>
                    <Link>minerAddress</Link>
                  </Td>
                </Tr>
              </Tbody>
              <Tfoot>
                {/*Probably Pagination will go here! 
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr> */}
              </Tfoot>
            </Table>
          </Stack>
        </GridItem>
      </Grid>
    </>
  );
}

export default minerList;
