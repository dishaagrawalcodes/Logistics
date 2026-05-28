import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [dateTime, setDateTime] = useState(new Date());
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  // Live clock
  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("memberToken");
    setShowLogoutModal(false);
    console.log("logout trigger");
    
    navigate("/");
  };

  return (
    <>
      <header className="sticky top-0 z-40 sm:mt-4  bg-white   text-black border-b  border-gray-700">
        <div className="flex items-center justify-between px-4 py-3 md:px-6">
          {/* Date & Time */}
          <div>
            <p className="text-sm font-medium">
              {dateTime.toLocaleDateString("en-IN", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            <p className="text-xs text-gray-400">
              {dateTime.toLocaleTimeString("en-IN")}
            </p>
          </div>

          {/* Logout Button */}
          <button
            onClick={() => setShowLogoutModal(true)}
            className="px-4 py-2 text-sm font-medium bg-red-600 rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800">
              Confirm Logout
            </h2>

            <p className="text-sm text-gray-600 mt-2">
              Are you sure you want to logout?
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm rounded bg-red-600 text-white hover:bg-red-700"
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
