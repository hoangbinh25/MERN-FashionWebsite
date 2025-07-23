import { useState } from "react";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { sendContactMail } from "~/services/usersService";
import { ToastContainer, toast } from 'react-toastify';

export default function Contact() {
    const user = JSON.parse(localStorage.getItem("user"));
    const email = user?.email || '';
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);
            const data = await sendContactMail(email, message);
            toast.success(data.message);
            setMessage('')
            return
        } catch (error) {
            const msg = error.response?.data?.message || '';
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col md:flex-row max-w-screen-2xl mx-auto my-16 border rounded-md bg-white">
            {/* Form */}
            <div className="w-full md:w-1/2 p-10 border-b md:border-b-0 md:border-r">
                <h2 className="text-3xl font-medium text-center mb-10">Send Us A Message</h2>
                <form className="space-y-8" onSubmit={handleSubmit}>
                    <div className="relative">
                        <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={22} />
                        <input
                            type="email"
                            placeholder="Your Email Address"
                            disabled
                            value={email}
                            className="w-full pl-12 pr-4 py-4 border rounded focus:outline-none"
                            onChange={e => console.log(e.target.value)}
                        />
                    </div>
                    <div>
                        <textarea
                            rows={6}
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            placeholder="How Can We Help?"
                            className="w-full p-4 border rounded focus:outline-none resize-none"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-4 bg-neutral-800 text-white font-medium rounded-full text-lg tracking-wider hover:bg-neutral-900 transition"
                    >
                        {loading ? "Sending..." : "Send"}
                    </button>
                </form>
            </div>
            {/* Contact Info */}
            <div className="w-full md:w-1/2 p-10 flex flex-col justify-center items-center">
                <div className="space-y-10">
                    <div className="flex items-start space-x-4">
                        <FiMapPin size={24} className="mt-1 text-gray-500" />
                        <div>
                            <div className="font-semibold text-lg">Address</div>
                            <div className="text-gray-500">
                                Trinh Van Bo, Nam Tu Liem, Ha Noi
                            </div>
                        </div>
                    </div>
                    <div className="flex items-start space-x-4">
                        <FiPhone size={24} className="mt-1 text-gray-500" />
                        <div>
                            <div className="font-semibold text-lg">Lets Talk</div>
                            <a href="tel:+18001236879" className="text-blue-500 hover:underline">+84912345678</a>
                        </div>
                    </div>
                    <div className="flex items-start space-x-4">
                        <FiMail size={24} className="mt-1 text-gray-500" />
                        <div>
                            <div className="font-semibold text-lg">Sale Support</div>
                            <a href="mailto:contact@example.com" className="text-blue-500 hover:underline">contact@example.com</a>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
}