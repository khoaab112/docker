# Docker Compose Cơ Bản

Tài liệu này tổng hợp các kiến thức nền tảng và quan trọng nhất về **Docker Compose**, dùng để quản lý nhiều container trong cùng một hệ thống.

---

## 1. Docker Compose là gì?

Docker Compose là công cụ giúp bạn định nghĩa và chạy nhiều container Docker bằng **một file duy nhất**, thường là:

```
docker-compose.yml
```

Với Compose, bạn có thể:

* Khởi động toàn bộ hệ thống bằng 1 lệnh.
* Định nghĩa môi trường chạy container (env, volume, port...).
* Tạo network và volume tự động.
* Xây dựng image từ Dockerfile.
* Thiết lập sự phụ thuộc giữa các service.

---

## 2. Cấu trúc một file `docker-compose.yml`

### Thuộc tính **name**

Bạn có thể sử dụng trường `name:` trong Docker Compose để đặt tên riêng cho "project" Compose.

Ví dụ:

```yaml
name: my-project

services:
  app:
    image: node:18
```

Khi có trường `name`, Docker Compose sẽ:

* Đặt prefix tên container theo project name.
* Tên network, volume cũng theo project.
* Tránh bị trùng khi chạy nhiều Compose khác nhau.

---

Ví dụ cấu trúc cơ bản:

```yaml
version: "3.9"

services:
  app:
    image: node:18
    container_name: my-app
    ports:
      - "3000:3000"
    volumes:
      - .:/app
    working_dir: /app
    command: ["node", "server.js"]
```

### Các phần chính:

* **version**: phiên bản Compose file.
* **services**: danh sách container trong hệ thống.
* **image**: image sử dụng.
* **build**: build image từ Dockerfile.
* **ports**: map port.
* **volumes**: mount volume.
* **environment / env_file**: biến môi trường.
* **depends_on**: khai báo dependency giữa các service.
* **networks**: định nghĩa hoặc gán network.

---

## 3. Các thành phần Compose quan trọng

### 3.1. `image`

Chỉ định image có sẵn để chạy:

```yaml
image: mysql:8
```

### 3.2. `build`

Dùng Dockerfile để build image:

```yaml
build:
  context: ./server
  dockerfile: Dockerfile
```

### 3.3. `ports`

Map cổng **host : container**:

```yaml
ports:
  - "3000:3000"
```

### 3.4. `environment` & `env_file`

Khai báo environment:

```yaml
environment:
  DB_HOST: db
  DB_USER: root
```

Hoặc dùng file:

```yaml
env_file:
  - .env
```

### 3.5. `volumes`

Mount volume để lưu dữ liệu:

```yaml
volumes:
  - db-data:/var/lib/mysql
```

### 3.6. `networks`

Tạo network riêng:

```yaml
networks:
  app-net:
```

Gắn vào service:

```yaml
networks:
  - app-net
```

### 3.7. `depends_on`

Thiết lập thứ tự khởi động:

```yaml
depends_on:
  - db
```

---

## 4. Các lệnh Docker Compose cơ bản

### 4.1. Khởi động toàn hệ thống

```
docker compose up
```

Chạy ngầm:

```
docker compose up -d
```

### 4.2. Dừng tất cả container

```
docker compose down
```

Xoá thêm volumes:

```
docker compose down -v
```

### 4.3. Build lại image

```
docker compose build
```

Hoặc:

```
docker compose build server
```

### 4.4. Restart service

```
docker compose restart
```

### 4.5. Chạy 1 service cụ thể

```
docker compose up server
```

### 4.6. Xem log

```
docker compose logs -f
```

Log của 1 service:

```
docker compose logs -f server
```

---

## 5. Ví dụ Compose thực tế: Node.js + MySQL

```yaml
version: "3.9"

services:
  db:
    image: mysql:8
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: app
    ports:
      - "3306:3306"
    volumes:
      - db:/var/lib/mysql
    networks:
      - app-net

  server:
    build:
      context: ./server
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    env_file:
      - .env
    depends_on:
      - db
    networks:
      - app-net

volumes:
  db:

networks:
  app-net:
```

---

## 6. Khi nào nên dùng Docker Compose?

### ✔ Dự án nhiều container

Backend + Database + Redis + Frontend.

### ✔ Môi trường dev/staging

Dễ dựng môi trường cho team.

### ✔ Triển khai nhỏ hoặc trung bình

VPS 1 server, không cần Kubernetes.

Không phù hợp cho hệ thống lớn → lúc đó dùng Swarm hoặc Kubernetes.

---

## 7. Tóm tắt

Docker Compose giúp bạn:

* Quản lý nhiều container.
* Tạo môi trường dev / staging nhanh chóng.
* Dễ sử dụng, dễ mở rộng.
* Tự động hóa network, volume, env.

Đây là công cụ quan trọng cho mọi developer làm backend, frontend hoặc DevOps.

---

Nếu bạn muốn, tôi có thể tạo thêm:

* File Compose production chuẩn (Nginx + PM2 + SSL)
* File Compose cho full-stack (Node + MySQL + Redis + frontend)
* Compose tối ưu và multi-network cho hệ thống lớn hơn.
