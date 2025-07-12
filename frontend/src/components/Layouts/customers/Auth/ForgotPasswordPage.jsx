import { useState } from 'react';
import { forgotPassword } from '~/services/authService.';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [countdown, setCountdown] = useState(60);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            const res = await forgotPassword(email);
            setMessage(res.data?.message || 'Reset link sent! Please check your email.');
            setDisabled(true);
            setCountdown(60);
            const timer = setInterval(() => {
                setCountdown(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setDisabled(false);
                        return 60;
                    }
                    return prev - 1;
                });
            }, 1000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to send reset link');
        }
    };

    return (
        <div className='min-h-96'>
            <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-centers">Forgot Password</h2>
                {message && <p className="text-green-600 mb-4 text-center">{message}</p>}
                {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full border px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={disabled}
                    />
                    <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition" disabled={disabled}>
                        {disabled ? `Send again in ${countdown}s` : 'Send reset link'}
                    </button>
                </form>
            </div>
        </div>
    );
}
