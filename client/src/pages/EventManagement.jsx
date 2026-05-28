import React, { useState } from "react";
import {
  Truck,
  Box,
  Calendar,
  MapPin,
  ShieldCheck,
  ChevronRight,
  MessageSquare,
  Globe
} from "lucide-react";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

import ProcessSteps from "../components/ProcessSteps";
import QuoteModal from "../components/QuoteModal";
import toast from "react-hot-toast";
import api from "../api/axios";
const EventManagement = () => {
  const ser1="https://i.ibb.co/SbL88Sj/event.png"

    const ser2="https://i.ibb.co/9HNYWLbR/freepik-group-meeting-around-table-candid-conversation--75097.png"
  const ser3="https://i.ibb.co/mC5PrLDY/freepik-members-discussing-an-event-in-a-conference-room-n-75096.png"
  const ser4="https://i.ibb.co/8gdMGrRN/freepik-genarate-a-image-with-highquality-and-more-natural-75095.png"
  const ser5="https://i.ibb.co/xS0RfpCz/freepik-members-discussing-an-event-in-a-conference-room-n-75094.png"

  
  const eventManagementStepsData = [
  {
    image: ser2,
    title: "Event Planning",
    description: "Discuss your requirements, theme, budget, and timeline with our event experts."
  },
  {
    image: ser3,
    title: "Venue & Setup",
    description: "Complete venue selection, layout planning, stage setup, and décor arrangements."
  },
  {
    image: ser4,
    title: "Event Execution",
    description: "Seamless coordination of activities, entertainment, and guest management."
  },
  {
    image: ser5,
    title: "Wrap-Up & Support",
    description: "Post-event breakdown, feedback collection, and on-ground support till completion."
  }
];



  // ---------------- STATE ----------------
 const [quoteOpen, setQuoteOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    eventType: "",
    
  });
const heroRef = useRef(null);
const badgeRef = useRef(null);
const titleRef = useRef(null);
const descRef = useRef(null);
const featuresRef = useRef(null);

  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  // ---------------- HANDLERS ----------------

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const showItAlert = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 4000);
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter valid email address";
    }

    if (!formData.mobile) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      newErrors.mobile = "Enter valid 10 digit mobile number";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.eventType.trim()) {
      newErrors.eventType = "Event type is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    toast.error("Please fix the form errors");
    return;
  }

  try {
    const toastId = toast.loading("Submitting event request...");

    const res = await api.post("/events/create", formData);

    toast.dismiss(toastId);

    if (res.data.success) {
      toast.success("🎉 Event request submitted successfully!");

      setFormData({
        name: "",
        email: "",
        mobile: "",
        address: "",
        eventType: ""
      });

      setErrors({});
    }
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
        "❌ Something went wrong. Please try again."
    );
  }
};


  useEffect(() => {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" }
    });

    tl.from(badgeRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.6
    })
      .from(
        titleRef.current,
        { opacity: 0, y: 40, duration: 0.8 },
        "-=0.3"
      )
      .from(
        descRef.current,
        { opacity: 0, y: 30, duration: 0.6 },
        "-=0.4"
      )
      .from(
        featuresRef.current.children,
        {
          opacity: 0,
          y: 25,
          stagger: 0.2,
          duration: 0.5
        },
        "-=0.3"
      );
  }, heroRef);

  return () => ctx.revert();
}, []);

  // ---------------- UI ----------------

  return (
   <>
   
   <section ref={heroRef} className="relative w-full h-[420px] sm:h-[500px] overflow-hidden mb-[-1px]">

  {/* Background Image */}
  <div
    className="absolute inset-0 bg-cover bg-center transition-all duration-700"
    style={{ backgroundImage: `url(${ser1})` }}
  />

  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-900/70 to-slate-950/90" />

  {/* Animated Light Blobs */}
  <div className="absolute inset-0 opacity-20">
    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400 rounded-full blur-3xl animate-pulse" />
    <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-indigo-400 rounded-full blur-3xl animate-pulse delay-700" />
  </div>

  {/* Content */}
  <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
    <span ref={badgeRef} className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/20 backdrop-blur-sm border border-blue-300/30 rounded-full text-blue-100 text-xs sm:text-sm tracking-widest uppercase mb-4">
      <Globe size={14} />
      Event Logistics
    </span>

    <h1 ref={titleRef}
      className="text-white text-3xl sm:text-5xl lg:text-6xl font-light tracking-[0.15em] mb-4 max-w-4xl leading-tight"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >
      Event Management
    </h1>

    <p ref={descRef} className="text-gray-200 mt-2 max-w-2xl text-sm sm:text-base lg:text-lg leading-relaxed font-light tracking-wide">
      Seamless logistics planning for exhibitions, corporate events,
      weddings, and global trade fairs.
    </p>

    {/* Quick Highlights */}
    <div ref={featuresRef} className="flex flex-wrap items-center justify-center gap-6 mt-8 text-gray-300 text-sm">
      <div className="flex items-center gap-2">
        <Truck size={16} className="text-blue-400" />
        Transport Coordination
      </div>
      <div className="flex items-center gap-2">
        <Calendar size={16} className="text-blue-400" />
        Time-Critical Delivery
      </div>
      <div className="flex items-center gap-2">
        <ShieldCheck size={16} className="text-blue-400" />
        Secure Handling
      </div>
    </div>
      <div  className="sm:mt-6 mt-2 flex gap-4">
            <button onClick={() => setQuoteOpen(true)} className="border border-white/40 hover:bg-white/10 text-white sm:px-6 px-4 py-3 rounded-lg font-semibold shadow-lg">
              Get Free Quote
            </button>
            <a href="tel:+919876543210">
              <button className="border border-white/40 text-white px-6 py-3 rounded-lg hover:bg-white/10">
                Call Now
              </button>
            </a>
          </div>
  </div>

  {/* Bottom Curve */}
  <svg
    className="absolute bottom-0 left-0 w-full h-[90px]"
    viewBox="0 0 1440 90"
    preserveAspectRatio="none"
  >
    <path
      d="M0,0 C360,80 1080,80 1440,0 L1440,90 L0,90 Z"
      fill="#ffffff"
    />
  </svg>

</section>

    <section   className=" min-h-screen py-12 px-4 font-sans">
     {/* HERO SECTION */}

      {/* SUCCESS TOAST */}
      {showAlert && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-slate-900 text-white px-6 py-4 rounded-xl shadow-2xl z-50">
          <div className="bg-emerald-500 p-1 rounded-full">
            <ShieldCheck size={18} />
          </div>
          <div>
            <p className="font-bold text-sm">Thank you for contacting us!</p>
            <p className="text-xs text-slate-400">
              Our team will reach out to you within 24 hrs
            </p>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        <div className="flex flex-col lg:flex-row">

          {/* LEFT PANEL */}
          <div className="lg:w-1/3 bg-slate-900 p-10 text-white relative">
            <div className="flex items-center gap-2 mb-10">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Truck size={24} />
              </div>
              <span className="font-black text-xl italic uppercase tracking-tight">
                LogiEvent
              </span>
            </div>

            <h1 className="text-4xl font-extrabold mb-6 leading-tight">
              Precision <br />
              <span className="text-blue-500">Event Management</span> <br />
              Logistics
            </h1>

            <p className="text-slate-400 mb-10">
              From corporate meetings to international trade fairs, we manage your logistics professionally.
            </p>

            <div className="space-y-4 text-slate-300">
              <div className="flex items-center gap-3">
                <Box size={18} className="text-blue-500" />
                Equipment Handling
              </div>
              <div className="flex items-center gap-3">
                <Globe size={18} className="text-blue-500" />
                Global Freight Support
              </div>
              <div className="flex items-center gap-3">
                <Calendar size={18} className="text-blue-500" />
                Time Critical Delivery
              </div>
            </div>
          </div>

          {/* FORM PANEL */}
          <div className="lg:w-2/3 p-10 lg:p-16">

            <h2 className="text-2xl font-bold text-slate-800 mb-1">
              Booking Request
            </h2>
            <p className="text-sm text-slate-500 mb-8">
              Fields marked with <span className="text-red-500">*</span> are mandatory
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* NAME */}
                <div>
                  <label className="label">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`input ${errors.name && "border-red-500"}`}
                    placeholder="Your full name"
                  />
                  {errors.name && <p className="error">{errors.name}</p>}
                </div>

                {/* EMAIL */}
                <div>
                  <label className="label">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`input ${errors.email && "border-red-500"}`}
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="error">{errors.email}</p>}
                </div>

                {/* MOBILE */}
                <div>
                  <label className="label">Mobile Number *</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className={`input ${errors.mobile && "border-red-500"}`}
                    placeholder="10 digit mobile number"
                  />
                  {errors.mobile && <p className="error">{errors.mobile}</p>}
                </div>

                {/* EVENT TYPE */}
                <div>
                  <label className="label">
                    Which Event Management are you looking for? *
                  </label>
                  <input
                    type="text"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    placeholder="Corporate Meeting, Wedding, Export-Trade Fair"
                    className={`input ${errors.eventType && "border-red-500"}`}
                  />
                  {errors.eventType && <p className="error">{errors.eventType}</p>}
                </div>

              </div>

              {/* ADDRESS */}
              <div>
                <label className="label">Address *</label>
                <div className={`flex items-center gap-2 border-b-2 ${errors.address ? "border-red-500" : "border-slate-200"}`}>
                  <MapPin size={18} className="text-slate-400" />
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="input border-none"
                    placeholder="Street, City, State"
                  />
                </div>
                {errors.address && <p className="error">{errors.address}</p>}
              </div>

             

              {/* SUBMIT */}
              <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-4">

                <p className="text-sm text-slate-500 italic flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                  Our team will reach out within 24 hrs
                </p>

                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-slate-900 text encourages text-white px-10 py-4 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg"
                >
                  Submit Request
                  <ChevronRight size={18} />
                </button>

              </div>

            </form>

          </div>
        </div>
      </div>

      {/* UTILITY STYLES */}
      <style>{`
        .input {
          width: 100%;
          border-bottom: 2px solid #e5e7eb;
          padding: 10px 0;
          outline: none;
          background: transparent;
        }

        .input:focus {
          border-color: #2563eb;
        }

        .label {
          font-size: 12px;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .error {
          font-size: 12px;
          color: #ef4444;
          margin-top: 4px;
        }
      `}</style>

    </section>
    <ProcessSteps steps={eventManagementStepsData}/>
    <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
   </>
  );
};

export default EventManagement;
