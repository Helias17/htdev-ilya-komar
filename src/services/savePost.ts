import { useDispatch } from "react-redux";
import { FormData } from "../types/type";
import { timezoneApi } from "../api/api";
import { getPosts } from "../services/getPosts";
import { unblockForm } from "../redux/formSlice";
import type { RootState } from "../redux/store";

export const savePost = async (data: FormData) => {
  try {
    const timezoneData = await timezoneApi.getTimezoneItem(data.timezone);
    const posts = await getPosts();
    posts.push({ ...data, date: timezoneData.data });
    localStorage.setItem("ilya-komar-app-posts", JSON.stringify(posts));
    return true;
  } catch (err) {
    return false;
  }
};
