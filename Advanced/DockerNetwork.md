# Docker Network nâng cao & Nền tảng cho Microservices

## 1. Docker Network là gì?

Docker Network là cơ chế cho phép **container giao tiếp với nhau và với bên ngoài** thông qua các mạng ảo do Docker quản lý.

Trong hệ thống **microservices**, network đóng vai trò trung tâm vì:

* Các service giao tiếp qua HTTP / gRPC / message queue
* Cần service discovery, isolation, security và khả năng scale

---

## 2. Các loại Docker Network chính

### 2.1 Bridge Network

* Network mặc định của Docker
* Mỗi container có **IP riêng trong mạng ảo**
* Container cùng network giao tiếp bằng **service name / hostname**
* Có NAT với host

**Ưu điểm**

* Đơn giản, an toàn, isolation tốt
* Phù hợp dev và microservices đơn giản

**Nhược điểm**

* Có overhead NAT
* Không phù hợp multi-host

**Use case**

* Development
* Docker Compose cho hệ thống nhỏ

---

### 2.2 Host Network

* Container dùng **trực tiếp network của host**
* Không NAT, không mapping port

**Ưu điểm**

* Hiệu năng network gần native

**Nhược điểm**

* Mất isolation
* Nguy hiểm trong production nếu cấu hình sai

**Use case**

* Service cần latency cực thấp
* Legacy app

---

### 2.3 Macvlan Network

* Container có **IP riêng trong LAN thật**
* Xuất hiện như một máy vật lý trong mạng nội bộ

**Ưu điểm**

* Tích hợp dễ với hệ thống vật lý / legacy
* IP cố định, dễ quản lý mạng truyền thống

**Nhược điểm**

* Cấu hình phức tạp
* Không phù hợp dev

**Use case**

* IoT gateway
* Legacy system
* Hệ thống cần container có IP LAN riêng

---

### 2.4 Overlay Network

* Dùng cho **multi-host** (Docker Swarm / Kubernetes)
* Container ở các host khác nhau vẫn giao tiếp như cùng mạng
* Thường được **encrypt (VXLAN)**

**Ưu điểm**

* Phù hợp production microservices
* Tự động routing, service discovery

**Nhược điểm**

* Cấu hình phức tạp hơn bridge
* Có thêm latency so với single-host

**Use case**

* Production microservices phân tán
* Docker Swarm / Kubernetes

---

## 3. Kiến thức nền cho hệ thống Microservices

### 3.1 Service Discovery

* Mỗi service cần **tìm được service khác**
* Docker cung cấp DNS nội bộ:

  ```
  http://service-name:port
  ```

### 3.2 Isolation & Security

* Mỗi nhóm service có thể đặt trong network riêng
* Chỉ expose port cần thiết ra ngoài
* Giảm bề mặt tấn công

### 3.3 Routing & Load Balancing

* Overlay network + orchestrator
* Traffic được phân phối giữa các instance service

### 3.4 Multi-host & Scaling

* Overlay network cho phép service chạy trên nhiều host
* Scale ngang (horizontal scaling)
* High availability

---

## 4. So sánh nhanh

| Network | Isolation  | Multi-host | Hiệu năng | Mục đích chính     |
| ------- | ---------- | ---------- | --------- | ------------------ |
| Bridge  | Tốt        | ❌          | Tốt       | Dev, hệ nhỏ        |
| Host    | ❌          | ❌          | Rất cao   | Low latency        |
| Macvlan | Trung bình | ❌          | Cao       | LAN integration    |
| Overlay | Tốt        | ✅          | Khá       | Prod microservices |

---

## 5. Kết luận

* Docker Network là **nền tảng giao tiếp** của microservices
* Bridge phù hợp dev
* Overlay là lựa chọn chính cho production phân tán
* Hiểu network giúp thiết kế hệ thống **an toàn, scalable, dễ vận hành**

> Network không chỉ là kết nối, mà là kiến trúc giao tiếp của toàn bộ hệ thống.
