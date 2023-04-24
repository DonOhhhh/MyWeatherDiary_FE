import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import store from "./rtk/store";
import App from "./App";
import Main from "./pages/Main";
import Diarys from "./pages/Menu/Diarys";
import Profile from "./pages/Menu/Profile";
import Edit from "./pages/Menu/Edit";
import { Provider } from "react-redux";
import ProfileEdit from "./pages/Menu/ProfileEdit";
import Activity from "./pages/Menu/Activity";
import axios from "axios";

axios.defaults.baseURL = `${import.meta.env.VITE_BASE_URL}`;
axios.defaults.withCredentials = true;
// axios.defaults.headers["Access-Control-Allow-Credentials"] = "*";
//axios.defaults.headers["Origin"] = "http://192.168.0.47:8080";
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <h1>404 Not Found</h1>,
    },
    // {
    //     path: "/home",
    //     element: <Home />,
    //     children: [
    //         {
    //             path: "/home/login",
    //             element: <Login />,
    //         },
    //     ],
    // },
    {
        path: "/main",
        element: <Main />,
        children: [
            {
                path: "/main/activity",
                element: <Activity />,
            },
            {
                path: "/main/diarys",
                element: <Diarys />,
            },
            {
                path: "/main/newdiary",
                element: <Edit />,
            },
            {
                path: "/main/profile",
                element: <Profile />,
            },
            {
                path: "/main/edit",
                element: <Edit />,
            },
            {
                path: "/main/profileedit",
                element: <ProfileEdit />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);
