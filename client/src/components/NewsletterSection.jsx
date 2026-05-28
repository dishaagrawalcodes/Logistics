

const NewsletterSection = () => {
  const bgImage="https://i.ibb.co/99Ts9RNZ/newsletter.png"
  return (
    <section className="relative w-full py-16 sm:py-20 overflow-hidden text-white">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* TOP Curve */}
      <svg
        className="absolute top-0 left-0 w-full h-[90px] z-10"
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
      >
        <path
          d="M0,90 C360,10 1080,10 1440,90 L1440,0 L0,0 Z"
          fill="#ffffff"
        />
      </svg>

      {/* Content */}
      <div className="relative z-20 max-w-3xl mx-auto px-4 flex flex-col items-center text-center">
        
        {/* Heading */}
        <h2 className="text-xl sm:text-4xl font-semibold max-w-2xl">
          Subscribe{" "}
          <span className="bg-gradient-to-t from-indigo-600 to-black px-2 py-1 inline-block">
            Newsletter
          </span>
        </h2>

        {/* Description */}
        <p className="text-gray-100 max-w-lg mt-3 text-sm sm:text-base">
          Stay updated with logistics insights, service updates, and smart
          moving solutions from  Logistics.
        </p>

        {/* Input */}
        <div className="mt-8 sm:mt-10 w-full flex justify-center">
          <div
            className="
              flex items-center
              w-full max-w-xl
              h-12 sm:h-14
              rounded-full
              border border-white/30
              bg-white/10
              backdrop-blur
              focus-within:outline
              focus-within:outline-2
              focus-within:outline-indigo-600
            "
          >
            <input
              type="email"
              placeholder="Enter your email address"
              className="
                flex-1 h-full px-4
                bg-transparent
                outline-none
                text-sm
                text-white
                placeholder:text-gray-200
              "
            />
            <button
              className="
                h-10 sm:h-11
                mr-1
                px-6 sm:px-10
                rounded-full
                bg-indigo-600
                text-white
                text-sm font-medium
                hover:bg-indigo-700
                active:scale-95
                transition
              "
            >
              Subscribe
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default NewsletterSection;
