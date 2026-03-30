# 🚀 AI-Powered Smart Code Translator

![React](https://img.shields.io/badge/Frontend-React-blue)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-green)
![Gemini](https://img.shields.io/badge/LLM-Google%20Gemini-orange)
![JWT](https://img.shields.io/badge/Auth-JWT-red)
![Google OAuth](https://img.shields.io/badge/SSO-Google%20OAuth-yellow)
![Monaco](https://img.shields.io/badge/Editor-Monaco-purple)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

An **AI-powered full-stack web application** that helps developers work across programming languages. Write code once — translate, analyze, optimize, and understand it instantly using **Google Gemini AI**.

---

# 🚀 Features

* 🔄 **Code Translation** — Convert code between C, C++, C#, Java, and Python
* 📊 **Complexity Analysis** — Get time and space complexity with Big-O notation
* ⚡ **Code Optimization** — AI-powered suggestions to improve performance
* 📖 **Code Explanation** — Beginner-friendly plain English explanations
* 🔐 **Email / Password Auth** — Register and login with traditional credentials
* 🔑 **Google SSO** — One-click sign-in with Google OAuth
* 📜 **Operation History** — Automatically save and browse past operations
* 🖊️ **Monaco Code Editor** — Professional VS Code-style editor in the browser

---

# 🧠 System Architecture

```
Client (React + Vite)
        ↓
Axios Interceptor (auto-attach JWT)
        ↓
Express API Server
        ↓
Auth Middleware (verify JWT → attach user)
        ↓
Code Controller (validate input)
        ↓
Service Layer (build prompt → call Gemini AI → clean response)
        ↓
History Service (fire-and-forget save to MongoDB)
        ↓
Response → { success: true, data: result }
```

---

# 🏗 Tech Stack

## Frontend
* React 18 + Vite
* Monaco Editor (`@monaco-editor/react`)
* React Router v6
* Axios with JWT interceptor
* Google OAuth (`@react-oauth/google`)
* React Hot Toast

## Backend
* Node.js + Express (ES Modules)
* MongoDB Atlas + Mongoose
* JSON Web Tokens (JWT)
* bcryptjs for password hashing
* Google Auth Library (SSO verification)
* Google Gemini 2.5 Flash AI

---


## 🌐 Live Demo

- **Frontend:** https://ai-powered-smart-code-translator.vercel.app
- **Backend:** https://ai-powered-smart-code-translator.onrender.com


# 🤖 AI Operations

| Operation | Endpoint | Input | Output |
|---|---|---|---|
| Translate | `POST /api/code/translate` | code, sourceLanguage, targetLanguage | `{ translatedCode }` |
| Analyze | `POST /api/code/analyze` | code, language | `{ timeComplexity, spaceComplexity, explanation }` |
| Optimize | `POST /api/code/optimize` | code, language | `{ optimizedCode, suggestions }` |
| Explain | `POST /api/code/explain` | code, language | `{ explanation }` |

---

# 🔐 Auth Flow

```
User registers / logs in
        ↓
Backend creates JWT token (contains user ID + email)
        ↓
Frontend stores token in localStorage
        ↓
Axios interceptor attaches token to every request
        ↓
Auth middleware verifies token on protected routes
        ↓
req.user available in all controllers
```

---

# 📂 Project Structure

```
AI-Powered Smart Code Translator/
│
├── client/                        # Frontend (React + Vite)
│   └── src/
│       ├── components/            # CodeEditor, Navbar, OutputPanel, etc.
│       ├── constants/             # Language definitions, starter code
│       ├── context/               # AuthContext (global auth state)
│       ├── pages/                 # LoginPage, HomePage, HistoryPage
│       ├── services/              # API call functions (auth, code, history)
│       └── styles/                # CSS files
│
└── server/                        # Backend (Express + MongoDB)
    └── src/
        ├── config/                # DB, Gemini, Google OAuth setup
        ├── constants/             # Prompts, language definitions
        ├── controllers/           # HTTP request handlers
        ├── middleware/            # Auth, error handling
        ├── models/                # Mongoose schemas (User, History)
        ├── routes/                # API route definitions
        ├── services/              # Business logic (translate, analyze, etc.)
        └── utils/                 # JWT utilities, response parsers
```

---

# ⚡ Getting Started

## Prerequisites
* Node.js
* MongoDB Atlas account
* Google Gemini API key ([aistudio.google.com](https://aistudio.google.com))
* Google OAuth Client ID ([console.cloud.google.com](https://console.cloud.google.com))

## Install & Run

### Backend
```bash
cd server
npm install
npm run dev
```

### Frontend
```bash
cd client
npm install
npm install react@18 react-dom@18
npm run dev
```

---

# 🌐 Environment Variables

Create `.env` inside **server/**:

```env
PORT=5000
CLIENT_URL=http://localhost:5173
CLIENT_URLS=http://localhost:5173,https://ai-powered-smart-code-translator.vercel.app
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GEMINI_API_KEY=your_gemini_api_key
```

Create `.env` inside **client/**:

```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
```

For Google sign-in, create a Google OAuth Web client and add these authorized JavaScript origins:

- `http://localhost:5173`
- your deployed frontend URL

For hosted deployments, set `CLIENT_URLS` on the backend to a comma-separated list of allowed frontend origins. Example:

```env
CLIENT_URLS=http://localhost:5173,https://ai-powered-smart-code-translator.vercel.app
```

---

# 📸 App Preview

### Login Page
* Email/password sign in and registration
* One-click Google SSO
* 
![Login Page](assets/login.png)

### Code Translator (Home)
* Monaco Editor with syntax highlighting
* 4 action tabs: Translate · Analyze · Optimize · Explain
* Language selector with swap button
* Real-time AI output panel

![Code Translator](assets/editor.png)

### History Page
* Paginated list of all past operations
* Click any entry to view full input + output
* Delete individual entries or clear all history

![History Page](assets/history.png)

---

# 🔑 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login with email/password |
| POST | `/api/auth/google` | Login with Google SSO |
| GET | `/api/auth/me` | Get current user profile |
| POST | `/api/auth/logout` | Logout |

### Code
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/code/translate` | Translate code |
| POST | `/api/code/analyze` | Analyze complexity |
| POST | `/api/code/optimize` | Optimize code |
| POST | `/api/code/explain` | Explain code |

### History
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/history` | Get paginated history |
| GET | `/api/history/:id` | Get single history entry |
| DELETE | `/api/history/:id` | Delete history entry |
| DELETE | `/api/history/clear` | Clear all history |

---

# 🎯 Future Improvements

* 🌐 Add more languages (Go, Rust, TypeScript, Kotlin)
* 🔍 Syntax error detection before sending to AI
* 📊 Side-by-side diff view for optimized code
* 🔗 Shareable result links
* 💬 Conversation memory for multi-turn code sessions
* 📱 Mobile-responsive layout

---

# 👨‍💻 Author

Built with ❤️ using **React, Node.js, MongoDB, and Google Gemini AI**.

*Full-stack AI application featuring RAG-style prompt engineering, JWT authentication, Google OAuth, and the Monaco Editor.*
