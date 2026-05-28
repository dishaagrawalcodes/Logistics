import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const Header = () => {
  const [dateTime, setDateTime] = useState(new Date());
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("transportToken");
    navigate("/");
  };

  return (
    <>
      {/* Dark Gradient Header */}
      <header className="sticky top-0 z-40 
      bg-gradient-to-r from-slate-900 to-slate-800 py-1
      text-white border-b border-slate-700 shadow-md">

        <div className="flex items-center justify-between px-6 py-4">

          {/* Date & Time */}
          <div>
            <p className="text-sm font-semibold tracking-wide">
              {dateTime.toLocaleDateString("en-IN", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            <p className="text-xs text-slate-400">
              {dateTime.toLocaleTimeString("en-IN")}
            </p>
          </div>

          {/* Logout Button */}
          <button
            onClick={() => setShowLogoutModal(true)}
            className="flex items-center gap-2 px-4 py-2 
            bg-slate-700 hover:bg-red-600 
            rounded-lg transition-all duration-300 
            shadow hover:shadow-lg"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </header>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center 
        bg-black/60 backdrop-blur-sm">

          <div className="bg-slate-900 text-white 
          rounded-2xl shadow-2xl w-[90%] max-w-sm p-6 border border-slate-700">

            <h2 className="text-lg font-semibold">
              Confirm Logout
            </h2>

            <p className="text-sm text-slate-400 mt-2">
              Are you sure you want to logout?
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 text-sm rounded-lg 
                bg-slate-700 hover:bg-slate-600 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm rounded-lg 
                bg-red-600 hover:bg-red-700 
                transition shadow-lg"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
