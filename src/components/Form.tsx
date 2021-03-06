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
import { FormData } from "../types/type";
import { savePost } from "../services/savePost";
import { getPosts } from "../services/getPosts";
import { timezoneApi } from "../api/api";
import LinearProgress from "@mui/material/LinearProgress";
import SendIcon from "@mui/icons-material/Send";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import { useSelector, useDispatch } from "react-redux";
import { blockForm, unblockForm } from "../redux/formSlice";
import type { RootState } from "../redux/store";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export const Form = () => {
  const isFormBlocked = useSelector((state: RootState) => state.form.value);
  const dispatch = useDispatch();

  const [formData, setFormData] = React.useState<FormData>({
    post: "",
    author: "",
    timezone: "",
  });

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const handleCloseSnackbar = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnackbar}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = (event.target.id || event.target.name) as keyof FormData;
    const newFormData = { ...formData, [id]: event.target.value };
    setFormData(newFormData);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(blockForm());
    const savePostResult = await savePost(formData);
    dispatch(unblockForm());
    setOpenSnackbar(true);
    if (savePostResult) {
      setFormData({ ...formData, post: "" });
    }
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

  if (timezoneError || postsDataError) {
    return (
      <Alert severity="error" sx={{ marginTop: 2 }}>
        Error: {timezoneError.message || postsDataError.message}
      </Alert>
    );
  }

  if (postsData && timezonesData) {
    return (
      <>
        <Box
          component="form"
          noValidate={false}
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
                disabled={isFormBlocked}
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
                disabled={isFormBlocked}
                inputProps={{ maxLength: 100 }}
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
                  disabled={isFormBlocked}
                  required
                >
                  {timezonesData.data.map(
                    (timezoneItem: string, index: number) => (
                      <MenuItem value={timezoneItem} key={index}>
                        {timezoneItem}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              {isFormBlocked ? (
                <LoadingButton
                  loading
                  loadingPosition="start"
                  variant="outlined"
                  startIcon={<SaveIcon />}
                >
                  Saving
                </LoadingButton>
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  endIcon={<SendIcon />}
                  disabled={isFormBlocked}
                >
                  Submit
                </Button>
              )}
            </Grid>
          </Grid>
        </Box>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          message={
            formData.post
              ? "Error occured when submitting..."
              : "Post successfully added!"
          }
          action={action}
        />
      </>
    );
  }
};
