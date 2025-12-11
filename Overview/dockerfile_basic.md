# Dockerfile Cơ Bản

Tài liệu này tổng hợp kiến thức nền tảng giúp bạn hiểu và viết một Dockerfile cơ bản, áp dụng cho hầu hết các ứng dụng backend hoặc frontend ở mức độ khởi điểm.

---

## 1. Khái Niệm Dockerfile

**Dockerfile** là một file mô tả hướng dẫn Docker tạo ra một image. Mỗi dòng trong Dockerfile là một bước (layer) trong quá trình build.

Nội dung Dockerfile mô tả:

* Sử dụng hệ điều hành hoặc runtime nào
* Sao chép file nào vào container
* Cài đặt dependency
* Build ứng dụng (nếu cần)
* Khởi động ứng dụng như thế nào

---

## 2. Các Thành Phần Quan Trọng Trong Dockerfile

Một Dockerfile cơ bản thường bao gồm các phần sau:

### **FROM**

Chỉ định image nền tảng để xây dựng.

```dockerfile
FROM node:18-alpine
```

### **WORKDIR**

Thiết lập thư mục làm việc bên trong container.

```dockerfile
WORKDIR /app
```

### **COPY**

Sao chép file từ máy host vào container.

```dockerfile
COPY package*.json ./
COPY . .
```

### **RUN**

Chạy lệnh tại thời điểm build image.
Ví dụ cài dependencies:

```dockerfile
RUN npm ci
```

### **EXPOSE**

Khai báo port container sử dụng.

```dockerfile
EXPOSE 3000
```

### **CMD**

Lệnh chạy ứng dụng khi container khởi động.

```dockerfile
CMD ["node", "server.js"]
```

---

## 3. Ví Dụ Dockerfile Backend Cơ Bản (Node.js)

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
```

---

## 4. Ví Dụ Dockerfile Frontend Cơ Bản (Vite/React)

```dockerfile
# Build stage
FROM node:18 AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Runtime stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## 5. Tóm Tắt Dễ Nhớ

| Thành phần  | Chức năng                     |
| ----------- | ----------------------------- |
| **FROM**    | Chọn image nền                |
| **WORKDIR** | Đặt thư mục làm việc          |
| **COPY**    | Copy file vào container       |
| **RUN**     | Chạy lệnh khi build           |
| **EXPOSE**  | Khai báo port                 |
| **CMD**     | Lệnh chạy khi container start |

---

Nếu bạn cần thêm phiên bản nâng cao (multi-stage build, ARG, ENV, cache optimization), tôi có thể bổ sung vào tài liệu này bất cứ lúc nào.
