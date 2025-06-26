import { useState } from "react"
import axios from 'axios'

const TestPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:3000/api/test', formData);
      console.log('Kết quả từ backend:', res.data);
      alert('Gửi thành công!');
    } catch (err) {
      console.error('Lỗi khi gửi:', err);
    }
  };

    return (
        <div>
            <h2>Gửi dữ liệu đến Backend</h2>
            <input name="name" placeholder="Name" onChange={handleChange}/>
            <input name="email" placeholder="Email" onChange={handleChange}/>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default TestPage;