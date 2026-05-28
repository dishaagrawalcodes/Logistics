import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  MapPinned,
  MapPin,
  LogOut,
  ChevronRight,
  ShieldCheck,
  X,
  Truck,
  User,
  
  CalendarDays,
  Bell,
  Package,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogout, setShowLogout] = useState(false);
  

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const menuItems = [
    { title: "Overview", icon: LayoutDashboard, path: "/dashboard" },
    { title: "Branch", icon: MapPinned, path: "/branch" },
    { title: "Pincode", icon: MapPin, path: "/pincode" },
    { title: "Shipment", icon: Truck, path: "/shipment" },
    { title: "Staff", icon: ShieldCheck, path: "/drivers" },
    { title: "Providers", icon: User, path: "/providers" },
    { title: "Events", icon: CalendarDays, path: "/events" },
    {title: "Services", icon: Bell, path: "/admin/services"},
    {title: "Transport", icon: Package, path: "/transport"}
  ];

  return (
    <div className="flex min-h-screen bg-[#F1F5F9] text-slate-900 font-sans">
      
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="hidden lg:flex w-72 bg-white border-r border-slate-200 flex-col sticky top-0 h-screen">
        <div className="p-8 flex items-center gap-3">
          <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <ShieldCheck size={24} />
          </div>
          <span className="font-bold text-xl tracking-tight">Admin<span className="text-indigo-600">Pro</span></span>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group ${
                location.pathname === item.path 
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-100" 
                : "text-slate-500 hover:bg-slate-50 hover:text-indigo-600"
              }`}
            >
              <item.icon size={20} className={location.pathname === item.path ? "text-white" : "group-hover:scale-110 transition-transform"} />
              <span className="font-semibold">{item.title}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-100">
          <button
            onClick={() => setShowLogout(true)}
            className="w-full flex items-center gap-3 px-4 py-3 text-rose-500 hover:bg-rose-50 rounded-xl font-bold transition-colors"
          >
            <LogOut size={20} />
            Log Out
          </button>
        </div>
      </aside>

      {/* ================= MAIN CONTENT AREA ================= */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        
        <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto pb-24 lg:pb-12">
          <div className="max-w-7xl mx-auto">
            <header className="mb-8">
                <motion.h1 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-2xl md:text-4xl font-black tracking-tight text-slate-900"
                >
                  Control Center
                </motion.h1>
                <p className="text-slate-500 mt-1">Real-time logistics and system management</p>
            </header>

            {/* QUICK STATS / CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-8">
              {menuItems.slice(1).map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => navigate(item.path)}
                  className="group relative bg-white p-6 rounded-[2rem] border border-transparent hover:border-indigo-100 cursor-pointer shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-8">
                    <div className="bg-slate-50 group-hover:bg-indigo-600 p-4 rounded-2xl text-slate-600 group-hover:text-white transition-colors duration-300">
                      <item.icon size={28} />
                    </div>
                    <div className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all">
                        <ChevronRight size={24} />
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-indigo-600 transition-colors">
                        {item.title}
                    </h2>
                    <p className="text-slate-500 text-sm leading-relaxed">
                        Configure and monitor system {item.title.toLowerCase()} settings.
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* ================= MOBILE BOTTOM NAV ================= */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-slate-200 px-6 py-3 flex justify-between items-center z-40">
        {menuItems.slice(0, 4).map((item) => (
            <button 
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center gap-1 ${location.pathname === item.path ? 'text-indigo-600' : 'text-slate-400'}`}
            >
                <item.icon size={20} />
                <span className="text-[10px] font-bold uppercase tracking-wider">{item.title}</span>
            </button>
        ))}
        <button onClick={() => setShowLogout(true)} className="flex flex-col items-center gap-1 text-rose-400">
            <LogOut size={20} />
            <span className="text-[10px] font-bold uppercase tracking-wider">Exit</span>
        </button>
      </div>

      {/* ================= LOGOUT MODAL ================= */}
      <AnimatePresence>
        {showLogout && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLogout(false)}
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white rounded-[2.5rem] p-8 w-full max-w-sm shadow-2xl"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="h-12 w-12 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center">
                    <LogOut size={24} />
                </div>
                <button 
                    onClick={() => setShowLogout(false)}
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <h3 className="font-black text-2xl text-slate-900 mb-2">Sign Out?</h3>
              <p className="text-slate-500 mb-8 leading-relaxed">
                You'll need to enter your credentials again to access the dashboard.
              </p>

              <div className="flex flex-col gap-3">
                <button
                  onClick={logout}
                  className="w-full bg-slate-900 text-white rounded-2xl py-4 font-bold hover:bg-indigo-600 transition-colors shadow-lg shadow-slate-200"
                >
                  Yes, Log Me Out
                </button>
                <button
                  onClick={() => setShowLogout(false)}
                  className="w-full text-slate-500 py-4 font-bold hover:text-slate-800 transition-colors"
                >
                  Stay Logged In
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;