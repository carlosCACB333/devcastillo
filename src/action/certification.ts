"use server";

import { CertificationConnection, Stage } from "@/generated/graphql";
import { GRAPH_SDK } from "@/utils/sdk";

export const searchCertification = async (
  keyword: string,
  first: number,
  skip: number,
  stage: Stage
) => {
  const { certificationsConnection } = await GRAPH_SDK.searchCertifications({
    search: keyword,
    first,
    skip,
    stage,
  });
  return certificationsConnection as CertificationConnection;
};
