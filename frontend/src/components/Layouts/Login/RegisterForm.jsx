import { useState } from "react";
import { register } from "~/services/authService.";

export default function RegisterForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        console.log('formData: ', formData);

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await register(
                formData.firstName,
                formData.lastName,
                formData.email,
                formData.password,
                formData.confirmPassword
            );
            if (res.status === 200) {
                setSuccess(res.message)

                // Save email have use verify OTP
                localStorage.setItem('pendingVerificationEmail', formData.email);
                console.log("Redirect to /auth/verify-otp");

                window.location.href = '/auth/verify-otp';
            } else {
                setError(res.message || 'Registration failed');
            }

        } catch (error) {
            setError('Registration failed');
        } finally {
            setLoading(false)
        }

    };

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}

            {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
                    {success}
                </div>
            )}

            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                        First name
                    </label>
                    <div className="mt-1">
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            autoComplete="given-name"
                            required
                            value={formData.firstName}
                            onChange={handleChange}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                        Last name
                    </label>
                    <div className="mt-1">
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            autoComplete="family-name"
                            required
                            value={formData.lastName}
                            onChange={handleChange}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                </label>
                <div className="mt-1">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                </label>
                <div className="relative mt-1">
                    <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="new-password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                    >
                        {showPassword ? "🙈" : "👁️"}
                    </span>
                </div>
            </div>

            <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                </label>
                <div className="relative mt-1">
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="new-password"
                        required
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                    >
                        {showPassword ? "🙈" : "👁️"}
                    </span>
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </div>
        </form>
    );

}