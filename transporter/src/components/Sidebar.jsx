import { Home, User,Bell } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const menuItems = [
  { id: 1, label: "Dashboard", icon: Home, path: "/dashboard" },
  { id: 2, label: "Profile", icon: User, path: "/profile" },
  { id: 3, label: "Request", icon: Bell, path: "/request" },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 
      bg-gradient-to-b from-slate-900 to-slate-800 text-white 
      shadow-2xl flex-col">

        <div className="p-6 text-xl font-bold tracking-wide border-b border-slate-700">
          Transporter  Panel
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl 
                transition-all duration-300 group
                ${
                  isActive
                    ? "bg-emerald-500 text-white shadow-lg"
                    : "hover:bg-slate-700 text-slate-300"
                }`}
              >
                <item.icon
                  size={20}
                  className="group-hover:scale-110 transition"
                />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 text-xs text-slate-400 border-t border-slate-700">
          © 2026 Transporter Portal
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 
      bg-white/90 backdrop-blur-lg shadow-2xl border-t z-50">

        <div className="flex justify-around items-center">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center py-3 w-full transition 
                ${
                  isActive
                    ? "text-emerald-600"
                    : "text-gray-500 hover:text-emerald-500"
                }`}
              >
                <item.icon size={22} />
                <span className="text-xs mt-1">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
