import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const STATUS_STEPS = [
  "NEW",
  "ACCEPTED",
  "STARTED",
  "IN_PROGRESS",
  "DELIVERED",
];

const ShipmentTracking = () => {
    const ser5="https://i.ibb.co/0yHT0HQW/feature4.png"
    const navigate=useNavigate()
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const badgeRef = useRef(null);
  const ctaRef = useRef(null);

  const stepsRef = useRef([]);

  const [shipmentNo, setShipmentNo] = useState("");
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ─── HERO ANIMATION ─────────────────── */
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(badgeRef.current, { opacity: 0, y: 30, duration: 0.5 })
      .from(titleRef.current, { opacity: 0, y: 40, duration: 0.6 }, "-=0.2")
      .from(descRef.current, { opacity: 0, y: 30, duration: 0.5 }, "-=0.3")
      .from(ctaRef.current, { opacity: 0, y: 20, duration: 0.4 }, "-=0.3");
  }, []);

  /* ─── STEP ANIMATION BASED ON STATUS ───────── */
  useEffect(() => {
    if (!shipment) return;

    const activeIndex = STATUS_STEPS.indexOf(shipment.status);

    stepsRef.current.forEach((el, i) => {
      gsap.to(el, {
        opacity: i <= activeIndex ? 1 : 0.25,
        scale: i <= activeIndex ? 1 : 0.95,
        duration: 0.4,
        delay: i * 0.15,
      });
    });
  }, [shipment]);

  /* ─── FETCH SHIPMENT ───────────────── */
  const trackShipment = async () => {
  if (!shipmentNo || loading) return;

  try {
    setLoading(true);
    const res = await api.get("/shipment/all");
    const found = res.data.find(
      (s) => s.shipmentNo === shipmentNo
    );
    setShipment(found || null);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

const activeIndex = shipment
  ? STATUS_STEPS.indexOf(shipment.status)
  : -1; 

  return (
    <>
      {/* ───────── HERO ───────── */}
      <section
        ref={heroRef}
        className="relative w-full h-[420px] sm:h-[520px] overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${ser5})` }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/80 via-blue-900/70 to-blue-950/85" />

        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-400 rounded-full blur-3xl animate-pulse delay-700" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <span
            ref={badgeRef}
            className="px-5 py-1.5 bg-blue-500/20 border border-blue-300/30 rounded-full text-blue-100 text-xs uppercase mb-4"
          >
            Shipment Tracking
          </span>

          <h1
            ref={titleRef}
            className="text-white text-3xl sm:text-5xl tracking-[0.15em] mb-4"
          >
            TRACK YOUR SHIPMENT
          </h1>

          <p
            ref={descRef}
            className="text-gray-200 max-w-xl text-sm sm:text-base"
          >
            Enter your shipment number to see real-time delivery progress.
          </p>

          <div ref={ctaRef} className="mt-6 flex gap-3">
            <input
              value={shipmentNo}
              onChange={(e) => setShipmentNo(e.target.value)}
              placeholder="Enter Shipment No"
              className="px-4 py-3 rounded-lg text-sm outline-none"
            />
            <button
  onClick={trackShipment}
  disabled={loading}
  className={`px-6 py-3 rounded-lg font-semibold flex items-center gap-2
    transition-all duration-300
    ${
      loading
        ? "bg-white/20 cursor-not-allowed opacity-80"
        : "border border-white/40 hover:bg-white/10 text-white"
    }
    text-white
  `}
>
  {loading && (
    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
  )}
  {loading ? "Tracking..." : "Track"}
</button>

          </div>
        </div>

        <svg
          className="absolute bottom-0 w-full h-[90px]"
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C360,80 1080,80 1440,0 L1440,90 L0,90 Z"
            fill="#ffffff"
          />
        </svg>
      </section>

      {/* ───────── TRACKING UI ───────── */}
      {shipment && (
        <section className="sm:w-[550px]  mx-auto px-4 py-16">
          <h2 className="text-xl font-semibold mb-10 text-center">
            Shipment Status
          </h2>

     <div className="relative flex flex-col sm:flex-row justify-between gap-8 sm:gap-0 mt-6">
  {STATUS_STEPS.map((step, i) => {
    const normalizedStatus = shipment?.status?.toUpperCase().trim();
    const activeIndex = STATUS_STEPS.indexOf(normalizedStatus);
    const isDelivered = normalizedStatus === "DELIVERED";

    const isCompleted = isDelivered
      ? i <= activeIndex
      : i < activeIndex;

    const isActive = !isDelivered && i === activeIndex;

    return (
      <div
        key={step}
        className="flex-1 flex sm:flex-col items-center sm:text-center relative"
      >
        {/* Connector */}
        {i !== STATUS_STEPS.length - 1 && (
          <div
            className={`absolute sm:top-6 sm:left-1/2 sm:w-full sm:h-[3px]
                        top-1/2 left-6 h-full w-[3px]
                        ${isCompleted ? "bg-blue-600" : "bg-gray-300"}`}
          />
        )}

        {/* Step */}
        <div
          ref={(el) => (stepsRef.current[i] = el)}
          className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center
          border-2 text-sm font-bold transition-all duration-300
          ${
            isCompleted
              ? "bg-blue-600 border-blue-600 text-white"
              : isActive
              ? "bg-white border-blue-600 text-blue-600 animate-pulse"
              : "bg-white border-gray-300 text-gray-400"
          }`}
        >
          {i + 1}
        </div>

        <p
          className={`mt-2 sm:mt-3 text-xs font-semibold uppercase tracking-wide
            ${isCompleted || isActive ? "text-blue-700" : "text-gray-400"}`}
        >
          {step.replace("_", " ")}
        </p>
      </div>
    );
  })}
</div>



          {/* DETAILS */}
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-md shadow-xl">
  {/* HEADER */}
  <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
    <h3 className="text-base font-semibold text-slate-800">
      Shipment Details
    </h3>

    <span
      className={`px-3 py-1 text-xs font-medium rounded-full
      ${
        shipment.status === "DELIVERED"
          ? "bg-emerald-100 text-emerald-700"
          : shipment.status === "IN_PROGRESS"
          ? "bg-blue-100 text-blue-700"
          : "bg-amber-100 text-amber-700"
      }`}
    >
      {shipment.status}
    </span>
  </div>

  {/* CONTENT */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 text-sm">
    {/* LEFT */}
    <div className="space-y-3">
      <p>
        <span className="text-slate-500 font-medium">Customer Name</span>
        <br />
        <span className="text-slate-800 font-semibold">
          {shipment.name}
        </span>
      </p>

      <p>
        <span className="text-slate-500 font-medium">Mobile Number</span>
        <br />
        <span className="text-slate-800 font-semibold">
          {shipment.mobile}
        </span>
      </p>

      <p>
        <span className="text-slate-500 font-medium">Pickup Address</span>
        <br />
        <span className="text-slate-700">
          {shipment.pickupAddress}
        </span>
      </p>
    </div>

    {/* RIGHT */}
    <div className="space-y-3">
      <p>
        <span className="text-slate-500 font-medium">Delivery Address</span>
        <br />
        <span className="text-slate-700">
          {shipment.deliveryAddress}
        </span>
      </p>

      <p>
        <span className="text-slate-500 font-medium">Current Location</span>
        <br />
        <span className="text-slate-800 font-semibold">
          {shipment.currentLocation}
        </span>
      </p>
    </div>
  </div>

  {/* FOOTER */}
  <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 rounded-b-2xl">
    <p className="text-xs text-slate-500">
      Last updated in real-time via  Logistics tracking system
    </p>
  </div>
</div>

          
        </section>
      )}
       <div
        
        className="group relative overflow-hidden
             py-20 text-center text-black"
      >
        {/* CONTENT */}
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 relative z-10">
          Have a Question or Need Help?
        </h2>

        <p className="text-blue-200 mb-8 relative z-10">
          Need any help for work consultation?
        </p>

        <button
          onClick={() => navigate("/contact")}
          className="relative z-10 px-8 py-3
               bg-gradient-to-r from-amber-400 to-orange-500
               rounded-lg font-semibold text-black shadow-lg
               hover:scale-105 transition-transform"
        >
          Contact Us
        </button>
      </div>
    </>
  );
};

export default ShipmentTracking;
