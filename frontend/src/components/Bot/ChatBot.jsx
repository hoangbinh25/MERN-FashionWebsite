import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { BsChatDots } from "react-icons/bs";
import { chatbot } from "~/services/chatbotService";

export default function ChatBotModal() {
    const [show, setShow] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        {
            sender: 'bot',
            text: 'Xin chào! Tôi là stylist AI. Hãy nhập chiều cao, cân nặng, giới tính,... để được tư vấn thời trang nhé!'
        }
    ]);
    const [loading, setLoading] = useState(false);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const data = await chatbot(input);
            const botMessage = { sender: 'bot', text: data.reply };
            setMessages(prev => [...prev, botMessage]);
        } catch (err) {
            setMessages(prev => [...prev, { sender: 'bot', text: 'Lỗi khi phản hồi. Vui lòng thử lại.' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setShow(true)}
                className="fixed bottom-6 right-6 z-50 bg-black text-white p-4 rounded-full shadow-lg hover:bg-gray-800"
            >
                <BsChatDots size={24} />
            </button>

            {/* Chat Modal */}
            {show && (
                <div className="fixed bottom-20 right-6 w-80 h-[500px] bg-white border rounded-lg shadow-lg z-50 flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-2 bg-black text-white rounded-t-lg">
                        <h3 className="text-lg font-semibold">Tư vấn thời trang</h3>
                        <button onClick={() => setShow(false)}>
                            <IoMdClose size={20} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50 text-sm">
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`p-2 rounded max-w-[80%] ${msg.sender === 'user' ? 'ml-auto bg-blue-100' : 'mr-auto bg-green-100'}`}
                                dangerouslySetInnerHTML={{ __html: msg.text }}
                            >
                            </div>
                        ))}
                        {loading && (
                            <div className="mr-auto bg-green-100 p-2 rounded max-w-[80%]"
                            >
                                Đang phản hồi...
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSend} className="flex p-2 border-t gap-2">
                        <input
                            type="text"
                            placeholder="Nhập câu hỏi..."
                            value={input}
                            spellCheck={false}
                            onChange={(e) => setInput(e.target.value)}
                            className="flex-1 px-2 py-1 border rounded text-sm focus:outline-none"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800 text-sm"
                        >
                            Gửi
                        </button>
                    </form>
                </div>
            )}
        </>
    );
}
