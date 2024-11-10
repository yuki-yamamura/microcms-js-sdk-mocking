import type { createClient, GetAllContentRequest } from "microcms-js-sdk";
import type { Post } from "../types";
import { client as defaultClient } from "@/lib/microcms";

const endpoint = "blog";

type CMSClient = ReturnType<typeof createClient>;

export const getFormattedPosts = async ({
  client,
  ...params
}: Omit<GetAllContentRequest, "endpoint"> & { client?: CMSClient }) => {
  const _client = client ?? defaultClient;
  const posts = await _client.getAllContents<Post>({ endpoint, ...params });

  return posts.map((post) => ({
    ...post,
    title: `*${post.title}*`,
  }));
};
