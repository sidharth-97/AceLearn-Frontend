import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ErrorBoundary from "./middleware/ErrorBoundary.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <GoogleOAuthProvider clientId="1042989167797-hgehckk478bvdt8o8e6pskhsgbura5ro.apps.googleusercontent.com">
              <App />
            </GoogleOAuthProvider>
          </QueryClientProvider>
        <ToastContainer />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
