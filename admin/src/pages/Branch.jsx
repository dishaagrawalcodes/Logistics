import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  MapPin, 
  Hash, 
  ArrowLeft, 
  Building2, 
  Search, 
  Loader2,
  Map,
  ChevronRight
} from "lucide-react";

const Branch = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ branchName: "", address: "", pincode: "" });
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pincodeError, setPincodeError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const ITEMS_PER_PAGE = 4;
const [currentPage, setCurrentPage] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "pincode") {
      if (!/^\d*$/.test(value)) return;
      if (value.length !== 6 && value.length > 0) {
        setPincodeError("Pincode must be exactly 6 digits");
      } else {
        setPincodeError("");
      }
    }
    setForm({ ...form, [name]: value });
  };

  const fetchBranches = async () => {
    try {
      const res = await API.get("/branch/list");
      setBranches(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.pincode.length !== 6) {
      setPincodeError("Pincode must be exactly 6 digits");
      return;
    }
    setLoading(true);
    try {
      await API.post("/branch/add", form);
      setForm({ branchName: "", address: "", pincode: "" });
      fetchBranches();
      setPincodeError("");
    } catch (error) {
      alert("Failed to add branch");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);
  useEffect(() => {
  setCurrentPage(1);
}, [searchTerm]);

 const filteredBranches = branches.filter(b => 
  b.branchName.toLowerCase().includes(searchTerm.toLowerCase()) || 
  b.pincode.includes(searchTerm)
);

const totalPages = Math.ceil(filteredBranches.length / ITEMS_PER_PAGE);

const paginatedBranches = filteredBranches.slice(
  (currentPage - 1) * ITEMS_PER_PAGE,
  currentPage * ITEMS_PER_PAGE
);


  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-900 pb-20 font-sans">
      {/* --- TOP HEADER --- */}
      <div className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <h1 className="text-lg md:text-xl font-black tracking-tight leading-none">Branch Registry</h1>
              <p className="hidden xs:block text-[9px] md:text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Network Infrastructure</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 md:py-2.5 rounded-xl border border-slate-200 focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
            <Search size={16} className="text-slate-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-transparent border-none outline-none text-xs md:text-sm w-24 sm:w-48 md:w-64 font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 md:gap-8">
          
          {/* --- LEFT: FORM PANEL --- */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="xl:col-span-4"
          >
            <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 shadow-xl shadow-slate-200/60 border border-white xl:sticky xl:top-28">
              <div className="mb-6 md:mb-8">
                <div className="h-10 w-10 md:h-12 md:w-12 bg-indigo-600 rounded-xl md:rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 mb-4">
                  <Plus size={20} />
                </div>
                <h2 className="text-xl md:text-2xl font-bold">Add New Branch</h2>
                <p className="text-slate-500 text-xs md:text-sm mt-1 leading-relaxed">Register a new physical hub.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Branch Identity</label>
                  <div className="relative group">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={16} />
                    <input
                      name="branchName"
                      placeholder="Manhattan Central"
                      value={form.branchName}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 md:py-4 bg-slate-50 border border-slate-200 rounded-xl md:rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all outline-none font-semibold text-sm md:text-base"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Logistics Address</label>
                  <div className="relative group">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={16} />
                    <input
                      name="address"
                      placeholder="Street, City"
                      value={form.address}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 md:py-4 bg-slate-50 border border-slate-200 rounded-xl md:rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all outline-none font-semibold text-sm md:text-base"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Postal Code</label>
                  <div className="relative group">
                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={16} />
                    <input
                      name="pincode"
                      placeholder="6 digits"
                      value={form.pincode}
                      onChange={handleChange}
                      maxLength={6}
                      className={`w-full pl-11 pr-4 py-3 md:py-4 bg-slate-50 border rounded-xl md:rounded-2xl focus:ring-4 transition-all outline-none font-semibold text-sm md:text-base
                        ${pincodeError ? "border-rose-500 focus:ring-rose-500/10" : "border-slate-200 focus:ring-indigo-500/10 focus:border-indigo-500"}`}
                      required
                    />
                  </div>
                  {pincodeError && <p className="text-rose-500 text-[10px] font-bold mt-1 ml-1">{pincodeError}</p>}
                </div>

                <button
                  disabled={loading || pincodeError}
                  className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-black py-3.5 md:py-4 rounded-xl md:rounded-2xl shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 text-sm md:text-base mt-2"
                >
                  {loading ? <Loader2 className="animate-spin" size={18} /> : "Save Branch"}
                </button>
              </form>
            </div>
          </motion.div>

          {/* --- RIGHT: DATA PANEL --- */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="xl:col-span-8"
          >
            <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-xl shadow-slate-200/60 border border-white overflow-hidden">
              <div className="p-6 md:p-8 border-b border-slate-50 flex items-center gap-4">
                <div className="h-10 w-10 md:h-12 md:w-12 bg-slate-100 rounded-xl md:rounded-2xl flex items-center justify-center text-slate-600">
                  <Map size={20} md:size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg md:text-xl text-slate-900">Operational Hubs</h3>
                  <p className="text-xs md:text-sm text-slate-400 font-semibold">{branches.length} Registered Nodes</p>
                </div>
              </div>

              {/* DESKTOP TABLE VIEW */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-slate-400 text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-black border-b border-slate-50">
                      <th className="px-8 py-5">Identity & Location</th>
                      <th className="px-8 py-5 text-right">Postal & Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    <AnimatePresence mode="popLayout">
                      {paginatedBranches.map((b) => (
                        <motion.tr 
                          key={b._id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="group hover:bg-slate-50/80 transition-all"
                        >
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <div className="h-10 w-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-black text-xs shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-colors shrink-0">
                                  {b.branchName.substring(0, 2).toUpperCase()}
                              </div>
                              <div className="min-w-0">
                                <span className="font-black text-slate-900 text-base block truncate group-hover:text-indigo-600 transition-colors">{b.branchName}</span>
                                <div className="flex items-start gap-1 mt-0.5">
                                  <MapPin size={12} className="text-indigo-500 mt-1 shrink-0" />
                                  <span className="text-slate-800 text-[13px] font-bold leading-tight line-clamp-1 italic">
                                    {b.address}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6 text-right whitespace-nowrap">
                              <div className="flex flex-col items-end gap-1.5">
                                  <span className="inline-flex items-center gap-1 py-1 px-2.5 rounded-full bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase tracking-widest border border-emerald-100">
                                      <span className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse"></span>
                                      Live Node
                                  </span>
                                  <span className="text-xs font-black text-slate-900 bg-slate-100 px-2 py-1 rounded-lg border border-slate-200 flex items-center gap-1">
                                      <Hash size={12} className="text-slate-400" /> {b.pincode}
                                  </span>
                              </div>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>

              {/* MOBILE CARD VIEW */}
              <div className="block sm:hidden divide-y divide-slate-50">
                <AnimatePresence mode="popLayout">
                  {filteredBranches.length === 0 ? (
                    <div className="p-12 text-center opacity-30 flex flex-col items-center">
                        <Search size={40} className="mb-2" />
                        <p className="font-black">No Results</p>
                    </div>
                  ) : (
                    paginatedBranches.map((b) => (
                      <motion.div 
                        key={b._id} 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-5 flex items-start gap-4 active:bg-slate-50 transition-colors"
                      >
                         <div className="h-12 w-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 border border-indigo-100">
                            {b.branchName.substring(0, 2).toUpperCase()}
                         </div>
                         <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                                <span className="font-black text-slate-900 truncate pr-2">{b.branchName}</span>
                                <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">#{b.pincode}</span>
                            </div>
                            <div className="flex items-start gap-1 mb-3">
                                <MapPin size={12} className="text-slate-400 mt-0.5 shrink-0" />
                                <p className="text-[12px] font-bold text-slate-800 leading-tight italic">{b.address}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="inline-flex items-center gap-1 py-0.5 px-2 rounded-full bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase tracking-widest border border-emerald-100">
                                    <span className="h-1 w-1 rounded-full bg-emerald-500"></span>
                                    Operational Hub
                                </span>
                                <ChevronRight size={14} className="text-slate-300" />
                            </div>
                         </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
                
              </div>
              {/* PAGINATION */}
{totalPages > 1 && (
  <div className="flex items-center justify-center gap-2 p-6 border-t border-slate-100">
    
    <button
      onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
      disabled={currentPage === 1}
      className="px-3 py-1.5 text-xs font-bold rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-slate-50"
    >
      Prev
    </button>

    {[...Array(totalPages)].map((_, i) => (
      <button
        key={i}
        onClick={() => setCurrentPage(i + 1)}
        className={`px-3 py-1.5 text-xs font-bold rounded-lg border
          ${currentPage === i + 1
            ? "bg-indigo-600 text-white border-indigo-600"
            : "border-slate-200 hover:bg-slate-50"
          }`}
      >
        {i + 1}
      </button>
    ))}

    <button
      onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
      disabled={currentPage === totalPages}
      className="px-3 py-1.5 text-xs font-bold rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-slate-50"
    >
      Next
    </button>

  </div>
)}
            </div>
          </motion.div>
          
        </div>
      </div>
      

    </div>
  );
};

export default Branch;