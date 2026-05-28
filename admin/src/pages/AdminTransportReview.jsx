import { useEffect, useState, useCallback } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast"; 
import {
  CheckCircle,
  Trash2,
  Search,
  User,
  Phone,
  Mail,
  MapPin,
  Truck,
  
  ShieldCheck,
  
  EyeOff,
  Eye,
  ChevronLeft,
  X,
  Lock,
  FileText,
  Hash,
  Loader2,
} from "lucide-react";

const ITEMS_PER_PAGE = 2;

const AdminTransportReview = () => {
  const navigate = useNavigate();
  const [transports, setTransports] = useState([]);
  const [filter, setFilter] = useState("pending");
  const [search, setSearch] = useState("");
  const [rejectReason, setRejectReason] = useState({});
  const [loading, setLoading] = useState(false);
  const [approveModal, setApproveModal] = useState(null);
  const [adminPassword, setAdminPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  
  const fetchTransports = useCallback(async () => {
    try {
      setLoading(true);
      const res =
        filter === "pending"
          ? await API.get("/transport/pending")
          : await API.get("/transport");
      setTransports(res.data);
    } catch {
      toast.error("Failed to load records");
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchTransports();
  }, [fetchTransports]);

  const reviewTransport = async (id, action, password) => {
    if (action === "reject" && !rejectReason[id]?.trim()) return false;

    // Unique ID for the toast prevents duplicates if the function is clicked twice
    const toastId = toast.loading(
      action === "approve"
        ? "Processing Approval..."
        : "Processing Rejection...",
    );

    try {
      await API.patch(`/transport/review/${id}`, {
        action,
        reason: rejectReason[id],
        password,
      });
      setRejectReason((prev) => ({ ...prev, [id]: "" }));
      fetchTransports();
      toast.success(`Transport ${action}ed`, { id: toastId }); 
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Review failed", {
        id: toastId,
      });
      return false;
    }
  };

  const confirmDelete = (id) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3 p-1">
          <p className="text-sm font-bold text-slate-800">
            Permanent Delete Transport?
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                handleDelete(id);
              }}
              className="bg-rose-500 text-white px-4 py-2 rounded-xl text-xs font-black uppercase"
            >
              Delete
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="bg-slate-100 text-slate-600 px-4 py-2 rounded-xl text-xs font-bold"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { id: `delete-${id}` },
    ); // ID prevents multiple delete toasts for same item
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/transport/${id}`);
      fetchTransports();
      toast.success("Transport deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  const filtered = transports.filter(
  (t) =>
    (filter === "all" || t.status === filter) &&
    (t.name || "").toLowerCase().includes(search.toLowerCase())
);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filter]);

  return (
    <div className="p-4 md:p-8 bg-[#F1F5F9] min-h-screen text-slate-900 font-sans pb-20">
      {/* Remove the line below if you have a Toaster in your App.jsx file */}
      <Toaster position="top-center" reverseOrder={false} gutter={8} />

      <div className="max-w-7xl mx-auto">
        {/* PREMIUM HEADER */}
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="p-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all shadow-sm active:scale-95 text-slate-600"
            >
              <ChevronLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight flex items-center gap-3">
                Transport Hub
              </h1>
              <p className="text-slate-500 font-medium text-sm">
                Monitor and verify logistical applications.
              </p>
            </div>
          </div>

          <div className="flex bg-white/50 backdrop-blur-md p-1 rounded-2xl border border-slate-200 shadow-sm w-full lg:w-auto">
            {["pending", "approved", "rejected", "all"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`flex-1 lg:flex-none px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === f ? "bg-slate-900 text-white shadow-lg" : "text-slate-400 hover:text-slate-600"}`}
              >
                {f}
              </button>
            ))}
          </div>
        </header>

        {/* SEARCH BAR */}
        <div className="relative mb-8 group">
          <Search
            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors"
            size={18}
          />
          <input
            className="w-full pl-14 pr-6 py-4 bg-white border-none rounded-[1.5rem] shadow-xl shadow-slate-200/50 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-semibold placeholder:text-slate-300"
            placeholder="Search registry by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* COMPACT CARDS GRID */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 opacity-20">
            <Loader2 className="animate-spin" size={48} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <AnimatePresence mode="popLayout">
              {paginated.map((t) => (
                <motion.div
                  key={t._id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all group"
                >
                  <div className="flex justify-between items-start mb-4 border-b border-slate-50 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                        <Truck size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 leading-tight">
                          {t.name}
                        </h3>
                        <p className="text-[10px] font-black text-slate-500 uppercase ">
                          {t.vehicleName} • {t.vehicleNumber}
                        </p>
                      </div>
                    </div>
                    <StatusBadge status={t.status} />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-3 mb-5">
                    <Info
                      icon={<Mail size={14} />}
                      label="EMAIL"
                      value={t.email}
                    />
                    <Info
                      icon={<Phone size={14} />}
                      label="MOBILE"
                      value={t.mobile}
                    />
                    <Info
                      icon={<FileText size={14} />}
                      label="RC"
                      value={t.rcNumber}
                    />
                    <Info
                      icon={<Hash size={14} />}
                      label="AADHAAR"
                      value={t.aadhaarNumber}
                    />
                    <Info
                      icon={<ShieldCheck size={14} />}
                      label="PAN"
                      value={t.panNumber}
                    />
                    <Info
                      icon={<MapPin size={14} />}
                      label="PINCODES"
                      value={t.pincodes?.slice(0, 2).join(", ")}
                    />
                    <Info
                      icon={<ShieldCheck size={14} />}
                      label="DL NO"
                      value={t.dlNumber}
                    />
                  </div>

                  <div className="bg-slate-50 p-3 rounded-2xl space-y-3">
                    {t.status === "pending" && (
                      <div className="flex flex-col sm:flex-row gap-2">
                        <div className="relative flex-1">
                          <input
                            placeholder="Reason for rejection..."
                            className="w-full pl-4 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-rose-500/20"
                            value={rejectReason[t._id] || ""}
                            onChange={(e) =>
                              setRejectReason({
                                ...rejectReason,
                                [t._id]: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <button
                            onClick={() => reviewTransport(t._id, "reject")}
                            disabled={!rejectReason[t._id]?.trim()}
                            className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${!rejectReason[t._id]?.trim() ? "bg-slate-200 text-slate-400 cursor-not-allowed" : "bg-rose-500 text-white shadow-lg shadow-rose-100 active:scale-95"}`}
                          >
                            Reject
                          </button>
                          <button
                            onClick={() => setApproveModal(t)}
                            className="px-4 py-2.5 bg-emerald-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-100 active:scale-95"
                          >
                            Approve
                          </button>
                        </div>
                      </div>
                    )}
                    <button
                      onClick={() => confirmDelete(t._id)}
                      className="w-full py-2 flex items-center justify-center gap-2 text-[10px] font-black uppercase text-slate-400 hover:text-rose-500 transition-colors border border-transparent hover:border-rose-100 rounded-xl hover:bg-rose-50/50"
                    >
                      <Trash2 size={12} /> Remove Record
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <footer className="mt-12 flex items-center justify-between px-6 py-4 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="px-5 py-2 rounded-xl bg-slate-50 text-[10px] font-black uppercase disabled:opacity-30 hover:bg-slate-900 hover:text-white transition-all"
              >
                Prev
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-5 py-2 rounded-xl bg-slate-50 text-[10px] font-black uppercase disabled:opacity-30 hover:bg-slate-900 hover:text-white transition-all"
              >
                Next
              </button>
            </div>
          </footer>
        )}
      </div>

      {/* APPROVAL MODAL - CENTERED FIXED */}
      <AnimatePresence>
        {approveModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Background Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setApproveModal(null)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white rounded-[2rem] p-6 md:p-8 w-full max-w-md shadow-2xl border border-white/20 z-10"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-black tracking-tight leading-none mb-2">
                    Security Access
                  </h2>
                  <p className="text-slate-500 text-sm font-medium">
                    Verify credentials for approval.
                  </p>
                </div>
                <button
                  onClick={() => setApproveModal(null)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Phone size={16} className="text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                      Login ID
                    </p>
                    <p className="font-bold text-slate-800">
                      {approveModal.mobile}
                    </p>
                  </div>
                </div>

                <div className="relative group">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors"
                    size={18}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-bold text-sm"
                    placeholder="Enter Password"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setApproveModal(null)}
                    className="flex-1 py-4 font-black text-slate-400 uppercase tracking-widest text-[10px] hover:text-slate-900 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={async () => {
                      const ok = await reviewTransport(
                        approveModal._id,
                        "approve",
                        adminPassword,
                      );
                      if (ok) {
                        setApproveModal(null);
                        setAdminPassword("");
                      }
                    }}
                    className="flex-[2] bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-slate-200 active:scale-95 transition-all"
                  >
                    Verify & Approve
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

/* ================= UTILITY COMPONENTS ================= */

const Info = ({ icon, label, value }) => (
  <div className="min-w-0">
    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
      {icon}
      {label}
    </p>
    <p className="font-bold text-xs text-slate-700 truncate">
      {value || "N/A"}
    </p>
  </div>
);

const StatusBadge = ({ status }) => {
  const styles = {
    approved: "bg-emerald-50 text-emerald-600 border-emerald-100",
    pending: "bg-amber-50 text-amber-600 border-amber-100",
    rejected: "bg-rose-50 text-rose-600 border-rose-100",
  };
  return (
    <span
      className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border shadow-sm ${styles[status]}`}
    >
      {status}
    </span>
  );
};

export default AdminTransportReview;
