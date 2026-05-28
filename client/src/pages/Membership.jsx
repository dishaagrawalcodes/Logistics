import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { Globe } from "lucide-react";
import ProcessSteps from "../components/ProcessSteps";
import QuoteModal from "../components/QuoteModal";
import UserQuickAuth from "../components/UserQuickAuth";
import OttMembershipForm from "../components/OttMembershipForm";
import api from "../api/axios";
import { useLocation } from "react-router-dom";


const OttMembership = () => {
  const location = useLocation();
  const ser1 = "https://i.ibb.co/BHB53Ltv/memebership.png";

  const ser2 =
    "https://i.ibb.co/Q7pVNBqX/freepik-elegant-seated-audience-at-a-bustling-event-hosts-75113.png";
  const ser3 =
    "https://i.ibb.co/F4339mqg/freepik-a-cinematic-ultrahighdefinition-scene-of-a-grand-e-75112.png";
  const ser4 =
    "https://i.ibb.co/TMxvCSTX/freepik-grand-event-on-decorated-stage-guests-seated-elega-75114.png";
  const ser5 =
    "https://i.ibb.co/YFGFyMpD/freepik-lively-organized-gala-with-decorated-stage-and-pro-75115.png";

  const eventManagementStepsData = [
    {
      image: ser2,
      title: "Event Consultation",
      description:
        "Understand event goals, audience, budget, and planning requirements.",
    },
    {
      image: ser3,
      title: "Design & Preparation",
      description:
        "Creative theme planning, décor design, logistics, and vendor coordination.",
    },
    {
      image: ser4,
      title: "Event Execution",
      description:
        "On-ground management, coordination, and smooth execution of the event.",
    },
    {
      image: ser5,
      title: "Post-Event Wrap-Up",
      description:
        "Dismantling, feedback collection, and ensuring everything wraps up perfectly.",
    },
  ];

  // PAGE STATE
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [activeTab, setActiveTab] = useState("user");
  const [selectedService, setSelectedService] = useState(""); // Selected service for user form
  const [services, setServices] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [viewMode, setViewMode] = useState("");

  // GSAP Refs
  const heroRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const authRef = useRef(null);

  // Toast
  const showToast = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  // GSAP Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(badgeRef.current, { opacity: 0, y: 30, duration: 0.6 })
        .from(titleRef.current, { opacity: 0, y: 40, duration: 0.8 }, "-=0.3")
        .from(descRef.current, { opacity: 0, y: 30, duration: 0.6 }, "-=0.4");
    }, heroRef);
    return () => ctx.revert();
  }, []);

  // Fetch services from backend
 useEffect(() => {
  const fetchServices = async () => {
    try {
      const res = await api.get("/services/type/home");
      setServices(res.data);
    } catch (err) {
      console.error("Failed to fetch services", err);
    }
  };

  fetchServices();
}, []);
useEffect(() => {
  const params = new URLSearchParams(location.search);
  const view = params.get("view");

  if (view === "login") {
    setShowIntro(false);
    setViewMode("userAuth");

    setTimeout(() => {
      if (authRef.current) {
        const HEADER_OFFSET = 110;

        const y =
          authRef.current.getBoundingClientRect().top +
          window.pageYOffset -
          HEADER_OFFSET;

        window.scrollTo({
          top: y,
          behavior: "smooth",
        });
      }
    }, 100);
  }
}, [location]);



  // Handle service selection
  const handleGetService = (serviceName) => {
    setSelectedService(serviceName);
    setActiveTab("user");
    setViewMode("userAuth");
    setShowIntro(false);

    setTimeout(() => {
      if (authRef.current) {
        const HEADER_OFFSET = 110;

        const y =
          authRef.current.getBoundingClientRect().top +
          window.pageYOffset -
          HEADER_OFFSET;

        window.scrollTo({
          top: y,
          behavior: "smooth",
        });
      }
    }, 0);
  };

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative w-full h-[420px] sm:h-[520px] overflow-hidden mb-[-1px]">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700"
          style={{ backgroundImage: `url(${ser1})` }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-900/70 to-slate-950/90" />

        {/* Animated Light Blobs */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-indigo-400 rounded-full blur-3xl animate-pulse delay-700" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <span
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/20 backdrop-blur-sm border border-blue-300/30 rounded-full text-blue-100 text-xs sm:text-sm tracking-widest uppercase mb-4"
          >
            <Globe size={14} />
             Membership
          </span>

          <h1
            ref={titleRef}
            className="text-white text-3xl sm:text-5xl lg:text-6xl font-light tracking-[0.15em] mb-4 max-w-4xl leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Join Our Exclusive Membership
          </h1>

          <p
            ref={descRef}
            className="text-gray-200 mt-2 max-w-2xl text-sm sm:text-base lg:text-lg leading-relaxed font-light tracking-wide"
          >
            Access premium services, priority support, and special offers
            tailored for our members.
          </p>
          <div className="mt-8 flex gap-4">
            <button
              onClick={() => setQuoteOpen(true)}
              className="border border-white/40 hover:bg-white/10 text-white px-6 py-3 rounded-lg font-semibold shadow-lg"
            >
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

        {/* TOAST */}
        {showAlert && (
          <div className="fixed top-5 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-slate-900 text-white px-6 py-4 rounded-xl shadow-2xl z-50">
            <div className="bg-emerald-500 p-1 rounded-full">
              <Globe size={18} />
            </div>
            <div>
              <p className="font-bold text-sm">Form submitted!</p>
              <p className="text-xs text-slate-400">
                Our team will reach out to you shortly.
              </p>
            </div>
          </div>
        )}
      </section>

      <section className="pt-2 pb-10 px-4">
        {showIntro && (
          <div className="max-w-7xl mx-auto">
            {/* HEADER */}
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-3">
                Choose Your Path
              </h2>
              <p className="text-gray-500 text-lg">
                Join as a service provider or book trusted professionals
                instantly
              </p>
            </div>

            {/* JOIN AS PROVIDER */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-3xl p-10 mb-16 shadow-2xl">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                  <h3 className="text-3xl font-bold mb-3">
                    🛠 Become a Service Partner
                  </h3>
                  <p className="opacity-90 text-lg">
                    Join  and grow your income with verified service leads.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setActiveTab("labour");
                    setViewMode("labourForm");
                    setShowIntro(false);

                    setTimeout(() => {
                      if (authRef.current) {
                        const HEADER_OFFSET = 110;
                        const y =
                          authRef.current.getBoundingClientRect().top +
                          window.pageYOffset -
                          HEADER_OFFSET;

                        window.scrollTo({
                          top: y,
                          behavior: "smooth",
                        });
                      }
                    }, 0);
                  }}
                  className="bg-white text-green-700 px-8 py-4 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
                >
                  Register Now
                </button>
              </div>
            </div>

            {/* SERVICES GRID */}
            <div>
              <h3 className="text-4xl font-bold text-center mb-10">
                Book a Service
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                {services.map((service) => (
                  <div
                    key={service._id}
                    className="relative bg-white/70 backdrop-blur-xl border border-gray-200 rounded-3xl p-7 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
                  >
                    {/* Subtle top gradient effect */}
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-80"></div>

                    {/* ICON CIRCLE */}
                    <div className="mb-6">
                      <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-blue-50 text-blue-600 text-2xl font-bold shadow-inner">
                        {service.name.charAt(0)}
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-800 mb-3 tracking-tight group-hover:text-blue-600 transition">
                        {service.name}
                      </h4>

                      <p className="text-gray-500 text-sm leading-relaxed mb-6">
                        {service.description ||
                          "Verified professionals available instantly in your location."}
                      </p>
                    </div>

                    {/* CTA */}
                    <button
                      onClick={() => handleGetService(service.name)}
                      className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold"
                    >
                      Get Service →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {!showIntro && (
          <div ref={authRef} className="py-4">
            {viewMode === "labourForm" && (
              <OttMembershipForm defaultTab="labour" />
            )}

            {viewMode === "userAuth" && (
              <UserQuickAuth selectedService={selectedService} />
            )}
          </div>
        )}
      </section>

      {/* PROCESS STEPS & MODAL */}
      <ProcessSteps steps={eventManagementStepsData} />
      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  );
};

export default OttMembership;
