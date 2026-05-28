import React from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, ShieldCheck, Save, Loader2 } from "lucide-react";

/* Reusable UI Sub-Components */
const InputField = ({ icon, label, value, disabled }) => (
  <div className="w-full">
    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">{label}</label>
    <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3.5 transition-all">
      {icon}
      <input type="text" value={value || ""} disabled={disabled} className="w-full bg-transparent text-gray-600 font-medium outline-none disabled:cursor-not-allowed" />
    </div>
  </div>
);

const EditableField = ({ icon, label, value, onChange }) => (
  <div className="w-full">
    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">{label}</label>
    <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-4 py-3.5 focus-within:ring-4 focus-within:ring-blue-50 focus-within:border-blue-400 transition-all">
      {icon}
      <input type="text" value={value || ""} onChange={onChange} placeholder={`Enter ${label}`} className="w-full bg-transparent text-gray-800 font-medium outline-none" />
    </div>
  </div>
);

const Profile = ({ profile, setProfile, onUpdate, loading }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
    >
      <div className="p-6 md:p-8 border-b border-gray-50 bg-gradient-to-r from-blue-50/50 to-transparent">
        <h2 className="text-xl font-bold text-gray-800">Account Details</h2>
      </div>

      <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <InputField icon={<User className="text-blue-500" size={18} />} label="Full Name" value={profile.name} disabled />
          <InputField icon={<Mail className="text-blue-500" size={18} />} label="Email Address" value={profile.email} disabled />
          <InputField icon={<Phone className="text-blue-500" size={18} />} label="Mobile Number" value={profile.mobile} disabled />
        </div>

        <div className="space-y-6">
          <EditableField
            icon={<MapPin className="text-blue-500" size={18} />}
            label="Residential Address"
            value={profile.address}
            onChange={(e) => setProfile({ ...profile, address: e.target.value })}
          />
          <EditableField
            icon={<ShieldCheck className="text-blue-500" size={18} />}
            label="Pincode / Zip"
            value={profile.pincode}
            onChange={(e) => {
              const val = e.target.value;
              if (/^\d*$/.test(val) && val.length <= 6) setProfile({ ...profile, pincode: val });
            }}
          />

          <div className="pt-4 flex justify-end">
            <button
              onClick={onUpdate}
              disabled={loading}
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-100"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;