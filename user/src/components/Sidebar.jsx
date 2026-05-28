import React from "react";
import { LayoutDashboard, User, Package, History, LogOut } from "lucide-react";

const SidebarItem = ({ id, label, icon: Icon, activeTab, setActiveTab }) => (
  <button
    onClick={() => setActiveTab(id)}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
      activeTab === id
        ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
        : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
    }`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </button>
);

const Sidebar = ({ activeTab, setActiveTab, handleLogout }) => {
  return (
    <aside className="hidden md:flex w-64 bg-white border-r border-gray-100 flex-col p-6 h-screen sticky top-0">
      <div className="flex items-center gap-2 mb-10 px-2">
        <div className="bg-blue-600 p-2 rounded-lg text-white">
          <LayoutDashboard size={24} />
        </div>
        <span className="text-xl font-bold text-gray-800 tracking-tight"></span>
      </div>

      <nav className="flex flex-col gap-2 flex-grow">
        <SidebarItem 
          id="profile" 
          label="My Profile" 
          icon={User} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />
        <SidebarItem 
          id="services" 
          label="Services" 
          icon={Package} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />
        <SidebarItem 
  id="history"   // ✅ FIXED
  label="My Requests" 
  icon={History} 
  activeTab={activeTab} 
  setActiveTab={setActiveTab} 
/>


      </nav>

      <button
        onClick={handleLogout}
        className="mt-auto flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
      >
        <LogOut size={20} />
        <span className="font-medium">Sign Out</span>
      </button>
    </aside>
  );
};

export default Sidebar;