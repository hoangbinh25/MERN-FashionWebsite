import AuthLayout from "~/components/Layouts/Login/AuthLayout";
import OTPverification from "~/components/Layouts/Login/OTPverification";

export default function OTPVerificationPage() {
    return (
        <AuthLayout title="Email Verification">
            <OTPverification />
        </AuthLayout>
    );
}