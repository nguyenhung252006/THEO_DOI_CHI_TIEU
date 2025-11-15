import { useState, useEffect } from "react";
import axios from "axios";
import { Loading } from "../../cong_cu";
import { API_ENDPOINTS } from "../../config";

function LoadingHook({ apiUrl, children }) {
    const UserId = localStorage.getItem('id');

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const getData = async () => {
            if (!UserId && !apiUrl) {
                setLoading(false)
                setError(true)
                return;
            }

            const url = apiUrl || `${API_ENDPOINTS.USERS}/${UserId}`

            try {
                const res = await axios.get(url, { withCredentials: true })
                setData(res.data);
            } catch (err) {
                console.error("Lỗi khi lấy API:", err)
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, [apiUrl, UserId]);

    if (loading || error) return <Loading />

    return children(data);
}

export default LoadingHook;
