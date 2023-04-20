import axios from "axios";
import { useEffect, useState } from "react";

export function useApi(url, method = "get", body = null) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const response = await axios({
                    method,
                    url,
                    data: body,
                });
                console.log(response);
                setData(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [url, method, body]);
    return { data, loading, error };
}
