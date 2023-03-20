import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import "./index.css";
import LoginPage, { action as LoginAction } from "./pages/LoginPage";
import PostsPage from "./pages/PostPage";
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
                path: "/diarys",
                element: <PostsPage />,
            },
            {
                path: "/edit",
                element: <EditPage />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
