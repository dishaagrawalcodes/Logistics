import { useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
 
const UserQuickAuth = () => {
  const [mode, setMode] = useState("register");
  const [loading, setLoading] = useState(false);
 
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: ""
  });
 
  const [errors, setErrors] = useState({});
 
  /* ================= HANDLE CHANGE ================= */
 
  const onChange = (e) => {
    const { name, value } = e.target;
 
    if (name === "mobile") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    }
 
    if (name === "name") {
      if (!/^[A-Za-z ]*$/.test(value)) return;
    }
 
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };
 
  /* ================= VALIDATION ================= */
 
  const validate = () => {
    let newErrors = {};
 
    if (mode === "register") {
      if (!form.name.trim() || form.name.trim().length < 3) {
        newErrors.name = "Name must be at least 3 characters";
      }
      if (!form.email) {
        newErrors.email = "Email is required";
      }
    }
 
    if (!/^\d{10}$/.test(form.mobile)) {
      newErrors.mobile = "Mobile number must be exactly 10 digits";
    }
 
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
 
  /* ================= REGISTER ================= */
 
  const register = async (e) => {
    e.preventDefault();
 
    if (!validate()) return;
 
    try {
      setLoading(true);
 
      await api.post("/user/register", form);
 
      toast.success("Registered successfully — now login");
      setMode("login");
 
    } catch (err) {
      toast.error(err.response?.data?.message || "Register failed");
    } finally {
      setLoading(false);
    }
  };
 
  /* ================= LOGIN ================= */
 
  const login = async (e) => {
    e.preventDefault();
 
    if (!validate()) return;
 
    try {
      setLoading(true);
 
      const res = await api.post("/user/login", {
        mobile: form.mobile
      });
 
      const token = res.data.token;
 
      toast.success("Login success ✅");
 
      window.open(
        `${import.meta.env.VITE_USER_APP_URL}/auth?token=${token}`,
        "_blank"
      );
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };
 
  /* ================= UI ================= */
 
  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-2xl font-bold text-center mb-6">
        {mode === "register" ? "Quick Registration" : "Login"}
      </h2>
 
      <form
        onSubmit={mode === "register" ? register : login}
        className="space-y-4"
      >
        {/* NAME */}
        {mode === "register" && (
          <>
            <div>
              <input
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={onChange}
                className={`w-full p-3 rounded-xl border outline-none transition
                ${
                  errors.name
                    ? "border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            {/* EMAIL */}
            <div>
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={onChange}
                className={`w-full p-3 rounded-xl border outline-none transition
                ${
                  errors.email
                    ? "border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
          </>
        )}
        {/* MOBILE */}
        <div>
          <input
            name="mobile"
            placeholder="Mobile Number"
            value={form.mobile}
            onChange={onChange}
            className={`w-full p-3 rounded-xl border outline-none transition
            ${
              errors.mobile
                ? "border-red-500 focus:ring-2 focus:ring-red-200"
                : "border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            }`}
          />
          {errors.mobile && (
            <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
          )}
        </div>
        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {loading
            ? "Please wait..."
            : mode === "register"
            ? "Register"
            : "Login"}
        </button>
      </form>
      {/* TOGGLE */}
      <p className="text-center text-sm mt-5">
        {mode === "register" ? "Already registered?" : "New user?"}
        <button
          type="button"
          onClick={() =>
            setMode(mode === "register" ? "login" : "register")
          }
          className="ml-2 text-indigo-600 font-semibold hover:underline"
        >
          {mode === "register" ? "Login" : "Register"}
        </button>
      </p>
    </div>
  );
};
 
export default UserQuickAuth;