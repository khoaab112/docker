# Docker Healthcheck

## 1. Healthcheck là gì?

Healthcheck là cơ chế Docker dùng để **kiểm tra xem service trong container còn hoạt động đúng hay không**. Nó không tự restart container hay gửi thông báo; chỉ đánh dấu trạng thái `healthy` hoặc `unhealthy`.

---

## 2. Cấu hình Healthcheck

```yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost/health"]
  interval: 30s
  timeout: 5s
  retries: 3
  start_period: 30s
```

### Ý nghĩa từng tham số

* `test`: Lệnh kiểm tra, trả exit code `0` → healthy, khác `0` → unhealthy
* `interval`: Khoảng thời gian giữa các lần kiểm tra
* `timeout`: Thời gian chờ tối đa cho một lần check
* `retries`: Số lần fail liên tiếp mới coi là `unhealthy`
* `start_period`: Thời gian ân hạn khi container mới start (fail trong thời gian này không tính)

---

## 3. Healthcheck không tự restart container

* Docker chỉ đánh dấu trạng thái `healthy/unhealthy`
* **Restart container là do `restart policy`**

### Ví dụ restart policy

```yaml
restart: unless-stopped
```

Khi container crash hoặc stop, Docker sẽ tự restart dựa trên policy.

---

## 4. Ứng dụng thực tế

1. **Đảm bảo thứ tự start service**

```yaml
depends_on:
  db:
    condition: service_healthy
```

2. **Phát hiện service “chết ngầm”**

   * PHP-FPM treo nhưng container vẫn chạy → Healthcheck fail → đánh dấu `unhealthy`
3. **Kết hợp restart policy**

   * Container bị crash → Docker tự restart
4. **Monitoring / alerting**

   * Docker không gửi alert, nhưng monitoring tool (Prometheus, Grafana) có thể đọc trạng thái `unhealthy` và gửi thông báo cho team

---

## 5. Tóm tắt

| Tính năng            | Thực hiện bởi         | Ghi chú                           |
| -------------------- | --------------------- | --------------------------------- |
| Kiểm tra service     | Healthcheck           | Chỉ đánh dấu healthy/unhealthy    |
| Restart container    | Restart policy        | Chạy lại container khi crash/exit |
| Thông báo người dùng | Monitoring / alerting | Docker không gửi alert            |

---

## 6. Ví dụ Healthcheck cho Laravel

```yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost/health"]
  interval: 30s
  timeout: 5s
  retries: 3
  start_period: 30s
```

* Kiểm tra endpoint `/health`
* Fail 3 lần liên tiếp → container đánh dấu `unhealthy`
* Kết hợp `restart: unless-stopped` để tự hồi phục
