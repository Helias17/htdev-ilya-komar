import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useAsync } from "react-async";
import Pagination from "./Pagination";
import { Post } from "./Post";
import { getPosts } from "../services/getPosts";
import LinearProgress from "@mui/material/LinearProgress";
import { PAGE_SIZE } from "../constants";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { RootState } from "../redux/store";

export const PostsList = () => {
  const postsPerPage = useSelector((state: RootState) => state.pageSize.value);
  const [page, setPage] = useState(1);

  const {
    data: postsData,
    error,
    isPending: isPendingPosts,
  } = useAsync(getPosts);

  if (error) {
    return (
      <Alert severity="error" sx={{ marginTop: 2 }}>
        Error: {error.message}
      </Alert>
    );
  }

  if (isPendingPosts) {
    return (
      <Box sx={{ width: "100%", paddingTop: 5 }}>
        <LinearProgress />
      </Box>
    );
  }
  if (postsData && postsData.length) {
    const posts = postsData.map((postItem, index) => (
      <Grid item xs={12} sm={6} key={index}>
        <Post data={postItem} order={index} />
      </Grid>
    ));
    return (
      <>
        <Grid container spacing={2} wrap="wrap">
          {posts.slice(
            postsPerPage * (page - 1),
            postsPerPage * (page - 1) + postsPerPage
          )}
        </Grid>
        {posts.length > postsPerPage ? (
          <Pagination
            onChange={setPage}
            page={page}
            count={Math.ceil(posts.length / postsPerPage)}
          />
        ) : (
          ""
        )}
      </>
    );
  }

  if (postsData && postsData.length === 0) {
    return (
      <Alert severity="info" sx={{ marginTop: 2 }}>
        No posts yet. Try to add the first one.
      </Alert>
    );
  }

  return null;
};
