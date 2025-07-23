import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function OAuthCallbackHandler() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');

        if (token) {
            localStorage.setItem('access_token', token);
            navigate('/user/home');
        } else {
            navigate('/auth/login');
        }
    }, []);

    return <p>Đang xử lý đăng nhập...</p>;
}
