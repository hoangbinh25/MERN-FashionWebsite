# 👗 FashionWebsite - MERN Stack Project

FashionWebsite là ứng dụng web thời trang hiện đại, xây dựng với MERN Stack (MongoDB, Express, React, NodeJS). Dự án cung cấp các tính năng mua sắm, blog, quản lý người dùng, và nhiều tiện ích khác cho khách hàng cũng như quản trị viên.

---

Link deploy:
         https://mern-fashion-website.vercel.app

## 🚀 Tính năng chính

-   Xem và tìm kiếm sản phẩm thời trang
-   Đặt hàng, quản lý giỏ hàng
-   Đăng ký, đăng nhập, phân quyền người dùng
-   Trang blog, tin tức, liên hệ
-   Quản trị sản phẩm, đơn hàng (admin)

---

## ⚙️ Yêu cầu hệ thống

-   Node.js >= 18.x
-   MongoDB (cài local hoặc dùng MongoDB Atlas)
-   NPM hoặc Yarn

---

## 📦 Cài đặt & Khởi động dự án

### 1. Clone repository

```bash
git clone https://github.com/your-username/FashionWebsite.git
cd FashionWebsite
```

### 2. Cài đặt dependencies

**Backend**

```bash
cd backend
npm install
```

**Frontend**

```bash
cd ../frontend
npm install
```

### 3. Tạo file cấu hình môi trường `.env`

**Backend** (`/backend/.env`):

```
PORT=3000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/your-db
```

**Frontend** (`/frontend/.env`):

```
VITE_API_URL=http://localhost:3000/api
```

### 4. Chạy project

Mở 2 terminal:

-   **Terminal 1 – Backend:**
    ```bash
    cd backend
    npm run dev
    ```
-   **Terminal 2 – Frontend:**
    ```bash
    cd frontend
    npm run dev
    ```

---

## 📁 Cấu trúc thư mục

```
MERN-FashionWebsite/
  ├── backend/      # Server Node.js, Express, MongoDB
  └── frontend/     # Ứng dụng React, TailwindCSS
```

---

## 📞 Liên hệ & Hỗ trợ

Nếu bạn gặp vấn đề hoặc cần hỗ trợ, vui lòng tạo issue trên GitHub hoặc liên hệ qua email: [binhhp.work@gmail.com](binhhp.work@gmail.com)

---

Chúc bạn code vui vẻ và thành công với FashionWebsite! ✨
