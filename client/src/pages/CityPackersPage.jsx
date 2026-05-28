import { useNavigate, useParams } from "react-router-dom";
import { useRef, useState } from "react";
import QuoteModal from "../components/QuoteModal";
import Vision from "../components/Vision"
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import BrandMarquee from "../components/BrandMarquee";
import Testimonial from "../components/Testimonia";
import { motion } from "framer-motion";


gsap.registerPlugin(ScrollTrigger);

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};


const CityPackersPage = () => {
  const navigate=useNavigate()

  const { city } = useParams();
  const cityName = decodeURIComponent(city);

  const heroRef = useRef(null);
const titleRef = useRef(null);
const descRef = useRef(null);
const buttonsRef = useRef(null);


  const [quoteOpen, setQuoteOpen] = useState(false);
  const ser5="https://i.ibb.co/99Ts9RNZ/newsletter.png"

  useEffect(() => {
  const ctx = gsap.context(() => {
    // Hero container
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" }
    );

    // Title
    gsap.from(titleRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    // Description
    gsap.from(descRef.current, {
      y: 30,
      opacity: 0,
      duration: 1,
      delay: 0.2,
      ease: "power3.out",
    });

    // Buttons
    gsap.from(buttonsRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.8,
      delay: 0.4,
      ease: "power3.out",
    });
  });

  return () => ctx.revert();
}, []);

 


  return (
    <>
      {/* HERO SECTION */}
     <section
  ref={heroRef}
  className="relative w-full h-[420px] sm:h-[520px] overflow-hidden"
>

        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${ser5})` }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/80 via-blue-900/70 to-blue-950/85" />

        {/* Glow blobs */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-400 rounded-full blur-3xl animate-pulse delay-700" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <span className="inline-block px-5 py-1.5 bg-blue-500/20 backdrop-blur-sm border border-blue-300/30 rounded-full text-blue-100 text-xs sm:text-sm tracking-widest uppercase mb-5">
            Our Services
          </span>

          <h1 ref={titleRef}
            className="text-white text-3xl sm:text-5xl lg:text-6xl font-light tracking-[0.15em] mb-4 max-w-5xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            PACKERS & MOVERS IN {cityName.toUpperCase()}
          </h1>

          <p ref={descRef} className="text-gray-200 max-w-2xl text-sm sm:text-base lg:text-lg leading-relaxed font-light">
            Trusted, affordable and safe Packers & Movers services in {cityName}.
            We ensure stress-free relocation with expert packing, real-time
            tracking and on-time delivery.
          </p>

          <div className="sm:mt-8 mt-2 flex gap-4">
            <button ref={buttonsRef}
              onClick={() => setQuoteOpen(true)}
              className="border border-white/40 hover:bg-white/10 text-white px-6 py-3 rounded-lg font-semibold shadow-lg"
            >
              Get Free Quote
            </button>

            <a href="tel:+919xxxxxxxxxx">
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

      {/* CITY CONTENT */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-semibold mb-4">
          Why choose us in {cityName}?
        </h2>
        <p className="text-gray-600 leading-relaxed">
          We provide professional packing, door-to-door delivery, insurance
          coverage and experienced manpower to make your move in {cityName} easy
          and worry-free.
        </p>
      </section>
      <Vision/>
         
       
  <section className="py-20 lg:py-28 bg-white">
  <div className="max-w-7xl mx-auto px-6 lg:px-10">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

      {/* LEFT CONTENT */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="space-y-6"
      >
        <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
           Logistic Express Packers & Movers in {cityName}:
        </h2>

        <p className="text-lg text-gray-600 leading-relaxed">
           Logistics Express specializes in ensuring safe and timely
          household shifting in {cityName}.
        </p>

        <p className="text-lg text-gray-600 leading-relaxed">
          Using high-quality packing materials and well-maintained vehicles,
          we ensure secure delivery.
        </p>

        <p className="text-lg text-gray-600 leading-relaxed">
          Affordable, efficient and stress-free moving in {cityName}.
        </p>
      </motion.div>

      {/* RIGHT CARDS */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-8"
      >
        {[
          "Certified Packers",
          "Verified Movers",
          "5 Star Ratings",
          "Value For Money",
        ].map((title, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className="border-2 border-blue-400 rounded-2xl p-8 text-center hover:shadow-lg transition"
          >
            <h4 className="text-xl font-bold text-gray-900 mb-4">
              {title}
            </h4>
            <p className="text-gray-600 leading-relaxed">
              Trusted and professional services in {cityName}.
            </p>
          </motion.div>
        ))}
      </motion.div>

    </div>
  </div>
</section>


<BrandMarquee/>
  
<Testimonial/>
  
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

      {/* QUOTE MODAL */}
      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  );
};

export default CityPackersPage;
