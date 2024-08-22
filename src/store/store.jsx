import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import websiteSlice from "./websiteSlice";
import toolsSlice from "./slice.tools";
import rankingSlice from "./rankingSlice";
import storage from "redux-persist/lib/storage";

import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "tools"],
  blacklist: ["website", "ranking"],
};

const reducers = combineReducers({
  auth: authSlice,
  website: websiteSlice,
  tools: toolsSlice,
  ranking: rankingSlice,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: import.meta.env.MODE !== "production", // Utilizzo di import.meta.env.MODE al posto di process.env.NODE_ENV !== "production" [ dovuto alla conversione da create-react-app a vite dell'intero progetto]
  middleware: [thunk],
});

export default store;
