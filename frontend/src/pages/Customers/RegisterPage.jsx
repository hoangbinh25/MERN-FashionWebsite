// RegisterPage.js
import AuthLayout from "~/components/Layouts/Login/AuthLayout";
import AuthToggle from "~/components/Layouts/Login/AuthToggle";
import OTPverification from "~/components/Layouts/Login/OTPverification";
import RegisterForm from '~/components/Layouts/Login/RegisterForm';
import SocialAuth from "~/components/Layouts/Login/SocialAuth";


export default function RegisterPage() {
    return (
        <AuthLayout title="Create new account">
            <RegisterForm />
            <AuthToggle isLogin={false} />
            <SocialAuth />
        </AuthLayout>
    );

};