import { useEffect, useState } from "react";
import {
  getTransportProviderRequests,
  sendTransportQuotation,
} from "../api/transportRequestApi";

import { 
  Truck, 
  MapPin, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  CheckCircle2, 
  Wallet, 
  User, 
  Phone, 
  Mail 
} from "lucide-react";

const TABS = ["ALL", "PENDING", "QUOTED", "CONFIRMED"];
const ITEMS_PER_PAGE = 4;

const TransportRequests = () => {
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState({ id: null, type: null });
  const [requests, setRequests] = useState([]);
  const [activeTab, setActiveTab] = useState("ALL");
  const [page, setPage] = useState(1);
  const [acceptReq, setAcceptReq] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const res = await getTransportProviderRequests();
    setRequests(res.data);
  };

  const handleSendQuotation = async (id, amount) => {
    if (!amount || amount <= 0) {
      alert("Please enter valid amount");
      return;
    }
    try {
      setLoading({ id, type: "quote" });
      await sendTransportQuotation(id, { amount });
      const { data } = await getTransportProviderRequests();
      setRequests(data);
      setAcceptReq(null);
      setPrice("");
    } catch (err) {
      alert("Failed to send quotation");
    } finally {
      setLoading({ id: null, type: null });
    }
  };

  const filtered = requests.filter((r) => {
    if (activeTab === "ALL") return true;
    return r.status.toUpperCase() === activeTab;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8 pb-24 font-sans text-slate-900">
      <div className="max-w-5xl mx-auto">
        {/* HEADER SECTION */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 flex items-center gap-3">
              Transport Requests <Truck className="text-indigo-600 w-8 h-8" />
            </h1>
            <p className="text-slate-500 font-medium mt-1">Manage and quote your incoming logistics tasks.</p>
          </div>
          <div className="text-xs font-bold px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full self-start md:self-center border border-indigo-100">
            {filtered.length} Requests Total
          </div>
        </header>

        {/* MODERN TABS */}
        <div className="flex gap-1 bg-white border border-slate-200 rounded-2xl p-1.5 mb-8 shadow-sm overflow-x-auto no-scrollbar">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setPage(1);
              }}
              className={`flex-1 min-w-[100px] px-4 py-2.5 text-sm font-bold rounded-xl transition-all duration-200 ${
                activeTab === tab
                  ? "bg-slate-900 text-white shadow-lg shadow-slate-200"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* REQUEST CARDS */}
        <div className="grid grid-cols-1 gap-6">
          {paginated.map((req) => (
            <div
              key={req._id}
              className="group relative bg-white rounded-3xl shadow-sm border border-slate-200 hover:shadow-xl hover:border-indigo-100 transition-all duration-300 overflow-hidden"
            >
              {/* STATUS ACCENT BAR */}
              <div className={`absolute left-0 top-0 bottom-0 w-1.5 transition-colors duration-300 ${
                req.status === "pending" ? "bg-amber-400" : 
                req.status === "quoted" ? "bg-indigo-500" : 
                req.status === "confirmed" ? "bg-emerald-500" : "bg-slate-300"
              }`} />

              <div className="p-6 md:p-4">
                <div className="flex flex-col md:flex-row justify-between gap-1">
                  
                  {/* LEFT COLUMN: MAIN INFO */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-black text-slate-800">{req.name}</h3>
                      <span className="px-3 py-1 bg-slate-100 text-[10px] uppercase tracking-widest font-black text-slate-600 rounded-lg">
                        {req.service}
                      </span>
                    </div>

                    {/* ROUTE BOX */}
                    <div className="relative space-y-3 p-2 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 w-2 h-2 rounded-full bg-indigo-500 ring-4 ring-indigo-50" />
                        <p className="text-sm leading-tight"><span className="font-bold text-slate-500 block text-[10px] uppercase mb-0.5">Pickup</span> {req.pickupAddress}</p>
                      </div>
                      <div className="absolute left-[21px] top-7 bottom-7 w-px border-l-2 border-dashed border-slate-300" />
                      <div className="flex items-start gap-3">
                        <div className="mt-1 w-2 h-2 rounded-full bg-emerald-500 ring-4 ring-emerald-50" />
                        <p className="text-sm leading-tight"><span className="font-bold text-slate-500 block text-[10px] uppercase mb-0.5">Delivery</span> {req.deliveryAddress}</p>
                      </div>
                    </div>

                    {/* PAYMENT SUMMARY (FOR CONFIRMED) */}
                    {req.status === "confirmed" && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-2 bg-emerald-50/50 border border-emerald-100 rounded-2xl">
                        {req.quotations?.filter(q => q.status === "accepted").map(q => {
                          const total = q.amount;
                          const advance = Math.round(total * 0.2);
                          const remaining = total - advance;
                          return (
                            <>
                              <div key="total">
                                <p className="text-[10px] font-bold text-emerald-700 uppercase">Total</p>
                                <p className="text-lg font-black text-emerald-900">₹{total}</p>
                              </div>
                              <div key="advance">
                                <p className="text-[10px] font-bold text-blue-700 uppercase">Advance (20%)</p>
                                <p className="text-lg font-black text-blue-900">₹{advance}</p>
                              </div>
                              <div key="remain">
                                <p className="text-[10px] font-bold text-orange-700 uppercase">Balance</p>
                                <p className="text-lg font-black text-orange-900">₹{remaining}</p>
                              </div>
                            </>
                          )
                        })}
                      </div>
                    )}
                  </div>

                  {/* RIGHT COLUMN: STATUS & ACTIONS */}
                  <div className="md:w-64 flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-8">
                    
                    {/* STATUS INDICATORS */}
                    <div className="space-y-2">
                      {req.status === "pending" && (
                        <div className="flex flex-col items-center md:items-end">
                          <span className="text-amber-600 bg-amber-50 px-3 py-1 rounded-full text-xs font-bold mb-4 flex items-center gap-1">
                            <Clock size={14} /> New Request
                          </span>
                          <button
                            onClick={() => setAcceptReq(req)}
                            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-100 transition-all transform hover:-translate-y-0.5 active:scale-95"
                          >
                            Send Quote
                          </button>
                        </div>
                      )}

                      {req.status === "quoted" && (
                        <div className="text-center md:text-right">
                          <span className="text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1">
                            <Clock size={14} /> Quote Sent
                          </span>
                          <p className="mt-3 text-sm font-medium text-slate-400 italic">Waiting for client to pay advance...</p>
                        </div>
                      )}

                      {req.status === "confirmed" && (
                        <div className="space-y-4">
                          <span className="text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-fit ml-auto">
                            <CheckCircle2 size={14} /> Confirmed
                          </span>
                          <div className="bg-slate-900 text-white p-4 rounded-2xl space-y-2 shadow-xl">
                             <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                               <User size={12}/> Contact Detail
                             </div>
                             <div className="text-sm space-y-1">
                               <p className="font-bold truncate">{req.name}</p>
                               <p className="text-slate-400 text-xs flex items-center gap-2"><Mail size={12}/> {req.email}</p>
                               <p className="text-slate-400 text-xs flex items-center gap-2"><Phone size={12}/> {req.phone}</p>
                             </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {paginated.length === 0 && (
            <div className="bg-white rounded-3xl p-20 text-center border-2 border-dashed border-slate-200">
               <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="text-slate-300" />
               </div>
               <h3 className="text-slate-900 font-bold">No requests found</h3>
               <p className="text-slate-400 text-sm">There are no items in this category yet.</p>
            </div>
          )}
        </div>

        {/* PREMIUM PAGINATION */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="p-3 rounded-xl bg-white border border-slate-200 text-slate-600 disabled:opacity-30 hover:bg-slate-50 transition-all"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex items-center gap-1 bg-white border border-slate-200 p-1 rounded-xl">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-10 h-10 rounded-lg text-sm font-bold transition-all ${
                    page === i + 1 
                    ? "bg-indigo-600 text-white shadow-md" 
                    : "text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="p-3 rounded-xl bg-white border border-slate-200 text-slate-600 disabled:opacity-30 hover:bg-slate-50 transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      {/* PREMIUM MODAL */}
      {acceptReq && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setAcceptReq(null)} />
          <div className="relative bg-white rounded-[32px] p-8 w-full max-w-sm shadow-2xl transform transition-all scale-100">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
              <Wallet size={24} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">Send Quotation</h3>
            <p className="text-slate-500 text-sm mb-6 font-medium">Enter your best price for this transport request to the client.</p>

            <div className="relative mb-6">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">₹</span>
              <input
                type="number"
                placeholder="0.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl pl-8 pr-4 py-4 focus:border-indigo-500 focus:ring-0 outline-none transition-all font-bold text-lg text-slate-800"
              />
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => handleSendQuotation(acceptReq._id, price)}
                disabled={loading.id === acceptReq._id}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-black shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2"
              >
                {loading.id === acceptReq._id ? "Sending..." : "Submit Quotation"}
              </button>
              <button
                onClick={() => setAcceptReq(null)}
                className="w-full py-4 text-slate-500 font-bold hover:text-slate-700 transition-colors"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransportRequests;