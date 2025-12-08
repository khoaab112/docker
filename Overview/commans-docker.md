# Docker Commands Reference

Tài liệu này tổng hợp toàn bộ các câu lệnh Docker quan trọng nhất, chia theo nhóm và kèm giải thích rõ ràng. Đây là bản tham khảo nhanh phù hợp cho thực chiến DevOps.

---

## 📌 1. Docker Images

### **1.1. Build Image**

```
docker build -t <name>:<tag> .
```

**Options quan trọng:**

* `-t` : đặt tên + tag
* `-f <Dockerfile>` : chỉ định Dockerfile
* `--build-arg KEY=VALUE` : truyền ARG
* `--no-cache` : build sạch, không dùng cache
* `--platform linux/amd64` : build đa kiến trúc

---

### **1.2. Liệt kê images**

```
docker images
```

### **1.3. Xoá image**

```
docker rmi <image>
docker rmi -f <image>      # Force
```

### **1.4. Pull image**

```
docker pull node:18-alpine
```

---

## 📌 2. Docker Containers

### **2.1. Run container**

```
docker run <image>
```

**Options quan trọng:**

* `-d` : chạy ngầm
* `-p 80:80` : map port host:container
* `-e KEY=value` : đặt biến ENV
* `--env-file .env` : load file env
* `--name <name>` : đặt tên
* `--restart unless-stopped` : tự restart
* `-v host:container` : mount volume
* `--network <name>` : gắn vào network

Ví dụ:

```
docker run -d --name app -p 3000:3000 --env-file .env node:18-alpine
```

---

### **2.2. Liệt kê container**

```
docker ps
```

Tất cả container:

```
docker ps -a
```

---

### **2.3. Exec vào container**

```
docker exec -it <container> bash
```

Alpine:

```
docker exec -it <container> sh
```

---

### **2.4. Logs**

```
docker logs <container>
docker logs -f <container>     # Realtime
```

---

### **2.5. Stop / Start / Restart**

```
docker stop <container>
docker start <container>
docker restart <container>
```

---

### **2.6. Xoá container**

```
docker rm <container>
docker rm -f <container>    # Force
```

---

## 📌 3. Docker Volumes

### **3.1. Tạo volume**

```
docker volume create mydata
```

### **3.2. Liệt kê volume**

```
docker volume ls
```

### **3.3. Inspect volume**

```
docker volume inspect mydata
```

### **3.4. Xoá volume**

```
docker volume rm mydata
```

---

## 📌 4. Docker Networks

### **4.1. Tạo network**

```
docker network create mynetwork
```

### **4.2. Liệt kê networks**

```
docker network ls
```

### **4.3. Inspect network**

```
docker network inspect mynetwork
```

### **4.4. Xoá network**

```
docker network rm mynetwork
```

---

## 📌 5. Docker Compose

### **5.1. Up containers**

```
docker compose up
```

Chạy ngầm:

```
docker compose up -d
```

---

### **5.2. Down containers**

```
docker compose down
```

Kèm xoá volumes:

```
docker compose down -v
```

---

### **5.3. Build lại compose**

```
docker compose build
```

Không dùng cache:

```
docker compose build --no-cache
```

---

### **5.4. Logs compose**

```
docker compose logs
```

Realtime:

```
docker compose logs -f
```

---

### **5.5. Restart compose**

```
docker compose restart
```

---

### **5.6. Exec thông qua compose**

```
docker compose exec server bash
```

---

## 📌 6. Ghi chú

Tài liệu này dùng như cheat sheet để tra cứu nhanh khi làm dự án, triển khai production hoặc viết CI/CD.
Nếu bạn muốn mở rộng thêm, tôi có thể bổ sung:

* Lệnh Docker Swarm
* Docker Security
* Dockerfile best practices
* Lộ trình học Docker → DevOps chi tiết
* Các ví dụ thực tế theo dự án của bạn.
