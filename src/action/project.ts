"use server";

import { ProjectConnection, Stage } from "@/generated/graphql";
import { GRAPH_SDK } from "@/utils/sdk";

export const searchProjects = async (
  keyword: string,
  first: number,
  skip: number,
  stage: Stage
) => {
  const { projectsConnection } = await GRAPH_SDK.searchProjects({
    search: keyword,
    first,
    skip,
    stage,
  });
  return projectsConnection as ProjectConnection;
};
