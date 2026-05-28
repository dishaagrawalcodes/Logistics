import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { LogOut, User, Package, History } from "lucide-react";

// Component Imports
import Profile from "../components/Profile";
import Services from "../components/Services";
import Sidebar from "../components/Sidebar"; 
import UserRequests from "../components/UserRequests";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [services, setServices] = useState([]);
  const [bookingId, setBookingId] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    pincode: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
  if (!token) {
  window.location.href = `${import.meta.env.VITE_MAIN_APP_URL}/membership`;
  return;
}


  fetchProfile();
  fetchServices();
  

}, [token, navigate]);


  const fetchProfile = async () => {
    try {
      const { data } = await API.get("/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(data);
    } catch (err) {
      toast.error("Failed to load profile");
    }
  };

  const fetchServices = async () => {
    try {
      const { data } = await API.get("/services", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServices(data);
    } catch (err) {
      toast.error("Failed to load services");
    }
  };

  

  const updateProfile = async () => {
    const pincodeRegex = /^[1-9][0-9]{5}$/;
    const addressTrimmed = profile.address.trim();
    if (!addressTrimmed || addressTrimmed.length < 5) {
      toast.error("Address too short");
      return;
    }
    if (!pincodeRegex.test(profile.pincode)) {
      toast.error("Invalid 6-digit pincode");
      return;
    }

    try {
      setProfileLoading(true);
      await API.put(
        "/user/update",
        { address: addressTrimmed, pincode: profile.pincode },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast.success("Profile Updated Successfully");
    } catch (err) {
      toast.error("Update Failed");
    } finally {
      setProfileLoading(false);
    }
  };

  const handleBook = async (service) => {
  if (bookingId) return; // 🚀 Prevent double click immediately

  if (!profile.pincode || !profile.address) {
    toast.error("Please complete your profile first");
    return;
  }

  try {
    setBookingId(service._id); // lock this service button

    if (!service.type) {
      toast.error("Service type missing in database");
      return;
    }

    if (service.type === "transportation") {
      await API.post(
        "/transport-requests/request",
        {
          pickupAddress: profile.address,
          deliveryAddress: profile.address,
          pincode: profile.pincode,
          service: service.name,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    }

    if (service.type === "home") {
      await API.post(
        "/requests/request",
        {
          pin: profile.pincode,
          service: service.name,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    }

    toast.success("Request Sent Successfully 🚀");

  } catch (err) {
    toast.error(err.response?.data?.message || "Booking Failed");
  } finally {
    setBookingId(null); // unlock button
  }
};




 const handleLogout = () => {
  localStorage.removeItem("token");

  window.open(
    `${import.meta.env.VITE_MAIN_APP_URL}/membership?view=login`,
    "_blank"
  );
};




  const MobileNavItem = ({ active, onClick, icon: Icon, label }) => (
    <button
      onClick={onClick}
      className={`flex flex-col items-center text-xs font-medium transition-colors ${
        active ? "text-blue-600" : "text-gray-400"
      }`}
    >
      <Icon size={22} />
      <span className="mt-1">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col md:flex-row">
      <Toaster position="top-center" />

      {/* DESKTOP SIDEBAR - Now correctly imported as a component */}
      <Sidebar 
  activeTab={activeTab} 
  setActiveTab={setActiveTab} 
  handleLogout={() => setShowLogoutModal(true)} 
/>


      {/* MOBILE HEADER */}
      <div className="md:hidden bg-white border-b border-gray-100 p-4 sticky top-0 z-50 flex justify-between items-center">
        <span className="font-bold text-xl text-gray-800">Dashboard</span>
        <button
          onClick={() => setShowLogoutModal(true)}
          className="flex items-center gap-2 text-red-500 font-medium"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-4 md:p-10 max-w-7xl mx-auto w-full mb-20 md:mb-0">
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            Welcome back, {profile.name.split(" ")[0] || "User"}!
          </h1>
          <p className="text-gray-500 text-sm">
            Manage your account and services.
          </p>
        </header>

        <AnimatePresence mode="wait">
  {activeTab === "profile" && (
    <Profile
      profile={profile}
      setProfile={setProfile}
      onUpdate={updateProfile}
      loading={profileLoading}
    />
  )}

  {activeTab === "services" && (
    <Services
  services={services}
  onBook={handleBook}
  bookingId={bookingId}
/>

  )}

  {activeTab === "history" && (
    <UserRequests />
  )}
</AnimatePresence>

      </main>
{showLogoutModal && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl shadow-2xl p-6 w-[90%] max-w-md text-center">
      
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        Confirm Logout
      </h2>

      <p className="text-gray-600 mb-6">
        Are you sure you want to logout?
      </p>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => setShowLogoutModal(false)}
          className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
        >
          Cancel
        </button>

        <button
          onClick={handleLogout}
          className="px-5 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
        >
          Yes, Logout
        </button>
      </div>

    </div>
  </div>
)}

      {/* MOBILE NAVIGATION BAR */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around p-3 z-50 shadow-lg">
        <MobileNavItem active={activeTab === "profile"} onClick={() => setActiveTab("profile")} icon={User} label="Profile" />
        <MobileNavItem active={activeTab === "services"} onClick={() => setActiveTab("services")} icon={Package} label="Services" />
        <MobileNavItem active={activeTab === "history"} onClick={() => setActiveTab("history")} icon={History} label="Bookings" />
      </nav>
    </div>
  );
};

export default Dashboard;