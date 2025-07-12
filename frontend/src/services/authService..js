import axios from "axios"
const API_URL = import.meta.env.VITE_API_URL_BACKEND;

export const login = async (email, password) => {
    const res = await axios.post(`${API_URL}/auth/login`, { email, password });
    return res.data
}

export const register = async (firstName, lastName, email, password, confirmPassword) => {
    return await axios.post(`${API_URL}/auth/register`, { firstName, lastName, email, password, confirmPassword });
}

export const verifyOTP = async (email, otp) => {
    return await axios.post(`${API_URL}/auth/verify-otp`, { email, otp });
}

export const resendOTP = async (email) => {
    return await axios.post(`${API_URL}/auth/resend-otp`, { email });
}

export const forgotPassword = async (email) => {
    return await axios.post(`${API_URL}/auth/forgot-password`, { email });
}

export const refreshAccessToken = async (refreshToken) => {
    const res = await axios.post(`${API_URL}/auth/refresh-token`,
        {},
        {
            headers: {
                token: `Bearer ${refreshToken}`
            }
        }
    );
    return res.data;
}

export const resetPassword = async (token, newPassword) => {
    return await axios.post(`${API_URL}/auth/reset-password`, { token, newPassword });
}

const api = axios.create({
    baseURL: `${API_URL}`
});

// Request interceptor: tự động gán access_token
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers["token"] = `Bearer ${token}`
        }
        return config;
    },
    error => Promise.reject(error)
)


// Response interceptor: tự động refresh token
api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        if (error.response && (error.response.status === 401 || error.response.status === 403) && !originalRequest._retry) {
            originalRequest._retry = true
            const refreshToken = localStorage.getItem('refresh_token');
            try {
                const res = await axios.post(`${API_URL}/auth/refresh-token`, {},
                    {
                        headers: {
                            token: `Bearer ${refreshToken}`
                        }
                    }
                )
                const newAccessToken = res.data.access_token;

                // Save new access_token
                localStorage.setItem('access_token', newAccessToken)
                originalRequest.headers["token"] = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                // If refresh error, redirect to login or alert
                localStorage.removeItem('access_token')
                localStorage.removeItem('refresh_token')
                localStorage.removeItem('user')
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error)
    }
)

export default api;