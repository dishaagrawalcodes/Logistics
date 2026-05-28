import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import { useNavigate } from "react-router-dom";
import CityLocations from "../components/CityLocation";
import BrandMarquee from "../components/BrandMarquee";

const CityWisePackers = () => {
  const shipping="https://i.ibb.co/vK4H8Nj/shipping.png"
  const navigate = useNavigate();

  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);

  const introRef = useRef(null);
  const sectionsRef = useRef([]);
  const contactRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation (same as Blog)
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" },
      );
      gsap.from(titleRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(descRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
      });

      // Intro text
      gsap.from(introRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: introRef.current,
          start: "top 80%",
        },
      });

      // Each city section card
      sectionsRef.current.forEach((el, i) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        });
      });

      // Contact CTA
      gsap.from(contactRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contactRef.current,
          start: "top 80%",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={heroRef}
        className="relative w-full h-[420px] sm:h-[500px] overflow-hidden"
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${shipping})` }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-blue-950/75" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1
            ref={titleRef}
            className="text-white text-3xl sm:text-5xl font-light tracking-[0.25em]"
          >
            CITY WISE PACKERS
          </h1>

          <p
            ref={descRef}
            className="text-gray-200 mt-4 max-w-xl text-sm sm:text-base"
          >
            Reliable packing and moving services available across major cities
            in India.
          </p>
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
      <div ref={introRef} className="max-w-5xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
          Our Primary Location
        </h2>
        <p className="text-slate-600 leading-relaxed text-lg">
           Logistics Packers and Movers India is one of the fastest-growing
          companies in India. Their operations span several cities in Odisha
          including Bhubaneswar, Cuttack, Jajpur, Angul, Rourkela, Sambalpur,
          Jharsuguda, and more, with plans to expand nationwide.
        </p>
      </div>
      <CityLocations />
      <BrandMarquee/>
      <div
        ref={contactRef}
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

export default CityWisePackers;
