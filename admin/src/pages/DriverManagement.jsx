import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import API from "../api/axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  Edit,
  Search,
  User,
  Phone,
  Mail,
  Truck,
  ShieldCheck,
  MapPin,
  X,
  CreditCard,
  ArrowLeft,
  Loader2,
  ChevronRight,
} from "lucide-react";

const ITEMS_PER_PAGE = 6;

const DriverManagement = () => {
  const navigate = useNavigate();
  const [drivers, setDrivers] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [errors, setErrors] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    vehicleNo: "",
    aadharNo: "",
    panNo: "",
    dlNo: "",
  });

  const fetchDrivers = async () => {
    try {
      setLoading(true);
      const res = await API.get("/driver/all");
      setDrivers(res.data);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to load drivers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const handleChange = (e) => {
  let { name, value } = e.target;

  
  if (name === "panNo" || name === "dlNo") {
    value = value.toUpperCase();
  }

  
  if (name === "phone") {
    value = value.replace(/\D/g, "").slice(0, 10);
  }

  if (name === "aadharNo") {
    value = value.replace(/\D/g, "").slice(0, 12);
  }

  setForm(prev => ({ ...prev, [name]: value }));
};


  const openAddModal = () => {
    setEditId(null);
    setForm({
      name: "",
      phone: "",
      email: "",
      address: "",
      vehicleNo: "",
      aadharNo: "",
      panNo: "",
      dlNo: "",
    });
    setErrors({});
    setShowModal(true);
  };

  const openEditModal = (driver) => {
    setEditId(driver._id);
    setForm({
      name: driver.name || "",
      phone: driver.phone || "",
      email: driver.email || "",
      address: driver.address || "",
      vehicleNo: driver.vehicleNo || "",
      aadharNo: driver.aadharNo || "",
      panNo: driver.panNo || "",
      dlNo: driver.dlNo || "",
    });
    setErrors({});
    setShowModal(true);
  };

  const validateForm = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!/^[6-9]\d{9}$/.test(form.phone)) e.phone = "Invalid format";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Invalid email";
    if (!form.address.trim()) e.address = "Required";
    if (form.aadharNo && !/^\d{12}$/.test(form.aadharNo))
      e.aadharNo = "12 digits required";
    if (form.panNo && !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(form.panNo))
      e.panNo = "Invalid PAN";
    if (!form.dlNo.trim()) {
      e.dlNo = "DL number required";
    } else if (!/^[A-Z0-9-]{8,20}$/i.test(form.dlNo)) {
      e.dlNo = "Invalid DL format";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return toast.error("Check highlighted fields");
    const loadingToast = toast.loading("Processing...");
    try {
      if (editId) await API.put(`/driver/update/${editId}`, form);
      else await API.post("/driver/create", form);
      toast.success("Registry updated", { id: loadingToast });
      setShowModal(false);
      fetchDrivers();
    } catch (err) {
      toast.error(err.response?.data?.message || "Operation failed", {
        id: loadingToast,
      });
    }
  };

  const confirmDelete = (id) => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <p className="text-sm font-bold">Remove driver from registry?</p>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              const lt = toast.loading("Deleting...");
              try {
                await API.delete(`/driver/delete/${id}`);
                fetchDrivers();
                toast.success("Removed", { id: lt });
              } catch (err) {
                toast.error("Failed", { id: lt });
              }
            }}
            className="bg-rose-500 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-rose-100"
          >
            Confirm
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="bg-slate-100 px-4 py-2 rounded-xl text-xs font-bold"
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };

  const filteredDrivers = drivers.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.phone.includes(search),
  );

  const totalPages = Math.ceil(filteredDrivers.length / ITEMS_PER_PAGE);
  const paginatedDrivers = filteredDrivers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <div className="p-4 md:p-10 bg-[#F1F5F9] min-h-screen text-slate-900 font-sans pb-24">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
          <div className="flex items-center gap-5">
            <button
              onClick={() => navigate("/dashboard")}
              className="p-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all shadow-sm"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-3xl font-black tracking-tight text-slate-900 flex items-center gap-3">
                Driver Management
              </h1>
              <p className="text-slate-500 font-medium mt-1">
                Managing {drivers.length} authorized service agents
              </p>
            </div>
          </div>

          <button
            onClick={openAddModal}
            className="w-full lg:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-[1.5rem] shadow-xl shadow-indigo-100 transition-all active:scale-95 font-black text-sm uppercase tracking-widest"
          >
            <Plus size={20} /> Register Driver
          </button>
        </header>

        {/* SEARCH BAR */}
        <div className="relative mb-10 group">
          <Search
            className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors"
            size={20}
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Quick search by name, phone or vehicle ID..."
            className="w-full pl-16 pr-6 py-5 bg-white border-none rounded-[2rem] shadow-xl shadow-slate-200/50 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-semibold placeholder:text-slate-300"
          />
        </div>

        {/* GRID LAYOUT */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 opacity-20">
            <Loader2 className="animate-spin" size={48} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredDrivers.length === 0 ? (
                <div className="lg:col-span-2 text-center py-20 bg-white/50 border-2 border-dashed border-slate-200 rounded-[3rem]">
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
                    No Results Found
                  </p>
                </div>
              ) : (
                paginatedDrivers.map((d) => (
                  <motion.div
                    key={d._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="group bg-white p-6 rounded-[2.5rem] border border-transparent hover:border-indigo-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-300 flex flex-col sm:flex-row justify-between gap-6"
                  >
                    <div className="flex gap-5">
                      <div className="h-16 w-16 rounded-[1.5rem] bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shrink-0">
                        <ShieldCheck size={32} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-black text-lg text-slate-900 truncate">
                            {d.name}
                          </h3>
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        </div>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-1.5">
                          <Truck size={12} /> {d.vehicleNo || "Unassigned"}
                        </p>

                        <div className="space-y-1.5">
                          <span className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                            <Phone size={14} className="text-indigo-400" />
                            {d.phone}
                          </span>

                          <span className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                            <Mail size={14} className="text-indigo-400" />
                            {d.email}
                          </span>

                          {d.dlNo && (
                            <span className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                              <CreditCard
                                size={14}
                                className="text-indigo-400"
                              />
                              {d.dlNo}
                            </span>
                          )}

                          {d.panNo && (
                            <span className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                              <ShieldCheck
                                size={14}
                                className="text-indigo-400"
                              />
                              {d.panNo}
                            </span>
                          )}

                          {d.aadharNo && (
                            <span className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                              <CreditCard
                                size={14}
                                className="text-indigo-400"
                              />
                              {d.aadharNo}
                            </span>
                          )}

                          {d.address && (
                            <span className="flex items-center gap-2 text-sm font-semibold text-slate-600 truncate">
                              <MapPin size={14} className="text-indigo-400" />
                              {d.address}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Replace your existing action div with this updated one */}
                    <div className="flex flex-row md:flex-col items-center justify-center gap-2 w-full md:w-auto border-t md:border-t-0 md:border-l border-slate-50 pt-4 md:pt-0 md:pl-6 shrink-0">
                      <button
                        onClick={() => openEditModal(d)}
                        className="flex-1 md:flex-none p-3 bg-slate-50 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 rounded-2xl transition-all active:scale-90 shadow-sm flex items-center justify-center gap-2 text-xs font-bold px-5"
                      >
                        <Edit size={16} />
                        <span className="md:hidden lg:inline">Edit</span>
                      </button>

                      <button
                        onClick={() => confirmDelete(d._id)}
                        className="flex-1 md:flex-none p-3 bg-slate-50 text-slate-500 hover:bg-rose-50 hover:text-rose-600 rounded-2xl transition-all active:scale-90 shadow-sm flex items-center justify-center gap-2 text-xs font-bold px-5"
                      >
                        <Trash2 size={16} />
                        <span className="md:hidden lg:inline">Remove</span>
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <footer className="mt-12 flex items-center justify-between px-6 py-4 bg-white/50 rounded-3xl backdrop-blur-sm border border-white">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex gap-4">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="px-6 py-2 rounded-xl bg-white border border-slate-200 text-[10px] font-black uppercase tracking-tighter disabled:opacity-20 hover:border-indigo-500 transition-all"
              >
                Prev
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-6 py-2 rounded-xl bg-white border border-slate-200 text-[10px] font-black uppercase tracking-tighter disabled:opacity-20 hover:border-indigo-500 transition-all"
              >
                Next
              </button>
            </div>
          </footer>
        )}
      </div>

      {/* MODAL */}
      {/* MODAL */}
<AnimatePresence>
  {showModal && (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-6">
      {/* overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setShowModal(false)}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
      />

      {/* modal */}
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="
          relative bg-white
          w-full max-w-3xl
          h-[95vh] md:h-[88vh]
          rounded-2xl md:rounded-[3rem]
          shadow-2xl
          border border-white/20
          flex flex-col
          overflow-hidden
        "
      >

        {/* HEADER — fixed */}
        <div className="p-5 md:p-7 border-b border-slate-100 bg-slate-50/40 shrink-0">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl md:text-2xl font-black">
                {editId ? "Edit Personnel" : "Registry Enrollment"}
              </h3>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">
                Documentation Required
              </p>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="p-3 bg-white rounded-2xl hover:bg-rose-50 hover:text-rose-500 shadow-sm"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* BODY — scrollable on small screens */}
        <div className="
          flex-1
          overflow-y-auto
          px-5 md:px-7
          py-5 md:py-6
        ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">

            {[
              { label: "Full Name", name: "name", icon: User, placeholder: "Johnathan Doe" },
              { label: "Contact Line", name: "phone", icon: Phone, placeholder: "+91 00000 00000" },
              { label: "Corporate Email", name: "email", icon: Mail, placeholder: "j.doe@logistics.com" },
              { label: "Vehicle Plate", name: "vehicleNo", icon: Truck, placeholder: "DL-01-XX-0000" },
              { label: "Residential Address", name: "address", icon: MapPin, placeholder: "Building, Street...", full: true },
              { label: "Driving License No.", name: "dlNo", icon: CreditCard, placeholder: "DL-0120110149646" },
              { label: "Aadhar Identity", name: "aadharNo", icon: CreditCard, placeholder: "0000 0000 0000" },
              { label: "PAN Card Number", name: "panNo", icon: ShieldCheck, placeholder: "ABCDE1234F" },
            ].map((field) => (
              <div key={field.name} className={`${field.full ? "md:col-span-2" : ""}`}>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                  {field.label}
                  {["name","phone","email","address","dlNo"].includes(field.name) &&
                    <span className="text-rose-500 ml-1">*</span>}
                </label>

                <div className="relative mt-2">
                  <field.icon
                    size={16}
                    className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                      errors[field.name] ? "text-rose-400" : "text-slate-300"
                    }`}
                  />

                  <input
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className={`
                      w-full pl-12 pr-4
                      py-3 md:py-2.5
                      bg-slate-50 border-2 rounded-2xl
                      text-sm font-semibold
                      outline-none
                      ${errors[field.name]
                        ? "border-rose-200 bg-rose-50"
                        : "border-transparent focus:border-indigo-500 bg-white"}
                    `}
                  />
                </div>

                {errors[field.name] && (
                  <p className="text-[10px] text-rose-500 font-bold ml-1 mt-1">
                    {errors[field.name]}
                  </p>
                )}
              </div>
            ))}

          </div>
        </div>

        {/* FOOTER — fixed, always visible */}
        <div className="
          shrink-0
          border-t border-slate-100
          bg-white
          p-5 md:p-6
        ">
          <div className="flex gap-4">
            <button
              onClick={() => setShowModal(false)}
              className="flex-1 py-3 font-black text-slate-400 uppercase text-xs"
            >
              Discard
            </button>

            <button
              onClick={handleSubmit}
              className="flex-[2] bg-slate-900 hover:bg-indigo-600 text-white py-3 rounded-2xl font-black uppercase text-xs shadow-xl"
            >
              Save Profile
            </button>
          </div>
        </div>

      </motion.div>
    </div>
  )}
</AnimatePresence>

    </div>
  );
};

export default DriverManagement;
