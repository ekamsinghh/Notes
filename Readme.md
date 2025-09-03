# 📒 Notes App  

A full-stack **Notes Application** built with **React (frontend)** and **Node.js + Express + MongoDB (backend)**.  
It supports user authentication with email OTP verification and CRUD operations for notes.  

---

## 🔧 Tech Stack
- **Frontend**: React + TypeScript + TailwindCSS  
- **Backend**: Node.js, Express, TypeScript  
- **Database**: MongoDB (Cloud Atlas or local)  
- **Auth**: JWT (JSON Web Token), Nodemailer with Gmail App Passwords  

---

## ⚙️ Setup Instructions  

### 1️⃣ Clone the repository  
```bash
git clone https://github.com/ekamsinghh/Notes.git
cd notes-app

cd Backend
npm install

```

### .env file to setup in backend folder

- PORT=3000
- DB_URL=your_mongo_connection_string
- JWT_SECRET=your_secret_key
- EMAIL=your_gmail_address
- EMAIL_PASS=your_app_password   # generate from Google - App Passwords

### Run Backend
```bash
npm run dev
```

## Frontend Setup
```bash
cd Frontend
npm install
```
#### Configure src/utils/apiPaths.ts with backend base URL:

export const BASE_URL = "http://localhost:3000/api";

## Run Frontend in Development
```bash
npm run dev
```

# API Documentation

## Base URL
```bash
http://localhost:3000/api
```

## Auth Routes

| Method | Endpoint       | Description                |
| ------ | -------------- | -------------------------- |
| POST   | `/register`    | Register a new user        |
| POST   | `/login`       | Login user                 |
| POST   | `/verify-otp`  | OTP Verification + token   |
| GET    | `/auth/me/:id` | Get current user details   |


## Notes Routes

| Method | Endpoint              | Description              |
| ------ | --------------------- | ------------------------ |
| POST   | `/notes/create`       | Create a new note        |
| POST   | `/notes/:id`          | Update a note            |
| DELETE | `/notes/:id`          | Delete a note            |
| GET    | `/notes/user/:userId` | Get all notes for a user |

## 🚀 Features

- User authentication with OTP verification (via Gmail).

- Secure JWT-based session handling.

- CRUD operations for notes (create, read, update, delete).

- Protected routes (Dashboard accessible only with valid token).

- Elegant and responsive frontend UI.