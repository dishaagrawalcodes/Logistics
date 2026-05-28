import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  ArrowLeft, 
  Plus, 
  Search, 
  Globe, 
  CreditCard, 
  Building2,
  CheckCircle2,
  ChevronRight,
  Loader2,
  Hash,
  AlertCircle
} from "lucide-react";

const Pincode = () => {
  const navigate = useNavigate();
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [form, setForm] = useState({ pincode: "", chargeable: false });
  const [pincodes, setPincodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
const [currentPage, setCurrentPage] = useState(1);
const ITEMS_PER_PAGE = 5;

  const fetchBranches = async () => {
    try {
      const res = await API.get("/branch/list");
      setBranches(res.data);
    } catch (err) { console.error(err); }
  };

  const fetchPincodes = async (branchId) => {
    try {
      const res = await API.get(`/pincode/branch/${branchId}`);
      setPincodes(res.data);
    } catch (err) { console.error(err); }
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    if (name === "pincode" && !/^\d*$/.test(value)) return;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedBranch) return;
    if (form.pincode.length !== 6) return;

    setLoading(true);
    try {
      await API.post("/pincode/add", { ...form, branchId: selectedBranch });
      setForm({ pincode: "", chargeable: false });
      fetchPincodes(selectedBranch);
    } catch (err) {
      alert("Failed to add pincode");
    } finally { setLoading(false); }
  };

  const handleBranchChange = (e) => {
    const id = e.target.value;
    setSelectedBranch(id);
    if (id) fetchPincodes(id);
  };

  useEffect(() => { fetchBranches(); }, []);
useEffect(() => {
  setCurrentPage(1);
}, [selectedBranch, searchTerm]);

  const filteredPincodes = pincodes.filter(p => p.pincode.includes(searchTerm));
  const totalPages = Math.ceil(filteredPincodes.length / ITEMS_PER_PAGE);

const paginatedPincodes = filteredPincodes.slice(
  (currentPage - 1) * ITEMS_PER_PAGE,
  currentPage * ITEMS_PER_PAGE
);


  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 pb-20 font-sans">
      {/* --- TOP NAVBAR --- */}
      <div className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="p-2 hover:bg-slate-100 rounded-xl text-slate-500 transition-colors"
            >
              <ArrowLeft size={18} className="md:w-5 md:h-5" />
            </button>
            <div>
              <h1 className="text-lg md:text-xl font-black tracking-tight leading-none">Service Areas</h1>
              <p className="text-[9px] md:text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Registry</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 md:px-4 md:py-2.5 rounded-xl md:rounded-2xl border border-slate-200 focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
            <Search size={14} className="text-slate-400 md:w-[18px] md:h-[18px]" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-transparent border-none outline-none text-xs md:text-sm w-24 sm:w-48 font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 md:gap-8">
          
          {/* --- LEFT: CONFIGURATION PANEL --- */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="xl:col-span-4"
          >
            <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-8 shadow-xl shadow-slate-200/50 border border-white sticky top-24 md:top-28">
              <div className="mb-6 md:mb-8">
                <div className="h-10 w-10 md:h-12 md:w-12 bg-indigo-600 rounded-xl md:rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 mb-3 md:mb-4">
                  <Globe size={20} className="md:w-6 md:h-6" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold">Register Zone</h2>
                <p className="text-slate-500 text-xs md:text-sm mt-1">Map postal codes to operational hubs.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="space-y-1 md:space-y-2">
                  <label className="text-[10px] md:text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Parent Branch</label>
                  <div className="relative group">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <select
                      value={selectedBranch}
                      onChange={handleBranchChange}
                      className="w-full pl-11 pr-4 py-3 md:py-4 bg-slate-50 border border-slate-200 rounded-xl md:rounded-2xl focus:ring-4 focus:ring-indigo-500/10 outline-none font-bold text-slate-700 text-sm md:text-base appearance-none"
                      required
                    >
                      <option value="">Select Location</option>
                      {branches.map(b => <option key={b._id} value={b._id}>{b.branchName}</option>)}
                    </select>
                  </div>
                </div>

                <div className="space-y-1 md:space-y-2">
                  <label className="text-[10px] md:text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Pincode</label>
                  <div className="relative group">
                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      name="pincode"
                      placeholder="6 Digit Code"
                      value={form.pincode}
                      onChange={handleChange}
                      maxLength="6"
                      className="w-full pl-11 pr-4 py-3 md:py-4 bg-slate-50 border border-slate-200 rounded-xl md:rounded-2xl focus:ring-4 focus:ring-indigo-500/10 outline-none font-black text-slate-800 text-sm md:text-lg"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1 md:space-y-2">
                  <label className="text-[10px] md:text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Fee Config</label>
                  <label className={`flex items-center justify-between p-3 md:p-4 rounded-xl md:rounded-2xl cursor-pointer border-2 transition-all ${form.chargeable ? 'bg-amber-50 border-amber-200' : 'bg-slate-50 border-slate-100'}`}>
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className={`p-1.5 md:p-2.5 rounded-lg md:rounded-xl transition-colors ${form.chargeable ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
                        <CreditCard size={14} className="md:w-[18px] md:h-[18px]" />
                      </div>
                      <div>
                        <span className="font-bold text-slate-800 text-xs md:text-sm block leading-none">Surcharge</span>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      name="chargeable"
                      checked={form.chargeable}
                      onChange={handleChange}
                      className="w-5 h-5 md:w-6 md:h-6 accent-amber-500 rounded-lg cursor-pointer"
                    />
                  </label>
                </div>

                <button
                  disabled={loading || !selectedBranch || form.pincode.length !== 6}
                  className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-black py-3 md:py-4 rounded-xl md:rounded-2xl shadow-xl transition-all active:scale-[0.98] disabled:opacity-30 text-sm md:text-base flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="animate-spin" size={18} /> : <Plus size={18} />}
                  Add Area
                </button>
              </form>
            </div>
          </motion.div>

          {/* --- RIGHT: LIVE REGISTRY --- */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="xl:col-span-8"
          >
            <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-white overflow-hidden min-h-[400px] md:min-h-[600px] flex flex-col">
              <div className="p-6 md:p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="h-10 w-10 md:h-12 md:w-12 bg-white rounded-xl md:rounded-2xl flex items-center justify-center text-slate-600 shadow-sm border border-slate-100">
                    <MapPin size={20} className="md:w-6 md:h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base md:text-xl">Registry</h3>
                    <p className="hidden xs:block text-[10px] md:text-sm text-slate-400 font-semibold uppercase md:normal-case tracking-widest md:tracking-normal">{filteredPincodes.length} Active Hubs</p>
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <AnimatePresence mode="wait">
                  {!selectedBranch ? (
                    <div className="h-64 md:h-full flex flex-col items-center justify-center p-10 text-center">
                      <Building2 size={32} className="md:w-12 md:h-12 text-slate-200 mb-4" />
                      <p className="text-xs md:text-sm font-bold text-slate-400">Select a branch to view zones</p>
                    </div>
                  ) : filteredPincodes.length === 0 ? (
                    <div className="p-20 text-center">
                      <AlertCircle size={32} className="text-slate-200 mx-auto mb-4" />
                      <p className="font-bold text-slate-400">No areas found.</p>
                    </div>
                  ) : (
                    <>
                      {/* --- DESKTOP TABLE VIEW (Visible on tablets and up) --- */}
                      <div className="hidden sm:block overflow-x-auto">
                        <table className="w-full text-left">
                          <thead className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-50">
                            <tr>
                              <th className="px-8 py-5">Status</th>
                              <th className="px-8 py-5">Identity</th>
                              <th className="px-8 py-5 text-right">Service Tier</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-50">
                            {paginatedPincodes.map((p) => (
                              <tr key={p._id} className="hover:bg-slate-50/80 transition-all">
                                <td className="px-8 py-6">
                                  <div className="flex items-center gap-2 text-[11px] font-black text-emerald-500 uppercase tracking-widest">
                                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    Active Hub
                                  </div>
                                </td>
                                <td className="px-8 py-6">
                                  <span className="font-black text-slate-800 text-lg tracking-tight">#{p.pincode}</span>
                                </td>
                                <td className="px-8 py-6 text-right">
                                  <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border shadow-sm ${p.chargeable ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
                                    {p.chargeable ? 'Surcharge' : 'Standard'}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* --- MOBILE CARD VIEW (Visible on phones only) --- */}
                      <div className="sm:hidden grid grid-cols-1 divide-y divide-slate-50">
                        {paginatedPincodes.map((p) => (
                          <div key={p._id} className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-black">
                                <Hash size={16} />
                              </div>
                              <div>
                                <p className="font-black text-slate-900 text-base tracking-tight">{p.pincode}</p>
                                <div className="flex items-center gap-1 text-[9px] font-black uppercase text-emerald-500">
                                  <div className="h-1 w-1 rounded-full bg-emerald-500" /> Hub Active
                                </div>
                              </div>
                            </div>
                            <span className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border ${p.chargeable ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
                              {p.chargeable ? 'Surcharge' : 'Standard'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </AnimatePresence>
                {totalPages > 1 && (
  <div className="flex justify-center gap-2 p-6 border-t">
    <button
      onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
      disabled={currentPage === 1}
      className="px-4 py-2 border rounded-lg text-sm font-bold disabled:opacity-30"
    >
      Prev
    </button>

    <span className="px-3 py-2 text-sm font-bold">
      Page {currentPage} / {totalPages}
    </span>

    <button
      onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
      disabled={currentPage === totalPages}
      className="px-4 py-2 border rounded-lg text-sm font-bold disabled:opacity-30"
    >
      Next
    </button>
  </div>
)}

              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Pincode;