import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import api from "../api/axios.js";
import { setCredentials } from "../features/auth/authSlice.js";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", { email, password });
      dispatch(setCredentials(data));
      navigate(redirect);
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold mb-6">Sign In</h1>
      <form onSubmit={submitHandler} className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <div>
          <label className="text-sm font-medium">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
            className="w-full border rounded px-3 py-2 mt-1" />
        </div>
        <div>
          <label className="text-sm font-medium">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
            className="w-full border rounded px-3 py-2 mt-1" />
        </div>
        <button disabled={loading} className="w-full bg-brand-600 hover:bg-brand-700 text-white py-2.5 rounded-md font-medium">
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
      <p className="mt-4 text-sm">
        New customer?{" "}
        <Link to={redirect ? `/register?redirect=${redirect}` : "/register"} className="text-brand-600 underline">
          Create an account
        </Link>
      </p>
      <p className="mt-2 text-xs text-gray-400">Demo admin: admin@shopverse.com / admin123</p>
    </div>
  );
};

export default LoginPage;
