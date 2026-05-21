import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./components/Login";
import Register from "./components/Register";
import RouteLayout from "./components/RouteLayout";
import Home from "./components/Home";
import UserDashboard from "./components/UserDashboard";
import AuthorDashboard from "./components/AuthorDashboard";
import AuthorArticles from "./components/AuthorArticles";
import WriteArticle from "./components/WriteArticle";
import ArticleById from "./components/ArticleById";
import EditArticle from "./components/EditArticle";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./components/Unauthorized";
import ErrorBoundary from "./components/ErrorBoundary";

import { useAuth } from "./store/authStore";

/* =========================
   ROUTER (MOVE OUTSIDE COMPONENT)
========================= */
const routerObj = createBrowserRouter([
  {
    path: "/",
    element: <RouteLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <Home /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },

      {
        path: "user-profile",
        element: (
          <ProtectedRoute allowedRoles={["USER"]}>
            <UserDashboard />
          </ProtectedRoute>
        ),
      },

      {
        path: "author-profile",
        element: (
          <ProtectedRoute allowedRoles={["AUTHOR"]}>
            <AuthorDashboard />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <AuthorArticles /> },
          { path: "articles", element: <AuthorArticles /> },
          { path: "writearticles", element: <WriteArticle /> },
        ],
      },

      { path: "article/:id", element: <ArticleById /> },
      { path: "edit-article/:id", element: <EditArticle /> },
      { path: "unauthorized", element: <Unauthorized /> },
    ],
  },
]);

/* =========================
   APP COMPONENT
========================= */
function App() {
  const { checkAuth, loading } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        Loading...
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={routerObj} />
    </>
  );
}

export default App;