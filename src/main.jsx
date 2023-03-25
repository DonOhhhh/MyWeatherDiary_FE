import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import "./index.css";
import Login, { action as LoginAction } from "./pages/Login";
import Main from "./pages/Main";
import Diarys from "./pages/Menu/Diarys";
import Profile from "./pages/Menu/Profile";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <h1>404 Not Found</h1>,
    },
    {
        path: "/login",
        element: <Login />,
        action: LoginAction,
    },
    {
        path: "/main",
        element: <Main />,
        children: [
            {
                path: "/main/activity",
                element: <div>Activity</div>,
            },
            {
                path: "/main/diarys",
                element: <Diarys />,
            },
            {
                path: "/main/profile",
                element: <Profile />,
            },
            {
                path: "/main/edit",
                element: <div>Edit</div>,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
