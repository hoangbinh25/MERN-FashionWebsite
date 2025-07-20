import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordValidator from "~/components/Validate/PasswordValidator";
import { useAuth } from "~/context/AuthContext";
import { login } from "~/services/authService.";

import { toast } from 'react-toastify';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState("");
    const navigate = useNavigate();

    const { login: setAuthUser } = useAuth();

    // Validate email format
    const validateEmail = (email) => {
        // Simple regex for email validation
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    // Validate password conditions
    const validatePassword = (password) => {
        // At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
        return re.test(password);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setErrors((prev) => ({ ...prev, email: "" }));
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setErrors((prev) => ({ ...prev, password: "" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let newErrors = {};
        if (!email) {
            newErrors.email = "Please enter the email.";
        } else if (!validateEmail(email)) {
            newErrors.email = "You have entered the wrong email.";
        }
        if (!password) {
            newErrors.password = "Please enter the password.";
        } else if (!validatePassword(password)) {
            newErrors.password = "The password must be at least 8 characters, with uppercase, regular letters, numbers and special characters.";
        }
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;
        try {
            const res = await login(email, password)

            if (res.status === "OK") {
                setAuthUser(res.user);
                localStorage.setItem('access_token', res.access_token)
                localStorage.setItem('refresh_token', res.refresh_token)
                if (res.user?.role === true) {
                    navigate("/admin");
                } else {
                    navigate("/user/home");
                }
            } else {
                if (res.message && res.message.toLowerCase().includes("email does not exist")) {
                    setErrors((prev) => ({ ...prev, email: "Email does not exist." }));
                } else {
                    toast.error(error.response.data.message);
                }
            }
        } catch (error) {
            toast.error("Please check your email or password");
            return
        }
    }

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
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
                        value={email}
                        onChange={handleEmailChange}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
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
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        value={password}
                        onChange={handlePasswordChange}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pr-10"
                    />
                    <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                        tabIndex={-1}
                    >
                        {showPassword ? (
                            // Mắt đóng
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.293-3.95M6.634 6.634A9.956 9.956 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.956 9.956 0 01-4.293 5.95M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                            </svg>
                        ) : (
                            // Mắt mở
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        )}
                    </span>
                </div>
                {errors.password && (
                    <div className="text-red-500 text-sm mt-1">{errors.password}</div>
                )}
                <PasswordValidator password={password} />
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        defaultChecked
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                        Remember me
                    </label>
                </div>

                <div className="text-sm">
                    <Link to="/auth/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Forgot your password?
                    </Link>
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Sign in
                </button>
            </div>
        </form>

    )
}