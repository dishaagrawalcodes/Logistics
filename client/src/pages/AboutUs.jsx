import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ManagementTeam from "../components/ManagementTeam";
import NewsletterSection from "../components/NewsletterSection";
gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const bgImage="https://i.ibb.co/Kxs3JwW3/about.png"
  const heroRef = useRef(null); // Hero section ref
  const titleRef = useRef(null); // H1 ref
  const descRef = useRef(null); // Paragraph ref
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const image1Ref = useRef(null);
  const image2Ref = useRef(null);
  const content1Ref = useRef(null);
  const content2Ref = useRef(null);

  useEffect(() => {
    // Section 1 Animations
    const ctx1 = gsap.context(() => {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" },
      );
      // Hero animation (Blog-style)
      gsap.from(titleRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(descRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
      });
      // Image animation - slide in from left with scale
      gsap.from(image1Ref.current, {
        scrollTrigger: {
          trigger: section1Ref.current,
          start: "top 80%",
          end: "top 30%",
          toggleActions: "play none none reverse",
        },
        x: -100,
        opacity: 0,
        scale: 0.9,
        duration: 1.2,
        ease: "power3.out",
      });

      // Content animation - stagger text elements
      gsap.from(content1Ref.current.children, {
        scrollTrigger: {
          trigger: section1Ref.current,
          start: "top 75%",
          end: "top 30%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, section1Ref);

    // Section 2 Animations
    const ctx2 = gsap.context(() => {
      // Image animation - slide in from right with rotation
      gsap.from(image2Ref.current, {
        scrollTrigger: {
          trigger: section2Ref.current,
          start: "top 80%",
          end: "top 30%",
          toggleActions: "play none none reverse",
        },
        x: 100,
        opacity: 0,
        scale: 0.9,
        rotation: 3,
        duration: 1.2,
        ease: "power3.out",
      });

      // Content animation - fade up with stagger
      gsap.from(content2Ref.current.children, {
        scrollTrigger: {
          trigger: section2Ref.current,
          start: "top 75%",
          end: "top 30%",
          toggleActions: "play none none reverse",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.25,
        ease: "power3.out",
      });
    }, section2Ref);

    return () => {
      ctx1.revert();
      ctx2.revert();
    };
  }, []);
  return (
    <>
      <section
        ref={heroRef}
        className="relative w-full h-[420px] sm:h-[500px] overflow-hidden"
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-blue-950/75" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1
            ref={titleRef}
            className="text-white text-3xl sm:text-5xl font-light tracking-[0.3em]"
          >
            MANAGEMENT TEAM
          </h1>

          <p
            ref={descRef}
            className="text-gray-200 mt-4 max-w-xl text-sm sm:text-base"
          >
            Meet the  Logistics executive leadership team.
          </p>
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
      <div className="bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        {/* Section 1 */}
        <section
          ref={section1Ref}
          className="py-20 lg:py-32 bg-gradient-to-br from-white to-blue-50 relative"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Image */}
              <div ref={image1Ref} className="relative group">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
                  <img
                    src="https://i.ibb.co/GvjPMtQ8/about1.png"
                    alt=" Logistics packing services"
                    className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-blue-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
               
              </div>

              {/* Content */}
              <div ref={content1Ref} className="space-y-6">
                <div>
                  <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6 relative pb-5">
                    EXPERTISE: NOT JUST A WORD.
                    <span className="absolute bottom-0 left-0 w-20 h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></span>
                  </h2>
                </div>

                <p className="text-lg text-gray-600 leading-relaxed">
                   Logistics Express is a company with 50+ well-qualified and
                  motivated personnel, having a wide range of experience in the
                  industry. They are always striving to provide their client and
                  customers with the best of services at an affordable rate, and
                  that too with dedication. We ensure that our clients get the
                  most reliable service from us as we understand how important
                  it is for them as well.
                </p>

                <p className="text-lg text-gray-600 leading-relaxed">
                  Our company is not just a transporters but also a well
                  equipped packing and moving service provider. We provide
                  efficient and smooth delivery solutions with cost-effective
                  manner.
                </p>

                <div className="mt-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 lg:p-10 shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                  <div className="relative z-10">
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 tracking-tight">
                      WE MAKE YOUR MOVE EASIER.
                    </h3>
                    <p className="text-base lg:text-lg text-white/95 leading-relaxed">
                      Our company is a one-stop shop for all your relocation
                      needs. To find out more, please visit our website or
                      contact us on{" "}
                      <a
                        href="tel:+919xxxxxxxxxx"
                        className="font-semibold border-b-2 border-white/50 hover:border-white transition-all duration-300 hover:tracking-wide inline-block"
                      >
                        +91-9xxxxxxxxxx
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section
          ref={section2Ref}
          className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-white relative"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Content - First on mobile, second on desktop */}
              <div ref={content2Ref} className="space-y-6 lg:order-1 order-2">
                <div>
                  <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6 relative pb-5">
                     LOGISTICS EXPRESS PVT LTD: THE SMOOTHEST WAY TO MOVE.
                    <span className="absolute bottom-0 left-0 w-20 h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></span>
                  </h2>
                </div>

                <p className="text-lg text-gray-600 leading-relaxed">
                  ODT Logistics Express Pvt Ltd. is an Indian company engaged in
                  logistics, packing and moving business. The company provides
                  efficient and smooth delivery solutions in transportation
                  field with cost-effective manner.
                </p>

                <p className="text-lg text-gray-600 leading-relaxed">
                  We provide the smoothest transit solutions in India, whether
                  you're transferring house or office. We do all the packing,
                  shifting, and loading work so you don't have to worry about a
                  thing.
                </p>

                <div className="mt-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 lg:p-10 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                  <div className="relative z-10 space-y-4">
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 tracking-tight">
                      SAFE AND HASSLE-FREE TRANSPORT WITH US.
                    </h3>
                    <p className="text-base lg:text-lg text-white/95 leading-relaxed">
                       Logistics Express Pvt Ltd is a leading logistic
                      company in India, offering professional transport services
                      to its customers.
                    </p>
                    <p className="text-base lg:text-lg text-white/95 leading-relaxed">
                      We offer door-to-door delivery and pick up in any part of
                      the country at an affordable price. With us, you need not
                      worry about the security of goods during transit. Our
                      experts are always on their toes to make sure that your
                      goods from point A to B reaches safe and on-time
                    </p>
                  </div>
                </div>
              </div>

              {/* Image - Second on mobile, first on desktop */}
              <div
                ref={image2Ref}
                className="relative group lg:order-2 order-1"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
                  <img
                    src="https://i.ibb.co/s9NcHPpM/about2.png"
                    alt=" Logistics warehouse"
                    className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-blue-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <ManagementTeam />
      <NewsletterSection />
    </>
  );
};

export default AboutUs;
