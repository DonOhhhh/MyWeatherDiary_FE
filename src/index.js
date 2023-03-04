import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./pages/App";
import "./index.css";
import LoginPage from "./pages/LoginPage";
import PostsPage, { loader as postLoader } from "./pages/PostsPage";
import { action as addPostAction } from "./components/AddPost";
import { action as LoginAction } from "./pages/LoginPage";
import EditPage from "./pages/EditPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        // errorElement: <h1>404 Not Found</h1>,
        children: [
            {
                path: "/",
                element: <LoginPage />,
                action: LoginAction,
            },
            {
                path: "/:userId/posts",
                element: <PostsPage />,
                loader: postLoader,
                action: addPostAction,
            },
            {
                path: "/:userId/edit",
                element: <EditPage />,
            },
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
