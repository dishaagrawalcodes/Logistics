import React, { useEffect, useRef, useState } from "react";
import indiaMap from "../assets/india-map.png";

const states = [
  { name: "Odisha", top: "55%", left: "55%" },
  { name: "Haryana", top: "30%", left: "32%" },
  { name: "Punjab", top: "24%", left: "30%" },
  { name: "Delhi", top: "31%", left: "35%" },
  { name: "Uttar Pradesh", top: "37%", left: "45%" },
  { name: "Bihar", top: "41%", left: "57%" },
  { name: "Jharkhand", top: "47%", left: "56%" },
  { name: "Telangana", top: "62%", left: "42%" },
  { name: "Uttarakhand", top: "27%", left: "42%" },
  { name: "Rajasthan", top: "38%", left: "25%" },
  { name: "Chandigarh", top: "24%", left: "30%" }
];

const WhereWeOperate = () => {
  const sectionRef = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT CONTENT */}
          <div
            className={`transition-all duration-1000 ease-out
              ${show ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}
            `}
          >
            <div className="w-12 mx-auto h-[3px] bg-red-500 mb-4"></div>

            <h2 className="text-3xl md:text-4xl font-light tracking-widest text-[#1B2557]">
              WHERE WE OPERATE
            </h2>

            <p className="mt-3 text-sm md:text-base tracking-[0.25em] text-gray-600 uppercase">
              A Global Footprint for Global Operations
            </p>

            <p className="mt-6 text-gray-600 leading-relaxed max-w-lg">
              With headquarters in key regions across India,  Logistics
              delivers local expertise with nationwide reach and operational
              excellence.
            </p>

            {/* STATE LIST */}
            <div className="mt-8 grid grid-cols-2 gap-3 text-sm text-gray-700">
              {states.map((s) => (
                <div key={s.name} className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#1B2557] rounded-full"></span>
                  {s.name}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT MAP */}
          <div
            className={`relative transition-all duration-1000 delay-300
              ${show ? "opacity-100 scale-100" : "opacity-0 scale-95"}
            `}
          >
            <img
              src={indiaMap}
              alt="India Operations Map"
              className="w-full max-w-xl mx-auto"
            />

            {/* MAP PINS */}
            {states.map((s, i) => (
              <span
                key={s.name}
                className={`absolute transition-all duration-700
                  ${show ? "scale-100 opacity-100" : "scale-0 opacity-0"}
                `}
                style={{
                  top: s.top,
                  left: s.left,
                  transitionDelay: `${500 + i * 100}ms`
                }}
              >
                <span className="relative flex">
                  <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-red-600"></span>
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhereWeOperate;
