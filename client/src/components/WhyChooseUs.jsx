import React, { useEffect, useRef, useState } from "react";


const WhyChooseUs = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#1B2557] text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* HEADER */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ease-out
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
        >
          <div className="w-14 h-[3px] bg-red-500 mx-auto mb-4"></div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-widest">
            WHY CHOOSE US
          </h2>

          <p className="mt-4 text-sm md:text-base tracking-[0.25em] text-gray-200 uppercase">
            Making the Impossible, Possible
          </p>
        </div>

        {/* THREE COLUMNS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10">

          {/* CAPABILITIES */}
          <div
            className={`transition-all duration-1000 delay-200
              ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
            `}
          >
            <h3 className="text-2xl font-light mb-4">Capabilities</h3>
            <p className="text-gray-200 leading-relaxed">
              We tirelessly troubleshoot to eliminate choke points, prevent
              stock depletion, streamline unnecessary redundancies, and make
              delays a thing of the past.
            </p>
          </div>

          {/* MISSION */}
          <div
            className={`transition-all duration-1000 delay-400
              ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
            `}
          >
            <h3 className="text-2xl font-light mb-4">Mission</h3>
            <p className="text-gray-200 leading-relaxed">
              Our mission at <span className="font-semibold"> Logistics</span>{" "}
              is to design, build and implement innovative, profitable and
              sustainable products and services that help our customers meet
              consumer and industrial demands globally.
            </p>
          </div>

          {/* VISION */}
          <div
            className={`transition-all duration-1000 delay-600
              ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
            `}
          >
            <h3 className="text-2xl font-light mb-4">Vision</h3>
            <p className="text-gray-200 leading-relaxed">
               Logistics seeks to be a premier, profitable provider of global
              supply-chain services by investing in our people, facilities and
              technology while nurturing a culture of customer focus.
            </p>
          </div>

        </div>
       
      </div>
    </section>
  );
};

export default WhyChooseUs;
