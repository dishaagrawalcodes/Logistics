import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  CheckCircle,
  XCircle,
  Trash2,
  Search,
  User,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  Activity,
  ShieldCheck,
  AlertCircle,
  ArrowLeft,
  EyeOff,
  Eye,
  ChevronLeft,
} from "lucide-react";

const AdminProviderReview = () => {
  const navigate = useNavigate();
  const [providers, setProviders] = useState([]);
  const [filter, setFilter] = useState("pending");
  const [search, setSearch] = useState("");
  const [rejectReason, setRejectReason] = useState({});
  const [loading, setLoading] = useState(false);

  const [approveModal, setApproveModal] = useState(null);
  const [adminPassword, setAdminPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 2;

  const fetchProviders = async () => {
    try {
      setLoading(true);
      const res =
        filter === "pending"
          ? await API.get("/provider/pending")
          : await API.get("/provider");
      setProviders(res.data);
    } catch (err) {
      toast.error("Failed to load providers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, [filter]);

  const reviewProvider = async (id, action, password) => {
    if (action === "reject" && !rejectReason[id]?.trim()) {
      toast.error("Rejection reason is required");
      return false;
    }

    if (action === "approve" && !password) {
      toast.error("Password required");
      return false;
    }

    const loadingToast = toast.loading(
      action === "approve" ? "Approving..." : "Rejecting...",
    );

    try {
      await API.patch(`/provider/review/${id}`, {
        action,
        reason: rejectReason[id],
        password,
      });

      setRejectReason((prev) => ({ ...prev, [id]: "" }));
      fetchProviders();

      toast.success(
        action === "approve" ? "Application Approved" : "Application Rejected",
        { id: loadingToast },
      );

      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Review failed", {
        id: loadingToast,
      });
      return false;
    }
  };

  const confirmDelete = (id) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3 p-1">
          <p className="text-sm font-bold text-slate-800">
            Permanent Delete Provider?
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                handleDelete(id);
              }}
              className="bg-rose-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold"
            >
              Confirm
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg text-xs font-bold"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { duration: 4000, position: "top-center" },
    );
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/provider/${id}`);
      fetchProviders();
      toast.success("Provider deleted successfully");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const filtered = providers.filter(
    (p) =>
      (filter === "all" || p.status === filter) &&
      p.name.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const paginatedProviders = filtered.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );
  useEffect(() => {
    setCurrentPage(1);
  }, [search, filter]);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <div className="p-6 md:p-10 bg-[#F8FAFC] min-h-screen text-slate-900 font-sans">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-6xl mx-auto">
        

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="flex items-start gap-4">
            {/* Back Button */}
            <button
              onClick={() => navigate("/dashboard")}
              className="p-2.5 bg-white border border-slate-200 rounded-xl 
               hover:bg-slate-50 transition-all shadow-sm active:scale-95 mt-1"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Title + Subtitle */}
            <div>
              <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
                <ShieldCheck className="text-indigo-600" size={32} />
                Provider Registry
              </h1>

              <p className="text-slate-500 font-medium mt-1">
                Review and manage professional service applications.
              </p>
            </div>
          </div>

          <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto no-scrollbar">
            {["pending", "approved", "rejected", "all"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                  filter === f
                    ? "bg-slate-900 text-white shadow-lg shadow-slate-200"
                    : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="relative mb-8 group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors"
            size={20}
          />
          <input
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-[1.5rem] shadow-sm focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all font-medium placeholder:text-slate-300"
            placeholder="Search providers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="grid gap-6">
          <AnimatePresence mode="popLayout">
            {paginatedProviders.map((p) => (
              <motion.div
                key={p._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-xl transition-all group"
              >
                <div className="flex flex-col xl:flex-row justify-between gap-8">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Info
                      icon={<User size={18} />}
                      label="Full Name"
                      value={p.name}
                    />
                    <Info
                      icon={<Mail size={18} />}
                      label="Email Address"
                      value={p.email}
                    />
                    <Info
                      icon={<Phone size={18} />}
                      label="Mobile Contact"
                      value={p.mobile}
                    />
                    <Info
                      icon={<MapPin size={18} />}
                      label="Service Pincodes"
                      value={p.pincodes?.length ? p.pincodes.join(", ") : "N/A"}
                    />

                    <Info
                      icon={<Briefcase size={18} />}
                      label="Categories"
                      value={
                        p.serviceCategories?.length
                          ? p.serviceCategories.join(", ")
                          : "N/A"
                      }
                    />

                    <div className="flex flex-col gap-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        Current Status
                      </p>
                      <StatusBadge status={p.status} />
                    </div>
                  </div>

                  {p.rejectionReason && (
                    <div className="xl:max-w-xs w-full bg-rose-50 border border-rose-100 p-4 rounded-2xl flex gap-3">
                      <AlertCircle
                        className="text-rose-500 shrink-0"
                        size={20}
                      />
                      <div>
                        <p className="text-xs font-black uppercase tracking-tight text-rose-600">
                          Rejection Reason
                        </p>
                        <p className="text-sm text-rose-700 font-medium mt-1">
                          {p.rejectionReason}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-6 border-t border-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {p.status === "pending" ? (
                    <div className="flex flex-wrap items-center gap-3 flex-1">
                      <button
                        onClick={() => setApproveModal(p)}
                        className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-emerald-100 transition-all active:scale-95"
                      >
                        <CheckCircle size={18} /> Approve
                      </button>

                      <div className="flex items-center bg-slate-50 border border-slate-200 p-1 rounded-xl focus-within:ring-2 focus-within:ring-rose-500/20 transition-all flex-1 max-w-md">
                        <input
                          placeholder="Note for rejection..."
                          className="bg-transparent px-3 py-1.5 text-sm outline-none flex-1 font-medium"
                          value={rejectReason[p._id] || ""}
                          onChange={(e) =>
                            setRejectReason({
                              ...rejectReason,
                              [p._id]: e.target.value,
                            })
                          }
                        />
                        <button
                          disabled={!rejectReason[p._id]?.trim()}
                          onClick={() => reviewProvider(p._id, "reject")}
                          className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all
    ${
      rejectReason[p._id]?.trim()
        ? "bg-rose-500 hover:bg-rose-600 text-white"
        : "bg-slate-200 text-slate-400 cursor-not-allowed"
    }
  `}
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-slate-400 flex items-center gap-2 text-sm font-medium italic">
                      <Activity size={16} /> Activity logged
                    </div>
                  )}

                  <button
                    onClick={() => confirmDelete(p._id)}
                    className="flex items-center gap-2 text-slate-300 hover:text-rose-600 font-bold text-xs uppercase tracking-widest transition-colors"
                  >
                    <Trash2 size={16} /> Delete Record
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <AnimatePresence>
            {approveModal && (
              <motion.div
                className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9 }}
                  className="bg-white p-8 rounded-2xl w-full max-w-md space-y-5 shadow-xl"
                >
                  <h2 className="text-xl font-black">Approve Provider</h2>

                  {/* Login ID */}
                  <div>
                    <label className="text-sm font-bold">Login ID</label>
                    <input
                      value={approveModal.mobile}
                      readOnly
                      className="w-full border p-3 rounded-lg bg-slate-100 mt-1"
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label className="text-sm font-bold">Create Password</label>

                    <div className="relative mt-1">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        className="w-full border p-3 pr-12 rounded-lg"
                        placeholder="Enter password for provider"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => {
                        setApproveModal(null);
                        setAdminPassword("");
                        setShowPassword(false);
                      }}
                      className="px-4 py-2 bg-slate-200 rounded-lg font-bold"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={async () => {
                        const ok = await reviewProvider(
                          approveModal._id,
                          "approve",
                          adminPassword,
                        );

                        if (ok) {
                          setApproveModal(null);
                          setAdminPassword("");
                        }
                      }}
                      className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-bold"
                    >
                      Confirm Approve
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex flex-col md:flex-row justify-between items-center mt-10 gap-4">
            <p className="text-slate-500 text-sm font-medium">
              Page {currentPage} of {totalPages}
            </p>

            <div className="flex gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="px-5 py-2 border border-slate-200 bg-white rounded-xl text-sm font-bold
                   disabled:opacity-30 hover:bg-slate-50 transition-all"
              >
                Previous
              </button>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-5 py-2 border border-slate-200 bg-white rounded-xl text-sm font-bold
                   disabled:opacity-30 hover:bg-slate-50 transition-all"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Info = ({ icon, label, value }) => (
  <div className="flex items-start gap-4">
    <div className="mt-1 p-2 bg-slate-50 rounded-lg text-slate-400">{icon}</div>
    <div className="min-w-0">
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">
        {label}
      </p>
      <p className="font-bold text-slate-700 truncate">{value || "N/A"}</p>
    </div>
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
      className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border ${styles[status]}`}
    >
      {status}
    </span>
  );
};

export default AdminProviderReview;
