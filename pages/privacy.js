import {
  Box,
  Container,
  Image,
  Stack,
  Heading,
  Button,
  Text,
  VStack,
  Link,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/landingPage/Footer";

const privacy = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Privacy Policy - DataStation</title>
      </Head>
      <Navbar />
      <Container
        maxW="container.lg"
        alignItems="center"
        textAlign="center"
        justifyContent="center"
      >
        <Stack textAlign="center" alignItems="center" py="32">
          <Heading>Privacy Policy</Heading>

          <Stack textAlign="left" spacing="2" fontSize="md" pt="6">
            <Text>
              At DataStation, accessible from{" "}
              <Link href="https://dataStation.app">
                https://datastation.app
              </Link>{" "}
              one of our main priorities is the privacy of our visitors. This
              Privacy Policy document contains types of information that is
              collected and recorded by DataStation and how we use it.
            </Text>
            <Text>
              If you have additional questions or require more information about
              our Privacy Policy, do not hesitate to contact us.
            </Text>
            <Text>
              This Privacy Policy applies only to our online activities and is
              valid for visitors to our website with regards to the information
              that they shared and/or collect in DataStation. This policy is not
              applicable to any information collected offline or via channels
              other than this website.
            </Text>
            <Heading size="md" pt="4">
              Consent
            </Heading>
            <Text>
              By using our website, you hereby consent to our Privacy Policy and
              agree to its terms.
            </Text>
            <Heading size="md" pt="4">
              Information we collect
            </Heading>
            <Text>
              The personal information that you are asked to provide, and the
              reasons why you are asked to provide it, will be made clear to you
              at the point we ask you to provide your personal information.
            </Text>
            <Text>
              If you contact us directly, we may receive additional information
              about you such as your name, email address, phone number, the
              contents of the message and/or attachments you may send us, and
              any other information you may choose to provide.
            </Text>
            <Heading size="md" pt="4">
              How we use your information
            </Heading>
            <Text>
              We use the information we collect in various ways, including to:
              <UnorderedList mt="4" spacing="2">
                <ListItem>Provide, operate, and maintain our website</ListItem>
                <ListItem>
                  Improve, personalize, and expand our website
                </ListItem>
                <ListItem>
                  Understand and analyze how you use our website
                </ListItem>
                <ListItem>
                  Develop new products, services, features, and functionality
                </ListItem>
                <ListItem>
                  Communicate with you, either directly or through one of our
                  partners, including for customer service, to provide you with
                  updates and other information relating to the website, and for
                  marketing and promotional purposes if you opt in for the same
                </ListItem>
                <ListItem>Send you emails</ListItem>
                <ListItem>Find and prevent fraud</ListItem>
              </UnorderedList>
            </Text>
            <Heading size="md" pt="4">
              Log Files
            </Heading>
            <Text>
              DataStation follows a standard procedure of using log files. These
              files log visitors when they visit websites. All hosting companies
              do this as part of hosting services' analytics. The information
              collected by log files include internet protocol (IP) addresses,
              browser type, Internet Service Provider (ISP), date and time
              stamp, referring/exit pages, and possibly the number of clicks.
              These are not linked to any information that is personally
              identifiable. The purpose of the information is for analyzing
              trends, administering the site, tracking users' movement on the
              website, and gathering demographic information.
            </Text>
            <Heading size="md" pt="4">
              Cookies and Web Beacons
            </Heading>
            <Text>
              Like any other website, DataStation uses 'cookies'. These cookies
              are used to store information including visitors' preferences, and
              the pages on the website that the visitor accessed or visited. The
              information is used to optimize the users' experience by
              customizing our web page content based on visitors' browser type
              and/or other information.
            </Text>
            <Text>
              For more general information on cookies, please read{" "}
              <Link
                href="https://www.cookieconsent.com/what-are-cookies/"
                isExternal
              >
                "What Are Cookies".
              </Link>
            </Text>
            <Heading size="md" pt="4">
              CCPA Privacy Rights
            </Heading>
            <Text>
              Under the CCPA, among other rights, California consumers have the
              right to:
              <UnorderedList mt="4" spacing="2">
                <ListItem>
                  Request that a business that collects a consumer's personal
                  data disclose the categories and specific pieces of personal
                  data that a business has collected about consumers.
                </ListItem>
                <ListItem>
                  Request that a business delete any personal data about the
                  consumer that a business has collected.
                </ListItem>
                <ListItem>
                  Request that a business that sells a consumer's personal data,
                  not sell the consumer's personal data.
                </ListItem>
              </UnorderedList>
            </Text>
            <Text>
              Please note that we do not sell any personal data. If you make a
              request, we have one month to respond to you. If you would like to
              exercise any of these rights, please contact us.
            </Text>
            <Heading size="md" pt="4">
              GDPR Data Protection Rights
            </Heading>
            <Text>
              We would like to make sure you are fully aware of all of your data
              protection rights. Every user is entitled to the following:
              <UnorderedList mt="4" spacing="2">
                <ListItem>
                  The right to access – You have the right to request copies of
                  your personal data. We may charge you a small fee for this
                  service.
                </ListItem>
                <ListItem>
                  The right to rectification – You have the right to request
                  that we correct any information you believe is inaccurate. You
                  also have the right to request that we complete the
                  information you believe is incomplete.
                </ListItem>
                <ListItem>
                  The right to erasure – You have the right to request that we
                  erase your personal data, under certain conditions.
                </ListItem>
                <ListItem>
                  The right to restrict processing – You have the right to
                  request that we restrict the processing of your personal data,
                  under certain conditions.
                </ListItem>
                <ListItem>
                  The right to object to processing – You have the right to
                  object to our processing of your personal data, under certain
                  conditions.
                </ListItem>
                <ListItem>
                  The right to data portability – You have the right to request
                  that we transfer the data that we have collected to another
                  organization, or directly to you, under certain conditions.
                </ListItem>
              </UnorderedList>
            </Text>
            <Text>
              If you make a request, we have one month to respond to you. If you
              would like to exercise any of these rights, please contact us.
            </Text>
            <Heading size="md" pt="4">
              Children's Information
            </Heading>
            <Text>
              Another part of our priority is adding protection for children
              while using the internet. We encourage parents and guardians to
              observe, participate in, and/or monitor and guide their online
              activity.
            </Text>
            <Text>
              DataStation does not knowingly collect any Personal Identifiable
              Information from children under the age of 13. If you think that
              your child provided this kind of information on our website, we
              strongly encourage you to contact us immediately and we will do
              our best efforts to promptly remove such information from our
              records.
            </Text>
          </Stack>
        </Stack>
      </Container>

      <Footer />
    </>
  );
};

export default privacy;
