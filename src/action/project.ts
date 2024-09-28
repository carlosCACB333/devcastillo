"use server";

import { ProjectConnection, Stage } from "@/generated/graphql";
import { GRAPH_SDK } from "@/utils/sdk";
import { SearchFunction } from "./types";

export const searchProjects: SearchFunction<ProjectConnection> = async (
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
