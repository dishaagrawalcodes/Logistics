import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaCheckCircle,
  FaShieldAlt,
  FaStar,
  FaClock,
  FaLock,
  FaBoxOpen,
  FaPhoneAlt,
  FaRegEnvelope,
  FaUsers,
  FaMapMarkerAlt,
  FaChevronRight,
  FaTruck,
  FaMotorcycle,
  FaHome,
  FaBuilding,
  FaArrowsAlt,
  FaFileAlt,
  FaEye,
  FaCalendarCheck,
  FaSmile,
  FaDollarSign,
  FaHeadset,
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { RiShieldCheckFill } from "react-icons/ri";
import QuoteModal from "../components/QuoteModal";

/* ─────────────────────────────────────────────
   SCROLL-REVEAL HOOKS  (IntersectionObserver)
   ───────────────────────────────────────────── */
function useGsapReveal(ref, { delay = 0, duration = 0.7, y = 40 } = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = `translateY(${y}px)`;
    el.style.transition = `opacity ${duration}s ease ${delay}s, transform ${duration}s ease ${delay}s`;

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0px)";
          obs.unobserve(el);
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, delay, duration, y]);
}

function useStaggerReveal(
  containerRef,
  selector = ":scope > div",
  { delay = 0.12, duration = 0.6, y = 30 } = {},
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const kids = [...container.querySelectorAll(selector)];
    kids.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = `translateY(${y}px)`;
      el.style.transition = `opacity ${duration}s ease ${delay * i}s, transform ${duration}s ease ${delay * i}s`;
    });

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          kids.forEach((el) => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0px)";
          });
          obs.unobserve(container);
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(container);
    return () => obs.disconnect();
  }, [containerRef]);
}

/* ─────────────────────────────────────────────
   COUNTER HOOK
   ───────────────────────────────────────────── */
function useCounter(target, { duration = 1.8, start = 0 } = {}) {
  const [count, setCount] = useState(start);
  const ref = useRef(null);
  const didRun = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !didRun.current) {
          didRun.current = true;
          const t0 = performance.now();
          const tick = (now) => {
            const p = Math.min((now - t0) / 1000 / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
            setCount(Math.round(start + (target - start) * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          obs.unobserve(el);
        }
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration, start]);

  return { count, ref };
}


  const ser1="https://i.ibb.co/vxXDXbDg/blog1.png";
  const ser2="https://i.ibb.co/8DNr6Jvn/blog2.png";
  const ser3="https://i.ibb.co/G4dGb4cV/blog3.png";
  const ser4="https://i.ibb.co/N2tcBjp7/blog4.png";
  const ser5="https://i.ibb.co/Zpb2dr9x/blog5.png";
  const ser6="https://i.ibb.co/PGRSMPB9/blog.png";
/* ─────────────────────────────────────────────
   DATA   ← images use /assets/ser1.jpg … ser6.jpg
   ───────────────────────────────────────────── */
const services = [
  {
    id: 1,
    label: "Household Moving",
    icon: FaHome,
    slug: "household-moving",
    image: ser1,
  },
  {
    id: 2,
    label: "Office Shifting",
    icon: FaBuilding,
    slug: "office-shifting",
    image: ser2,
  },
  {
    id: 3,
    label: "Car Transportation",
    icon: FaTruck,
    slug: "car-transportation",
    image: ser3,
  },
  {
    id: 4,
    label: "Local Shifting Service",
    icon: FaArrowsAlt,
    slug: "local-shifting-service",
    image: ser4,
  },
  {
    id: 5,
    label: "Bike Transportation",
    icon: FaMotorcycle,
    slug: "bike-transportation",
    image: ser5,
  },
  {
    id: 6,
    label: "Domestic Interstate Shifting",
    icon: FaFileAlt,
    slug: "domestic-interstate-shifting",
    image: ser6,
  },
];

// step cards cycle through ser1-ser4
const steps = [
  {
    num: 1,
    title: "Share Your Requirements",
    icon: FaRegEnvelope,
    desc: "To plan and assess your move accurately, our home relocation experts need details on when and what you're moving.",
    image: "/assets/ser1.jpg",
  },
  {
    num: 2,
    title: "Get Our Experts Visit You",
    icon: FaEye,
    desc: "Our house relocation experts may visit your home and provide expert guidance on logistics and moving services.",
    image: "/assets/ser2.jpg",
  },
  {
    num: 3,
    title: "Schedule Your Move",
    icon: FaCalendarCheck,
    desc: "After our experts provide you with a home shifting cost estimate and all the necessary details, you can confirm your booking and set a relocation date.",
    image: "/assets/ser3.jpg",
  },
  {
    num: 4,
    title: "Sit Back and Relax",
    icon: FaSmile,
    desc: "On your moving day, watch as our house shifting experts professionally pack, load, and transport your household goods to your desired destination.",
    image: "/assets/ser4.jpg",
  },
];

// policy cards cycle ser1-ser6 then wrap
const policies = [
  {
    title: "IBA Approved",
    sub: "Top Packers and Movers Services Across India",
    icon: MdVerified,
    color: "from-blue-600 to-blue-800",
    bg: "/assets/ser1.jpg",
  },
  {
    title: "Economical",
    sub: "Cost-Effective Solutions Within Your Budget",
    icon: FaDollarSign,
    color: "from-emerald-600 to-emerald-800",
    bg: "/assets/ser2.jpg",
  },
  {
    title: "Insurance",
    sub: "Secure Your Belongings with Transit Insurance",
    icon: RiShieldCheckFill,
    color: "from-indigo-600 to-indigo-800",
    bg: "/assets/ser3.jpg",
  },
  {
    title: "5-Star Ratings",
    sub: "Rated 5 Stars by Over 1000 Satisfied Customers",
    icon: FaStar,
    color: "from-amber-500 to-amber-700",
    bg: "/assets/ser4.jpg",
  },
  {
    title: "100% Safety",
    sub: "Secure Your Containers with Your Own Lock for Full Safety",
    icon: FaLock,
    color: "from-red-600 to-red-800",
    bg: "/assets/ser5.jpg",
  },
  {
    title: "Quality Service",
    sub: "Expert Packers and Movers for Safe Packing & Shifting",
    icon: FaCheckCircle,
    color: "from-teal-600 to-teal-800",
    bg: "/assets/ser6.jpg",
  },
  {
    title: "World Class Packing",
    sub: "Expert Packers and Movers for Safe Packing & Shifting",
    icon: FaBoxOpen,
    color: "from-violet-600 to-violet-800",
    bg: "/assets/ser1.jpg",
  },
  {
    title: "24/7 Support",
    sub: "24/7 Moving and Customer Care Services",
    icon: FaHeadset,
    color: "from-pink-600 to-pink-800",
    bg: "/assets/ser2.jpg",
  },
];

/* ─────────────────────────────────────────────
   STAT ITEM
   ───────────────────────────────────────────── */
function StatItem({ target, suffix, label, icon: Icon }) {
  const { count, ref } = useCounter(target, { duration: 2 });
  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <Icon className="text-amber-400 text-2xl mb-1" />
      <span className="text-4xl sm:text-5xl font-extrabold text-white tabular-nums">
        {count}
        {suffix}
      </span>
      <span className="text-blue-200 text-sm mt-1 tracking-widest uppercase font-light">
        {label}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAGE
   ───────────────────────────────────────────── */
export default function ServicePage() {
  const { slug } = useParams(); // reads /service/:slug
  const navigate = useNavigate();
  
  

  // derive index from URL slug; fall back to 0
  const slugIndex = services.findIndex((s) => s.slug === slug);
  const activeService = slugIndex === -1 ? 0 : slugIndex;

  // when sidebar is clicked we push to the correct URL
  const handleServiceClick = (i) => {
    navigate(`/service/${services[i].slug}`);
  };

  /* refs for scroll animations */
  const heroRef = useRef(null);
  const stepsRef = useRef(null);
  const detailRef = useRef(null);
  const policyRef = useRef(null);
  const [quoteOpen, setQuoteOpen] = useState(false);

  useGsapReveal(heroRef, { duration: 1, y: 0 });
  useStaggerReveal(stepsRef, ":scope > div", { delay: 0.15, y: 35 });
  useGsapReveal(detailRef, { y: 50, duration: 0.8 });
  useStaggerReveal(policyRef, ":scope > div", { delay: 0.1, y: 28 });

  const current = services[activeService];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ════════════ HERO ════════════ */}
      <section
        ref={heroRef}
        className="relative w-full h-[420px] sm:h-[500px] overflow-hidden"
      >
        {/* background image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700"
          style={{ backgroundImage: `url(${current.image})` }}
        />
        {/* dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/80 via-blue-900/70 to-blue-950/85" />

        {/* animated particle blobs — pure Tailwind animate-pulse + delay via inline style */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply blur-3xl animate-pulse opacity-20" />
          <div
            className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply blur-3xl animate-pulse opacity-20"
            style={{ animationDelay: "1.5s" }}
          />
        </div>

        {/* centred content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <span className="inline-block px-4 py-1.5 bg-blue-500/20 backdrop-blur-sm border border-blue-300/30 rounded-full text-blue-100 text-xs sm:text-sm font-light tracking-widest uppercase mb-4">
            Our Services
          </span>

          <h1
            className="text-white text-3xl sm:text-5xl lg:text-6xl font-light tracking-[0.1em] mb-3 max-w-4xl leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {current.label}
          </h1>

          <p className="text-gray-200 max-w-2xl text-sm sm:text-base lg:text-lg leading-relaxed font-light tracking-wide">
            Professional, reliable and affordable {current.label.toLowerCase()}{" "}
            solutions tailored to your needs — trusted by thousands across
            India.
          </p>

          {/* meta pills */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-gray-300 text-sm">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="w-4 h-4 text-amber-400" />
              <span className="font-light">Pan-India Coverage</span>
            </div>
            <span className="text-gray-500">•</span>
            <div className="flex items-center gap-2">
              <FaClock className="w-4 h-4 text-amber-400" />
              <span className="font-light">24 / 7 Available</span>
            </div>
            <span className="text-gray-500">•</span>
            <div className="flex items-center gap-2">
              <FaShieldAlt className="w-4 h-4 text-amber-400" />
              <span className="font-light">Insured & IBA Approved</span>
            </div>
          </div>
        </div>

        {/* bottom curve SVG */}
        <svg
          className="absolute bottom-0 left-0 w-full h-[90px]"
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C360,80 1080,80 1440,0 L1440,90 L0,90 Z"
            fill="#f3f4f6"
          />
        </svg>
      </section>

      {/* ════════════ STATS COUNTER BAR ════════════ */}
      <section className="relative z-10 mt-10 mx-4 sm:mx-auto sm:max-w-5xl">
        <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 rounded-2xl shadow-2xl px-6 py-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <StatItem
            target={450}
            suffix="+"
            label="Cities Covered"
            icon={FaMapMarkerAlt}
          />
          <StatItem target={50} suffix="+" label="Branches" icon={FaUsers} />
          <StatItem
            target={1000}
            suffix="+"
            label="Happy Customers"
            icon={FaSmile}
          />
          <StatItem
            target={5}
            suffix="+"
            label="Years of Experience"
            icon={FaStar}
          />
        </div>
      </section>

      {/* ════════════ SIDEBAR  +  STEP CARDS ════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 flex flex-col lg:flex-row gap-8">
        {/* ── LEFT sticky sidebar ── */}
        <aside className="lg:w-72 shrink-0">
          <div className="lg:sticky lg:top-24 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            {/* header strip */}
            <div className="bg-gradient-to-r from-blue-950 to-blue-900 px-5 py-4">
              <h3 className="text-white font-semibold text-sm tracking-widest uppercase">
                All Services
              </h3>
            </div>

            {/* scrollable list — scrollbar hidden with Tailwind scrollbar-hide (Tailwind-Scrollbar plugin)
                or the three-line utility below if the plugin is not installed */}
            <ul className="p-2 max-h-[420px] overflow-y-auto scrollbar-hide">
              {services.map((svc, i) => {
                const Icon = svc.icon;
                const active = i === activeService;
                return (
                  <li key={svc.id}>
                    <button
                      onClick={() => handleServiceClick(i)}
                      className={[
                        // base
                        "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium",
                        // slide-right on hover (pure Tailwind)
                        "transition-all duration-300 ease-[cubic-bezier(.4,0,.2,1)] hover:translate-x-1.5",
                        // active vs idle
                        active
                          ? "bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 border border-amber-200 shadow-sm"
                          : "text-slate-600 hover:text-amber-600 border border-transparent",
                      ].join(" ")}
                    >
                      <div
                        className={[
                          "w-9 h-9 flex items-center justify-center rounded-lg",
                          active
                            ? "bg-amber-500 text-white shadow"
                            : "bg-gray-100 text-gray-500",
                        ].join(" ")}
                      >
                        <Icon size={17} />
                      </div>

                      <span>{svc.label}</span>

                      {active && (
                        <FaChevronRight
                          size={14}
                          className="ml-auto text-amber-500"
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>

        {/* ── RIGHT step cards ── */}
        <div className="flex-1">
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
              How It Works
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Simple steps to get your move sorted effortlessly
            </p>
          </div>

          <div ref={stepsRef} className="grid sm:grid-cols-2 gap-5">
            {steps.map((s) => {
              const SIcon = s.icon;
              return (
                <div
                  key={s.num}
                  className="relative rounded-2xl overflow-hidden shadow-md border border-gray-100 bg-white cursor-default
                             transition-all duration-400 ease-out
                             hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* faint background image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-10"
                    style={{ backgroundImage: `url(${s.image})` }}
                  />

                  <div className="relative z-10 p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-950 to-blue-800 text-white shadow-md shrink-0">
                        <SIcon size={18} />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-amber-600 tracking-widest">
                          STEP {s.num}
                        </span>
                        <h3 className="text-base font-semibold text-slate-800 mt-0.5">
                          {s.title}
                        </h3>
                        <p className="text-slate-500 text-xs mt-1.5 leading-relaxed">
                          {s.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════ SERVICE DETAIL  (image-left / text-right) ════════════ */}
      <section ref={detailRef} className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
            Why Choose Our{" "}
            <span className="text-amber-600">{current.label}</span>?
          </h2>
          <p className="text-slate-500 text-sm mt-2 max-w-xl mx-auto">
            A visual deep-dive into what makes our service stand out — each
            piece crafted with intention, precision and care.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {/* image */}
          <div className="md:w-5/12 shrink-0">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-100 h-72 sm:h-80">
              <img
                src={current.image}
                alt={current.label}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* text */}
          <div className="md:w-7/12">
            <h3 className="text-xl font-bold text-slate-800">
              Our Latest Features
            </h3>
            <p className="text-sm text-slate-500 mt-1.5 max-w-md">
              Ship Beautiful Results Without the Overhead — Customizable,
              Scalable and Expert-Friendly moving solutions.
            </p>

            <div className="flex flex-col gap-5 mt-6">
              {[
                {
                  icon: "⚡",
                  title: "Lightning-Fast Execution",
                  desc: "Swift action — minimal delays and optimized logistics planning.",
                },
                {
                  icon: "🎨",
                  title: "Beautifully Handled Goods",
                  desc: "Modern, careful packing — every item treated like precious art.",
                },
                {
                  icon: "🧩",
                  title: "Plug-and-Play Integration",
                  desc: "Simple booking with real-time tracking across India.",
                },
              ].map((f) => (
                <div key={f.title} className="flex items-start gap-3">
                  <div className="w-9 h-9 flex items-center justify-center bg-indigo-50 border border-indigo-200 rounded-lg text-lg shrink-0">
                    {f.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-700">
                      {f.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={() => setQuoteOpen(true)} className="mt-7 inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow transition-colors duration-300">
              Get a Free Quote <FaChevronRight size={13} />
            </button>
          </div>
        </div>
      </section>

      {/* ════════════ WHY CHOOSE  ════════════ */}
      <section className="relative overflow-hidden py-20 px-4">
        {/* very faint full-bleed texture — uses ser1 */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-5"
          style={{ backgroundImage: "url(/assets/ser1.jpg)" }}
        />

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-300 text-xs font-semibold tracking-widest uppercase mb-3">
              Why Us
            </span>
            <h2
              className="text-2xl sm:text-4xl font-bold text-black"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Why Choose <span className="text-amber-400"> Logistics</span>{" "}
              Packers and Movers?
            </h2>
            <p className="text-slate-400 text-sm mt-2 max-w-xl mx-auto">
              We deliver trust, transparency and top-notch service — every
              single time.
            </p>
          </div>

          <div
            ref={policyRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {policies.map((p) => {
              const PIcon = p.icon;
              return (
                <div
                  key={p.title}
                  className="relative rounded-2xl overflow-hidden shadow-lg cursor-default
                             transition-all duration-300 ease-out
                             hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-2xl"
                >
                  {/* bg image layer */}
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-20"
                    style={{ backgroundImage: `url(${p.bg})` }}
                  />
                  {/* gradient overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-b ${p.color} opacity-85`}
                  />

                  <div className="relative z-10 p-5 flex flex-col items-center text-center h-48 justify-center">
                    <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 mb-3">
                      <PIcon size={24} className="text-white" />
                    </div>
                    <h3 className="text-white font-bold text-sm tracking-wide uppercase">
                      {p.title}
                    </h3>
                    <p className="text-white/70 text-xs mt-1.5 leading-relaxed px-1">
                      {p.sub}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════ CTA FOOTER STRIP ════════════ */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-black text-xl sm:text-2xl font-bold">
            Ready to Move?
          </h2>
          <p className="text-black text-sm mt-2 py-2">
            Get an instant free quote from India's most trusted packers and
            movers.
          </p>
          <button
            onClick={() => setQuoteOpen(true)}
            className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-7 py-3 rounded-xl shadow-lg transition-colors duration-300 text-sm"
          >
            REQUEST A FREE QUOTE
          </button>


          <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
        </div>
      </section>
    </div>
  );
}
