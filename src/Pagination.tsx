import React from "react";
import { default as PaginationMui } from "@mui/material/Pagination";

type PaginationProps = {
  count: number;
  page: number;
  onChange: (pageNum: number) => void;
};

export default function PaginationButtons(props: PaginationProps) {
  return (
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
  );
}
