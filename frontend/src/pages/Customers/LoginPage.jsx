import AuthLayout from "~/components/Layouts/customers/Auth/AuthLayout";
import AuthToggle from "~/components/Layouts/customers/Auth/AuthToggle";
import LoginForm from "~/components/Layouts/customers/Auth/LoginForm";
import SocialAuth from "~/components/Layouts/customers/Auth/SocialAuth";

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

