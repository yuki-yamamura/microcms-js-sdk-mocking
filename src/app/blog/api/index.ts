import { GetAllContentRequest } from "microcms-js-sdk";
import { client } from "@/lib/microcms";
import { Post } from "../types";

const getFormattedPosts = async (
  params?: Omit<GetAllContentRequest, "endpoint">
) => {
  const posts = await client.getAllContents<Post>({
    endpoint: "blog",
    ...params,
  });

  return posts.map((post) => ({
    ...post,
    title: `*${post.title}*`,
  }));
};

export { getFormattedPosts };
