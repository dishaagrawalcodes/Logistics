import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


/* ─── Single Step Card ───────────────────────────────────────────── */
const StepCard = ({ step, image, title, description, cardRef }) => (
  <div
    ref={cardRef}
    className="flex flex-col items-center text-center  "
  >

    {/* Number + Circle wrapper */}
    <div className="relative flex items-center justify-center" style={{ width: 220, height: 240 }}>
      {/* Big blue step number — behind the image */}
      <span
        className="absolute select-none pointer-events-none"
        style={{
          fontSize: "clamp(130px, 20vw, 200px)",
          fontWeight: 900,
          color: "#1B3A7A",
          lineHeight: 1,
          top: 0,
          left: "10%",
          transform: "translateX(-50%)",
          zIndex: 0,
          fontFamily: "'Arial Black', Arial, sans-serif",
        }}
      >
        {step}
      </span>

      {/* Circular image */}
      <div
        className="relative z-10 rounded-full overflow-hidden"
        style={{
          width: 185,
          height: 185,
          marginTop: 28,
          boxShadow: "0 8px 30px rgba(0,0,0,.18)",
          border: "4px solid #fff",
        }}
      >
        <img
          src={image}
          alt={title}
          draggable={false}
          className="w-full h-full object-cover"
        />
      </div>
    </div>

    {/* Title */}
    <h3
      className="mt-3 font-black text-gray-800 uppercase"
      style={{ fontSize: "0.78rem", letterSpacing: "0.13em", lineHeight: 1.4 }}
    >
      {title}
    </h3>

    {/* Description */}
    <p
      className="mt-2 text-gray-500 leading-relaxed"
      style={{ fontSize: "0.82rem", maxWidth: 230 }}
    >
      {description}
    </p>
  </div>
);

/* ─── Main Component (NO GSAP) ───────────────────────────────────── */
const ProcessSteps = ({ steps = [] }) => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        opacity: 0,
        y: 60,
        duration: 0.9,
        ease: "back.out(1.7)", // 👈 bounce
        stagger: 0.25,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 px-4"
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "48px 24px",
          justifyItems: "center",
        }}
      >
        {steps.map((item, i) => (
          <StepCard
            key={i}
            step={i + 1}
            image={item.image}
            title={item.title}
            description={item.description}
            cardRef={(el) => (cardsRef.current[i] = el)}
          />
        ))}
      </div>
    </section>
  );
};

export default ProcessSteps;


