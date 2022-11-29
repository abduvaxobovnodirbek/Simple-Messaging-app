import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import api from "../../utils/api";
const cookies = new Cookies();

export const postUserInfo = createAsyncThunk(
  "userSlice/postUserInfo",
  async function (userData, { rejectWithValue, dispatch }) {
    try {
      let response = await api.post("/users", userData);
      if (response.status === 200 || response.status === 201) {
        cookies.set("username_task7", response.data.data.username);
        cookies.set("user_id_task7", response.data.data._id);
      }
      if (!response.status) {
        throw new Error("Internal Server Error");
      }
      return { ...userData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const users = createSlice({
  name: "userSlice",
  initialState: {
    username: null,
    status: null,
    error: null,
  },
  reducers: {
    logoutUser: (state, action) => {
      state.username = null;
      state.status = null;
      state.error = null;
      cookies.remove("username_task7");
    },
  },
  extraReducers: {
    [postUserInfo.pending]: (state) => {
      state.status = "pending";
      state.error = null;
    },
    [postUserInfo.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.username = action.payload.username;
    },
    [postUserInfo.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  },
});

export const { logoutUser } = users.actions;

export default users.reducer;
