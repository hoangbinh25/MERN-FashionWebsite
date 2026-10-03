#Node.js phiên bản 20
FROM node:20-alpine

# Thư mục làm việc bên trong container
WORKDIR /app

# Chép riêng package files trước để Docker tận dụng cache
COPY package*.json ./

# Cài đúng dependencies theo package-lock.json
RUN npm ci

# Chép phần mã nguồn còn lại
COPY . .

# Backend dùng cổng này
EXPOSE 3001

# Chạy script "start": node src/index.js
CMD ["npm", "start"]