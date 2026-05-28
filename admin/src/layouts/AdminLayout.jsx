import { Outlet, useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  LayoutDashboard,
  LogOut,
  X,
  CalendarDays,
  MapPinned,
  MapPin,
  Truck,
  User,
  Bell,
  Package
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const AdminLayout = () => {
  const menuItems = [
  { title: "Overview", icon: <LayoutDashboard size={22} />, path: "/dashboard" },
  { title: "Branch", icon: <MapPinned size={22} />, path: "/branch" },
  { title: "Pincode", icon: <MapPin size={22} />, path: "/pincode" },
  { title: "Shipment", icon: <Truck size={22} />, path: "/shipment" },
  { title: "Staff", icon: <ShieldCheck size={22} />, path: "/drivers" },
  { title: "Providers", icon: <User size={22} />, path: "/providers" },
  { title: "Events", icon: <CalendarDays size={22} />, path: "/events" },
  {title: "Services", icon: <Bell size={22} />, path: "/admin/services"},
{title: "Transport", icon: <Package size={22} />, path: "/transport"}
];

  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* ===== MOBILE TOP BAR ===== */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b px-4 py-3 flex items-center justify-between z-40">
        {/* Left Logo */}
        <div className="flex items-center gap-2 text-indigo-600 font-bold">
          <ShieldCheck />
          AdminPro
        </div>

        {/* Right Logout */}
        <button
          onClick={() => setShowLogout(true)}
          className="flex items-center gap-1 text-rose-500 font-medium"
        >
          <LogOut size={25} />
          <span className="text-m">Logout</span>
        </button>
      </div>

      {/* ===== PAGE CONTENT ===== */}
      <div className="pt-14 pb-20 lg:pt-0 lg:pb-0">
        <Outlet />
      </div>

      {/* ===== GLOBAL MOBILE BOTTOM NAV ===== */}
<div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-40">
  <div className="flex gap-6 px-4 py-3 overflow-x-auto scrollbar-hide">
    {menuItems.map((item) => (
      <button
        key={item.path}
        onClick={() => navigate(item.path)}
        className="flex flex-col items-center min-w-[64px] text-slate-600"
      >
        {item.icon}
        <span className="text-xs mt-1 whitespace-nowrap">
          {item.title}
        </span>
      </button>
    ))}
  </div>
</div>


      {/* ===== LOGOUT MODAL ===== */}
      <AnimatePresence>
        {showLogout && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center"
            >
              <div className="bg-white rounded-2xl p-6 w-[90%] max-w-sm">
                <div className="flex justify-between mb-3">
                  <h3 className="font-bold text-lg">Confirm Logout</h3>
                  <button onClick={() => setShowLogout(false)}>
                    <X />
                  </button>
                </div>

                <p className="text-slate-500 mb-6">
                  Are you sure you want to logout?
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowLogout(false)}
                    className="flex-1 border rounded-lg py-2"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={logout}
                    className="flex-1 bg-rose-500 text-white rounded-lg py-2"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminLayout;
