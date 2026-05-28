import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const services = [
  {
    title: "PACKER & MOVER",
    img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80",
    pos: "top-[5%] left-[-8%]",
    mobilePos: "top-[-10%] left-[5%] -translate-x-1/2",
    delay: 0,
    link: "/packer-mover",
  },
  {
    title: "TRANSPORTATION",
    img: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=800&q=80",
    pos: "top-[5%] right-[-10%]",
    mobilePos: "top-[18%] right-[36%]",
    delay: 0.5,
    link: "/transportation",
  },
  {
    title: "EVENT MANAGEMENT",
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=80",
    pos: "bottom-[0%] left-[-9%]",
    mobilePos: "top-[62%] left-[30%]",
    delay: 1,
    link: "/event-management",
  },
  {
    title: " MEMBERSHIP",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    pos: "bottom-[0%] right-[-9%]",
    mobilePos: "bottom-[-5%] left-[60%] -translate-x-1/2",
    delay: 1.5,
    link: "/membership",
  },
];

const Markets = () => {
  return (
    <section className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* DESKTOP VIEW */}
        <div className="relative hidden lg:flex items-center justify-center h-[750px]">
          {/* CENTER CIRCLE WITH GLOBE IMAGE */}
          <div
            className="relative w-[500px] h-[500px] rounded-full bg-white shadow-2xl flex items-center justify-center text-center z-10 ring-4 ring-white ring-offset-4 ring-offset-gray-100
 overflow-hidden"
          >
            {/* Professional Globe Background */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>

            <div className="relative z-20 px-16">
              <div className="w-12 h-1 bg-red-600 mx-auto mb-6"></div>
              <h2 className="text-4xl font-black text-gray-900 leading-tight tracking-tighter uppercase">
                SERVICES WE <br />{" "}
                <span className="text-blue-600 uppercase">Provide</span>
              </h2>
              <p className="text-gray-500 mt-6 text-lg leading-relaxed">
                Delivering reliable logistics, transportation, and event
                solutions across India.
              </p>
            </div>
          </div>

          {/* FLOATING SERVICE ITEMS */}
          {services.map((item, i) => {
            const isBottom = item.pos.includes("bottom");

            return (
              <motion.div
                key={i}
                initial={{ y: 0 }}
                animate={{ y: [0, -15, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: item.delay,
                }}
                className={`absolute ${item.pos} flex  items-center group cursor-pointer z-20`}
              >
                {/* For bottom items, show title on the left */}
                {isBottom && (
                  <span className="mr-6 font-bold text-blue-700 tracking-widest text-sm uppercase opacity-80 group-hover:opacity-100 transition-opacity text-right">
                    {item.title}
                  </span>
                )}

                {/* IMAGE BUBBLE */}
                <div
                  className="
relative w-80 h-80 rounded-full 
bg-white/95 backdrop-blur-md p-[6px]
ring-2 ring-white/30
shadow-[0_15px_40px_rgba(0,0,0,0.7)]

group-hover:ring-blue-500
group-hover:shadow-[0_0_60px_rgba(59,130,246,0.7)]
transition-all duration-500
transform group-hover:scale-105
"
                >
                  <div className="w-full h-full rounded-full overflow-hidden border-2 border-gray-100">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>

                  {/* ARROW - Always points RIGHT regardless of bubble position */}
                  <Link
                    to={item.link}
                    className="focus:outline-none focus:ring-0"
                  >
                    <div
                      className={`absolute ${isBottom ? "-left-3" : "-right-3"} top-1/2 -translate-y-1/2 bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md border-2 border-white group-hover:bg-blue-700 transition-colors`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </Link>
                </div>

                {/* For top items, show title on the right */}
                {!isBottom && (
                  <span className="ml-6 font-bold text-blue-700 tracking-widest text-sm uppercase opacity-80 group-hover:opacity-100 transition-opacity">
                    {item.title}
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* MOBILE VIEW */}
        {/* MOBILE ORBIT VIEW */}
        <div className="relative flex lg:hidden items-center justify-center h-[650px]">
          {/* CENTER CIRCLE MOBILE */}
          <div
            className="relative w-[340px] h-[340px] rounded-full bg-white shadow-2xl flex items-center justify-center text-center z-10 ring-4 ring-white ring-offset-4 ring-offset-gray-100
 overflow-hidden"
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `
      linear-gradient(
        rgba(255,255,255,0.45),
        rgba(255,255,255,0.45)
      ),
      url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80')
    `,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>

            <div className="relative z-20 px-6">
              <div className="w-8 h-[2px] bg-red-600 mx-auto mb-3"></div>

              <h2 className="text-lg font-black text-gray-900 uppercase">
                Services We <span className="text-blue-600">Provide</span>
              </h2>

              <p className="text-xs text-gray-500 mt-3">
                Reliable logistics, transportation & events across India.
              </p>
            </div>
          </div>

          {/* MOBILE ORBIT ITEMS */}
          {services.map((item, i) => {
            const isBottom =
              item.title === "EVENT MANAGEMENT" || item.title === " MEMBERSHIP";

            return (
              <motion.div
                key={i}
                initial={{ y: 0 }}
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: item.delay,
                }}
                className={`absolute ${item.mobilePos} flex items-center z-20 group`}
              >
                <div
                  className={`
relative rounded-full bg-white p-[5px]
ring-4 ring-white ring-offset-2 ring-offset-gray-100
shadow-[0_12px_30px_rgba(0,0,0,0.6)]
bg-white/95 backdrop-blur-md

focus:outline-none focus:ring-0

transition-all duration-300 ease-out

group-hover:scale-105
group-hover:ring-blue-500
group-hover:shadow-[0_0_60px_rgba(59,130,246,0.4)]


${i === 1 || i === 2 ? "w-28 h-28" : "w-40 h-40"}
`}
                >
                  <div className="w-full h-full rounded-full overflow-hidden border border-gray-200">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="
w-full h-full object-cover
transition-all duration-300
group-hover:scale-110

"
                    />
                  </div>

                  {/* MOBILE ARROW */}
                  <Link
                    to={item.link}
                    className="focus:outline-none focus:ring-0"
                  >
                    <div
                      className={`absolute ${isBottom ? "-left-4" : "-right-4"} 
top-1/2 -translate-y-1/2 
bg-blue-600 text-white 
${i === 1 || i === 2 ? "w-8 h-8" : "w-10 h-10"}
rounded-full shadow-lg border-2 border-white
flex items-center justify-center

transition-all duration-300
group-hover:bg-blue-700
group-hover:scale-110
group-hover:shadow-[0_0_20px_rgba(37,99,235,0.6)]

`}
                    >
                      <span className="text-lg font-bold">→</span>
                    </div>
                  </Link>
                </div>
                {/* MOBILE SIDE TEXT */}
                <span
                  className={`
absolute top-1/2 -translate-y-1/2

${
  isBottom ? "right-full mr-[1rem] text-right" : "left-full ml-[1rem] text-left"
}

whitespace-nowrap


font-bold text-blue-700
tracking-widest text-xs uppercase
leading-tight
`}
                >
                  {item.title}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Markets;
