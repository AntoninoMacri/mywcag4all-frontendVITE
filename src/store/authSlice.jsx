import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  userToken: null, // for storing the JWT
  expirationDate: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const expirationTime = 7 * 24 * 60 * 60 * 1000; // 7 giorni in millisecondi
      //const expirationTime = 10 * 1000; // 10 secondi usato per fare testing
      const expirationDate = new Date().getTime() + expirationTime;

      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.userToken = action.payload.token;
      state.expirationDate = expirationDate;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.userToken = null;
      state.expirationDate = null;
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
