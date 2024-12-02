# Sử dụng Node.js hình ảnh
FROM node:18

# Làm việc trong thư mục /app
WORKDIR /app

# Sao chép package.json vào container và cài đặt dependencies
COPY package.json package-lock.json ./
RUN npm install

# Sao chép toàn bộ mã nguồn
COPY . .

# Expose cổng backend
EXPOSE 3001

# Chạy server
CMD ["node", "server.js"]
