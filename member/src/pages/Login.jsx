import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaLock,
  FaUser,
  FaSpinner,
  FaExclamationCircle,
  FaArrowRight,
} from "react-icons/fa";
import { Eye, EyeOff, Lock } from "lucide-react";

import API from "../api/axios";

const Login = () => {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!loginId || !password) {
      setError("Please enter both Login ID and password.");
      return;
    }

    setLoading(true);

    try {
      const { data } = await API.post("/provider/login", {
        loginId,
        password,
      });

      localStorage.setItem("memberToken", data.data.token);
      localStorage.setItem(
        "providerInfo",
        JSON.stringify(data.data.provider)
      );

      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      {/* Background animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Card */}
      <div className="relative bg-white/95 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <FaLock className="text-4xl text-white" />
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Member Login
          </h2>
          <p className="text-gray-600 text-sm">
            Login to manage your services
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
            <FaExclamationCircle className="text-red-500 mt-1" />
            <p className="text-sm font-medium text-red-700">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Login ID */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Login ID
            </label>
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Enter your login ID"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                disabled={loading}
                className="w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Password
            </label>
            <div className="relative group">
              <Lock
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2 transition-all
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 active:scale-95"
              }`}
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin" />
                Logging in...
              </>
            ) : (
              <>
                Login
                <FaArrowRight />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 text-white/80 text-sm">
        © 2026 Provider Portal
      </div>
    </div>
  );
};

export default Login;
