import React, { useRef } from "react";
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

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <h1>404 Not Found</h1>,
    },
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

// var httpProxy = require('http-proxy');
// // Error example
// //
// // Http Proxy Server with bad target
// //
// var proxy = httpProxy.createServer({
//   target:'http://localhost:9005'
// });
// proxy.on('proxyRes', function (proxyRes, req, res) {
//     console.log('RAW Response from the target', JSON.stringify(proxyRes.headers, true, 2));
//   });

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);
