import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:8080";

export default function App() {
    const navigate = useNavigate();
    useEffect(() => {
        navigate("/home/login");
    }, []);
    return <div>App</div>;
}
