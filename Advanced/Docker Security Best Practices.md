# Docker Security Best Practices

Tài liệu này tổng hợp các **thực hành bảo mật quan trọng khi chạy Docker container**, đặc biệt phù hợp cho môi trường production.

---

## 1. Chạy container với user non-root

### Vấn đề

* Mặc định nhiều image chạy bằng user `root`
* Nếu ứng dụng bị exploit → attacker có quyền root **bên trong container**
* Có thể leo thang đặc quyền (container escape) nếu cấu hình kém

### Best practice

* **Không chạy application bằng root**
* Tạo user riêng cho app

### Ví dụ Dockerfile

```dockerfile
RUN addgroup -S app && adduser -S app -G app
USER app
```

### Lợi ích

* Giảm rủi ro khi ứng dụng bị tấn công
* Hạn chế khả năng ghi file hệ thống

---

## 2. Read-only filesystem (Hạn chế quyền ghi)

### Vấn đề

* Container có filesystem ghi được → malware có thể:

  * Ghi file backdoor
  * Sửa binary, config

### Best practice

* Chạy container với **filesystem chỉ đọc**
* Chỉ mount những thư mục thật sự cần ghi

### Docker Compose example

```yaml
services:
  app:
    image: my-app
    read_only: true
    volumes:
      - ./storage:/app/storage
```

### Lợi ích

* Ngăn ghi file trái phép
* Container trở nên gần như immutable

---

## 3. Giới hạn CPU và RAM

### Vấn đề

* Container không giới hạn tài nguyên có thể:

  * Ăn hết RAM → OOM host
  * Chiếm CPU → làm chậm toàn hệ thống

### Best practice

* **Luôn giới hạn tài nguyên cho container**

### Docker Compose example

```yaml
services:
  app:
    image: my-app
    deploy:
      resources:
        limits:
          cpus: '0.50'
          memory: 512M
```

Hoặc với Docker run:

```bash
docker run --cpus="0.5" -m 512m my-app
```

### Lợi ích

* Tránh container phá host
* Dự đoán được hiệu năng hệ thống

---

## 4. Kết hợp các biện pháp bảo mật

Một container production nên có:

* User non-root
* Read-only filesystem
* Giới hạn CPU & RAM
* Image nhỏ (alpine / distroless)
* Không expose port dư thừa

---

## 5. Áp dụng trong thực tế (Laravel example)

```yaml
services:
  laravel:
    image: laravel-app
    user: "1000:1000"
    read_only: true
    volumes:
      - ./storage:/var/www/storage
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 1G
```

---

## 6. Tổng kết

| Biện pháp       | Mục tiêu            |
| --------------- | ------------------- |
| Non-root user   | Giảm quyền attacker |
| Read-only FS    | Ngăn ghi trái phép  |
| CPU / RAM limit | Bảo vệ host         |

> Bảo mật Docker không phải là một tính năng đơn lẻ, mà là **tư duy cấu hình phòng thủ nhiều lớp (defense in depth)**.
