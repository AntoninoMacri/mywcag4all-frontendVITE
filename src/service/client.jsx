import axios from "axios";
import store from "../store/store";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
});

client.interceptors.request.use(
  (request) => {
    const state = store.getState(); // Ottiene lo stato attuale del Redux store
    const token = state.auth.userToken; // Accesso al token dallo stato Redux

    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
      //console.log("Client interceptors >>>>> Token`: ", token);
    }

    return request;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default client;
