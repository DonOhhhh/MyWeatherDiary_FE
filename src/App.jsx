import axios from "axios";
import Login from "./pages/Home/components/Login";

axios.defaults.baseURL = "http://localhost:8080";

export default function App() {
    return <Login />;
}
