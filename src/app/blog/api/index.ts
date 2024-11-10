import { CMSClient, CreateClientReturn, GetAllParams } from "@/lib/microcms";
import type { Post } from "../types";

class BlogClient extends CMSClient<Post> {
  constructor(client?: CreateClientReturn) {
    super("blog", client);
  }

  getFormattedPosts = async (params?: GetAllParams) => {
    const posts = await this.getContents(params);

    return posts.map((post) => ({
      ...post,
      title: `*${post.title}*`,
    }));
  };
}

const blogClient = new BlogClient();

export { BlogClient, blogClient };
