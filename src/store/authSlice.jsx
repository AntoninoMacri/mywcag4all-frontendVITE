import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  userToken: null, // for storing the JWT
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;

      //console.log("state", state);
      //console.log("action.payload", action.payload);

      state.user = action.payload.user;
      state.userToken = action.payload.token;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.userToken = null;
    },

    //addUser e removeUser sono da rimuovere
    addUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = { name: "" };
    },
  },
});

export const { login, logout, addUser, removeUser } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;
