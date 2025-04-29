export * from "./chatpdf";
export * from "./contact";

import { Locale } from "@/generated/graphql";

export interface PageProps {
  params: Promise<{
    locale: Locale;
    [key: string]: string;
  }>;
  searchParams: Promise<{ [key: string]: string }>;
}

export interface LayoutProps {
  params: Promise<{
    locale: Locale;
    [key: string]: string;
  }>;
  children: React.ReactNode;
}

export interface Toc {
  title: string;
  url: string;
  children: { title: string; url: string }[];
}

export interface SearchResultItem {
  content: string;
  objectID: string;
  url: string;
  type: "lvl1" | "lvl2" | "lvl3";
  hierarchy: {
    lvl1: string | null;
    lvl2?: string | null;
    lvl3?: string | null;
  };
}

export interface Route {
  key: string;
  title: string;
  path: string;
}

export interface Response<T> {
  data?: T;
  status: "success" | "error";
  message?: string;
  [key: string]: any;
}
