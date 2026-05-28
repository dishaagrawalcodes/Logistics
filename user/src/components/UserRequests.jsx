import { useEffect, useState } from "react";
import {
  getUserRequests,
  createAdvanceOrder,
  verifyAdvancePayment,
  userRejectQuotation,
} from "../api/serviceRequestApi";
import { getUserTransportRequests } from "../api/transportRequestApi";
import {
  createTransportOrder,
  verifyTransportAdvancePayment,
} from "../api/transportRequestApi";

import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  MapPin, 
  IndianRupee, 
  ArrowRight,
  Loader2 
} from "lucide-react";
import toast from "react-hot-toast";

const TABS = ["ALL", "PENDING", "QUOTED", "CONFIRMED"];

const UserRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [activeTab, setActiveTab] = useState("ALL");

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
  try {
    const serviceRes = await getUserRequests();
    const transportRes = await getUserTransportRequests();

    const combined = [
  ...serviceRes.data.map((r) => ({
    ...r,
    type: "service",
  })),
  ...transportRes.data.map((r) => ({
    ...r,
    type: "transport",
  })),
];


    setRequests(combined);
  } catch (err) {
    toast.error("Failed to load requests");
  }
};


  const filteredRequests = requests.filter((req) => {
    if (activeTab === "ALL") return true;
    return req.status?.toLowerCase() === activeTab.toLowerCase();
  });

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleAccept = async (request, providerId, amount) => {
  if (!amount || amount <= 0) {
    toast.error("Invalid amount");
    return;
  }

  try {
    setLoadingId(providerId);

    const res = await loadRazorpay();
    if (!res) {
      toast.error("Razorpay failed to load");
      return;
    }

    const isTransport = request.type === "transport";

    const { data } = isTransport
      ? await createTransportOrder({
          requestId: request._id,
          providerId,
        })
      : await createAdvanceOrder({
          requestId: request._id,
          providerId,
        });

    const options = {
      key: data.key,
      amount: data.amount,
      currency: "INR",
      name: " Platform",
      description: "Advance Payment (20%)",
      order_id: data.orderId,
      handler: async function (response) {
        try {
          await (isTransport
            ? verifyTransportAdvancePayment({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                requestId: request._id,
                providerId,
              })
            : verifyAdvancePayment({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                requestId: request._id,
                providerId,
              }));

          toast.success("Payment successful 🎉");
          fetchRequests();
        } catch (err) {
          toast.error("Payment verification failed");
        }
      },
      theme: { color: "#2563eb" },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  } catch (err) {
    toast.error("Payment failed");
  } finally {
    setLoadingId(null);
  }
};


  const handleReject = async (requestId, providerId) => {
    try {
      await userRejectQuotation(requestId, { providerId });
      toast.success("Quotation declined");
      fetchRequests();
    } catch (err) {
      toast.error("Failed to reject quotation");
    }
  };

  if (requests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Clock className="w-10 h-10 text-slate-300 mb-2" />
        <h3 className="text-lg font-medium text-slate-700">No requests found</h3>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-1 md:p-2">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h1 className="text-xl font-bold text-slate-800 tracking-tight">Manage Your Requests</h1>
        
        {/* COMPACT TABS */}
        <div className="flex bg-slate-100 p-1 rounded-lg w-fit">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${
                activeTab === tab
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredRequests.map((req) => (
          <div
            key={req._id}
            className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
          >
            {/* COMPACT HEADER */}
            <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-start bg-slate-50/30">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-slate-900 leading-none uppercase text-sm md:text-base">
                    {req.service}
                  </h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                    req.status === 'confirmed' ? 'bg-green-100 text-green-700' : 
                    req.status === 'pending' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {req.status}
                  </span>
                </div>
                <div className="flex items-center text-slate-500 text-xs gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>PIN: {req.pin || req.pincode}</span>
                </div>
              </div>
              
              <div className="text-right flex flex-col items-end">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Request ID</span>
                  <span className="text-xs font-mono font-medium text-slate-600 tracking-tighter">
                    #{req._id.slice(-6).toUpperCase()}
                  </span>
              </div>
            </div>

            {/* QUOTATIONS SECTION */}
            <div className="p-4">
              {req.quotations?.length > 0 ? (
                <div className="space-y-2">
                  {req.quotations.map((q) => (
                    <div
                      key={q._id}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-3 rounded-lg border border-slate-100 bg-white hover:border-blue-200 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                          <IndianRupee className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-lg font-bold text-slate-900 leading-tight">
                            ₹{q.amount}
                          </div>
                          <p className="text-[11px] text-slate-500">
                            20% Advance: <span className="font-semibold text-blue-600">₹{(q.amount * 0.2).toFixed(0)}</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        {q.status === "sent" && req.status !== "confirmed" && (
                          <>
                            <button
                              onClick={() => handleAccept(req, q.provider._id, q.amount)}
                              disabled={loadingId === q.provider._id}
                              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-all disabled:opacity-50"
                            >
                              {loadingId === q.provider._id ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              ) : (
                                <CheckCircle className="w-3.5 h-3.5" />
                              )}
                              Accept
                            </button>
                            <button
                              onClick={() => handleReject(req._id, q.provider._id)}
                              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold rounded-lg transition-all"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              Decline
                            </button>
                          </>
                        )}

                        {q.status === "accepted" && (
                          <div className="text-[11px] font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-md border border-green-100">
                            ACCEPTED & PAID
                          </div>
                        )}

                        {q.status === "rejected" && (
                          <div className="text-[11px] font-bold text-slate-400 bg-slate-50 px-3 py-1.5 rounded-md border border-slate-100 uppercase">
                            Declined
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-6 border-2 border-dashed border-slate-100 rounded-xl text-center">
                    <p className="text-xs text-slate-400 font-medium">Waiting for service providers to send quotes...</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserRequests;