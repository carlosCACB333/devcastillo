"use server";

import { PostConnection, Stage } from "@/generated/graphql";
import { GRAPH_SDK } from "@/utils/sdk";
import { SearchFunction } from "./types";

export const searchPosts: SearchFunction<PostConnection> = async (
  keyword: string,
  first: number,
  skip: number,
  stage: Stage
) => {
  const { postsConnection } = await GRAPH_SDK.searchPosts({
    search: keyword,
    first,
    skip,
    stage,
  });
  return postsConnection as PostConnection;
};
