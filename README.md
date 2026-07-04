<div align="center">

# 🛍️ ShopVerse
### 🚀 Production-Ready MERN E-Commerce Platform

<p align="center">
A modern, scalable, and production-ready <b>MERN Stack</b> e-commerce application built with <b>MongoDB, Express.js, React (Vite), and Node.js</b>, featuring secure JWT authentication, Razorpay payments, Cloudinary media storage, Redux Toolkit, and a complete Admin Dashboard.
</p>

<p align="center">

<img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white">

<img src="https://img.shields.io/badge/Express.js-Backend-000000?style=for-the-badge&logo=express">

<img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black">

<img src="https://img.shields.io/badge/Vite-Build_Tool-646CFF?style=for-the-badge&logo=vite&logoColor=white">

<img src="https://img.shields.io/badge/Node.js-Server-339933?style=for-the-badge&logo=node.js&logoColor=white">

<img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">

<img src="https://img.shields.io/badge/Redux_Toolkit-State_Management-764ABC?style=for-the-badge&logo=redux&logoColor=white">

<img src="https://img.shields.io/badge/Razorpay-Payments-0C2451?style=for-the-badge">

<img src="https://img.shields.io/badge/Cloudinary-Media-3448C5?style=for-the-badge">

</p>

<p align="center">

<img src="https://img.shields.io/github/stars/yourusername/ShopVerse?style=flat-square">

<img src="https://img.shields.io/github/forks/yourusername/ShopVerse?style=flat-square">

<img src="https://img.shields.io/github/issues/yourusername/ShopVerse?style=flat-square">

<img src="https://img.shields.io/github/license/yourusername/ShopVerse?style=flat-square">

</p>

---

### ⭐ Shop • Secure • Pay • Manage

</div>

---

# 📖 About

**ShopVerse** is a full-stack MERN e-commerce application designed with modern development practices and production-ready architecture.

It includes everything required for a complete online shopping experience including authentication, payments, product management, image uploads, order tracking, and a powerful admin dashboard.

Perfect for:

- 🛒 E-Commerce Stores
- 💼 Portfolio Projects
- 🎓 College Major Projects
- 🚀 Startup MVPs
- 👨‍💻 Learning MERN Stack

---

# ✨ Features

## 👤 Customer Features

- 🔐 Secure Registration & Login
- 🍪 JWT Authentication using httpOnly Cookies
- 🛍 Browse Products
- 🔍 Search Products
- 🗂 Category Filtering
- 📄 Pagination
- ⭐ Product Ratings
- 💬 Customer Reviews
- 🛒 Shopping Cart
- 💾 Persistent Cart (Redux + LocalStorage)
- 🚚 Shipping Address
- 💳 Multiple Payment Methods
- 💸 Razorpay Integration
- 💵 Cash on Delivery
- 📦 Order History
- 🚛 Order Tracking
- 👤 Update User Profile
- 📱 Fully Responsive UI

---

## 👨‍💼 Admin Features

- 📦 Product Management
- ➕ Add Products
- ✏ Edit Products
- ❌ Delete Products
- ☁ Upload Images via Cloudinary
- 👥 User Management
- 🚫 Delete Users
- 📦 Order Management
- ✅ Mark Orders as Delivered

---

# ⚡ Engineering Highlights

- 🔒 JWT Authentication
- 🍪 Secure httpOnly Cookies
- 🔐 bcrypt Password Hashing
- 📦 Redux Toolkit
- ⚡ RESTful APIs
- ☁ Cloudinary Uploads
- 💳 Razorpay Payment Gateway
- 🔑 HMAC SHA256 Payment Verification
- 🚀 Production Deployment Ready
- 🧹 Centralized Error Handling

---

# 🧰 Tech Stack

| Layer | Technology |
|--------|------------|
| Frontend | React 18 |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Routing | React Router v6 |
| State Management | Redux Toolkit |
| HTTP Client | Axios |
| Notifications | React Toastify |
| Backend | Node.js |
| Framework | Express.js |
| Database | MongoDB |
| ODM | Mongoose |
| Authentication | JWT |
| Password Security | bcryptjs |
| Image Upload | Multer |
| Media Storage | Cloudinary |
| Payments | Razorpay |
| Deployment | Render / Railway / Vercel |

---

# 📁 Project Structure

```text
shopverse/
│
├── server/
│   ├── config/
│   │     ├── db.js
│   │     └── cloudinary.js
│   │
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── data/
│   ├── seeder.js
│   └── server.js
│
├── client/
│   └── src/
│       ├── api/
│       ├── components/
│       ├── features/
│       ├── pages/
│       └── store/
│
└── package.json
```

---

# 🚀 Getting Started

## 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/ShopVerse.git

cd ShopVerse
```

---

## 2️⃣ Install Dependencies

```bash
npm run install-all
```

---

## 3️⃣ Configure Environment Variables

Create

```bash
server/.env
```

Example

```env
MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_super_secret_key

RAZORPAY_KEY_ID=rzp_test_xxxxxxxxx

RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxx

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=xxxxxxxxxxxx

CLOUDINARY_API_SECRET=xxxxxxxxxxxx

CLIENT_URL=http://localhost:5173
```

---

## 4️⃣ Seed Database

```bash
npm run seed
```

Creates:

- 👨‍💼 Admin Account
- 👤 Demo User
- 🛍 Sample Products

---

## 5️⃣ Start Development Server

```bash
npm run dev
```

Backend

```
http://localhost:5000
```

Frontend

```
http://localhost:5173
```

---

# 🔑 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| 👨‍💼 Admin | admin@shopverse.com | ****** |
| 👤 Saksham | Sakshamjha3027@gmai.com | ***** |

---

# 🛒 Shopping Workflow

```text
User Login
      │
      ▼
Browse Products
      │
      ▼
View Product Details
      │
      ▼
Add to Cart
      │
      ▼
Shipping Address
      │
      ▼
Choose Payment Method
      │
      ▼
Review Order
      │
      ▼
Razorpay / COD
      │
      ▼
Payment Verification
      │
      ▼
Order Created
      │
      ▼
Order History
```

---

# 📡 REST API Overview

## Authentication

```
POST   /api/auth/register

POST   /api/auth/login

POST   /api/auth/logout

GET    /api/auth/profile

PUT    /api/auth/profile
```

---

## Products

```
GET    /api/products

GET    /api/products/:id

GET    /api/products/top

POST   /api/products

PUT    /api/products/:id

DELETE /api/products/:id

POST   /api/products/:id/reviews
```

---

## Orders

```
POST   /api/orders

GET    /api/orders/mine

GET    /api/orders

GET    /api/orders/:id

PUT    /api/orders/:id/deliver
```

---

## Payments

```
POST /api/payments/razorpay/order

POST /api/payments/razorpay/verify
```

---

## Upload

```
POST /api/upload
```

---

# ☁ Deployment

## Render

Build Command

```bash
npm run install-all && npm run build
```

Start Command

```bash
npm start
```

Environment Variables

```env
NODE_ENV=production

CLIENT_URL=https://your-app.onrender.com
```

---

## Railway

```bash
npm start
```

---

## Vercel + Render

Frontend → Vercel

Backend → Render

Database → MongoDB Atlas

Media → Cloudinary

Payments → Razorpay

---

# 🔒 Security Features

✅ JWT Authentication

✅ Secure httpOnly Cookies

✅ bcrypt Password Hashing

✅ Protected Routes

✅ Admin Authorization

✅ HMAC SHA256 Payment Verification

✅ Centralized Error Handling

✅ Environment Variables

---

# 📸 Screenshots

```
📷 Add Screenshots Here

🏠 Home Page

🛍 Product Page

🛒 Cart

💳 Checkout

👤 User Profile

📦 Orders

👨‍💼 Admin Dashboard

📊 Analytics
```

---

# 🌟 Future Enhancements

- ❤️ Wishlist
- 📦 Inventory Management
- 📧 Email Notifications
- 🔔 Push Notifications
- 🎟 Coupon System
- 💬 Live Chat
- 🌙 Dark Mode
- 🌍 Multi-language Support
- 📊 Sales Analytics
- 📱 Progressive Web App

---

# 🤝 Contributing

Contributions are always welcome!

```bash
Fork Repository

Create Branch

Commit Changes

Push Changes

Open Pull Request
```

---

# 📄 License

Licensed under the **MIT License**.

Feel free to use this project for learning, portfolio projects, or as the foundation of your own online store.

---

# 👨‍💻 Developer

# **Saksham Jha**

### Full Stack Developer | MERN Stack Developer | Python Developer | Computer Science Student

### 🌐 Connect with Me

<p>

<a href="https://github.com/yourusername">
<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github">
</a>

<a href="https://linkedin.com/in/yourprofile">
<img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin">
</a>

<a href="mailto:your@email.com">
<img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail">
</a>

<a href="https://portfolio-link.com">
<img src="https://img.shields.io/badge/Portfolio-000000?style=for-the-badge&logo=firefox">
</a>

</p>

---

<div align="center">

# ⭐ Star this repository if you found it useful!

Made with ❤️ by **Saksham Jha**

**Happy Coding 🚀**

</div>
