import { formatPostTitles } from "@/app/blog/api";

export const PostList = async () => {
  const posts = await formatPostTitles();

  return (
    <ul className="flex flex-col gap-y-2">
      {posts.map((post, index) => (
        <li key={index}>{post.title}</li>
      ))}
    </ul>
  );
};
