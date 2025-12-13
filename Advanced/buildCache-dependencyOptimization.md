# Docker Build Cache & Dependency Optimization

## 1. Tối ưu Docker build cache là gì?

Docker tạo cache cho từng layer khi build Dockerfile:

* Layer **không thay đổi** → Docker **tái sử dụng cache** → build nhanh
* Layer **thay đổi** → Docker **rebuild layer đó và các layer phía sau**

**Mục tiêu:** giảm số layer bị rebuild khi code thay đổi, tăng tốc build.

---

## 2. Sắp xếp thứ tự COPY hợp lý

**Nguyên tắc:**

* COPY **những thứ ít thay đổi trước**
* COPY **code thay đổi thường xuyên cuối cùng**

### Ví dụ Laravel + Composer

```dockerfile
# COPY file cứng, ít thay đổi
COPY composer.json composer.lock ./

# Install dependencies → cache được nếu composer.json không đổi
RUN composer install --no-dev --optimize-autoloader

# COPY code app thường xuyên thay đổi cuối cùng
COPY app ./app
COPY routes ./routes
COPY public ./public
```

**Kết quả:**

* Sửa code → không phải chạy lại composer install → build nhanh hơn.

---

## 3. Cache dependencies hiệu quả

**Ý tưởng:** tách bước install dependencies ra layer riêng để **tái sử dụng cache**

### Node example

```dockerfile
COPY package*.json ./
RUN npm install        # cache layer này

COPY resources ./resources
RUN npm run build
```

* Sửa code → Docker **không rebuild npm install** → tiết kiệm thời gian.

### Laravel / PHP

* COPY `composer.json` + `composer.lock` trước → cache composer install
* COPY code sau → build nhanh

---

## 4. Mẹo thực tế

1. **.dockerignore**

   * Chặn file không cần thiết (`node_modules`, `.git`, `.env`) → COPY layer nhỏ → build nhanh → cache hiệu quả.

2. **Multi-stage build**

   * Cache dependencies stage build
   * Stage runtime chỉ copy **thành phẩm**, không cài lại dependencies

3. **Layer order = performance**

   * Layer thay đổi nhiều → đặt cuối
   * Layer thay đổi ít → đặt đầu → cache được

---

## 5. Minh họa luồng build Laravel + Vite tối ưu

```dockerfile
# Stage 1: Node / frontend
FROM node:18 AS frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm install           # Cache layer này
COPY vite.config.* ./resources ./resources
RUN npm run build

# Stage 2: PHP / Laravel
FROM php:8.2-fpm AS backend-builder
WORKDIR /var/www
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader  # Cache dependencies
COPY . .  # Copy code thay đổi thường xuyên
COPY --from=frontend-builder /app/public ./public
RUN php artisan config:cache && php artisan route:cache
```

**Lợi ích:**

* Sửa JS → build nhanh, npm install cached
* Sửa Laravel → composer cached
* Image cuối nhẹ, build nhanh
