import { useRef } from "react";


const HeroSection = ({
  badge = "Our Services",
  title,
  description,

}) => {
  const heroRef = useRef(null);
  const [quoteOpen, setQuoteOpen] = useState(false);
const ser5="https://i.ibb.co/99Ts9RNZ/newsletter.png"
  return (
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
          {badge}
        </span>

        <h1
          className="text-white text-3xl sm:text-5xl lg:text-6xl font-light tracking-[0.15em] mb-4 max-w-5xl"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {title}
        </h1>

        <p className="text-gray-200 max-w-2xl text-sm sm:text-base lg:text-lg leading-relaxed font-light">
          {description}
        </p>

        <div className="mt-8 flex gap-4">
          <button
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
  );
};

export default HeroSection;
