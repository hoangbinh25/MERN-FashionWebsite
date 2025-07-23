// RegisterPage.js
import AuthLayout from "~/components/Layouts/customers/Auth/AuthLayout";
import AuthToggle from "~/components/Layouts/customers/Auth/AuthToggle";
import OTPverification from "~/components/Layouts/customers/Auth/OTPverification";
import RegisterForm from '~/components/Layouts/customers/Auth/RegisterForm';
import SocialAuth from "~/components/Layouts/customers/Auth/SocialAuth";


export default function RegisterPage() {
    return (
        <AuthLayout title="Tạo tài khoản">
            <RegisterForm />
            <AuthToggle isLogin={false} />
            <SocialAuth />
        </AuthLayout>
    );

};