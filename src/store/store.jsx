import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import websiteSlice from "./websiteSlice";
import toolsSlice from "./slice.tools";
import rankingSlice from "./rankingSlice";
import wizardSlice from "./wizardSlice"; // Importa il nuovo slice
import storage from "redux-persist/lib/storage";

import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "tools", "wizard"],
  blacklist: ["website", "ranking"],
};

const reducers = combineReducers({
  auth: authSlice,
  website: websiteSlice,
  tools: toolsSlice,
  ranking: rankingSlice,
  wizard: wizardSlice,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: import.meta.env.MODE !== "production",
  middleware: [thunk],
});

export default store;
