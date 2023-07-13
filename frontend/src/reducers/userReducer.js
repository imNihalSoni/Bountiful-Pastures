import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { user: {} },
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.isLoggedOut=false;
    },
    loginFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    registerUserRequest: (state) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    registerUserSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    registerUserFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    loadUserRequest: (state) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    loadUserSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    loadUserFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
      state.isLoggedOut=true;
    },
    logoutFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFail,
  registerUserRequest,
  registerUserSuccess,
  registerUserFail,
  loadUserRequest,
  loadUserSuccess,
  loadUserFail,
  logoutSuccess,
  logoutFail,
  clearErrors: clearUserErrors,
} = userSlice.actions;

export const userReducer = userSlice.reducer;


const profileSlice = createSlice({
  name: 'profile',
  initialState: {},
  reducers: {
    updateProfileRequest: (state) => {
      state.loading = true;
    },
    updateProfileSuccess: (state, action) => {
      state.loading = false;
      state.isUpdated = true;
    },
    updateProfileFail: (state, action) => {
      state.loading = false;
      state.isUpdated = false;
      state.error = action.payload;
    },
    updateProfileReset:(state,action)=>{
        state.isUpdated=false;
    },
    // Define other profile-related actions and reducers here
    // clearErrors: (state) => {
    //   state.error = null;
    // },
  },
});

const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState: {},
  reducers: {
    forgotPasswordRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    forgotPasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    forgotPasswordFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Define other forgot password-related actions and reducers here
    // clearErrors: (state) => {
    //   state.error = null;
    // },
  },
});

const allUsersSlice = createSlice({
  name: 'allUsers',
  initialState: { users: [] },
  reducers: {
    allUsersRequest: (state) => {
      state.loading = true;
    },
    allUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    allUsersFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Define other all users-related actions and reducers here
    // clearErrors: (state) => {
    //   state.error = null;
    // },
  },
});

const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState: { user: {} },
  reducers: {
    userDetailsRequest: (state) => {
      state.loading = true;
    },
    userDetailsSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    userDetailsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Define other user details-related actions and reducers here
    // clearErrors: (state) => {
    //   state.error = null;
    // },
  },
});



export const {
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFail,
  updateProfileReset,
  // clearErrors: clearProfileErrors,
} = profileSlice.actions;

export const {
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFail,
  // clearErrors: clearForgotPasswordErrors,
} = forgotPasswordSlice.actions;

export const {
  allUsersRequest,
  allUsersSuccess,
  allUsersFail,
  // clearErrors: clearAllUsersErrors,
} = allUsersSlice.actions;

export const {
  userDetailsRequest,
  userDetailsSuccess,
  userDetailsFail,
  // clearErrors: clearUserDetailsErrors,
} = userDetailsSlice.actions;

export const profileReducer = profileSlice.reducer;
export const forgotPasswordReducer = forgotPasswordSlice.reducer;
export const allUsersReducer = allUsersSlice.reducer;
export const userDetailsReducer = userDetailsSlice.reducer;
