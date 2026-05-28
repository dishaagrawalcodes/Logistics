import { useEffect, useState } from "react";
import API from "../api/axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  Edit3,
  Search,
  Loader2,
  Settings2,
  X,
  Check,
  ArrowLeft,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ServicesAdmin() {
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [type, setType] = useState("home");

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
const [showDeleteModal, setShowDeleteModal] = useState(false);

  /* ===== PAGINATION ===== */
  const ITEMS_PER_PAGE = 6;
  const [page, setPage] = useState(1);

  /* ================= LOAD ================= */

  const loadServices = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/services/type/${type}`);

      setServices(res.data);
    } catch {
      toast.error("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  loadServices();
  setPage(1);
}, [type]);


  /* ================= CREATE / UPDATE ================= */

  const handleSubmit = async (e) => {
  e.preventDefault();

  const trimmed = name.trim();

  /* ===== EMPTY CHECK ===== */
  if (!trimmed) {
    setNameError("required");
    toast.error("Service name required");
    return;
  }

  /* ===== DUPLICATE CHECK ===== */
  const duplicate = services.find(s =>
    s.name.toLowerCase() === trimmed.toLowerCase() &&
    s._id !== editing
  );

  if (duplicate) {
    setNameError("duplicate");
    toast.error("Service already exists");
    return;
  }

  try {
    if (editing) {
      await API.put(`/services/${editing}`, { name: trimmed });
      toast.success("Service updated");
    } else {
      await API.post("/services", { 
  name: trimmed,
  type 
});


      toast.success("Service created");
    }

    setName("");
    setEditing(null);
    setNameError("");
    setPage(1);
    loadServices();

  } catch (err) {
    if (err.response?.data?.message?.toLowerCase().includes("exists")) {
      setNameError("duplicate");
      toast.error("Service already exists");
    } else {
      toast.error("Save failed");
    }
  }
};



  /* ================= DELETE ================= */

  const deleteService = async () => {
  if (!deleteId) return;

  try {
    await API.delete(`/services/${deleteId}`);
    toast.success("Service deleted");
    setShowDeleteModal(false);
    setDeleteId(null);
    loadServices();
  } catch {
    toast.error("Delete failed");
  }
};


  /* ================= FILTER ================= */

  const filtered = services.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  /* ================= PAGINATION ================= */

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  /* ================= UI ================= */

  return (
    
  <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans pb-24">

    {/* HEADER */}
    <div className="bg-white border-b border-slate-200 sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center gap-3">

        <button
          onClick={() => navigate("/dashboard")}
          className="p-2 hover:bg-slate-100 rounded-xl text-slate-500"
        >
          <ArrowLeft size={20} />
        </button>

        <div>
          <h1 className="text-lg sm:text-xl font-black tracking-tight">
            Service Catalog
          </h1>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-1">
            Administration Unit
          </p>
        </div>
      </div>
    </div>

    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">

      {/* ===== STACK ON MOBILE — GRID ON LG ===== */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 sm:gap-8">

        {/* ================= LEFT FORM ================= */}
        <div className="xl:col-span-4">
          <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-xl border xl:sticky xl:top-24">

            <div className="mb-6 sm:mb-8">
              <div className={`h-12 w-12 rounded-2xl flex items-center justify-center text-white mb-4
                ${editing ? "bg-amber-500" : "bg-indigo-600"}`}>
                {editing ? <Edit3 size={22} /> : <Plus size={22} />}
              </div>

              <h2 className="text-xl sm:text-2xl font-bold">
                {editing ? "Update Service" : "New Service"}
              </h2>

              <p className="text-slate-500 text-sm mt-1">
                Define service parameters for the fleet.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Service Designation *
                </label>
                 
                 <div>
  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
    Service Type *
  </label>

  <select
    value={type}
    onChange={(e) => setType(e.target.value)}
    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-semibold focus:ring-4 focus:ring-indigo-500/10"
  >
    <option value="home">Home Services</option>
    <option value="transportation">Transportation</option>
  </select>
</div>


                <input
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setNameError("");
                  }}
                  placeholder="e.g. Express Delivery"
                  className={`w-full px-4 py-3 sm:px-5 sm:py-4 bg-slate-50 border rounded-2xl outline-none font-semibold
                    ${nameError
                      ? "border-red-400 ring-2 ring-red-100"
                      : "border-slate-200 focus:ring-4 focus:ring-indigo-500/10"
                    }`}
                />

                {nameError === "required" && (
                  <p className="text-red-500 text-xs font-bold mt-2">
                    Service name is required
                  </p>
                )}

                {nameError === "duplicate" && (
                  <p className="text-red-500 text-xs font-bold mt-2">
                    Service already exists
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={!name.trim()}
                className={`w-full py-3 sm:py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex gap-2 justify-center
                disabled:opacity-40 disabled:cursor-not-allowed
                ${editing ? "bg-amber-500 text-white" : "bg-slate-900 text-white"}`}
              >
                {editing ? <Check size={18} /> : <Plus size={18} />}
                {editing ? "Save Changes" : "Register Service"}
              </button>

            </form>
          </div>
        </div>

        {/* ================= RIGHT LIST ================= */}
        <div className="xl:col-span-8 space-y-5 sm:space-y-6">

          {/* SEARCH */}
          <div className="bg-white p-2 rounded-2xl border flex items-center gap-2">
            <Search size={18} className="ml-3 text-slate-400" />

            <input
              placeholder="Search services..."
              className="flex-1 outline-none text-sm sm:text-base"
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />

            <div className="px-3 sm:px-4 py-2 bg-slate-50 text-[10px] font-black rounded-xl">
              {filtered.length}
            </div>
          </div>

          {/* LIST */}
          {loading ? (
            <div className="py-16 text-center">
              <Loader2 className="animate-spin mx-auto text-indigo-600" size={28} />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">

                <AnimatePresence>
                  {paginated.map(service => (
                    <motion.div
                      key={service._id}
                      layout
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      className="group bg-white p-4 sm:p-6 rounded-3xl shadow-sm hover:shadow-xl flex justify-between items-center"

                    >
                      <div className="flex gap-3 sm:gap-4 items-center min-w-0">
                        <div className="h-10 w-10 bg-slate-50 rounded-xl flex items-center justify-center shrink-0">
                          <Settings2 size={18} />
                        </div>

                        <div className="flex flex-col">
  <span className="font-black truncate">
    {service.name}
  </span>

  <span className="text-[10px] font-bold text-slate-400 uppercase">
    {service.type}
  </span>
</div>

                      </div>

                      {/* ALWAYS visible mobile, hover desktop */}
                      <div className="flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100">

                        <button
                          onClick={() => {
                            setEditing(service._id);
                            setName(service.name);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className="p-3 rounded-xl hover:bg-amber-50 hover:text-amber-600"
                        >
                          <Edit3 size={18} />
                        </button>

                        <button
                          onClick={() => {
                            setDeleteId(service._id);
                            setShowDeleteModal(true);
                          }}
                          className="p-3 rounded-xl hover:bg-rose-50 hover:text-rose-600"
                        >
                          <Trash2 size={18} />
                        </button>

                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

              </div>

              {/* PAGINATION */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-4 pt-4 sm:pt-6">
                  <button
                    onClick={() => setPage(p => Math.max(p - 1, 1))}
                    disabled={page === 1}
                    className="p-3 border rounded-xl"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  <div className="text-xs font-black text-slate-400">
                    PAGE {page} / {totalPages}
                  </div>

                  <button
                    onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                    disabled={page === totalPages}
                    className="p-3 border rounded-xl"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>

    {/* DELETE MODAL — mobile safe */}
    <AnimatePresence>
      {showDeleteModal && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <motion.div className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl">
            <h3 className="text-lg font-black mb-4">Delete Service</h3>
            <p className="text-slate-600 mb-6 text-sm sm:text-base">
              Are you sure you want to delete this service?
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-3 rounded-xl border font-bold"
              >
                Cancel
              </button>

              <button
                onClick={deleteService}
                className="flex-1 py-3 rounded-xl bg-rose-600 text-white font-bold"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>

  </div>
);
}