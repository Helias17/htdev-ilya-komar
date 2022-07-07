import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { PostType } from "./types/type";

type PostProps = {
  data: PostType;
  order: number;
};

export const Post = (props: PostProps) => {
  const card = (
    <>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {props.data.author}
        </Typography>
        <Typography variant="h5" component="div">
          #{props.order + 1}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {props.data.date.datetime}
        </Typography>
        <Typography variant="body2">{props.data.post}</Typography>
      </CardContent>
    </>
  );

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
};
