import { getSdk as sdk } from "@/generated/graphql";
import { GraphQLClient } from "graphql-request";
import { env } from "./env";

const client = new GraphQLClient(env.cms.url, {
  cache: "force-cache",
  headers: {
    Authorization: `Bearer ${env.cms.token}`,
  },
});

export const GRAPH_SDK = sdk(client);
