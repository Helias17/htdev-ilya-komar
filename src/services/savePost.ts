import { FormData } from "../types/type";
import { timezoneApi } from "../api/api";
import { getPosts } from "../services/getPosts";
import { PostType } from "../types/type";

export const savePost = async (data: FormData) => {
  const timezoneData = await timezoneApi.getTimezoneItem(data.timezone);
  console.log(timezoneData);
  const posts = await getPosts();
  posts.push({ ...data, date: timezoneData.data });
  localStorage.setItem("ilya-komar-app-posts", JSON.stringify(posts));
  console.log(posts);
};
