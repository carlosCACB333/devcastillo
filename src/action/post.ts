"use server";

import { PostConnection, Stage } from "@/generated/graphql";
import { GRAPH_SDK } from "@/utils/sdk";

export const searchPosts = async (
  keyword: string,
  first: number,
  skip: number,
  stage: Stage,
  slug?: string
) => {
  if (slug) {
    const { postsConnection } = await GRAPH_SDK.searchPostsByCategory({
      search: keyword,
      first,
      skip,
      stage,
      slug,
    });
    return postsConnection as PostConnection;
  }
  const { postsConnection } = await GRAPH_SDK.searchPosts({
    search: keyword,
    first,
    skip,
    stage,
  });
  return postsConnection as PostConnection;
};
