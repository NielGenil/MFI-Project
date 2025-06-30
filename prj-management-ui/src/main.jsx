import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/login-page.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/login",
    element: <LoginPage />
  }
]);

const queryClient = new QueryClient ()



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    </ QueryClientProvider>
  </StrictMode>
  
);
