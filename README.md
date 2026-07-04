# ShopVerse 🛍️

A production-ready full-stack **MERN** e-commerce application — built with MongoDB, Express, React (Vite), and Node.js. Features JWT authentication, Redux Toolkit state management, Razorpay payments, Cloudinary image hosting, a full admin panel, and a 1-click deployment setup.

> This is an original build inspired by the same feature set as tutorials like "ShopNest" — same stack, own codebase, own name.

---

## ✨ Features

**Customer-facing**
- Browse products with search, category filters, and pagination
- Product details with star ratings & customer reviews
- Cart with persistent state (localStorage + Redux)
- Multi-step checkout: Shipping → Payment Method → Review → Pay
- Razorpay checkout (Cards / UPI / Netbanking / Wallets) + Cash on Delivery
- Order history & order tracking
- JWT auth via secure httpOnly cookies, register/login/profile update

**Admin panel**
- Product CRUD with Cloudinary image upload
- Order management (view all orders, mark as delivered)
- User management (view/delete users)

**Engineering**
- JWT auth with httpOnly cookies (protected & admin-only routes)
- Redux Toolkit for cart & auth state, persisted to localStorage
- Razorpay order creation + HMAC SHA256 signature verification (server-side, secure)
- Cloudinary image uploads via Multer (memory storage → stream upload)
- RESTful API with centralized error handling
- Ready for single-service deployment (Express serves the React build)

---

## 🧱 Tech Stack

| Layer      | Tech |
|------------|------|
| Frontend   | React 18, Vite, React Router v6, Redux Toolkit, Tailwind CSS, Axios, React Toastify |
| Backend    | Node.js, Express, MongoDB + Mongoose, JWT, bcryptjs, Multer |
| Payments   | Razorpay |
| Media      | Cloudinary |
| Deployment | Render / Railway / Vercel-friendly (single Node service or split) |

---

## 📁 Project Structure

```
shopverse/
├── server/                 # Express API
│   ├── config/              # db.js, cloudinary.js
│   ├── controllers/         # auth, product, order, payment, upload
│   ├── middleware/           # authMiddleware, errorMiddleware, uploadMiddleware
│   ├── models/               # User, Product, Order
│   ├── routes/               # authRoutes, productRoutes, orderRoutes, paymentRoutes, uploadRoutes
│   ├── data/                 # seed data
│   ├── seeder.js             # DB seed script
│   └── server.js             # entry point
├── client/                 # React app (Vite)
│   └── src/
│       ├── api/axios.js
│       ├── store/            # Redux store
│       ├── features/         # auth & cart slices
│       ├── components/       # Navbar, Footer, ProductCard, route guards, etc.
│       └── pages/            # Home, Product, Cart, Checkout flow, Profile, Admin/*
└── package.json             # root scripts to run both concurrently
```

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18+
- A MongoDB database (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- A [Razorpay](https://razorpay.com) account (test mode keys are free)
- A [Cloudinary](https://cloudinary.com) account (free tier works)

### 2. Clone & Install
```bash
cd shopverse
npm run install-all
```

### 3. Configure environment variables
```bash
cp server/.env.example server/.env
```
Fill in `server/.env`:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=some_long_random_string
RAZORPAY_KEY_ID=rzp_test_xxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxx
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=xxxxxxxxxxxx
CLOUDINARY_API_SECRET=xxxxxxxxxxxx
CLIENT_URL=http://localhost:5173
```

### 4. Seed the database (optional but recommended)
```bash
npm run seed
```
This creates an admin account (`admin@shopverse.com` / `admin123`), a regular user, and 8 sample products.

### 5. Run in development
From the project root:
```bash
npm run dev
```
This starts the API on `http://localhost:5000` and the React app on `http://localhost:5173` (Vite proxies `/api` calls to the backend automatically).

---

## 🌐 Deployment (Render — single service)

1. Push this repo to GitHub.
2. On [Render](https://render.com), create a **Web Service** pointing at the repo.
3. **Build command:** `npm run install-all && npm run build`
4. **Start command:** `npm start`
5. Add all the environment variables from `.env` in Render's dashboard, plus:
   - `NODE_ENV=production`
   - `CLIENT_URL` → your Render URL (e.g. `https://shopverse.onrender.com`)
6. Render will build the React app into `client/dist`; `server.js` serves it automatically in production mode.

**Split deployment** (API on Render, frontend on Vercel/Netlify) works too — just set `CLIENT_URL` to your frontend's domain for CORS, and point the frontend's Axios `baseURL` at your API domain instead of the `/api` proxy.

---

## 🔑 Demo Credentials (after seeding)
| Role  | Email | Password |
|-------|-------|----------|
| Admin | admin@shopverse.com | admin123 |
| User  | jane@example.com | jane123 |

---

## 🧭 API Overview

| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| POST | `/api/auth/register` | Register | Public |
| POST | `/api/auth/login` | Login | Public |
| POST | `/api/auth/logout` | Logout | Public |
| GET/PUT | `/api/auth/profile` | Get/update profile | Private |
| GET | `/api/auth/users` | List users | Admin |
| DELETE | `/api/auth/users/:id` | Delete user | Admin |
| GET | `/api/products` | List products (search/category/page) | Public |
| GET | `/api/products/top` | Top rated products | Public |
| GET | `/api/products/:id` | Product detail | Public |
| POST | `/api/products` | Create product | Admin |
| PUT/DELETE | `/api/products/:id` | Update/delete product | Admin |
| POST | `/api/products/:id/reviews` | Add review | Private |
| POST | `/api/orders` | Create order | Private |
| GET | `/api/orders/mine` | My orders | Private |
| GET | `/api/orders` | All orders | Admin |
| GET | `/api/orders/:id` | Order detail | Private |
| PUT | `/api/orders/:id/deliver` | Mark delivered | Admin |
| POST | `/api/payments/razorpay/order` | Create Razorpay order | Private |
| POST | `/api/payments/razorpay/verify` | Verify payment signature | Private |
| POST | `/api/upload` | Upload image to Cloudinary | Admin |

---

## 🛡️ Security Notes
- Passwords hashed with bcrypt (10 salt rounds)
- JWT stored in httpOnly cookies (not accessible to client-side JS)
- Razorpay payments verified server-side via HMAC SHA256 signature check — never trust the client's "success" callback alone
- Admin-only and auth-only middleware guard sensitive routes

---

## 📄 License
MIT — free to use for learning or as a starting point for your own store.
