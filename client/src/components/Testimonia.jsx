

export default function Testimonial() {
  const img1="https://i.ibb.co/hJ4S1zg1/freepik-a-highquality-3d-cartoon-avatar-portrait-of-a-frie-90319.png"
  const img2="https://i.ibb.co/219LzXw0/freepik-highquality-3d-cartoon-avatar-portrait-of-a-friend-90321.png"
  const img3="https://i.ibb.co/4nrWvPmg/freepik-a-highquality-3d-cartoon-avatar-portrait-of-a-frie-90320.png"
  const testimonials = [
    {
      image: img1,
      quote:
        " Logistics streamlined our interstate freight movement with unmatched reliability and real-time visibility. A logistics partner you can truly trust.",
      name: "Rajesh Mehta",
      role: "Supply Chain Head, FMCG",
    },
    {
      image: img2,
      quote:
        "From pickup to final-mile delivery, ’s tracking precision and timely updates helped us cut delivery delays by over 30%.",
      name: "Ananya Sharma",
      role: "Operations Manager, E-commerce",
    },
    {
      image: img3,
      quote:
        "What stands out is their commitment — proactive support, transparent pricing, and seamless coordination across cities.",
      name: "Vikram Iyer",
      role: "Founder, Manufacturing Unit",
    },
  ];

  return (
    <section className="relative px-6 py-20 ">
      {/* Header */}
      <div className="text-center mb-20">
        <p className="inline-block text-sm font-semibold tracking-wide text-blue-600 bg-blue-50 px-4 py-1 rounded-full mb-4">
          Trusted by 3,940+ Businesses Across India
        </p>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Real Stories from Our Logistics Partners
        </h2>

        <p className="mt-4 max-w-2xl mx-auto text-gray-500">
          From startups to enterprises,  Logistics powers dependable freight,
          faster deliveries, and nationwide reach.
        </p>
      </div>

      {/* Testimonials */}
      <div className="grid gap-10 lg:grid-cols-3 max-w-7xl mx-auto">
        {testimonials.map((item, index) => (
          <div
            key={index}
            className="group relative bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300"
          >
            {/* Quote Icon */}
            <div className="absolute -top-5 -left-5 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg shadow-md">
              “
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-5">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  width="16"
                  height="15"
                  viewBox="0 0 16 15"
                  fill="#FF7A00"
                >
                  <path d="M7.524.464a.5.5 0 0 1 .952 0l1.432 4.41a.5.5 0 0 0 .476.345h4.637a.5.5 0 0 1 .294.904L11.563 8.85a.5.5 0 0 0-.181.559l1.433 4.41a.5.5 0 0 1-.77.559L8.294 11.65a.5.5 0 0 0-.588 0l-3.751 2.726a.5.5 0 0 1-.77-.56l1.433-4.41a.5.5 0 0 0-.181-.558L.685 6.123A.5.5 0 0 1 .98 5.22h4.637a.5.5 0 0 0 .476-.346z" />
                </svg>
              ))}
            </div>

            {/* Quote */}
            <p className="text-gray-600 leading-relaxed mb-8">
              “{item.quote}”
            </p>

            {/* Profile */}
            <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
              <img
                src={item.image}
                alt={item.name}
                className="h-14 w-14 rounded-xl object-cover ring-1 ring-gray-200"
              />

              <div>
                <p className="font-semibold text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-500">{item.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
