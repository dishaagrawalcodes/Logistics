import { useState, useEffect } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

const Profile = ({ provider, refreshProfile }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
  });

  const [pincodes, setPincodes] = useState([]);
  const [services, setServices] = useState([]); // ✅ multiple
  const [allServices, setAllServices] = useState([]);

  const [newPincode, setNewPincode] = useState("");
  const [loading, setLoading] = useState(false);

  // ================= SYNC PROVIDER =================
  useEffect(() => {
    if (provider) {
      setForm({
        name: provider.name || "",
        email: provider.email || "",
        mobile: provider.mobile || "",
        address: provider.address || "",
      });

      setPincodes(provider.pincodes || []);
      setServices(provider.serviceCategories || []);
    }
  }, [provider]);

  // ================= FETCH SERVICES =================
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get("/services/type/home");
        setAllServices(res.data);
      } catch (err) {
        toast.error("Failed to load services");
      }
    };

    fetchServices();
  }, []);

  if (!provider) {
    return <div className="p-10 text-center">Loading profile...</div>;
  }

  // ================= HANDLE BASIC INPUT =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================= ADD PINCODE =================
  const addPincode = () => {
    if (!newPincode.trim()) {
      return toast.error("Pincode cannot be empty");
    }

    if (!/^\d{6}$/.test(newPincode)) {
      return toast.error("Enter valid 6 digit pincode");
    }

    if (pincodes.includes(newPincode)) {
      return toast.error("Pincode already added");
    }

    setPincodes([...pincodes, newPincode]);
    setNewPincode("");
  };

  // ================= REMOVE PINCODE / SERVICE =================
  const removeItem = (type, value) => {
    if (type === "pin") {
      setPincodes(pincodes.filter((p) => p !== value));
    } else {
      setServices(services.filter((s) => s !== value));
    }
  };

  // ================= HANDLE SERVICE MULTI SELECT =================
  const handleServiceChange = (e) => {
    const selected = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );

    setServices(selected);
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔥 VALIDATION
    if (!form.name.trim()) return toast.error("Name is required");
    if (!form.email.trim()) return toast.error("Email is required");
    if (!form.mobile.trim()) return toast.error("Mobile is required");
    if (!form.address.trim()) return toast.error("Address is required");
    if (pincodes.length === 0)
      return toast.error("Add at least one service area");
    if (services.length === 0)
      return toast.error("Select at least one service");

    setLoading(true);

    try {
      await api.put(`/provider/${provider._id}`, {
        ...form,
        pincodes,
        serviceCategories: services,
      });

      toast.success("Profile updated successfully");
      refreshProfile();
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Something went wrong"
      );
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6 border border-slate-200">
      <h2 className="text-2xl font-black mb-6 text-slate-800">
        Update Profile
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* BASIC INFO */}
        <div className="grid md:grid-cols-2 gap-4">
          <Input label="Name" name="name" value={form.name} onChange={handleChange} />
          <Input label="Email" name="email" value={form.email} onChange={handleChange} />
          <Input label="Mobile" name="mobile" value={form.mobile} onChange={handleChange} />
          <Input label="Address" name="address" value={form.address} onChange={handleChange} />
        </div>

        {/* PINCODES */}
        <Section title="Service Areas (Pincodes)">
          <TagList items={pincodes} onRemove={(val) => removeItem("pin", val)} />

          <div className="flex max-sm:flex-col gap-2 max-sm:items-center">
            <input
              value={newPincode}
              onChange={(e) => setNewPincode(e.target.value)}
              placeholder="Enter 6-digit pincode"
              className="flex-1 border rounded-lg px-3 py-2"
            />
            <button
              type="button"
              onClick={addPincode}
              className="bg-indigo-600 max-sm:w-1/2 text-white px-4 rounded-lg"
            >
              Add
            </button>
          </div>
        </Section>

        {/* SERVICES */}
        <Section title="Service Categories">
          <select
            multiple
            value={services}
            onChange={handleServiceChange}
            className="w-full border border-slate-300 rounded-xl p-3 h-40 focus:ring-2 focus:ring-indigo-400"
          >
            {allServices.map((service) => (
              <option key={service._id} value={service.name}>
                {service.name}
              </option>
            ))}
          </select>

          <p className="text-sm text-gray-400 mt-2">
            Hold Ctrl (Windows) or Cmd (Mac) to select multiple
          </p>

          <TagList
            items={services}
            onRemove={(val) => removeItem("service", val)}
          />
        </Section>

        {/* SUBMIT */}
        <button
          disabled={loading}
          className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white py-3 rounded-xl font-bold transition"
        >
          {loading ? "Updating..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default Profile;

// ================= REUSABLE INPUT =================
const Input = ({ label, ...props }) => (
  <div className="flex flex-col">
    <label className="text-sm font-semibold text-slate-600 mb-1">
      {label}
    </label>
    <input
      {...props}
      className="border border-slate-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
    />
  </div>
);

// ================= SECTION WRAPPER =================
const Section = ({ title, children }) => (
  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
    <h3 className="font-bold text-slate-700">{title}</h3>
    {children}
  </div>
);

// ================= TAG LIST =================
const TagList = ({ items, onRemove }) => {
  if (!items.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <div
          key={item}
          className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full flex items-center gap-2 text-sm"
        >
          {item}
          <button
            type="button"
            onClick={() => onRemove(item)}
            className="text-red-500 font-bold"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};
