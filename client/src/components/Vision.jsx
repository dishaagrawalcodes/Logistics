import { useState } from "react";

const feature1 = "https://i.ibb.co/spdQsT1Z/feature1.png";
const feature2 = "https://i.ibb.co/whpD6Gkb/feature2.png";
const feature3 = "https://i.ibb.co/sdgWycjr/feature3.png";
const feature4 = "https://i.ibb.co/0yHT0HQW/feature4.png";
const feature5 = "https://i.ibb.co/mVD1Ckk3/feature5.png";

const cards = [
  {
    img: feature1,
    title: "Nationwide Coverage",
    desc: "Connecting businesses across cities, states, and borders.",
  },
  {
    img: feature2,
    title: "On-Time Deliveries",
    desc: "Precision-driven logistics that never miss deadlines.",
  },
  {
    img: feature3,
    title: "Secure Warehousing",
    desc: "Safe, monitored, and scalable storage solutions.",
  },
  {
    img: feature4,
    title: "Real-Time Tracking",
    desc: "Complete visibility of every shipment, every mile.",
  },
  {
    img: feature5,
    title: "Trusted Partnerships",
    desc: "Delivering excellence through long-term relationships.",
  },
];

const LatestCreations = () => {
  const [active, setActive] = useState(0);

  return (
    <section className="w-full px-4 py-16">
      <h1 className="text-2xl sm:text-3xl font-semibold text-center">
        Delivering Logistics Excellence
      </h1>

      <p className="text-sm text-slate-500 text-center mt-2 max-w-lg mx-auto">
        Smart, reliable, and scalable logistics services designed to move your
        business forward.
      </p>

      {/* GALLERY */}
      <div className="mt-10 max-w-5xl mx-auto">
        {/* DESKTOP */}
        <div className="hidden sm:flex gap-2 h-[420px]">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`
                relative overflow-hidden rounded-xl cursor-pointer
                transition-all duration-500
                ${index === active ? "flex-[3]" : "flex-[1]"}
              `}
              onMouseEnter={() => setActive(index)}
            >
              <img
                src={card.img}
                alt={card.title}
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-5">
                <h3 className="text-white text-xl font-semibold">
                  {card.title}
                </h3>

                <p
                  className={`text-white/80 text-sm mt-1 transition-all duration-300 ${
                    index === active
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2"
                  }`}
                >
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* MOBILE */}
        <div className="sm:hidden flex flex-col gap-3 mt-8">
          {cards.map((card, index) => (
            <div
              key={index}
              onClick={() => setActive(index)}
              className={`
                relative overflow-hidden rounded-xl cursor-pointer
                transition-all duration-500
                ${index === active ? "h-64" : "h-32"}
              `}
            >
              <img
                src={card.img}
                alt={card.title}
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4">
                <h3 className="text-white text-base font-semibold">
                  {card.title}
                </h3>

                <p
                  className={`text-white/80 text-sm mt-1 transition-all duration-300 ${
                    index === active
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2"
                  }`}
                >
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestCreations;
