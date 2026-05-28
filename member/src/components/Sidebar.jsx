import { Home, MessageCircle, User, Settings, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { id: 1, label: "Home", icon: Home, path: "/dashboard" },
  { id: 2, label: "Profile", icon: User, path: "/profile" },
  { id: 3, label: "Request", icon: Bell, path: "/request" },
];


export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 flex-col bg-white shadow-lg">
        <div className="p-6 text-xl font-semibold border-b">
          Member Panel
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className="flex items-center gap-3 w-full p-3 rounded-xl text-left hover:bg-gray-100 transition duration-150"
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white shadow-[0_-4px_15px_rgba(0,0,0,0.1)]">
        <div className="flex overflow-x-auto items-center justify-around no-scrollbar">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center justify-center min-w-[80px] py-3 text-sm hover:bg-gray-100 transition duration-150"
            >
              <item.icon size={22} />
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}



