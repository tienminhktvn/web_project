import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import App from "./App.jsx";
import AuthPage from "./pages/AuthPage";
import MainPage from "./pages/MainPage";
import Product from "./components/layout/Product";
import Profile from "./components/layout/Profile";
import ErrorPage from "./pages/ErrorPage";

import { ProtectedRoute, PublicRoute } from "./components/auth/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <PublicRoute />,
        children: [
          {
            path: "login",
            element: <AuthPage />,
          },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/",
            element: <MainPage />,
            children: [
              { index: true, element: <Navigate to="/products" replace /> },
              {
                path: "products",
                element: <Product />,
              },
              {
                path: "profile",
                element: <Profile />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
