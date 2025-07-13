import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUserProfile } from "~/services/usersService";

export default function ProfilePage() {
    const userToForm = (user) => ({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        userName: user.userName || "",
        email: user.email || "",
        address: user.address || "",
        phone: user.phone || "",
    })

    const getUserFromLocalStorage = () => {
        const userData = localStorage.getItem('user')
        if (userData && userData !== 'undefined') {
            try {
                return JSON.parse(userData);
            } catch (error) {
                console.log(error.message);
            }
        }
        return {};
    }

    const [form, setForm] = useState(userToForm(getUserFromLocalStorage()));
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    // If localStorage not exists user -> /login
    useEffect(() => {
        const user = localStorage.getItem("user");
        if (!user) {
            navigate("/auth/login")
        }
    }, [navigate]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = JSON.parse(localStorage.getItem('user'))
            const updateUser = await updateUserProfile(user?._id || user?.id, form);

            localStorage.setItem('user', JSON.stringify(updateUser.data));
            setForm(userToForm(updateUser.data));
            setMessage("Update user successfull!");
        } catch (error) {
            setMessage("Error when update user profile");
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 bg-white shadow rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-indigo-600 text-center">Thông tin cá nhân</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="font-semibold block mb-1">Họ tên:</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            name="firstName"
                            value={form.firstName}
                            onChange={handleChange}
                            placeholder="Họ"
                            className="border rounded px-3 py-2 w-1/2"
                        />
                        <input
                            type="text"
                            name="lastName"
                            value={form.lastName}
                            onChange={handleChange}
                            placeholder="Tên"
                            className="border rounded px-3 py-2 w-1/2"
                        />
                    </div>
                </div>
                <div>
                    <label className="font-semibold block mb-1">Tên hồ sơ:</label>
                    <input
                        type="text"
                        name="userName"
                        value={form.userName}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 w-full"
                    />
                </div>
                <div>
                    <label className="font-semibold block mb-1">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 w-full"
                        disabled
                    />
                </div>
                <div>
                    <label className="font-semibold block mb-1">Địa chỉ:</label>
                    <input
                        type="text"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 w-full"
                    />
                </div>
                <div>
                    <label className="font-semibold block mb-1">Số điện thoại:</label>
                    <input
                        type="text"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 w-full"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white font-semibold py-2 rounded hover:bg-indigo-700 transition"
                >
                    Lưu thay đổi
                </button>
                {message && <div className="text-green-600 text-center mt-2">{message}</div>}
            </form>
        </div>
    );
} 