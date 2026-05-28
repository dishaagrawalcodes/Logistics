import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Search, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

// data/services.js
export const services = [
  {
    title: "Household Moving",
    slug: "household-moving",
  },
  {
    title: "Office Shifting",
    slug: "office-shifting",
  },
  {
    title: "Car Transportation",
    slug: "car-transportation",
  },
  {
    title: "Local Shifting Service",
    slug: "local-shifting",
  },
  {
    title: "Bike Transportation",
    slug: "bike-transportation",
  },
  {
    title: "Domestic Interstate Shifting",
    slug: "domestic-interstate-shiftinging",
  },
];


const recentNews = [
  {
    title: "Bhubaneswar’s Trusted Packers And Movers: Seamless Relocations Made Easy",
    date: "08 March 2017",
  },
  {
    title: "Advantages Of Using  Logistics Express For Vehicle Transportation",
    date: "08 March 2017",
  },
  {
    title: "Odisha’s Relocation Solutions: Your Move With Expert Packers And Movers",
    date: "08 March 2017",
  },
];

const Sidebar = () => {
  const navigate=useNavigate()
  const sidebarRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      sidebarRef.current.children,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <aside
  ref={sidebarRef}
  className="
    w-full 
    lg:w-[320px] 
    xl:w-[360px]
    lg:sticky lg:top-28
    space-y-8
  "
>

      {/* SEARCH BOX */}
      <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100">
        <div className="flex items-center border rounded-lg overflow-hidden">
          <input
            type="text"
            placeholder="Enter Search Keywords"
            className="flex-1 px-4 py-3 text-sm focus:outline-none"
          />
          <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-3">
            <Search size={18} />
          </button>
        </div>
      </div>

      {/* CATEGORIES */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-lg font-semibold mb-4 border-l-4 border-blue-600 pl-3">
          Categories
        </h3>

        <ul className="space-y-3">
          {services.map((cat, index) => (
            <li
            onClick={() => navigate(`/service/${cat.slug}`)}
              key={index}
              className="group flex items-center justify-between cursor-pointer text-sm text-gray-700 hover:text-blue-600 transition"
            >
              <span>{cat.title}</span>
              <ChevronRight
                size={16}
                className="opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition"
              />
            </li>
          ))}
        </ul>
      </div>

      {/* RECENT NEWS */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-lg font-semibold mb-4 border-l-4 border-blue-600 pl-3">
          Recent News
        </h3>

        <div className="space-y-5">
          {recentNews.map((news, index) => (
            <div
              key={index}
              className="group cursor-pointer border-b last:border-none pb-4"
            >
              <h4 className="text-sm font-medium leading-snug group-hover:text-blue-600 transition">
                {news.title}
              </h4>
              <span className="text-xs text-gray-400 block mt-1">
                {news.date}
              </span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
