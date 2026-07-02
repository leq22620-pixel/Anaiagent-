# AnOS Architecture

Version: 0.1 Alpha

## Mục tiêu

AnOS là trợ lý AI cá nhân chạy trên Android (PWA), hỗ trợ:

- Chat AI
- Voice AI
- Quản lý công việc
- Quản lý kinh doanh
- Hỗ trợ làm YouTube
- Tự động hóa công việc

---

## Kiến trúc

```
Người dùng
      │
      ▼
index.html
      │
      ▼
js/app.js
      │
      ▼
Kernel
      │
 ┌────┼─────┐
 │    │     │
 ▼    ▼     ▼
AI Memory Workflow
 │      │
 ▼      ▼
Gemini IndexedDB
```

---

## Các thành phần

### UI

Hiển thị giao diện.

### Kernel

Điều phối toàn bộ hệ thống.

### AI

Kết nối Gemini.

### Memory

Lưu trí nhớ.

### Database

IndexedDB.

### Agent

Thực hiện các nhiệm vụ chuyên biệt.

### Plugin

Mở rộng tính năng.

---

## Quy tắc

UI không gọi Gemini trực tiếp.

Mọi yêu cầu đều đi qua Kernel.

Kernel gọi AI hoặc Agent.

Agent lưu dữ liệu vào Database.

Database chỉ thao tác dữ liệu.