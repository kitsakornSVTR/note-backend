# note-backend

Backend API สำหรับแอปจดโน้ต (Node.js, Express, MongoDB)

## วิธีใช้งานสำหรับ Frontend

### Auth
- `POST /api/auth/register`  สมัครสมาชิก  
  body: `{ email, password }`
  - ตอบกลับ: `{ message: 'User registered successfully' }`
- `POST /api/auth/login`  ล็อกอิน  
  body: `{ email, password }`
  - ตอบกลับ: `{ token, user: { id, email } }`
  - ใช้ token นี้แนบใน header: `Authorization: Bearer <token>` สำหรับทุก request ที่ต้อง login

### Note (ต้อง login)
- `GET /api/notes`  ดึงโน้ตทั้งหมดของ user
- `POST /api/notes`  สร้างโน้ตใหม่  
  body: `{ title, content }`
- `PUT /api/notes/:id`  แก้ไขโน้ต  
  body: `{ title, content }`
- `DELETE /api/notes/:id`  ลบโน้ต

### หมายเหตุ
- ทุก request ที่ต้อง login ต้องแนบ header: `Authorization: Bearer <token>`
- Response เป็น JSON เสมอ
