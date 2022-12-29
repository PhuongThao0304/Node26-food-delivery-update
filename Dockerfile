# các câu lệnh chỉ dẫn cách build 1 docker image


# Build image dựa trên image của node
FROM node:18-alpine

# tạo 1 directory bên trong image để chứa các code của ứng dụng
WORKDIR /app

# copy toàn bộ code của ứng dụng vào bên trong working directory (folder app)
COPY . .

# thực thi 1 câu lệnh bên trong working directory
RUN npm install

# sử dụng image này ở port 4000
EXPOSE 4000 

CMD ["node", "src/index.js"]