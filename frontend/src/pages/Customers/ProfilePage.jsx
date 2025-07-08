import React, { useEffect, useState } from "react";

export default function ProfilePage() {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        address: "",
        phone: ""
    });
    const [message, setMessage] = useState("");

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData && userData !== "undefined") {
            try {
                const user = JSON.parse(userData);
                setForm({
                    firstName: user.firstName || "",
                    lastName: user.lastName || "",
                    userName: user.userName || "",
                    email: user.email || "",
                    address: user.address || "",
                    phone: user.phone || "",
                });
            } catch (e) { }
        }
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Sau khi cập nhật thành công:
        localStorage.setItem("user", JSON.stringify(form));
        setMessage("Cập nhật thông tin thành công!");
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
                        disabled // Email thường không cho sửa
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
                        type="number"
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