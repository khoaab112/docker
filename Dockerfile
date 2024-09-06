# syntax=docker/dockerfile:1

FROM node:18-alpine
WORKDIR /app
COPY . .
RUN yarn install --production
CMD ["node", "src/index.js"]
EXPOSE 3000

#để build image --tag để chỉ thị đặt tên . giấu chấm để tạo thư mục ở nơi chứa docker file
#docker build  --tag name_image .

#chạy dự án docker
#docker run -p 8080:8080 -d name_image