# 🚀 Secure Task Management System (Frontend-task for Internship)

Full-stack **Task Manager Dashboard** with secure JWT authentication (httpOnly cookies), protected routes, user-specific tasks, and complete **CRUD** functionality.

Modern, production-ready authentication practices + responsive UI.

[![React](https://img.shields.io/badge/React-18-blue?logo=react&logoColor=white)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-20-green?logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

### 🔐 Authentication

- Register / Login with strong password validation
- JWT + **httpOnly**, **Secure**, **SameSite** cookies
- Secure logout (cookie clearing)
- Backend route protection via middleware
- Frontend protected routes + auto-redirect

### 📊 Dashboard & Tasks

- Protected dashboard with user verification on mount
- **Private tasks** — each user sees only their own tasks
- Full **CRUD** operations:
  - Create task
  - List all user tasks
  - Update task (title, description, status)
  - Delete task
- Responsive & clean UI with Tailwind CSS

## 🛠️ Tech Stack

| Layer    | Technologies                                             |
| -------- | -------------------------------------------------------- |
| Frontend | React 18, React Router v6, Tailwind CSS, Vite, Fetch API |
| Backend  | Node.js, Express.js, MongoDB + Mongoose                  |
| Auth     | JWT (jsonwebtoken), bcrypt, cookie-parser                |
| Security | httpOnly + Secure cookies, CORS, input validation        |
| Other    | dotenv, nodemon (dev)                                    |

## 🔒 Authentication Flow (How it works)

1. User registers → password hashed with **bcrypt**
2. User logs in → valid credentials → JWT signed
3. JWT stored in **httpOnly cookie** (not accessible via JavaScript)
4. Every protected request → cookie sent automatically → middleware verifies JWT
5. Logout → clear cookie + 200 response
6. Frontend checks auth status → redirects to login if invalid/expired

## 📦 Dependencies

```bash

"dependencies": {
    "bcrypt": "^6.0.0",
    "cookie-parser": "^1.4.7",
    "dotenv": "^17.3.1",
    "ejs": "^4.0.1",
    "express": "^5.2.1",
    "jsonwebtoken": "^9.0.3",
    "mongoose": "^9.2.0"
  }
```

## 📂 Project Structure

```text
Task-Manager-MERN/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── Task.js
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── dashboard.js        # optional / user info
│   │   └── tasks.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/         # (suggested: add if you refactor)
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── api.js              # centralized API calls
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── vite.config.js
│   ├── package.json
│   └── .env.local              (optional)
│
├── .gitignore
├── README.md
└── LICENSE
```

## 🔧 Installation

### 1️⃣ Clone Repository

```bash
git clone https://github.com/VipinKumar-70/Frontend-task-intern.git
cd Frontend-task-intern
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create .env file:

```bash
PORT=3000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
```

Run backend:

```bash
run backend
```

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

http://localhost:5173

## 🎯 Learning Outcomes

- Implemented JWT authentication securely
- Used httpOnly cookies for improved security
- Built custom authentication middleware
- Protected frontend routes properly
- Structured scalable MERN application
- Implemented full CRUD functionality

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please fork the repository and submit a pull request with your changes. Make sure to follow the standard coding conventions and best practices.

## 📜 License

This project is licensed under the MIT License. See the LICENSE file for details. [MIT License](LICENSE)

## 📩 Contact

If you have any questions or need further assistance, please don't hesitate to contact me at  
[Vipin Kumar](mailto:vipin70kr@gmail.com). I'll be happy to help!
