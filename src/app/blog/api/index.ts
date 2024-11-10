import {
  clientFactory,
  CMSClient,
  defaultParams,
  GetAllParams,
} from "@/lib/microcms";
import { Post } from "../types";

const blogClient = clientFactory(defaultParams)<Post>("blog");

const getFormattedPosts = async (
  params?: GetAllParams,
  client?: CMSClient<Post>
) => {
  const _client = client ?? blogClient;
  const posts = await _client.getContents({
    ...params,
  });

  return posts.map((post) => ({
    ...post,
    title: `*${post.title}*`,
  }));
};

export { getFormattedPosts };
