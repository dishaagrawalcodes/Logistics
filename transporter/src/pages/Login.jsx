import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import toast, { Toaster } from "react-hot-toast";
import { Loader2 } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    loginId: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.loginId.trim()) {
      toast.error("Login ID is required");
      return false;
    }
    if (!form.password.trim()) {
      toast.error("Password is required");
      return false;
    }
   
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);
      toast.loading("Authenticating...", { id: "login" });

      const res = await API.post("/transport/login", form);
      console.log(res.data);
      
      
      
      
     localStorage.setItem(
  "transporterInfo",
  JSON.stringify(res.data.data.transport)
);

      localStorage.setItem("transportToken", res.data.data.token);
      

      toast.success("Login successful 🚀", { id: "login" });

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Login failed ❌",
        { id: "login" }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
          * {
            font-family: 'Poppins', sans-serif;
          }
        `}
      </style>

      <section className="relative min-h-screen flex flex-col md:flex-row items-center justify-center px-6 py-20 overflow-hidden bg-black">

        {/* Premium Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#08142B] via-[#0D2249] to-[#133A7C]"></div>

        {/* Glow Effects */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl"></div>

        {/* LEFT SIDE */}
        <div className="relative z-10 text-white max-w-xl text-center md:text-left mb-12 md:mb-0">

          <div className="inline-flex items-center px-4 py-2 rounded-full border border-white/20 bg-white/5 text-sm mb-6">
            🚚 Trusted by 5k+ Transport Partners
          </div>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
            Secure Transport Partner Login
          </h1>

          <p className="text-white/60 mt-6 max-w-md">
            Access your dashboard, manage shipments, update vehicle
            details and stay connected seamlessly.
          </p>

        </div>

        {/* RIGHT SIDE FORM */}
        <div className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">

          <h2 className="text-2xl font-semibold text-white mb-6 text-center">
            Welcome Back 👋
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Login ID */}
            <div>
              <label className="block text-white/80 text-sm mb-2">
                Login ID
              </label>
              <input
                type="text"
                name="loginId"
                value={form.loginId}
                onChange={handleChange}
                placeholder="Enter your mobile"
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-white/80 text-sm mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all duration-300 ${
                loading
                  ? "bg-blue-800 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105 hover:shadow-lg"
              } text-white`}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5" />
                  Processing...
                </>
              ) : (
                "Login"
              )}
            </button>

          </form>

        </div>
      </section>
    </>
  );
};

export default Login;
