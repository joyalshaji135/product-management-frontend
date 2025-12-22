
# 🛍 Product Management System – Frontend

A modern frontend application for managing products with authentication, CRUD operations, search, and pagination.
This project is built as part of a **Full-Stack Assignment** to demonstrate frontend architecture, API integration, and secure authentication handling.

---

## 🚀 Tech Stack

* **Framework**: React (Vite / CRA) or Next.js
* **Language**: JavaScript / TypeScript
* **State Management**: Context API / Redux Toolkit
* **Routing**: React Router DOM / Next Router
* **HTTP Client**: Axios / Fetch API
* **Styling**: CSS / Tailwind CSS / Bootstrap
* **Authentication**: JWT (stored in localStorage or cookies)

---

## ✨ Features

### 🔐 Authentication

* User Registration
* User Login
* JWT-based authentication
* Protected routes for product management
* Logged-in user info shown in navbar

### 📦 Product Management

* View all products
* Search products by name
* Pagination support
* View product details
* Add new product (protected)
* Edit product (protected)
* Delete product with confirmation (protected)

### 🖥 UI

* Responsive design (mobile & desktop)
* Clean and simple layout
* Form validation with error handling

---

## 📂 Project Structure

```bash
.
├── public/                # Static public assets
├── src/
│   ├── assets/            # Images, icons, fonts
│   ├── components/        # Reusable UI components (Button, Input, Modal, etc.)
│   ├── contexts/          # React Contexts (AuthContext, ThemeContext)
│   ├── hooks/             # Custom hooks (useAuth, useDebounce, useFetch)
│   ├── layouts/           # Layout components (AuthLayout, MainLayout)
│   ├── pages/             # Page-level components (Login, Register, Products)
│   ├── routes/            # Route definitions & protected routes
│   ├── services/          # API service layer (Axios instances, API calls)
│   ├── store/             # Global state management (Redux / Zustand)
│   ├── App.tsx            # Root application component
│   ├── main.tsx           # Application entry point
│   ├── index.css          # Global styles
│   └── vite-env.d.ts      # Vite environment types
│
├── .env.example           # Environment variables example
├── .gitignore             # Git ignored files
├── eslint.config.js       # ESLint configuration
├── index.html             # HTML entry file
├── package.json           # Project metadata & scripts
├── postcss.config.js      # PostCSS configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
└── README.md              # Project documentation
```

---


---

## 🔗 API Integration

The frontend communicates with the backend via REST APIs.

### Example APIs Used

| Method | Endpoint         | Description           |
| ------ | ---------------- | --------------------- |
| POST   | `/auth/register` | Register user         |
| POST   | `/auth/login`    | Login user            |
| GET    | `/products`      | Get all products      |
| GET    | `/products/:id`  | Get product by ID     |
| POST   | `/products`      | Create product (Auth) |
| PUT    | `/products/:id`  | Update product (Auth) |
| DELETE | `/products/:id`  | Delete product (Auth) |

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory.

### `.env.example`

```env
REACT_APP_API_BASE_URL=http://localhost:5173/api
REACT_APP_API_KEY=dummyApiKey
REACT_APP_API_VERSION=1.0.0

```

> ⚠️ Do NOT commit `.env` files with real values.

---

## 🛠 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/product-management-frontend.git
cd product-management-frontend
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Run the Application

```bash
npm run dev
```

The app will run at:

```
http://localhost:5173
```

---

## 🔐 Authentication Flow

1. User logs in / registers
2. Backend returns JWT token
3. Token stored in `localStorage`
4. Token sent in `Authorization` header for protected requests
5. Protected routes accessible only when authenticated

---

## 📦 Protected Routes

* Add Product
* Edit Product
* Delete Product

Unauthenticated users are redirected to the login page.

---

## 🧪 Validation & Error Handling

* Form-level validation for inputs
* API error handling with user-friendly messages
* Auth checks on protected routes

---

## 🚀 Deployment (Optional)

* **Frontend**: Vercel / Netlify
* **Backend**: Render / Railway

Deployed URL (optional):

```
https://your-app-url.vercel.app
```

---

## 📌 Notes

* UI design is kept simple and functional
* Category data can be static or mocked
* Focus is on functionality and clean code structure

---

## 👨‍💻 Author

**Joyal Developer**
Full Stack Developer

