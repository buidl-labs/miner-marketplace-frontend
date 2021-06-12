import {} from "@chakra-ui/react";
import React from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { useRouter } from "next/router";

const PredictedEarnings = (miner) => {
  console.log("miner", miner);
  return <></>;
};

export default PredictedEarnings;

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: process.env.BACKEND_URL,
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query {
        miner(id: "f08403") {
          id
          qualityAdjustedPower
        }
      }
    `,
  });

  return {
    props: {
      miner: data.miner,
    },
  };
}
