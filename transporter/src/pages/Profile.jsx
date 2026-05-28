import React, { useEffect, useState } from "react";
import API from "../api/axios";
import ProfileForm from "../components/ProfileForm";
import toast from "react-hot-toast";
import {
  User,
  Phone,
  Mail,
  Truck,
  Hash,
  CreditCard,
  FileText,
  MapPin,
  Calendar,
} from "lucide-react";

const Profile = () => {
  const [data, setData] = useState(null);

  const info = localStorage.getItem("transporterInfo");
  const parsedInfo = info ? JSON.parse(info) : null;
  const transportId = parsedInfo?._id;

  useEffect(() => {
    if (transportId) fetchProfile();
  }, [transportId]);

  const fetchProfile = async () => {
    try {
      const res = await API.get(`/transport/${transportId}`);
      setData(res.data);
    } catch (err) {
      toast.error("Failed to load profile");
    }
  };

  const handleUpdate = async (formData) => {
    try {
      const res = await API.put(`/transport/${transportId}`, formData);
      toast.success("Profile updated successfully");
      setData(res.data.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  if (!data)
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Loading profile...
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto space-y-10">

      {/* ================= PROFILE CARD ================= */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-8 py-8 text-white flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">
              {data.name}
            </h1>
            <p className="text-slate-300 text-sm">
              Transport Provider Profile
            </p>
          </div>

          <div className={`px-4 py-2 rounded-xl text-sm font-medium
            ${data.status === "approved"
              ? "bg-emerald-500"
              : "bg-yellow-500"}`}
          >
            {data.status?.toUpperCase()}
          </div>
        </div>

        {/* DETAILS */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">

          <ProfileItem icon={<User size={18} />} label="Full Name" value={data.name} />
          <ProfileItem icon={<Phone size={18} />} label="Mobile" value={data.mobile} />
          <ProfileItem icon={<Mail size={18} />} label="Email" value={data.email} />
          <ProfileItem icon={<Truck size={18} />} label="Vehicle Name" value={data.vehicleName} />
          <ProfileItem icon={<Hash size={18} />} label="Vehicle Number" value={data.vehicleNumber} />
          <ProfileItem icon={<CreditCard size={18} />} label="DL Number" value={data.dlNumber} />
          <ProfileItem icon={<FileText size={18} />} label="RC Number" value={data.rcNumber} />
          <ProfileItem
            icon={<MapPin size={18} />}
            label="Service Areas"
            value={data.pincodes?.join(", ") || "Not added"}
          />
          <ProfileItem
            icon={<Calendar size={18} />}
            label="Member Since"
            value={new Date(data.createdAt).toLocaleDateString()}
          />

        </div>
      </div>

      {/* ================= UPDATE FORM ================= */}
      <ProfileForm initialData={data} onSubmit={handleUpdate} />

    </div>
  );
};

/* Small Reusable Component */
const ProfileItem = ({ icon, label, value }) => {
  return (
    <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition">
      <div className="text-emerald-500 mt-1">
        {icon}
      </div>

      <div>
        <p className="text-gray-500 text-xs uppercase tracking-wide">
          {label}
        </p>
        <p className="text-slate-800 font-medium mt-1">
          {value || "Not Provided"}
        </p>
      </div>
    </div>
  );
};

export default Profile;
