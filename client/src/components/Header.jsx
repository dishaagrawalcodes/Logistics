import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  FaChevronDown,
  FaPhoneAlt,
  FaRegEnvelope,
  FaRegClock,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import { IoSearchSharp } from "react-icons/io5";
import PincodeSearch from "./PincodeSearch";
import QuoteModal from "./QuoteModal";
const menuItems = [
  { label: "HOME", path: "/" },
  { label: "ABOUT US", path: "/about" },
  { label: "SERVICES", path: "/services" },
  { label: "CITY-WISE PACKERS", path: "/city-packers" },
  { label: "BLOG", path: "/blog" },
  { label: "CONTACT US", path: "/contact" },
];

const Header = () => {
  const services = [
    {
      title: "PACKER & MOVER",
      link: "/packer-mover",
    },
    {
      title: "TRANSPORTATION",
      link: "/transportation",
    },
    {
      title: "EVENT MANAGEMENT",
      link: "/event-management",
    },
    {
      title: "MEMBERSHIP",
      link: "/membership",
    },
  ];

  const location = useLocation();
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 120); // 👈 change 120 if you want
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="w-full ">
        {/* ───────────────── MAIN HEADER ───────────────── */}

        <div className="bg-white fixed top-0 left-0 w-full z-[1000] shadow-md sm:relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between ">
            {/* ☰ Mobile Hamburger (LEFT) */}
            <button
              className="sm:hidden text-slate-700 text-xl z-[1000]"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* LOGO (CENTER on mobile, LEFT on desktop) */}
            {/* LOGO */}
            <Link
              to="/"
              className={`ml-3 flex items-center
    ${searchOpen ? "hidden sm:flex" : ""}`}
            >
              <img
                src="/logo.png"
                alt=" Logistics"
                className="h-20 drop-shadow-sm cursor-pointer"
              />
            </Link>
            {/* DESKTOP CONTACT INFO */}
            <div className="hidden lg:flex flex-1  justify-center items-center gap-10 ">
              {/* Call Us */}
              <div className="flex items-center gap-2 border-r pr-8">
                <FaPhoneAlt className="text-amber-800" />
                <div className="text-sm">
                  <p className="text-gray-500">Call us</p>
                  <p className="font-semibold text-blue-600">+91-9xxxxxxxxxx</p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-center gap-2 border-r pr-8">
                <FaRegClock className="text-amber-800" />
                <div className="text-sm">
                  <p className="text-gray-500">Working Hours</p>
                  <p className="font-semibold">Mon - Fri 10 to 10pm</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2">
                <FaRegEnvelope className="text-amber-800" />
                <div className="text-sm">
                  <p className="text-gray-500">Email Us</p>
                  <p className="font-semibold text-blue-600">
                    info@logistics.in
                  </p>
                </div>
              </div>
            </div>

            {/* 🔍 MOBILE SEARCH */}
            <div className="sm:hidden ml-auto relative">
              {!searchOpen ? (
                <button
                  className="h-10 w-15 flex items-center justify-center text-slate-700 text-lg"
                  onClick={() => setSearchOpen(true)}
                >
                  <IoSearchSharp className="text-3xl" />
                </button>
              ) : (
                <div className="flex items-center h-14 w-[75vw]  rounded-md px-3 ">
                  <PincodeSearch />
                  <button
                    onClick={() => setSearchOpen(false)}
                    className="text-gray-600 text-lg ml-2"
                  >
                    <FaTimes />
                  </button>
                </div>
              )}
            </div>

            {/* Desktop CTA (RIGHT, desktop only) */}
            <div className="hidden sm:flex items-center gap-4 ml-auto">
              <button
                onClick={() => setQuoteOpen(true)}
                className="bg-amber-600 text-white px-6 py-2.5 rounded-lg font-bold shadow-lg hover:bg-amber-700 transition"
              >
                REQUEST A QUOTE
              </button>
            </div>
          </div>
        </div>

        {/* ───────────────── MOBILE MENU ───────────────── */}
        {menuOpen && (
          <div
            className="fixed inset-0 z-[999] bg-black/30 lg:hidden"
            onClick={() => setMenuOpen(false)}
          >
            <div
              className="
        absolute left-0 top-0
        w-full 
        min-h-[100vh]
        bg-white
        text-slate-800
        p-6
        shadow-2xl
        animate-slide-in
      "
              onClick={(e) => e.stopPropagation()}
            >
              {/* LOGO */}
              <Link to="/" className="mb-6 flex justify-center">
                <img src="/logo.png" alt="LOGISTICS Express" className="h-16" />
              </Link>

              <div className="border-b mb-6 border-gray-500"></div>

              {/* MENU ITEMS */}
              <ul className="flex flex-col text-sm font-semibold text-slate-800">
                {menuItems.map((item) =>
                  item.label === "SERVICES" ? (
                    <li key={item.label} className="border-b border-gray-400">
                      {/* SERVICES HEADER */}
                      <button
                        onClick={() => setServicesOpen((prev) => !prev)}
                        className="w-full py-4 flex items-center justify-between"
                      >
                        <span>SERVICES</span>
                        <FaChevronDown
                          className={`transition-transform duration-300 ${
                            servicesOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          servicesOpen
                            ? "max-h-[500px] opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <ul className="pl-4 pb-3 space-y-2 text-sm font-medium">
                          {services.map((service) => {
                            const isActive = location.pathname === service.link;

                            return (
                              <li key={service.title}>
                                <Link
                                  to={service.link}
                                  onClick={() => {
                                    setMenuOpen(false);
                                    setServicesOpen(false);
                                  }}
                                  className={`block py-2 transition ${
                                    isActive
                                      ? "font-semibold text-amber-600"
                                      : "text-gray-700 hover:text-amber-600"
                                  }`}
                                >
                                  {service.title}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </li>
                  ) : (
                    <li
                      key={item.label}
                      className="py-4 border-b border-gray-400"
                      onClick={() => setMenuOpen(false)}
                    >
                      <Link to={item.path}>{item.label}</Link>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>
        )}
      </header>
      <nav
        className={`
    sticky top-0 z-50 hidden lg:block transition-all duration-300 shadow-xl
    ${scrolled ? "bg-white" : "bg-blue-950/75"}
  `}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center ">
          <ul
            className={`
    flex items-center gap-8 text-[13px] font-medium tracking-wider transition-colors
    ${scrolled ? "text-slate-800" : "text-white"}
  `}
          >
            {menuItems.map((item) =>
              item.label === "SERVICES" ? (
                <li
                  key={item.label}
                  className="relative group flex items-center gap-1.5  cursor-pointer"
                >
                  <span className="flex items-center gap-1.5 hover:text-amber-500 transition">
                    SERVICES
                    <FaChevronDown
                      size={10}
                      className="group-hover:rotate-180 transition-transform"
                    />
                  </span>

                  {/* DROPDOWN */}
                  <div
                    className="
          absolute top-full left-0 mt-6 w-64
          bg-white text-slate-800
          shadow-2xl rounded-lg
          opacity-0 invisible
          group-hover:opacity-100 group-hover:visible
          transition-all duration-300 
        "
                  >
                    <ul className="py-3">
                      {services.map((service) => (
                        <li key={service.title}>
                          <Link
                            to={service.link}
                            className="block px-5 py-2 text-sm hover:bg-amber-50 hover:text-amber-600 transition"
                          >
                            {service.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <span className="absolute -bottom-[18px] left-0 h-[3px] w-0 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
                </li>
              ) : (
                <li
                  key={item.label}
                  className="relative group flex items-center gap-1.5 hover:text-amber-500 transition"
                >
                  <Link to={item.path}>{item.label}</Link>
                  <span className="absolute -bottom-[18px] left-0 h-[3px] w-0 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
                </li>
              ),
            )}
          </ul>

          <div className="relative ml-auto">
            <PincodeSearch variant={scrolled ? "light" : "dark"} />
          </div>
        </div>
      </nav>
      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  );
};

export default Header;
