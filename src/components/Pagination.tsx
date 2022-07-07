import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { default as PaginationMui } from "@mui/material/Pagination";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { POSTS_PER_PAGE } from "../constants";
import MenuItem from "@mui/material/MenuItem";
import { RootState } from "../redux/store";
import { setPageSize } from "../redux/pageSizeSlice";

type PaginationProps = {
  count: number;
  page: number;
  onChange: (pageNum: number) => void;
};

export default function PaginationButtons(props: PaginationProps) {
  const postsPerPage = useSelector((state: RootState) => state.pageSize.value);
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem("ilya-komar-posts-per-page", event.target.value);
    props.onChange(1);
    dispatch(setPageSize(parseInt(event.target.value)));
  };

  return (
    <>
      <PaginationMui
        count={props.count}
        page={props.page}
        showFirstButton
        showLastButton
        onChange={(_event: React.ChangeEvent<unknown>, pageNum: number) =>
          props.onChange(pageNum)
        }
        sx={{ marginTop: 2, marginBottom: 2 }}
      />
      <FormControl size="small" sx={{ minWidth: "120px" }}>
        <InputLabel id="posts-on-page">Posts per page</InputLabel>
        <Select
          labelId="posts-on-page"
          id="posts-on-page"
          name="posts-on-page"
          value={postsPerPage}
          label="Posts per page"
          autoWidth
          onChange={handleChange}
        >
          {POSTS_PER_PAGE.map((item: number, index: number) => (
            <MenuItem value={item} key={index}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
