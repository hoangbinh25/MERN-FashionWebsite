import AuthLayout from "~/components/Layouts/customers/Auth/AuthLayout";
import AuthToggle from "~/components/Layouts/customers/Auth/AuthToggle";
import LoginForm from "~/components/Layouts/customers/Auth/LoginForm";
import SocialAuth from "~/components/Layouts/customers/Auth/SocialAuth";
import { jwtDecode } from "jwt-decode";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "~/context/AuthContext";

export default function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');

        if (accessToken && refreshToken) {
            const userData = jwtDecode(accessToken);
            const normalizedUser = userData?.payload ? userData.payload : userData;
            localStorage.setItem('access_token', accessToken);
            localStorage.setItem('refresh_token', refreshToken);
            localStorage.setItem('user', JSON.stringify(normalizedUser));

            console.log("User info:", normalizedUser);

            login(normalizedUser);

            // Xóa query khỏi URL
            window.history.replaceState({}, document.title, window.location.pathname);

            // Redirect
            if (normalizedUser?.role === true) {
                navigate('/admin');
            } else {
                navigate('/user/home');
            }
        }
    }, [navigate]);
    return (
        <>
            <AuthLayout title="Đăng nhập">
                <LoginForm />
                <AuthToggle isLogin={true} />
                <SocialAuth />
            </AuthLayout>
        </>
    )
}

