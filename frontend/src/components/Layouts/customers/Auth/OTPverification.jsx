import { useEffect, useState } from "react";
import { resendOTP, verifyOTP } from "~/services/authService.";
import { useLocation, useNavigate } from "react-router-dom";

export default function OTPverification() {

    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [countdown, setCountdown] = useState(0);

    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email || "";

    useEffect(() => {
        if (email) {
            localStorage.setItem('pendingVerificationEmail', email);
        }
    }, [email]);

    useEffect(() => {
        let timer;
        if (countdown > 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        }
        return () => clearTimeout(timer)
    }, [countdown]);

    const handleOtpChange = (index, value) => {
        // Only allow numbers and maximum 1 character
        if (value.length <= 1 && /^\d*$/.test(value)) {
            const newOtp = [...otp]
            newOtp[index] = value;
            setOtp(newOtp);

            // Auto focus next input
            if (value && index < 5) {
                const nextInput = document.getElementById(`otp-${index + 1}`);
                if (nextInput) nextInput.focus();
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            if (prevInput) prevInput.focus();
        }
    };

    const handleVerifyOTP = async () => {
        const otpString = otp.join('');
        if (otpString.length !== 6) {
            setError('Please enter a 6-digit OTP');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const res = await verifyOTP(email, otpString);
            if (res.status === 200) {
                setSuccess(res.data.message);
                // Xóa email pending
                localStorage.removeItem('pendingVerificationEmail');
                // Redirect to login sau 2 giây
                setTimeout(() => {
                    navigate('/auth/login')
                }, 2000);
            } else {
                setError(res.data.message || 'Verification failed');
            }
        } catch (error) {
            setError(error.res?.data?.message || 'Verification failed');
            console.log(error.res?.data);

        } finally {
            setLoading(false);
        }
    };

    const handleResendOTP = async () => {
        setResendLoading(true);
        setError('');

        try {
            const response = await resendOTP(email);
            if (response.status === 200) {
                setSuccess('OTP resent successfully! Please check your email.');
                setCountdown(60); // 60 giây countdown
            } else {
                setError(response.message || 'Failed to resend OTP');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to resend OTP');
        } finally {
            setResendLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Email</h2>
                <p className="text-gray-600">
                    We've sent a verification code to <strong>{email}</strong>
                </p>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
                    {success}
                </div>
            )}

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                        Enter 6-digit verification code
                    </label>
                    <div className="flex justify-between space-x-2">

                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                id={`otp-${index}`}
                                type="text"
                                maxLength="1"
                                value={digit}
                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg font-semibold"
                            />
                        ))}
                    </div>
                </div>

                <button
                    onClick={handleVerifyOTP}
                    disabled={loading || otp.join('').length !== 6}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Verifying...' : 'Verify Email'}
                </button>

                <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">
                        Didn't receive the code?
                    </p>
                    <button
                        onClick={handleResendOTP}
                        disabled={resendLoading || countdown > 0}
                        className="text-indigo-600 hover:text-indigo-500 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {resendLoading ? 'Sending...' :
                            countdown > 0 ? `Resend in ${countdown}s` : 'Resend Code'}
                    </button>
                </div>

                <div className="text-center">
                    <button
                        onClick={() => navigate('/auth/register')}
                        className="text-gray-600 hover:text-gray-500 text-sm"
                    >
                        ← Back to Register
                    </button>
                </div>
            </div>
        </div>
    )
}