import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoginHook() {
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem('id');
        if (!userId) {
            navigate('/login');
        }
    }, [navigate]);
}

export default LoginHook
