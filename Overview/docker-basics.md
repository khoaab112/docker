# Docker Learning Roadmap

Tài liệu này tổng hợp toàn bộ kiến thức nền tảng → nâng cao → chuyên sâu của Docker theo đúng chuẩn Production. Mục tiêu giúp bạn dễ theo dõi trên GitHub và dùng làm roadmap học tập.

---

## 📌 1. Kiến Thức Cơ Bản (Đã Nắm)

* Khái niệm Container vs Image
* Dockerfile cơ bản
* Docker Compose
* ENV / ARGS
* Build / Run / Exec
* Port mapping, Volumes, Networks
* Multi-stage build cơ bản

Bạn đang ở mức nền tảng tốt.

---

## 📌 2. Kiến Thức Trung Cấp (Nên Học Tiếp)

### **2.1 Multi-stage build nâng cao**

* Tối ưu kích thước image
* Alpine / Slim / Distroless
* Copy selective files

### **2.2 Healthcheck**

* interval, timeout, retries, start_period
* Đảm bảo service được restart khi lỗi

### **2.3 Tối ưu Docker build cache**

* Sắp xếp thứ tự COPY hợp lý
* Cache dependencies hiệu quả

### **2.4 Docker Network nâng cao**

* Bridge / Host / Macvlan / Overlay
* Kiến thức nền cho hệ thống microservices

### **2.5 Debug container hiệu quả**

* docker exec
* docker logs -f
* docker inspect
* docker stats
* docker top

### **2.6 Best Practices về bảo mật**

* Chạy container với user non-root
* Hạn chế quyền ghi (read-only filesystem)
* Giới hạn CPU và RAM

---

## 📌 3. Kiến Thức Nâng Cao (DevOps / SRE nên nắm)

### **3.1 Docker Registry / Private Registry**

* Tự host registry nội bộ
* Push/Pull từ registry riêng
* Bảo mật và quản lý artifacts

### **3.2 Docker Swarm**

* Scaling
* Load balancing
* Rolling update
* Secrets management

### **3.3 Docker Secrets**

* Lưu mật khẩu an toàn hơn ENV
* Inject vào runtime qua file `/run/secrets/...`

### **3.4 Resource limits**

* Giới hạn CPU/RAM từng container
* Tránh container làm quá tải server

### **3.5 Logging Drivers**

* json-file
* syslog
* fluentd
* awslogs
* gelf

### **3.6 Security Scan**

* Trivy
* Docker Scout
* Snyk

### **3.7 Storage Drivers**

* overlay2
* aufs
* btrfs
* zfs

---

## 📌 4. Kiến Thức Chuyên Sâu (Production-Grade)

### **4.1 Kubernetes (K8s)**

* Orchestration chuẩn production
* Helm / Operators / Istio / Ingress / Autoscaling

### **4.2 CICD Build Images**

* GitHub Actions
* GitLab CI
* Jenkins
* ArgoCD

### **4.3 Infrastructure as Code**

* Terraform
* Ansible
* Pulumi

---

## 📌 5. Lộ Trình Học Đề Xuất

### **A. Làm chủ Docker (1–2 tuần)**

* Multi-stage nâng cao
* Healthcheck production
* Nginx + Node + MySQL tối ưu hoá
* Docker Compose nâng cao
* Giới hạn tài nguyên
* Bảo mật cơ bản

### **B. Triển khai Production (2–4 tuần)**

* Private registry
* Monitoring & Logging
* Secrets
* Load balancing & networks
* CI/CD build image tự động

### **C. Hệ thống lớn (4–8 tuần)**

* Kubernetes
* Helm
* ArgoCD

---

## 📌 6. Tài Nguyên Tham Khảo Nên Đọc

* Docker Official Docs
* Dockerfile Best Practices
* NodeJS in Docker Guide
* Nginx & Reverse Proxy
* Kubernetes handbook

---

## 📌 7. Gợi Ý Phát Triển

Tôi có thể hỗ trợ bạn thêm:

* Viết bản PDF
* Thiết kế slide giới thiệu Docker
* Tạo bài tập thực hành
* Review Dockerfile / Compose của dự án

Hãy nói khi bạn cần mở rộng nội dung nào.
