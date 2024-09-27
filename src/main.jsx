import "bootstrap/dist/css/bootstrap.min.css";
import * as React from "react";
import ReactDOM from "react-dom/client"; // Import corretto per React 18
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";

// Imposta la lingua dell'HTML
document.documentElement.lang = "it";

let persistor = persistStore(store);

// Ottenere l'elemento root
const rootElement = document.getElementById("root");

// Creare il root utilizzando createRoot
const root = ReactDOM.createRoot(rootElement);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </PersistGate>
  </Provider>
);
