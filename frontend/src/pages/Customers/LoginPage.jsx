import AuthLayout from "~/components/Layouts/Login/AuthLayout";
import AuthToggle from "~/components/Layouts/Login/AuthToggle";
import LoginForm from "~/components/Layouts/Login/LoginForm";
import SocialAuth from "~/components/Layouts/Login/SocialAuth";

export default function LoginPage() {
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