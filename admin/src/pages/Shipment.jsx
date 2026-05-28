import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Package, 
  Navigation, 
  Box, 
  Search, 
  ChevronLeft, 
  MapPin, 
  CheckCircle2, 
  XCircle, 
  Clock,
  ArrowRight
} from "lucide-react";

const ITEMS_PER_PAGE = 3;

const Shipment = () => {
  const navigate = useNavigate();
  const [shipments, setShipments] = useState([]);
  const [selected, setSelected] = useState(null);
  const [shipmentNo, setShipmentNo] = useState("");
  const [rejectReason, setRejectReason] = useState("");
  const [stationInputs, setStationInputs] = useState({});
  const [showAccept, setShowAccept] = useState(false);
  const [showReject, setShowReject] = useState(false);
  const [showDeliver, setShowDeliver] = useState(false);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [advancePayment, setAdvancePayment] = useState("");
const [remainingPayment, setRemainingPayment] = useState("");
const [loading, setLoading] = useState(false);
const [errors, setErrors] = useState({});

const [assignMode, setAssignMode] = useState("AUTO");

const [manualDriver, setManualDriver] = useState({
  name: "",
  phone: "",
  email: "",
  vehicleNo: ""
});

  const fetchShipments = async () => {
    try {
      const res = await axios.get("/shipment/all", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setShipments(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchShipments(); }, []);

  const filteredShipments = shipments.filter((s) => {
    const matchesStatus = statusFilter === "ALL" || 
      (statusFilter === "ACCEPTED" && ["ACCEPTED", "STARTED", "IN_PROGRESS"].includes(s.status)) || 
      s.status === statusFilter;
    const matchesSearch = s.name?.toLowerCase().includes(search.toLowerCase()) ||
      s.pickupAddress?.toLowerCase().includes(search.toLowerCase()) ||
      s.deliveryAddress?.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalPages = Math.ceil(filteredShipments.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedShipments = filteredShipments.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => { setCurrentPage(1); }, [statusFilter, search]);
const isValidPhone = (p) => /^\d{10}$/.test(p);
const isValidEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
const isValidShipmentNo = (s) => /^[A-Za-z0-9-]{4,20}$/.test(s);

  const acceptShipment = async () => {

 if (loading) return;

 // -------- BASIC --------
 if (!shipmentNo || !advancePayment || !remainingPayment) {
  alert("Fill all fields");
  return;
 }

 if (!isValidShipmentNo(shipmentNo)) {
  alert("Invalid shipment number");
  return;
 }

 if (Number(advancePayment) <= 0) {
  alert("Advance must be > 0");
  return;
 }

 if (Number(remainingPayment) < 0) {
  alert("Remaining cannot be negative");
  return;
 }

 // -------- MANUAL DRIVER --------
 
 // -------- MANUAL DRIVER --------
if (assignMode === "MANUAL") {

 let newErrors = {};

 if (!manualDriver.name)
  newErrors.name = "Driver name required";

 if (!isValidPhone(manualDriver.phone))
  newErrors.phone = "Phone must be 10 digits";

 if (!isValidEmail(manualDriver.email))
  newErrors.email = "Invalid email";

 if (!manualDriver.vehicleNo)
  newErrors.vehicleNo = "Vehicle no required";

 if (Object.keys(newErrors).length > 0) {
  setErrors(newErrors);
  return;
 }

 setErrors({});
}


 try {

  setLoading(true);

  await axios.put(
   `/shipment/accept/${selected._id}`,
   {
     shipmentNo,
     advancePayment,
     remainingPayment,
     assignMode,
     manualDriver: assignMode === "MANUAL" ? manualDriver : undefined

   },
   {
     headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
   }
  );

  closeModals();

 } catch (err) {
  alert("Accept failed");
 } finally {
  setLoading(false);
 }
};



  const rejectShipment = async () => {
    if (!rejectReason.trim()) return alert("Enter reject reason");
    await axios.put(`/shipment/reject/${selected._id}`, { reason: rejectReason }, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    closeModals();
  };

  const startShipment = async (id) => {
    await axios.put(`/shipment/start/${id}`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    fetchShipments();
  };

  const updateStation = async (id, station) => {
    try {
      await axios.put(`/shipment/progress/${id}`, { currentLocation: station }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchShipments();
    } catch (err) { alert("Station update failed"); }
  };

  const deliverShipment = async () => {
    await axios.put(`/shipment/deliver/${selected._id}`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    closeModals();
  };

  const closeModals = () => {

 setShowAccept(false);
 setShowReject(false);
 setShowDeliver(false);

 setShipmentNo("");
 setAdvancePayment("");
 setRemainingPayment("");
setRejectReason("");
setErrors({});

 setManualDriver({
  name:"",
  phone:"",
  email:"",
  vehicleNo:""
 });

 setAssignMode("AUTO"); 

 fetchShipments();
};
const manualValid =
 manualDriver.name &&
 isValidPhone(manualDriver.phone) &&
 isValidEmail(manualDriver.email) &&
 manualDriver.vehicleNo;




  const getStatusStyles = (status) => {
    switch (status) {
      case "NEW": return "bg-blue-50 text-blue-600 border-blue-100";
      case "ACCEPTED": return "bg-indigo-50 text-indigo-600 border-indigo-100";
      case "IN_PROGRESS": return "bg-amber-50 text-amber-600 border-amber-100";
      case "DELIVERED": return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "REJECTED": return "bg-rose-50 text-rose-600 border-rose-100";
      default: return "bg-slate-50 text-slate-600 border-slate-100";
    }
  };

  return (
    <div className="p-4  pt-2 md:p-10 bg-[#F8FAFC] min-h-screen text-slate-900 font-sans">
      
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER SECTION - Adjusted for mobile stacking */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 md:p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all shadow-sm active:scale-95"
            >
              <ChevronLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight flex items-center gap-2">
                Shipment Center
              </h1>
              <p className="text-slate-500 font-medium text-xs md:text-sm">Monitor fleet activity and route progress.</p>
            </div>
          </div>

          {/* Status Filter - Mobile Scrollable */}
          <div className="w-full overflow-x-auto no-scrollbar">
            <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm min-w-max">
              {["ALL", "NEW", "ACCEPTED", "IN_PROGRESS", "DELIVERED", "REJECTED"].map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-4 md:px-5 py-2 md:py-2.5 text-[10px] md:text-xs font-black uppercase tracking-widest transition-all rounded-xl whitespace-nowrap ${
                    statusFilter === s ? "bg-slate-900 text-white shadow-lg shadow-slate-200" : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {s.replace("_", " ")}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="relative mb-4 md:mb-8 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search shipments..."
            className="w-full pl-11 pr-4 py-2 md:py-4 bg-white border border-slate-200 rounded-2xl md:rounded-[1.5rem] shadow-sm focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-300 font-medium text-sm md:text-base"
          />
        </div>

        {/* SHIPMENT CARDS LIST */}
        <div className="grid gap-4 md:gap-6">
          <AnimatePresence mode="popLayout">
            {paginatedShipments.map((item) => (
              <motion.div
                key={item._id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-2xl md:rounded-3xl border border-slate-100 p-4 md:p-6 flex flex-col xl:flex-row xl:items-center justify-between gap-4 md:gap-6 shadow-sm hover:shadow-md transition-all"
              >
                {/* INFO BLOCK - Adjusted for mobile layout */}
                <div className="flex gap-3 md:gap-5 items-start">
                  <div className="p-3 md:p-4 bg-slate-50 rounded-xl md:rounded-2xl text-slate-400 shrink-0">
                    <Box size={20} className="md:w-6 md:h-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <h3 className="font-bold text-base md:text-lg text-slate-800 truncate">{item.name}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tighter border ${getStatusStyles(item.status)}`}>
                        {item.status.replace("_", " ")}
                      </span>
                    </div>
                    
                    <div className="flex flex-col gap-2 text-xs md:text-sm text-slate-500 font-medium">
                      <div className="flex items-center gap-2">
                        <MapPin size={12} className="text-indigo-500 shrink-0" />
                        <span className="min-w-0 break-words line-clamp-2">
  {item.pickupAddress}
</span>

                        <ArrowRight size={12} className="text-slate-300 shrink-0" />
                        <span className="text-slate-800 min-w-0 break-words line-clamp-2">
{item.deliveryAddress}</span>
                      </div>
                      <div className="flex flex-wrap items-start gap-2 w-full min-w-0">
                        <Clock size={12} className="shrink-0" />
                        <span className="text-indigo-600 font-bold truncate text-[11px] md:text-sm">Station: {item.currentLocation || "Pending"}</span>
                      </div>
                    </div>

                    {item.locationHistory?.length > 0 && (
                      <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar min-w-full">
                        {item.locationHistory.map((loc, idx) => (
                          <div key={idx} className="flex items-center gap-2 shrink-0">
                            <span className="text-[9px] font-bold px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded italic">{loc.place}</span>
                            {idx !== item.locationHistory.length - 1 && <div className="w-1.5 h-0.5 bg-slate-200 rounded-full" />}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* INTERACTIVE CONTROLS - Adjusted for mobile stacking and full-width buttons */}
                <div className="flex flex-col gap-3 md:gap-4 bg-slate-50/50 p-3 md:p-4 rounded-xl md:rounded-2xl border border-slate-100 xl:bg-transparent xl:p-0 xl:border-0">
                  
                  {/* Station Update Field - Full width on mobile */}
                  {(item.status === "STARTED" || item.status === "IN_PROGRESS") && (
                    <div className="flex items-center bg-white border border-slate-200 p-1 rounded-xl shadow-sm focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
                      <input
                        type="text"
                        placeholder="Location..."
                        value={stationInputs[item._id] || ""}
                        onChange={(e) => setStationInputs({ ...stationInputs, [item._id]: e.target.value })}
                        className="flex-1 px-3 py-1.5 text-xs md:text-sm outline-none font-medium min-w-0"
                      />
                      <button
                        onClick={() => {
                          if (!stationInputs[item._id]?.trim()) return alert("Enter station name");
                          updateStation(item._id, stationInputs[item._id]);
                          setStationInputs({ ...stationInputs, [item._id]: "" });
                        }}
                        className="bg-indigo-600 text-white px-3 md:px-4 py-1.5 text-[10px] md:text-xs font-bold rounded-lg hover:bg-indigo-700 transition-colors shrink-0"
                      >
                        Update
                      </button>
                    </div>
                  )}

                  {/* Contextual Action Buttons - Grid layout on mobile */}
                  <div className="flex flex-row items-center gap-2">
                    {item.status === "NEW" && (
                      <>
                        <button onClick={() => { setSelected(item); setShowAccept(true); }} className="flex-1 flex items-center justify-center gap-2 bg-emerald-500 text-white px-3 py-2.5 rounded-xl text-[10px] md:text-xs font-bold shadow-lg shadow-emerald-100 active:scale-95 transition-all">
                          <CheckCircle2 size={14} /> Accept
                        </button>
                        <button onClick={() => { setSelected(item); setShowReject(true); }} className="flex-1 flex items-center justify-center gap-2 bg-white border border-rose-200 text-rose-500 px-3 py-2.5 rounded-xl text-[10px] md:text-xs font-bold active:scale-95 transition-all">
                          <XCircle size={14} /> Reject
                        </button>
                      </>
                    )}

                    {item.status === "ACCEPTED" && (
                      <button onClick={() => startShipment(item._id)} className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-xl text-[10px] md:text-xs font-bold shadow-lg shadow-indigo-100 active:scale-95 transition-all">
                        <TruckIcon size={14} /> Initiate Transit
                      </button>
                    )}

                    {item.status === "IN_PROGRESS" && (
                      <button onClick={() => { setSelected(item); setShowDeliver(true); }} className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-xl text-[10px] md:text-xs font-bold shadow-lg shadow-slate-300 active:scale-95 transition-all">
                        <Navigation size={14} /> Mark Delivered
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* PAGINATION - Mobile Stacked */}
        {totalPages > 1 && (
          <div className="flex flex-col md:flex-row justify-between items-center mt-8 gap-4 px-2">
            <p className="text-slate-400 text-xs md:text-sm font-medium">Page {currentPage} of {totalPages}</p>
            <div className="flex gap-2 w-full md:w-auto">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="flex-1 md:px-5 py-2.5 border border-slate-200 bg-white rounded-xl text-[10px] md:text-xs font-bold text-slate-600 disabled:opacity-30 hover:bg-slate-50 transition-all active:scale-95"
              >
                Previous
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="flex-1 md:px-5 py-2.5 border border-slate-200 bg-white rounded-xl text-[10px] md:text-xs font-bold text-slate-600 disabled:opacity-30 hover:bg-slate-50 transition-all active:scale-95"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* MODALS - Adjusted padding for mobile */}
      <AnimatePresence>
        {(showAccept || showReject || showDeliver) && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-6"

          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 w-full max-w-md shadow-2xl"
            >
              {showAccept && (
<>
<h3 className="text-xl md:text-2xl font-black mb-2">Accept Shipment</h3>

{/* Shipment Number */}
<input
 value={shipmentNo}
 onChange={(e) => setShipmentNo(e.target.value.toUpperCase())}
 placeholder="Shipment Number"
 className="w-full p-3 border rounded-xl mb-3"
/>

{/* Payments */}
<input
 type="number"
  min="1"
 placeholder="Advance Payment"
 value={advancePayment}
 onChange={(e) => setAdvancePayment(e.target.value)}
 className="w-full p-3 border rounded-xl mb-3"
/>

<input
 type="number"
  min="0"
 placeholder="Remaining Payment"
 value={remainingPayment}
 onChange={(e) => setRemainingPayment(e.target.value)}
 className="w-full p-3 border rounded-xl mb-3"
/>

{/* Assign Mode */}
<div className="flex gap-3 mb-3">
 <button
  onClick={() => setAssignMode("AUTO")}
  className={`flex-1 p-2 rounded ${assignMode==="AUTO" ? "bg-indigo-600 text-white" : "border"}`}
 >
  Auto Assign
 </button>

 <button
  onClick={() => setAssignMode("MANUAL")}
  className={`flex-1 p-2 rounded ${assignMode==="MANUAL" ? "bg-indigo-600 text-white" : "border"}`}
 >
  Manual Assign
 </button>
</div>

{/* Manual Driver */}
{assignMode === "MANUAL" && (
<>
<input
 placeholder="Driver Name"
 onChange={(e)=>{
  setManualDriver({...manualDriver,name:e.target.value});
  setErrors(prev => ({...prev, name: undefined}));
 }}
 className={`w-full p-3 border rounded-xl mb-1 ${errors.name ? "border-red-500" : ""}`}
/>
{errors.name && <p className="text-red-500 text-xs mb-2">{errors.name}</p>}


<input
 placeholder="Phone"
 maxLength={10}
 onChange={(e)=>{
  setManualDriver({
   ...manualDriver,
   phone: e.target.value.replace(/\D/g,"")
  });
  setErrors(prev => ({...prev, phone: undefined}));
 }}
 className={`w-full p-3 border rounded-xl mb-1 ${errors.phone ? "border-red-500" : ""}`}
/>
{errors.phone && <p className="text-red-500 text-xs mb-2">{errors.phone}</p>}


<input
 placeholder="Email"
 onChange={(e)=>{
  setManualDriver({...manualDriver,email:e.target.value});
  setErrors(prev => ({...prev, email: undefined}));
 }}
 className={`w-full p-3 border rounded-xl mb-1 ${errors.email ? "border-red-500" : ""}`}
/>
{errors.email && <p className="text-red-500 text-xs mb-2">{errors.email}</p>}

<input
 placeholder="Vehicle No"
 onChange={(e)=>{
  setManualDriver({...manualDriver,vehicleNo:e.target.value});
  setErrors(prev => ({...prev, vehicleNo: undefined}));
 }}
 className={`w-full p-3 border rounded-xl mb-1 ${errors.vehicleNo ? "border-red-500" : ""}`}
/>
{errors.vehicleNo && <p className="text-red-500 text-xs mb-2">{errors.vehicleNo}</p>}

</>
)}

{/* Buttons */}
<div className="flex gap-3 mt-4">
 <button onClick={closeModals} className="flex-1">
  Cancel
 </button>

 <button
 onClick={acceptShipment}
disabled={loading || (assignMode==="MANUAL" && !manualValid)}
 className="flex-1 bg-emerald-500 text-white p-2 rounded disabled:opacity-50"
>
 {loading ? "Processing..." : "Confirm"}
</button>

</div>
</>
)}


              {showReject && (
                <>
                  <h3 className="text-xl md:text-2xl font-black mb-1 md:mb-2 tracking-tight text-rose-600">Reject Shipment</h3>
                  <p className="text-slate-500 mb-5 md:mb-6 text-xs md:text-sm">Provide a reason for declining this request.</p>
                  <textarea
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 p-3 md:p-4 rounded-xl md:rounded-2xl mb-5 md:mb-6 outline-none focus:ring-4 focus:ring-rose-50 transition-all min-h-[100px] text-sm"
                    placeholder="Insufficient capacity..."
                  />
                  <div className="flex gap-3">
                    <button onClick={closeModals} className="flex-1 py-3 md:py-4 font-bold text-slate-400 text-sm">Cancel</button>
                    <button onClick={rejectShipment} className="flex-1 bg-rose-500 text-white rounded-xl md:rounded-2xl font-bold text-sm shadow-lg shadow-rose-100">Reject</button>
                  </div>
                </>
              )}

              {showDeliver && (
                <div className="text-center py-2 md:py-4">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-5 md:mb-6">
                    <CheckCircle2 size={32} className="md:w-10 md:h-10" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-black mb-1 md:mb-2 tracking-tight">Verify Delivery</h3>
                  <p className="text-slate-500 mb-6 md:mb-8 text-xs md:text-sm italic">Has this shipment reached its destination safely?</p>
                  <div className="flex gap-3">
                    <button onClick={closeModals} className="flex-1 py-3 md:py-4 font-bold text-slate-400 text-sm">Cancel</button>
                    <button onClick={deliverShipment} className="flex-1 bg-slate-900 text-white rounded-xl md:rounded-2xl font-bold text-sm">Finalize</button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Simple Icon fallback
const TruckIcon = ({ size }) => <Truck size={size} />;
const Truck = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
);

export default Shipment;