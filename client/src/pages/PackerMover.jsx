import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

import ProcessSteps from "../components/ProcessSteps";
import NewsletterSection from "../components/NewsletterSection";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import QuoteModal from "../components/QuoteModal";

gsap.registerPlugin(ScrollTrigger);

const PackerMover = () => {
  const ser1="https://i.ibb.co/hxzxt1Zs/packer.png"
 const ser2="https://i.ibb.co/zTZH3TT3/freepik-uniformed--logistics-workers-unloading-boxes-an-75098.png"
 const ser3="https://i.ibb.co/TM0RStw3/freepik-professional-movers-in--logistics-uniforms-carr-75109.png"
 const ser4="https://i.ibb.co/gbR4byv9/freepik--logistics-movers-carefully-placing-furniture-i-75110.png"
 const ser5="https://i.ibb.co/PZsnVVBr/freepik-uniformed--logistics-workers-unloading-boxes-an-75111.png"
  const stepsData = [
    {
      image: ser2,
      title: "Book Service",
      description:
        "Schedule your packing and moving service with just a few clicks.",
    },
    {
      image: ser3,
      title: "Professional Packing",
      description:
        "Our experts pack your belongings safely using quality materials.",
    },
    {
      image: ser4,
      title: "Safe Transportation",
      description: "Secure and timely transportation with real-time tracking.",
    },
    {
      image: ser5,
      title: "Doorstep Delivery",
      description: "Unloading and placement of goods at your new location.",
    },
  ];
   const [quoteOpen, setQuoteOpen] = useState(false);
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const badgeRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(badgeRef.current, { opacity: 0, y: 30, duration: 0.6 }, "-=1.3")
        .from(titleRef.current, { opacity: 0, y: 40, duration: 0.8 }, "-=0.3")
        .from(descRef.current, { opacity: 0, y: 30, duration: 0.6 }, "-=0.4")
        .from(
          ctaRef.current.children,
          { opacity: 0, y: 25, stagger: 0.2, duration: 0.5 },
          "-=0.3",
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        x: -120,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        x: 120,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative w-full h-[420px] sm:h-[520px] overflow-hidden">
        {/* BG IMAGE */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${ser1})` }}
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/80 via-blue-900/70 to-blue-950/85" />

        {/* GLOW BLOBS */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-400 rounded-full blur-3xl animate-pulse delay-700" />
        </div>

        {/* CONTENT */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <span
            ref={badgeRef}
            className="inline-block px-5 py-1.5 bg-blue-500/20 backdrop-blur-sm border border-blue-300/30 rounded-full text-blue-100 text-xs sm:text-sm tracking-widest uppercase mb-5"
          >
            Our Services
          </span>

          <h1
            ref={titleRef}
            className="text-white text-3xl sm:text-5xl lg:text-6xl font-light tracking-[0.15em] mb-4 max-w-5xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            PACKER & MOVER
          </h1>

          <p
            ref={descRef}
            className="text-gray-200 max-w-2xl text-sm sm:text-base lg:text-lg leading-relaxed font-light"
          >
            Professional packing and moving services across India with safety,
            speed, and reliability at every step.
          </p>

          <div ref={ctaRef} className="mt-8 flex gap-4">
            <button onClick={() => setQuoteOpen(true)} className="border border-white/40 hover:bg-white/10 text-white px-6 py-3 rounded-lg font-semibold shadow-lg">
              Get Free Quote
            </button>
            <a href="tel:+919876543210">
              <button className="border border-white/40 text-white px-6 py-3 rounded-lg hover:bg-white/10">
                Call Now
              </button>
            </a>
          </div>
        </div>

        {/* CURVE */}
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

      <section
        ref={sectionRef}
        className="flex flex-col md:flex-row w-full mx-auto items-center gap-10 px-4 md:px-36 py-12"
      >
        {/* IMAGE SIDE */}
        <div
          ref={imageRef}
          className="relative shadow-2xl shadow-blue-600/30 rounded-2xl overflow-hidden shrink-0"
        >
          <img
            src={ser1}
            alt="PACKER & MOVER"
            className="max-w-md w-full h-[260px] md:h-[340px] object-cover rounded-2xl"
          />
        </div>

        {/* CONTENT SIDE */}
        <div ref={contentRef} className="max-w-lg text-sm text-slate-600">
          <h3 className="text-xl uppercase font-semibold text-slate-800 tracking-wide">
            Smart Logistics Solutions
          </h3>

          <div className="w-24 h-[3px] my-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-200"></div>

          <p className="mt-6 leading-relaxed">
            We provide reliable and efficient logistics services with nationwide
            coverage, advanced tracking systems, and on-time deliveries tailored
            to your business needs.
          </p>

          <div className="flex items-center w-max gap-2 mt-8 hover:-translate-y-0.5 transition bg-gradient-to-r from-blue-600 to-indigo-500 py-3 px-8 rounded-full text-white cursor-pointer">
            <span className="text-sm font-medium">Read more</span>
            <svg
              width="13"
              height="12"
              viewBox="0 0 13 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.53 6.53a.75.75 0 0 0 0-1.06L7.757.697a.75.75 0 1 0-1.06 1.06L10.939 6l-4.242 4.243a.75.75 0 0 0 1.06 1.06zM0 6v.75h12v-1.5H0z"
                fill="#fff"
              />
            </svg>
          </div>
        </div>
      </section>
      <ProcessSteps steps={stepsData} />
      <NewsletterSection />
      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  );
};

export default PackerMover;
