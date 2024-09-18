# docker
`Docker file` -> `image` -> `container`
-- từ dockerfile tạo lệnh `docker build` từ dockerfile  => sinh ra 1 image
-- Image sau đó được sử dụng như 1 template (base), được copy và chạy ứng dụng
-- Từ image đã có ta tạo 1 container bằng lệnh `docker create`.
-- chạy một image từ 1 container ta chạy các gói , service rồi started app
-- `Dockerfiles` : 
    khái niệm : 
-- `images` :
    Image :
        . là khuôn mẫu, lớp chứa các file cần thiết để tạo nên một container
        . Chứa những tài nguyên có sẵn
        . Không được tiếp cận vào CPU,memory, storage
    khái niệm : 
        - image là một file bất biến  - không thay đổi, chứa các source code, libraries, dependencies, tools ,các files khác cần thiết cho một ứng dụng để chạy
        - nó có tính chất read-only , ta có thể nói nó như chụp màn hình nhanh (snapshots)
        - nó đại diện cho một application và virtual environment tại thời điểm đó
        - lấy images làm cơ cở để xây dụng container
        - một container bản chất là 1 image đang chạy
        - khi tạo một container nó sẽ thêm một lớp có thể ghi lên trên image bất biến => bây giờ ta có thể chỉnh sửa sự bất biến đó
        - một image khi bạn cài trong một container thì bản chất là nó ko bị thay đổi , khi chạy nó tạo 1 bản sao của image đó để chạy , lúc này nó tạo ra layer đó để chạy và được phép thay đổi nội dung

-- `volumes`
-- `network`
-- `data volumes`
-- `Container` :
    .Tồn tại trên host với một IP
    .Được deploy , chạy , và xóa bỏ thông qua remote client
    khái niệm : 
        - là một run-time environment mà ở đó người dùng có thể chạy một ứng dụng độc lập.
        - container khá là gọn nhẹ và cho phép bạn chạy ứng dụng trong đó rất nhanh và dễ dàng
        - là sẽ chuẩn hóa việc chạy ứng dụng trong container trên mọi môi trường
        - sẽ đảm bảo ứng dụng luôn chạy trên 1 môi trường => đơn giản hóa việc cài đặt , chia sẻ ứng dụng cho các thành viên
        - container là độc lập : nó sẽ chạy độc lập , không ảnh hướng đến các container khác, không bị xung đột phiên bản , hệ điều hành , thư viện
        - container là ảo hóa (virtualization) nhưng nó dùng ở cấp độ ứng dung (app) , không sâu như máy ảo (VM) không tốn nhiều tài nguyên như máy ảo
        - 


# SO SÁNH image và container
-- Image có thể tồn tại mà không cần container
-- container chạy thì cần có image đã tồn tại
=> container phụ thuộc vào image và sử dụng nó để tạo ra run-time environment và chạy ứng dụng trên đó.
-- Cả image và container đều là thành phần quan trọng để tạo ra 1 running container.