import React from "react";

const brands = [
  { name: "Tata", logo: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Tata_logo.svg" },
  { name: "Godrej", logo: "https://i.ibb.co/qY70wvNQ/download.png" },
  { name: "LIC", logo: "https://i.ibb.co/sv33Xkm3/download.jpg" },
  { name: "ICICI Bank", logo: "https://upload.wikimedia.org/wikipedia/commons/1/12/ICICI_Bank_Logo.svg" },
  { name: "JSW", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr-Qm1Yd0NVCOBzChaNvAjhJxaeczGWKTC6A&s" },
  { name: "Reliance", logo: "https://i.ibb.co/Zp4j2Kk2/download-1.png" },
];

// duplicate for seamless loop
const scrollBrands = [...brands, ...brands];

const BrandMarquee = () => {
  return (
    <section className="w-full bg-white py-16 overflow-hidden">
      {/* Heading */}
      <h1
        className="text-gray-900 text-3xl sm:text-5xl lg:text-6xl font-light tracking-[0.15em] mb-4 text-center max-w-5xl mx-auto"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        LOGISTICS
      </h1>

      <p className="text-gray-600 text-sm sm:text-base text-center max-w-2xl mx-auto mt-4">
        Trusted by India’s leading enterprises for seamless transportation solutions.
      </p>

      {/* Marquee */}
      <div className="relative mt-14 overflow-hidden">
        {/* Gradient edges */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-10" />

        {/* Track */}
        <div className="flex animate-brandScroll">
          {scrollBrands.map((brand, index) => (
            <div
              key={index}
              className="
                flex items-center justify-center
                min-w-[50vw] sm:min-w-[25vw]
                px-8
              "
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="
                  h-10 sm:h-12
                 
                "
              />
            </div>
          ))}
        </div>
      </div>

      {/* Animation */}
      <style>
        {`
          @keyframes brandScroll {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-50%);
            }
          }

          .animate-brandScroll {
            display: flex;
            width: 200%;
            animation: brandScroll 30s linear infinite;
          }

          @media (max-width: 640px) {
            .animate-brandScroll {
              animation-duration: 42s;
            }
          }
        `}
      </style>
    </section>
  );
};

export default BrandMarquee;
