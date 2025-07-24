import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '~/services/authService.';

export default function ResetPasswordPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('token');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        if (!token) {
            setError('Invalid or missing token');
            return;
        }
        if (newPassword.length < 8) {
            setError('Mật khẩu phải lớn hơn hoặc bằng 8 kí tự');
            return;
        }
        if (newPassword !== confirmPassword) {
            setError('Mật khẩu không khớp');
            return;
        }
        setLoading(true);
        try {
            const res = await resetPassword(token, newPassword);
            setMessage(res.data.message || 'Cập nhật mật khẩu thành công!');
            setTimeout(() => navigate('/auth/login'), 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Cập nhật mật khẩu thất bại');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-96'>
            <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Quên mật khẩu</h2>
                {message && <p className="text-green-600 mb-4 text-center">{message}</p>}
                {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                        type="password"
                        placeholder="Mật khẩu mới"
                        className="w-full border px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Nhập lại mật khẩu"
                        className="w-full border px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition" disabled={loading}>
                        {loading ? 'Cập nhật...' : 'Cập nhật'}
                    </button>
                </form>
            </div>
        </div>
    );
} 