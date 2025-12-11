# Tóm tắt về Docker Build / Run / Exec

## 1. Docker Build

**Chức năng:** Tạo Docker image từ Dockerfile.

**Cú pháp:**

```bash
docker build -t ten_image:tag .
```

**Ý nghĩa:**

* `-t`: đặt tên và tag cho image
* `.`: thư mục chứa Dockerfile

**Khi dùng:** Khi bạn cập nhật code, dependency hoặc môi trường và cần tạo image mới.

---

## 2. Docker Run

**Chức năng:** Tạo và khởi động container từ image.

**Cú pháp:**

```bash
docker run -d -p 3000:3000 ten_image
```

**Ý nghĩa:**

* `-d`: chạy nền
* `-p`: ánh xạ port host ↔ container

**Khi dùng:** Khi bạn muốn chạy ứng dụng (server, database, frontend...).

---

## 3. Docker Exec

**Chức năng:** Thực thi lệnh bên trong container đang chạy.

**Cú pháp:**

```bash
docker exec -it ten_container sh
```

**Ý nghĩa:**

* `-it`: mở interactive terminal
* `sh` hoặc `bash`: truy cập shell bên trong container

**Khi dùng:** Debug, kiểm tra file, chạy command nội bộ, xem log.

---

## Bảng tóm tắt

| Lệnh             | Vai trò                             | Khi sử dụng                           |
| ---------------- | ----------------------------------- | ------------------------------------- |
| **docker build** | Tạo image từ Dockerfile             | Sau khi thay đổi code hoặc môi trường |
| **docker run**   | Tạo + chạy container                | Khi cần khởi động ứng dụng            |
| **docker exec**  | Chạy lệnh trong container đang chạy | Debug, kiểm tra, chạy command nội bộ  |

---

Nếu bạn muốn, tôi có thể bổ sung thêm phần "run vs start", "khi nào cần rebuild", hoặc tóm tắt nâng cao hơn.
