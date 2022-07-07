import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import { useAsync } from "react-async";
import Pagination from "./Pagination";
import { Post } from "./Post";
import { getPosts } from "./services/getPosts";
import LinearProgress from "@mui/material/LinearProgress";
import { PAGE_SIZE } from "./constants";
import Box from "@mui/material/Box";

export const PostsList = () => {
  const [page, setPage] = useState(1);

  const {
    data: postsData,
    error,
    isPending: isPendingPosts,
  } = useAsync(getPosts);

  if (isPendingPosts) {
    return (
      <Box sx={{ width: "100%", paddingTop: 5 }}>
        <LinearProgress />
      </Box>
    );
  }
  if (postsData) {
    const posts = postsData.map((postItem, index) => (
      <Grid item xs={12} sm={6} key={index}>
        <Post data={postItem} order={index} />
      </Grid>
    ));
    return (
      <>
        <Grid container spacing={2} wrap="wrap">
          {posts.slice(
            PAGE_SIZE * (page - 1),
            PAGE_SIZE * (page - 1) + PAGE_SIZE
          )}
        </Grid>
        <Pagination
          onChange={setPage}
          page={page}
          count={Math.ceil(posts.length / 2)}
        />
      </>
    );
  }

  return null;
};
