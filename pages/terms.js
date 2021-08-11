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
import Navbar from "../components/Navbar";
import Footer from "../components/landingPage/Footer";
import { useRouter } from "next/router";
import Head from "next/head";

const terms = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Terms & Conditions - DataStation</title>
      </Head>
      <Navbar />
      <Container
        maxW="container.lg"
        alignItems="center"
        textAlign="center"
        justifyContent="center"
      >
        <Stack textAlign="center" alignItems="center" py="32">
          <Heading>Terms of Service</Heading>

          <Stack textAlign="left" spacing="2" pt="4" fontSize="md">
            <Text>
              DataStation ("Us" or "We") provides the{" "}
              <Link href="https://datastation.app">
                https://datastation.app
              </Link>
              website and various related services (collectively, the "Website")
              to you, the User, subject to your compliance with all the terms,
              conditions, and notices contained or referenced herein (the "Terms
              of Service"), as well as any other written agreement between us
              and you, including but not limited to the{" "}
              <Link href="https://datastation.app/privacy" isExternal>
                "Privacy Policy"
              </Link>{" "}
              and the
              <Link href="https://datastation.app/disclaimer" isExternal>
                "Legal Disclaimer".
              </Link>
            </Text>
            <Heading size="md" pt="4">
              Conduct on Website
            </Heading>
            <Text>
              Your use of the Website is subject to all applicable laws and
              regulations, and you are solely responsible for the substance of
              your communications through the Website. By posting information in
              or otherwise using any communications service, chat room, message
              board, newsgroup, software library, or other interactive service
              that may be available to you on or through this Website, you agree
              that you will not upload, share, post, or otherwise distribute or
              facilitate distribution of any content — including text,
              communications, software, images, sounds, data, or other
              information — that:
              <UnorderedList mt="4" spacing="2">
                <ListItem>
                  Is unlawful, threatening, abusive, harassing, defamatory,
                  libellous, deceptive, fraudulent, invasive of another’s
                  privacy, tortious, contains explicit or graphic descriptions
                  or accounts of sexual acts (including but not limited to
                  sexual language of a violent or threatening nature directed at
                  another individual or group of individuals), or otherwise
                  violates our rules or policies
                </ListItem>
                <ListItem>
                  Victimizes, harasses, degrades, or intimidates an individual
                  or group of individuals on the basis of religion, gender,
                  sexual orientation, race, ethnicity, age, or disability
                </ListItem>
                <ListItem>
                  Infringes on any patent, trademark, trade secret, copyright,
                  right of publicity, or other proprietary right of any party
                </ListItem>
                <ListItem>
                  Constitutes unauthorized or unsolicited advertising, junk or
                  bulk email (also known as "spamming"), chain letters, any
                  other form of unauthorized solicitation, or any form of
                  lottery or gambling
                </ListItem>
                <ListItem>
                  Contains software viruses or any other computer code, files,
                  or programs that are designed or intended to disrupt, damage,
                  or limit the functioning of any software, hardware, or
                  telecommunications equipment or to damage or obtain
                  unauthorized access to any data or other information of any
                  third party
                </ListItem>
                <ListItem>
                  Impersonates any person or entity, including any of our
                  employees or representatives
                </ListItem>
              </UnorderedList>
            </Text>
            <Text>
              We neither endorse nor assume any liability for the contents of
              any material uploaded or submitted by third party users of the
              Website. We generally do not pre-screen, monitor, or edit the
              content posted by users of communications services, chat rooms,
              message boards, newsgroups, software libraries, or other
              interactive services that may be available on or through this
              Website. However, we and our agents have the right at their sole
              discretion to remove any content that, in our judgment, does not
              comply with these Terms of Service and any other rules of user
              conduct for our site, or is otherwise harmful, objectionable, or
              inaccurate. We are not responsible for any failure or delay in
              removing such content. You hereby consent to such removal and
              waive any claim against us arising out of such removal of content.
            </Text>
            <Text>
              You agree that we may at any time, and at our sole discretion,
              terminate your membership, account, or other affiliation with our
              site without prior notice to you for violating any of the above
              provisions. In addition, you acknowledge that we will cooperate
              fully with investigations of violations of systems or network
              security at other sites, including cooperating with law
              enforcement authorities in investigating suspected criminal
              violations.
            </Text>

            <Heading size="md" pt="4">
              Third Party Websites
            </Heading>
            <Text>
              This site may link you to other sites on the Internet or otherwise
              include references to information, documents, software, materials
              and/or services provided by other parties. These sites may contain
              information or material that some people may find inappropriate or
              offensive.
            </Text>
            <Text>
              These other sites and parties are not under our control, and you
              acknowledge that we are not responsible for the accuracy,
              copyright compliance, legality, decency, or any other aspect of
              the content of such sites, nor are we responsible for errors or
              omissions in any references to other parties or their products and
              services. The inclusion of such a link or reference is provided
              merely as a convenience and does not imply endorsement of, or
              association with, the Website or party by us, or any warranty of
              any kind, either express or implied.
            </Text>
            <Heading size="md" pt="4">
              Intellectual Property
            </Heading>
            <Text>
              All custom graphics, icons, logos, and service names used on the
              Website are registered trademarks, service marks, and/or artwork
              held under copyright of DataStation or its Affiliates. All other
              marks are property of their respective owners. Nothing in these
              Terms of Service grants you any right to use any trademark,
              service mark, logo, and/or the name or trade names of DataStation
              or its Affiliates.
            </Text>
            <Heading size="md" pt="4">
              Disclaimer of Warranties
            </Heading>
            <Text>
              Content available through this Website often represents the
              opinions and judgments of an information provider, site user, or
              other person or entity not connected with us. We do not endorse,
              nor are we responsible for the accuracy or reliability of, any
              opinion, advice, or statement made by anyone other than an
              authorized DataStation spokesperson speaking in his/her official
              capacity. Please refer to the specific editorial policies posted
              on various sections of this Website for further information, which
              policies are incorporated by reference into these Terms of
              Service.
            </Text>
            <Text>
              You understand and agree that temporary interruptions of the
              services available through this Website may occur as normal
              events. You further understand and agree that we have no control
              over third party networks you may access in the course of the use
              of this Website, and therefore, delays and disruption of other
              network transmissions are completely beyond our control.
            </Text>
            <Text>
              You understand and agree that the services available on this
              Website are provided "AS IS" and that we assume no responsibility
              for the timeliness, deletion, mis-delivery or failure to store any
              user communications or personalization settings.
            </Text>
            <Heading size="md" pt="4">
              International Use
            </Heading>
            <Text>
              Although this Website may be accessible worldwide, we make no
              representation that materials on this Website are appropriate or
              available for use in locations outside the United States, and
              accessing them from territories where their contents are illegal
              is prohibited. Those who choose to access this Website from other
              locations do so on their own initiative and are responsible for
              compliance with local laws. Any offer for any product, service,
              and/or information made in connection with this Website is void
              where prohibited.
            </Text>
            <Heading size="md" pt="4">
              Termination
            </Heading>
            <Text>
              You agree that we may, in our sole discretion, terminate or
              suspend your access to all or part of the Website with or without
              notice and for any reason, including, without limitation, breach
              of these Terms of Service. Any suspected fraudulent, abusive or
              illegal activity may be grounds for terminating your relationship
              and may be referred to appropriate law enforcement authorities.
            </Text>
            <Text>
              Upon termination or suspension, regardless of the reasons
              therefore, your right to use the services available on this
              Website immediately ceases, and you acknowledge and agree that we
              may immediately deactivate or delete your account and all related
              information and files in your account and/or bar any further
              access to such files or this Website. We shall not be liable to
              you or any third party for any claims or damages arising out of
              any termination or suspension or any other actions taken by us in
              connection with such termination or suspension.
            </Text>
            <Heading size="md" pt="4">
              Governing Law
            </Heading>
            <Text>
              These Terms of Service and any dispute or claim arising out of, or
              related to them, shall be governed by and construed in accordance
              with the internal laws of the country of India without giving
              effect to any choice or conflict of law provision or rule.
            </Text>
            <Text>
              Any legal suit, action or proceeding arising out of, or related
              to, these Terms of Service or the Website shall be instituted
              exclusively in the federal courts of the country of India.
            </Text>
          </Stack>
        </Stack>
      </Container>

      <Footer />
    </>
  );
};

export default terms;
