import AuthLayout from "~/components/Layouts/customers/Auth/AuthLayout";
import AuthToggle from "~/components/Layouts/customers/Auth/AuthToggle";
import LoginForm from "~/components/Layouts/customers/Auth/LoginForm";
import SocialAuth from "~/components/Layouts/customers/Auth/SocialAuth";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const navigate = useNavigate();
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        if (token) {
            localStorage.setItem('access_token', token);
            // Xóa token khỏi URL
            window.history.replaceState({}, document.title, window.location.pathname);
            navigate('/user/home');
        }
    }, [navigate]);
    return (
        <>
            <AuthLayout title="Sign in to your account">
                <LoginForm />
                <AuthToggle isLogin={true} />
                <SocialAuth />
            </AuthLayout>
        </>
    )
}

