import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import AdminRoute from "./components/AdminRoute.jsx";

import HomePage from "./pages/HomePage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ShippingPage from "./pages/ShippingPage.jsx";
import PaymentMethodPage from "./pages/PaymentMethodPage.jsx";
import PlaceOrderPage from "./pages/PlaceOrderPage.jsx";
import OrderPage from "./pages/OrderPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import ProductListPage from "./pages/admin/ProductListPage.jsx";
import ProductEditPage from "./pages/admin/ProductEditPage.jsx";
import OrderListPage from "./pages/admin/OrderListPage.jsx";
import UserListPage from "./pages/admin/UserListPage.jsx";

const NotFound = () => (
  <div className="max-w-3xl mx-auto px-4 py-24 text-center">
    <h1 className="text-4xl font-bold mb-2">404</h1>
    <p className="text-gray-500">Page not found.</p>
  </div>
);

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search/:keyword" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="" element={<PrivateRoute />}>
            <Route path="/shipping" element={<ShippingPage />} />
            <Route path="/payment" element={<PaymentMethodPage />} />
            <Route path="/placeorder" element={<PlaceOrderPage />} />
            <Route path="/order/:id" element={<OrderPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          <Route path="" element={<AdminRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<ProductListPage />} />
            <Route path="/admin/product/:id/edit" element={<ProductEditPage />} />
            <Route path="/admin/orders" element={<OrderListPage />} />
            <Route path="/admin/users" element={<UserListPage />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
