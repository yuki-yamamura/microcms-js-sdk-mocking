import type { MicroCMSListContent } from "microcms-js-sdk";

export type Post = {
  title: string;
} & MicroCMSListContent;
