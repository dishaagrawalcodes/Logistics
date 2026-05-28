import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Globe, Truck, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

import heroBg from "../assets/hero-bg.jpg";


gsap.registerPlugin(ScrollTrigger);
const MEMBER_APP_URL = import.meta.env.VITE_MEMBER_APP_URL;

const Hero = () => {
  const navigate = useNavigate();

  const heroRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const featuresRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from([badgeRef.current, titleRef.current, descRef.current, featuresRef.current], {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);
 const goToMemberApp = () => {
   window.open(MEMBER_APP_URL, "_blank", "noopener,noreferrer");

  };

  return (
    <section
      ref={heroRef}
className="relative w-full h-[600px] sm:h-[620px] lg:h-[720px] overflow-hidden mb-[-1px]"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{ backgroundImage: `url(${heroBg})` }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-900/70 to-slate-950/90" />

      {/* Animated Light Blobs */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-400 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-orange-400 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        {/* Badge */}
        <span
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/20 backdrop-blur-sm border border-amber-300/30 rounded-full text-amber-100 text-xs sm:text-sm tracking-widest uppercase mb-4"
        >
          <Globe size={14} />
          Order Solutions
        </span>

        {/* Title */}
        <h1
          ref={titleRef}
          className="text-white text-3xl sm:text-5xl lg:text-6xl font-light tracking-[0.15em] mb-4 max-w-4xl leading-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Order Management
        </h1>

        {/* Description */}
        <p
          ref={descRef}
          className="text-gray-200 mt-2 max-w-2xl text-sm sm:text-base lg:text-lg leading-relaxed font-light tracking-wide"
        >
          Smart logistics solutions for reliable, secure, and nationwide delivery.
        </p>

        {/* Highlights */}
        <div
          ref={featuresRef}
          className="flex flex-wrap items-center justify-center gap-6 mt-8 text-gray-300 text-sm"
        >
          <div className="flex items-center gap-2">
            <Truck size={16} className="text-amber-400" />
            Fast Dispatch
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-amber-400" />
            Secure Handling
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-6 flex gap-4">
          <button
            onClick={goToMemberApp}
            className="border border-white/40 hover:bg-white/10 text-white px-6 py-3 rounded-lg font-semibold"
          >
           Member Login
          </button>

          <button
            onClick={() => navigate("/track")}
            className="border border-white/40 hover:bg-white/10 text-white px-6 py-3 rounded-lg font-semibold shadow-lg"
          >
            Track Order
          </button>
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
  );
};

export default Hero;
