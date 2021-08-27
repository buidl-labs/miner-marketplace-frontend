import { Flex, Link, Image } from "@chakra-ui/react";

import { useRouter } from "next/router";

const MinerListingNavbar = () => {
  const router = useRouter();

  return (
    <>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        p="4"
        pl="8"
        bg="whiteAlpha.800"
        color="gray.800"
        borderBottom="solid 1px #F5F5F5 "
        zIndex="10"
        w="full"
        position="fixed"
        backdropFilter="blur(12px)"
      >
        <Link onClick={() => router.push("/")}>
          <Image
            src="/images/Logo-b.svg"
            maxW="48"
            maxH="10"
            alt="Data Station Logo"
          />
        </Link>
      </Flex>
    </>
  );
};

export default MinerListingNavbar;
