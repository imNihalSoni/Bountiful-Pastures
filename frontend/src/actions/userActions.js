import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginRequest,
  loginSuccess,
  loginFail,
  registerUserFail,
  registerUserRequest,
  registerUserSuccess,
  loadUserFail,
  loadUserSuccess,
  loadUserRequest,
  clearUserErrors,
  logoutSuccess,
  logoutFail,
  updateProfileRequest,
  updateProfileFail,
  updateProfileSuccess,
  updateProfileReset
} from "../reducers/userReducer";

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }, { dispatch }) => {
    try {
      dispatch(loginRequest());

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(
        "/api/v1/login",
        { email, password },
        config
      );

      dispatch(loginSuccess(data.user));
    } catch (error) {
      dispatch(loginFail(error.response.data.message));
    }
  }
);

export const register = createAsyncThunk(
  "user/register",
  async (userData, { dispatch }) => {
    try {
      dispatch(registerUserRequest());

      const config = { headers: { "Content-Type": "application/json" } };

      
      const { data } = await axios.post("/api/v1/register", userData, config);

      dispatch(registerUserSuccess(data.user));
    } catch (error) {
      console.log(error);
      dispatch(registerUserFail(error.response.data.message));
    }
  }
);

export const loadUser = createAsyncThunk(
  "user/loadUser",
  async (_, { dispatch }) => {
    try {
      dispatch(loadUserRequest());

      const { data } = await axios.get("/api/v1/me");

      dispatch(loadUserSuccess(data.user));
    } catch (error) {
      dispatch(loadUserFail(error.response.data.message));
    }
  }
);

export const clearErrors = createAsyncThunk(
  "user/clearErrors",
  async (_, { dispatch }) => {
    dispatch(clearUserErrors());
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async (_, { dispatch }) => {
    try {
      await axios.get(`/api/v1/logout`);

      dispatch(logoutSuccess());
    } catch (error) {
      dispatch(logoutFail(error.response.data.message));
    }
  }
);

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (userData, { dispatch }) => {
    try {
      dispatch(updateProfileRequest());
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const response = await axios.put("/api/v1/me/update", userData, config);
      dispatch(updateProfileSuccess());

    } catch (error) {
      return updateProfileFail(error.response.data.message);
    }
  }
);

export const updateReset = createAsyncThunk(
  "user/updateProfile",
  async (_, { dispatch }) => {
   dispatch(updateProfileReset());
  }
);