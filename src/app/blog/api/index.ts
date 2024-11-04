import type { GetAllContentRequest } from "microcms-js-sdk";
import type { Post } from "../types";
import { client } from "@/lib/microcms";

const endpoint = "blog";

export const getFormattedPosts = async (params?: GetAllContentRequest) => {
  const posts = await client.getAllContents<Post>({ ...params, endpoint });

  return posts.map((post) => ({
    ...post,
    title: `*${post.title}*`,
  }));
};
