import { useEffect, useState } from "react";
import API from "../api/axios";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { 
  CheckCircle, 
  XCircle, 
  Calendar, 
  Mail, 
  Phone, 
  MapPin, 
  User, 
  Loader2,
  ChevronLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MessageSquare } from "lucide-react";


export default function AdminEventReview() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [rejectId, setRejectId] = useState(null);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("PENDING");
  const [actionLoading, setActionLoading] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

 const ITEMS_PER_PAGE = 3;

  const loadEvents = async () => {
    try {
      const res = await API.get("/events/all");
      setEvents(res.data);
    } catch {
      toast.error("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const approve = async (id) => {
    const loadingToast = toast.loading("Processing approval...");
    try {
      setActionLoading(id);
      await API.put(`/events/accept/${id}`);
      setEvents(prev =>
        prev.map(e => e._id === id ? { ...e, status: "ACCEPTED" } : e)
      );
      toast.success("Event approved successfully!", { id: loadingToast });
    } catch {
      toast.error("Approval failed", { id: loadingToast });
    } finally {
      setActionLoading(null);
    }
  };

  const reject = async () => {
    if (!reason.trim()) return toast.error("Please provide a reason");
    
    const loadingToast = toast.loading("Processing rejection...");
    try {
      setActionLoading(rejectId);
      await API.put(`/events/reject/${rejectId}`, { reason });
      setEvents(prev =>
        prev.map(e => e._id === rejectId ? { ...e, status: "REJECTED" } : e)
      );
      toast.success("Event rejected successfully", { id: loadingToast });
      setRejectId(null);
      setReason("");
    } catch {
      toast.error("Rejection failed", { id: loadingToast });
    } finally {
      setActionLoading(null);
    }
  };

  const filtered = events.filter(e =>
  filter === "ALL" ? true : e.status === filter
);

const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

const paginatedEvents =
  filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

useEffect(() => {
  setCurrentPage(1);
}, [filter]);
useEffect(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
}, [currentPage]);

  const getStatusStyle = (status) => {
    const styles = {
      PENDING: "bg-amber-50 text-amber-700 border-amber-100",
      ACCEPTED: "bg-emerald-50 text-emerald-700 border-emerald-100",
      REJECTED: "bg-rose-50 text-rose-700 border-rose-100"
    };
    return styles[status] || "bg-gray-50 text-gray-700 border-gray-100";
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <Loader2 className="animate-spin text-indigo-600" size={40} />
    </div>
  );

  return (
    <div className="p-4 md:p-10 bg-[#F8FAFC] min-h-screen text-slate-900 font-sans">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all shadow-sm active:scale-95"
            >
              <ChevronLeft size={20} />
            </button>
            <div>
              <h1 className="text-3xl font-black tracking-tight text-slate-900">Event Requests</h1>
              <p className="text-slate-500 mt-1 font-medium text-sm">Review and manage upcoming event applications</p>
            </div>
          </div>

          <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-slate-200 overflow-x-auto no-scrollbar">
            {["ALL", "PENDING", "ACCEPTED", "REJECTED"].map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-200 whitespace-nowrap ${
                  filter === s
                    ? "bg-slate-900 text-white shadow-lg shadow-slate-200"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </header>

        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-16 rounded-[2.5rem] border border-slate-200 shadow-sm text-center"
            >
              <Calendar className="text-slate-200 mx-auto mb-4" size={48} />
              <h3 className="text-lg font-bold text-slate-800">No {filter.toLowerCase()} requests</h3>
            </motion.div>
          ) : (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {paginatedEvents.map((ev) => (
                <motion.div
                  key={ev._id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-7 hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600">
                      <Calendar size={20} />
                    </div>
                    <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full border ${getStatusStyle(ev.status)}`}>
                      {ev.status}
                    </span>
                  </div>

                  <h2 className="font-black text-xl text-slate-800 mb-6 tracking-tight">{ev.eventType}</h2>

                  <div className="space-y-4 mb-8 flex-grow">
                    <InfoRow icon={<User size={14}/>} label="Client" value={ev.name} />
                    <InfoRow icon={<Mail size={14}/>} label="Email" value={ev.email} />
                    <InfoRow icon={<Phone size={14}/>} label="Mobile" value={ev.mobile} />
                    <InfoRow icon={<MapPin size={14}/>} label="Address" value={ev.address} />
                     <InfoRow icon={<MessageSquare size={14}/>} label="Message" value={ev.message?.trim() || "N/A"} />
                  </div>

                  {ev.status === "PENDING" && (
                    <div className="flex items-center gap-3">
                      <button
                        disabled={actionLoading === ev._id}
                        onClick={() => approve(ev._id)}
                        className="flex-[2] bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-2xl font-bold text-sm shadow-lg shadow-indigo-100 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                      >
                        {actionLoading === ev._id ? <Loader2 className="animate-spin" size={16} /> : <><CheckCircle size={18} /> Approve</>}
                      </button>

                      <button
                        onClick={() => setRejectId(ev._id)}
                        className="flex-1 bg-rose-50 hover:bg-rose-100 text-rose-600 py-3.5 rounded-2xl border border-rose-100 transition-all active:scale-95 flex items-center justify-center gap-2 font-bold text-sm"
                      >
                        <XCircle size={18} /> Reject
                      </button>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
{/* PAGINATION */}
{totalPages > 1 && (
  <div className="flex flex-col md:flex-row justify-between items-center mt-12 gap-4">

    <p className="text-slate-500 text-sm font-medium">
      Page {currentPage} of {totalPages}
    </p>

    <div className="flex gap-2">

      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(p => p - 1)}
        className="px-5 py-2 border border-slate-200 bg-white rounded-xl text-sm font-bold
                   disabled:opacity-30 hover:bg-slate-50 transition-all"
      >
        Previous
      </button>

      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(p => p + 1)}
        className="px-5 py-2 border border-slate-200 bg-white rounded-xl text-sm font-bold
                   disabled:opacity-30 hover:bg-slate-50 transition-all"
      >
        Next
      </button>

    </div>
  </div>
)}

        <AnimatePresence>
          {rejectId && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-50 p-6"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-white p-8 rounded-[2rem] w-full max-w-md shadow-2xl"
              >
                <h3 className="text-2xl font-black mb-2 tracking-tight">Reject Request</h3>
                <p className="text-slate-500 text-sm mb-6">Please provide a reason for rejection. This will be visible to the user.</p>

                <textarea
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                  className="w-full border border-slate-200 rounded-2xl p-4 h-32 focus:ring-4 focus:ring-indigo-50 outline-none transition-all bg-slate-50 font-medium text-sm"
                  placeholder="e.g. Venue is booked for another event..."
                />

                <div className="flex gap-4 mt-8">
                  <button onClick={() => setRejectId(null)} className="flex-1 py-4 font-bold text-slate-400 hover:text-slate-600 transition-colors">Cancel</button>
                  <button onClick={reject} className="flex-1 bg-rose-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-rose-100 active:scale-95 transition-all">Reject</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-1 text-slate-300 shrink-0">{icon}</div>
      <div className="min-w-0">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">{label}</p>
        <p className="text-sm font-semibold text-slate-700 truncate">{value || "N/A"}</p>
      </div>
    </div>
  );
}