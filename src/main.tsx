import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "modern-normalize/modern-normalize.css";
// import "./main.css";

const queryClient = new QueryClient();
const container = document.getElementById("root");

if (!container) throw new Error("Root container not found");

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
