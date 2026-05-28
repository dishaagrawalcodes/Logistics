import React, { useState } from "react";
import {
  User,
  Phone,
  Mail,
  Truck,
  Hash,
  CreditCard,
  FileText,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";

const ProfileForm = ({ initialData, onSubmit }) => {
  const [form, setForm] = useState({
    name: initialData?.name || "",
    mobile: initialData?.mobile || "",
    email: initialData?.email || "",
    vehicleName: initialData?.vehicleName || "",
    vehicleNumber: initialData?.vehicleNumber || "",
    dlNumber: initialData?.dlNumber || "",
    rcNumber: initialData?.rcNumber || "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    // Remove error while typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validate = () => {
    let newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!/^[6-9]\d{9}$/.test(form.mobile)) {
      newErrors.mobile = "Enter valid 10-digit mobile number";
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Enter valid email address";
    }

    if (!form.vehicleNumber.trim()) {
      newErrors.vehicleNumber = "Vehicle number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);
      await onSubmit(form);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const InputField = ({ label, name, icon, type = "text" }) => (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-slate-600">
        {label}
      </label>

      <div className="relative">
        <span className="absolute left-3 top-3 text-slate-400">
          {icon}
        </span>

        <input
          type={type}
          name={name}
          value={form[name]}
          onChange={handleChange}
          disabled={loading}
          className={`w-full pl-10 pr-4 py-3 bg-slate-50 border 
          rounded-xl text-sm outline-none transition-all duration-200
          ${errors[name]
              ? "border-red-400 focus:ring-red-100 focus:border-red-500"
              : "border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            }`}
        />
      </div>

      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">
          {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden">


     

      {/* HEADER */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-8 py-6 text-white">
         
        <h2 className="text-xl font-semibold">
          Update Your Profile
        </h2>
        <p className="text-slate-300 text-sm mt-1">
          Keep your transport details updated
        </p>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <InputField
          label="Full Name"
          name="name"
          icon={<User size={18} />}
        />

        <InputField
          label="Mobile Number"
          name="mobile"
          icon={<Phone size={18} />}
        />

        <InputField
          label="Email Address"
          name="email"
          icon={<Mail size={18} />}
        />

        <InputField
          label="Vehicle Name"
          name="vehicleName"
          icon={<Truck size={18} />}
        />

        <InputField
          label="Vehicle Number"
          name="vehicleNumber"
          icon={<Hash size={18} />}
        />

        <InputField
          label="Driving License Number"
          name="dlNumber"
          icon={<CreditCard size={18} />}
        />

        <InputField
          label="RC Number"
          name="rcNumber"
          icon={<FileText size={18} />}
        />

        {/* BUTTON */}
        <div className="md:col-span-2 mt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl 
            bg-gradient-to-r from-emerald-500 to-emerald-600 
            text-white font-medium shadow-md
            hover:shadow-lg hover:from-emerald-600 hover:to-emerald-700
            active:scale-[0.98] transition-all duration-200
            disabled:opacity-60 disabled:cursor-not-allowed
            flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Updating...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
