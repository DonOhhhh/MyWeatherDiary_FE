import { Outlet } from "react-router-dom";
import OverlayProvider from "../Context/OverlayProvider";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";

export default function App() {
    return (
        <OverlayProvider>
            <Outlet />
        </OverlayProvider>
    );
}
