import { PostType } from "../types/type";

export const getPosts = async () => {
  const postsStorage = localStorage.getItem("ilya-komar-app-posts");
  const posts = (
    postsStorage ? JSON.parse(postsStorage) : []
  ) as Array<PostType>;
  await new Promise<void>((resolve) =>
    setTimeout(() => {
      resolve();
    }, 1000)
  );

  return posts;
};
