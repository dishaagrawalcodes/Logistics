import solutionImg from "../assets/solutionimage.webp";

const OurSolutions = () => {
  return (
    <section className="relative w-full h-[420px] sm:h-[500px] overflow-hidden">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${solutionImg})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* TOP UPWARD CURVE */}
      <svg
        className="absolute top-0 left-0 w-full h-[90px] z-20"
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
      >
        <path
          d="M0,90 C360,10 1080,10 1440,90 L1440,0 L0,0 Z"
          fill="#ffffff"
        />
      </svg>

      {/* Content */}
      <div className="relative z-30 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-white text-3xl sm:text-5xl font-light tracking-[0.25em] uppercase">
          Our Solutions
        </h1>

        <p className="text-gray-200 mt-4 max-w-2xl text-sm sm:text-base">
          Scalable for every project, adaptable for every need
        </p>

        <p className="text-gray-300 mt-4 max-w-3xl text-sm sm:text-base">
          We design tailor-made logistics solutions by deeply understanding your
          supply chain and adapting to modern market demands.
        </p>
      </div>

    </section>
  );
};

export default OurSolutions;
