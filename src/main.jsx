import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import Login, { action as LoginAction } from "./pages/Login";
import Main from "./pages/Main";
import Diarys from "./pages/Menu/Diarys";
import Profile from "./pages/Menu/Profile";
import Edit from "./pages/Menu/Edit";
import { Provider } from "react-redux";
import store from "./rtk/store";

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
                element: <Edit />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);
