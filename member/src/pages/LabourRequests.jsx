import { useEffect, useState } from "react";
import {
  getLabourRequests,
  sendQuotation,
} from "../api/serviceRequestApi";


const TABS = ["ALL", "PENDING", "QUOTED", "CONFIRMED"];


const ITEMS_PER_PAGE = 4;

const LabourRequests = () => {
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState({
  id: null,
  type: null, 
});

  const [requests, setRequests] = useState([]);
  const [activeTab, setActiveTab] = useState("ALL");

  const [page, setPage] = useState(1);
  

const [acceptReq, setAcceptReq] = useState(null);


  useEffect(() => {
    getLabourRequests().then((res) => setRequests(res.data));
  }, []);

  const handleAccept = async (id, amount) => {
  if (!amount || amount <= 0) {
    alert("Please enter valid amount");
    return;
  }

  try {
    setLoading({ id, type: "quote" });

    await sendQuotation(id, { amount });

   
    const { data } = await getLabourRequests();
    setRequests(data);

    closeAcceptPopup();
    setPrice("");

  } catch (err) {
    alert("Failed to send quotation");
  } finally {
    setLoading({ id: null, type: null });
  }
};









const openAcceptPopup = (req) => setAcceptReq(req);
const closeAcceptPopup = () => setAcceptReq(null);



  const filtered = requests.filter((r) => {
  if (activeTab === "ALL") return true;
  return r.status?.toLowerCase() === activeTab.toLowerCase();
});


  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className="p-4 md:p-6 mb-24 max-w-5xl mx-auto">
      <h2 className="text-2xl font-black mb-5 text-slate-800">
        Service Requests
      </h2>

      {/* TABS */}
      <div className="flex gap-2 bg-white border border-slate-200 rounded-xl p-1 mb-6 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setPage(1);
            }}
            className={`px-4 py-2 text-xs md:text-sm font-bold rounded-lg whitespace-nowrap transition ${
              activeTab === tab
                ? "bg-slate-900 text-white"
                : "text-slate-500 hover:bg-slate-100"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* CARDS */}
      <div className="space-y-4">
        {paginated.map((req) => (
         <div
  key={req._id}
  className="relative flex gap-4 bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden"
>
  {/* STATUS BAR */}
  <div
  className={`w-1.5 ${
    req.status === "pending"
      ? "bg-blue-500"
      : req.status === "quoted"
      ? "bg-indigo-500"
      : req.status === "confirmed"
      ? "bg-emerald-500"
      : "bg-slate-400"
  }`}
/>



  {/* CONTENT */}
  <div className="flex-1 p-5 flex flex-col gap-2">
    <div className="flex justify-between items-start">
  <div>
   <h3 className="text-sm font-bold text-slate-800">
  {req.user?.name}
</h3>

{/* ================= CONFIRMED VIEW ================= */}
{req.status === "confirmed" && (
  <div className="mt-4 space-y-4">

    {/* 🧾 PAYMENT SUMMARY */}
    {req.quotations
      .filter((q) => q.status === "accepted")
      .map((q) => {
        const total = q.amount;
        const advance = Math.round(total * 0.2);
        const remaining = total - advance;

        return (
          <div
            key={q._id}
            className="p-4 bg-green-50 rounded-xl border border-green-200"
          >
            <div className="font-semibold text-green-700 mb-2">
              🧾 Payment Summary
            </div>

            <div className="text-sm">Total Amount: ₹{total}</div>
            <div className="text-blue-600 text-sm">
              Advance Paid (20%): ₹{advance}
            </div>
            <div className="text-orange-600 font-medium text-sm">
              Remaining (80%): ₹{remaining}
            </div>
          </div>
        );
      })}

    {/* 👤 CUSTOMER CONTACT DETAILS */}
    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
      <div className="font-semibold text-slate-700 mb-2">
        👤 Customer Contact Details
      </div>
      <div className="text-sm text-slate-600">
        <div>Email: {req.user?.email}</div>
<div>Phone: {req.user?.mobile}</div>
<div>Pincode: {req.pin}</div>

      </div>
    </div>

    

  </div>
)}

  </div>

  {/* ✅ STATUS BADGE */}
  <span
    className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase ${
      req.status === "pending"
        ? "bg-blue-100 text-blue-600"
        : req.status === "quoted"
        ? "bg-indigo-100 text-indigo-600"
        : req.status === "confirmed"
        ? "bg-emerald-100 text-emerald-600"
        : "bg-slate-200 text-slate-600"
    }`}
  >
    {req.status}
  </span>
</div>


    {/* MESSAGE */}
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-700">
      Hi 👋 I need <b>{req.service}</b>. Please accept my request.
    </div>

    {/* ACTIONS */}
    {req.status === "pending" && (
  <div className="flex justify-end mt-3">
    <button
      onClick={() => openAcceptPopup(req)}
      className="px-4 py-1.5 text-sm rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
    >
      Enter Amount
    </button>
  </div>
)}

  </div>
</div>

        ))}

        {paginated.length === 0 && (
          <p className="text-center text-slate-400 text-sm py-10">
            No requests found
          </p>
        )}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="w-10 h-10 rounded-full bg-slate-200 disabled:opacity-40 flex items-center justify-center"
          >
            ‹
          </button>

          <div className="flex items-center gap-2 text-sm font-semibold">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition ${
                  page === i + 1
                    ? "bg-indigo-600 text-white shadow-md"
                    : "hover:bg-slate-100 text-slate-600"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="w-10 h-10 rounded-full bg-slate-200 disabled:opacity-40 flex items-center justify-center"
          >
            ›
          </button>
        </div>
      )}
     {acceptReq && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
      <h3 className="font-black text-lg mb-2">
  Send Quotation
</h3>


      <p className="text-sm text-slate-600 mb-3">
        Enter service amount for <b>{acceptReq.service}</b>
      </p>

      {/* ✅ AMOUNT INPUT */}
      <input
        type="number"
        placeholder="Enter amount"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full border rounded-lg px-3 py-2 mb-4"
      />

      <div className="flex gap-2">
        <button
  disabled={loading.id === acceptReq._id}
  onClick={() => handleAccept(acceptReq._id, price)}

  className="flex-1 bg-emerald-600 text-white py-2 rounded-xl font-bold disabled:opacity-50"
>
  {loading.id === acceptReq._id ? "Sending..." : "Confirm"}
</button>


        <button
          onClick={closeAcceptPopup}
          className="flex-1 bg-slate-200 py-2 rounded-xl font-bold"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}



    </div>
  );
};

export default LabourRequests;
