import React, { useEffect } from "react";
import { useAsync } from "react-async";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { FormData } from "./types/type";
import { savePost } from "./services/savePost";
import { getPosts } from "./services/getPosts";
import { timezoneApi } from "./api/api";
import LinearProgress from "@mui/material/LinearProgress";
import SendIcon from "@mui/icons-material/Send";
import { useSelector, useDispatch } from "react-redux";
import { blockForm, unblockForm } from "./redux/formSlice";
import type { RootState, AppDispatch } from "./redux/store";

export const Form = () => {
  const isFormBlocked = useSelector((state: RootState) => state.form.value);
  const dispatch = useDispatch();
  console.log(isFormBlocked);

  const [formData, setFormData] = React.useState<FormData>({
    post: "",
    author: "",
    timezone: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = (event.target.id || event.target.name) as keyof FormData;
    const newFormData = { ...formData, [id]: event.target.value };
    setFormData(newFormData);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(blockForm());
    savePost(formData);
  };

  const {
    data: postsData,
    error: postsDataError,
    isPending: isPendingPosts,
  } = useAsync(getPosts);

  const {
    data: timezonesData,
    error: timezoneError,
    isPending: isPendingTimezones,
  } = useAsync(timezoneApi.getTimezoneList);

  useEffect(() => {
    const author =
      postsData && postsData.length
        ? postsData[postsData.length - 1].author
        : "";
    const timezone =
      postsData && postsData.length
        ? postsData[postsData.length - 1].timezone
        : "";
    const newFormData = {
      ...formData,
      author,
      timezone,
    };
    setFormData(newFormData);
  }, [postsData]);

  if (isPendingPosts) {
    return (
      <Box sx={{ width: "100%", paddingTop: 5 }}>
        <LinearProgress />
      </Box>
    );
  }

  if (postsData && timezonesData) {
    return (
      <>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ marginTop: 2 }}>
              <TextField
                id="post"
                label="Post"
                multiline
                fullWidth
                required
                rows={4}
                onChange={handleChange}
                value={formData.post}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                id="author"
                label="Author"
                variant="outlined"
                fullWidth
                required
                onChange={handleChange}
                value={formData.author}
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Timezone</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="timezone"
                  name="timezone"
                  value={formData.timezone}
                  label="Timezone"
                  onChange={handleChange}
                >
                  {timezonesData.data.map((timezoneItem: string) => (
                    <MenuItem value={timezoneItem}>{timezoneItem}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                endIcon={<SendIcon />}
                disabled={isFormBlocked}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </>
    );
  }
};
