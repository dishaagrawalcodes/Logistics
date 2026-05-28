import React, { useEffect, useRef, useState } from "react";
import NewsletterSection from "../components/NewsletterSection";
import Section from "../components/Sections";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BrandMarquee from "../components/BrandMarquee";
import Testimonial from "../components/Testimonia";

gsap.registerPlugin(ScrollTrigger);

const ContactPage = () => {
  const contact="https://i.ibb.co/PGrxr2s9/contact.png"
  const heroRef = useRef(null); // Hero section ref
  const titleRef = useRef(null); // H1 ref
  const descRef = useRef(null); // Paragraph ref
  const contactFormRef = useRef(null);
  const sectionRef = useRef(null);
const contentRef = useRef(null);
const imageRef = useRef(null);

useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.from(contentRef.current, {
      opacity: 0,
      x: -60,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
      },
    });

    gsap.from(imageRef.current, {
      opacity: 0,
      x: 60,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
      },
    });
  }, sectionRef);

  return () => ctx.revert();
}, []);



  useEffect(() => {
    const ctx = gsap.context(() => {
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

      if (contactFormRef.current) {
        gsap.from(contactFormRef.current, {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contactFormRef.current,
            start: "top 85%",
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  

 

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Curved Bottom */}
      <div
        ref={heroRef}
        className="relative w-full h-[420px] sm:h-[500px] overflow-hidden"
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${contact})` }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-blue-950/75" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1
            ref={titleRef}
            className="text-white text-3xl sm:text-5xl font-light tracking-[0.3em]"
          >
            CONTACT
          </h1>

          <p
            ref={descRef}
            className="text-gray-200 mt-4 max-w-xl text-sm sm:text-base"
          >
            For sales inquiries or feedback, reach out to  Logistics using
            the form below.
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
      </div>
      
      <section
  ref={sectionRef}
  className="py-20 lg:py-32  relative overflow-hidden"
>
  <div className="max-w-7xl mx-auto px-6 lg:px-10">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
      
      {/* LEFT CONTENT */}
      <div ref={contentRef} className="space-y-6">
        <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6 relative pb-5">
          LET’S GET IN TOUCH.
          <span className="absolute bottom-0 left-0 w-20 h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></span>
        </h2>

        <p className="text-lg text-gray-600 leading-relaxed">
          Have questions about relocation, packing, or logistics? Our team is
          always ready to help you with reliable and affordable solutions.
        </p>

        <p className="text-lg text-gray-600 leading-relaxed">
          From local moves to nationwide transport — we ensure safe, smooth,
          and hassle-free delivery.
        </p>

        <div className="mt-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 lg:p-10 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10 space-y-4">
            <h3 className="text-2xl lg:text-3xl font-bold text-white">
              CONNECT WITH US TODAY
            </h3>

            <p className="text-white/95 text-lg">
              📞{" "}
              <a
                href="tel:+919xxxxxxxxxx"
                className="font-semibold underline underline-offset-4 hover:tracking-wide transition-all"
              >
                +91-9xxxxxxxxxx
              </a>
              <br />
              ✉️ support@logistics.com
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div ref={imageRef} className="relative group">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
          <img
            src="https://i.ibb.co/PGrxr2s9/contact.png"
            alt="Contact  Logistics"
            className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-blue-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
      </div>

    </div>
  </div>
</section>

     
      <Section />
      <BrandMarquee/>
      <Testimonial/>
      <NewsletterSection />
    </div>
  );
};

export default ContactPage;
