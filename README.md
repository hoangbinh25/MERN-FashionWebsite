📦 FashionWebsite - MERN Stack Project

Fullstack ứng dụng web thời trang sử dụng MERN Stack (MongoDB, Express, React, NodeJS)

⚙️ Yêu cầu cài đặt:

  Node.js >= 18.x
  
  MongoDB (hoặc MongoDB Atlas)
  
  NPM hoặc Yarn

🚀 Cách chạy project:

1️⃣ Clone repository

    git clone https://github.com/your-username/FashionWebsite.git
    cd FashionWebsite

2️⃣ Cài đặt dependencies

Backend

    cd backend
    npm install

Frontend

    cd ../frontend
    npm install


3️⃣ Tạo file .env

📍 Backend (/backend/.env)
    
    PORT=3000
    MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/your-db

📍 Frontend (/frontend/.env)

    VITE_API_URL=http://localhost:3000/api

4️⃣ Chạy project

Mở 2 terminal:

Terminal 1 – Backend:

    cd backend
    npm run dev

Terminal 2 – Frontend:
    
    cd frontend
    npm run dev

