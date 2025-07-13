const axios = require('axios');

const askFashionBot = async (req, res) => {
    const { message } = req.body;

    try {
        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: "anthropic/claude-3-haiku",
                messages: [
                    {
                        role: "system",
                        content: `Bạn là chuyên gia tư vấn thời trang.
                        Dựa vào chiều cao, cân nặng, giới tính, màu da, màu sắc yêu thích và phong cách người dùng cung cấp, hãy trả lời:

                        1. Size quần áo phù hợp.
                        2. Gợi ý 1-2 outfit phù hợp (ngắn gọn, dễ hiểu).
                        3. Cách phối màu phù hợp với người dùng.

                        Yêu cầu:
                        - Trả lời ngắn gọn, súc tích.
                        - Không vòng vo, không lặp từ.
                        - Luôn tư vấn size trước tiên.`
                    },
                    {
                        role: "user",
                        content: message
                    }
                ]
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const rawReply = response.data.choices[0].message.content;
        const formattedReply = rawReply.replace(/\n/g, "<br>");
        res.status(200).json({ reply: formattedReply });
    } catch (error) {
        console.error('Bot error:', error.response?.data || error.message);
        res.status(500).json({ message: 'Chatbot failed to respond' });
    }
};

module.exports = { askFashionBot };
