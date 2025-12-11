# Docker: Port Mapping, Volumes, Networks

## 1. Port Mapping

**Chức năng:** Kết nối port trên host với port bên trong container.

**Cú pháp:**

```bash
docker run -p 8080:80 ten_image
```

**Ý nghĩa:**

* `8080`: port trên máy host
* `80`: port bên trong container

**Khi dùng:** Truy cập ứng dụng hoặc dịch vụ chạy trong container từ bên ngoài.

---

## 2. Volumes

**Chức năng:** Lưu trữ dữ liệu bền vững và chia sẻ dữ liệu giữa host/container.

### Hai loại chính

* **Named Volumes:** Docker quản lý tự động.
* **Bind Mounts:** ánh xạ trực tiếp thư mục host ↔ container.

**Ví dụ:**

```bash
docker run -v myvolume:/var/lib/data ten_image
```

**Khi dùng:** Lưu database, file log, dữ liệu quan trọng không được mất khi container bị xoá.

---

## 3. Networks

**Chức năng:** Tạo môi trường mạng giúp các container giao tiếp với nhau.

### Tạo network

```bash
docker network create mynet
```

### Chạy container trong network

```bash
docker run --network=mynet ten_image
```

**Khi dùng:** Khi có nhiều container trong hệ thống (server, database, redis…) cần liên lạc nội bộ an toàn.
