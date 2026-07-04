import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaShoppingCart, FaUser, FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../api/axios.js";
import { logout } from "../features/auth/authSlice.js";
import ThemeToggle from "./ThemeToggle.jsx";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      // ignore
    }
    dispatch(logout());
    navigate("/login");
  };

  const submitSearch = (e) => {
    e.preventDefault();
    const trimmed = keyword.trim();
    navigate(trimmed ? `/search/${encodeURIComponent(trimmed)}` : "/");
  };

  return (
    <header className="sticky top-0 z-40 transition-colors duration-200 bg-white shadow-sm dark:bg-gray-900">
      <nav className="flex items-center justify-between gap-4 px-4 py-3 mx-auto max-w-7xl">
        <Link to="/" className="text-2xl font-bold text-brand-600 shrink-0">
          Shop<span className="text-gray-800 dark:text-gray-100">Verse</span>
        </Link>

        <form onSubmit={submitSearch} className="flex-1 hidden max-w-md md:flex">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search products..."
            className="w-full px-3 py-2 text-sm text-gray-800 placeholder-gray-400 bg-white border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 rounded-l-md focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
          <button className="px-4 text-white bg-brand-600 rounded-r-md hover:bg-brand-700">
            <FaSearch />
          </button>
        </form>

        <div className="items-center hidden gap-6 md:flex">
          <ThemeToggle />

          <Link to="/cart" className="relative flex items-center gap-1 text-gray-700 dark:text-gray-200 hover:text-brand-600 dark:hover:text-brand-500">
            <FaShoppingCart size={18} />
            <span>Cart</span>
            {cartItems.length > 0 && (
              <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white rounded-full -top-2 -right-3 bg-brand-600">
                {cartItems.reduce((a, c) => a + c.qty, 0)}
              </span>
            )}
          </Link>

          {userInfo ? (
            <div className="relative group">
              <button className="flex items-center gap-1 text-gray-700 dark:text-gray-200 hover:text-brand-600 dark:hover:text-brand-500">
                <FaUser size={16} /> {userInfo.name.split(" ")[0]}
              </button>
              <div className="absolute right-0 hidden py-2 bg-white border border-transparent rounded-md shadow-lg group-hover:block dark:bg-gray-800 w-44 dark:border-gray-700">
                <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Profile</Link>
                {userInfo.isAdmin && (
                  <>
                    <Link to="/admin/products" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Products</Link>
                    <Link to="/admin/orders" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Orders</Link>
                    <Link to="/admin/users" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Users</Link>
                  </>
                )}
                <button onClick={logoutHandler} className="block w-full px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="flex items-center gap-1 text-gray-700 dark:text-gray-200 hover:text-brand-600 dark:hover:text-brand-500">
              <FaUser size={16} /> Sign In
            </Link>
          )}
        </div>

        <button className="text-gray-700 md:hidden dark:text-gray-200" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </nav>

      {menuOpen && (
        <div className="flex flex-col gap-3 px-4 pb-4 text-gray-700 md:hidden dark:text-gray-200">
          <ThemeToggle />
          <form onSubmit={submitSearch} className="flex">
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search products..."
              className="w-full px-3 py-2 text-sm text-gray-800 bg-white border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-l-md"
            />
            <button className="px-4 text-white bg-brand-600 rounded-r-md"><FaSearch /></button>
          </form>
          <Link to="/cart" onClick={() => setMenuOpen(false)}>Cart ({cartItems.length})</Link>
          {userInfo ? (
            <>
              <Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link>
              {userInfo.isAdmin && (
                <>
                  <Link to="/admin/products" onClick={() => setMenuOpen(false)}>Admin Products</Link>
                  <Link to="/admin/orders" onClick={() => setMenuOpen(false)}>Admin Orders</Link>
                </>
              )}
              <button onClick={logoutHandler} className="text-left">Logout</button>
            </>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)}>Sign In</Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;