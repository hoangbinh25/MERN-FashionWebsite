import AuthLayout from "~/components/Layouts/customers/Auth/AuthLayout";
import OTPverification from "~/components/Layouts/customers/Auth/OTPverification";

export default function OTPVerificationPage() {
    return (
        <AuthLayout title="Email Verification">
            <OTPverification />
        </AuthLayout>
    );
}