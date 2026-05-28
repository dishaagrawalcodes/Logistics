import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import ProcessSteps from "../components/ProcessSteps";
import NewsletterSection from "../components/NewsletterSection";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import QuoteModal from "../components/QuoteModal";
import toast from "react-hot-toast";
import api from "../api/axios";
import TransportServiceForm from "../components/TransportServiceForm";
import UserQuickAuth from "../components/UserQuickAuth";


gsap.registerPlugin(ScrollTrigger);

const Transportation = () => {
 const ser1="https://i.ibb.co/vxXDXbDg/blog1.png";
  const ser2="https://i.ibb.co/8DNr6Jvn/blog2.png";
  const ser3="https://i.ibb.co/G4dGb4cV/blog3.png";
  const ser4="https://i.ibb.co/N2tcBjp7/blog4.png";
  
  const ser5="https://i.ibb.co/RL5N0zx/transportion.png"
  const transportationStepsData = [
    {
      image: ser1,
      title: "Schedule Transportation",
      description:
        "Book your transportation service easily with flexible pickup timings.",
    },
    {
      image: ser2,
      title: "Vehicle Allocation",
      description:
        "We assign the right-sized vehicle based on your cargo requirements.",
    },
    {
      image: ser3,
      title: "Safe Transit",
      description:
        "Your goods are transported securely with trained drivers and GPS tracking.",
    },
    {
      image: ser4,
      title: "On-Time Delivery",
      description:
        "Timely doorstep delivery ensuring your goods arrive safely and intact.",
    },
  ];
   const [quoteOpen, setQuoteOpen] = useState(false);
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const heroRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);

   const [formData, setFormData] = useState({
  name: "",
  mobile: "",
  pincode: "",
  vehicleName: "",
  vehicleNumber: "",
  dlNumber: "",
  rcNumber: "",
  aadhaarNumber: "",
  panNumber: "",
});
const [selectedService, setSelectedService] = useState(null);
const [serviceModalOpen, setServiceModalOpen] = useState(false);
const [authOpen, setAuthOpen] = useState(false);
const [pendingService, setPendingService] = useState(null);

const [services, setServices] = useState([]);
const [servicesLoading, setServicesLoading] = useState(true);

const [formLoading, setFormLoading] = useState(false);

 
 
useEffect(() => {
  const fetchServices = async () => {
    try {
      setServicesLoading(true);

      const res = await api.get("/services/type/transportation");

      setServices(res.data);
    } catch (error) {
      console.error("Failed to fetch services", error);
      toast.error("Unable to load services");
    } finally {
      setServicesLoading(false);
    }
  };

  fetchServices();
}, []);

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
};

const validateForm = () => {
  const {
  name,
  mobile,
  email,
  pincode,
  vehicleName,
  vehicleNumber,
  dlNumber,
  rcNumber,
  aadhaarNumber,
  panNumber,
} = formData;


  if (
    !name ||
    !mobile ||
    !email ||
    !pincode ||
    !vehicleName ||
    !vehicleNumber ||
    !dlNumber ||
    !rcNumber ||
    !aadhaarNumber ||
    !panNumber
  ) {
    return "Please fill all fields";
  }

  if (!/^\d{10}$/.test(mobile))
    return "Enter valid 10 digit mobile number";
 

if (!/\S+@\S+\.\S+/.test(email))
  return "Enter valid email address";


  if (!/^\d{6}$/.test(pincode))
    return "Enter valid 6 digit pincode";

  if (!/^\d{12}$/.test(aadhaarNumber))
    return "Enter valid 12 digit Aadhaar number";

  if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(panNumber.toUpperCase()))
    return "Enter valid PAN number";

  return null;
};

const handleSubmit = async (e) => {
  e.preventDefault();

  const error = validateForm();
  if (error) return toast.error(error);

  try {
    setFormLoading(true);

   await api.post("/transport/register", formData);



    toast.success("Registration submitted successfully 🎉");

   setFormData({
  name: "",
  mobile: "",
  email: "",
  pincode: "",
  vehicleName: "",
  vehicleNumber: "",
  dlNumber: "",
  rcNumber: "",
  aadhaarNumber: "",
  panNumber: "",
});

  } catch (err) {
    toast.error(
      err.response?.data?.message || "Submission failed"
    );
  } finally {
    setFormLoading(false);
  }
};


  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(badgeRef.current, { opacity: 0, y: 30, duration: 0.6 }, "-=1.3")
        .from(titleRef.current, { opacity: 0, y: 40, duration: 0.8 }, "-=0.3")
        .from(descRef.current, { opacity: 0, y: 30, duration: 0.6 }, "-=0.4")
        .from(
          ctaRef.current.children,
          { opacity: 0, y: 25, stagger: 0.2, duration: 0.5 },
          "-=0.3",
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        x: -120,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        x: 120,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);
 const handleGetService = (serviceName) => {
  setPendingService(serviceName);
  setAuthOpen(true);   // Always open auth first
};






  return (
    <>
      {/* HERO */}
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
          <span
            ref={badgeRef}
            className="inline-block px-5 py-1.5 bg-blue-500/20 backdrop-blur-sm border border-blue-300/30 rounded-full text-blue-100 text-xs sm:text-sm tracking-widest uppercase mb-5"
          >
            Our Services
          </span>

          <h1
            ref={titleRef}
            className="text-white text-3xl sm:text-5xl lg:text-6xl font-light tracking-[0.15em] mb-4 max-w-5xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            TRANSPORTATION
          </h1>

          <p
            ref={descRef}
            className="text-gray-200 max-w-2xl text-sm sm:text-base lg:text-lg leading-relaxed font-light"
          >
            Fast, secure and nationwide transportation services with on-time
            delivery and real-time tracking across India.
          </p>

          <div ref={ctaRef} className="mt-8 flex gap-4">
            <button onClick={() => setQuoteOpen(true)} className="border border-white/40 hover:bg-white/10 text-white px-6 py-3 rounded-lg font-semibold shadow-lg">
              Get Free Quote
            </button>
            <a href="tel:+919876543210">
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
      <section
        ref={sectionRef}
        className="flex flex-col md:flex-row w-full mx-auto items-center gap-10 px-4 md:px-36 py-12"
      >
        {/* IMAGE SIDE */}
        <div
          ref={imageRef}
          className="relative shadow-2xl shadow-blue-600/30 rounded-2xl overflow-hidden shrink-0"
        >
          <img
            src={ser5}
            alt="PACKER & MOVER"
            className="max-w-md w-full h-[260px] md:h-[340px] object-cover rounded-2xl"
          />
        </div>

        {/* CONTENT SIDE */}
        <div ref={contentRef} className="max-w-lg text-sm text-slate-600">
          <div className="max-w-lg text-sm text-slate-600">
            <h3 className="text-xl uppercase font-semibold text-slate-800 tracking-wide">
              Transportation Services
            </h3>

            <div className="w-24 h-[3px] my-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-200"></div>

            <p className="mt-6 leading-relaxed">
              Our transportation services ensure safe, fast, and cost-effective
              movement of goods across cities and states, supported by a
              reliable fleet, professional handling, and real-time tracking for
              complete peace of mind.
            </p>
          </div>

          <div className="flex items-center w-max gap-2 mt-8 hover:-translate-y-0.5 transition bg-gradient-to-r from-blue-600 to-indigo-500 py-3 px-8 rounded-full text-white cursor-pointer">
            <span className="text-sm font-medium">Read more</span>
            <svg
              width="13"
              height="12"
              viewBox="0 0 13 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.53 6.53a.75.75 0 0 0 0-1.06L7.757.697a.75.75 0 1 0-1.06 1.06L10.939 6l-4.242 4.243a.75.75 0 0 0 1.06 1.06zM0 6v.75h12v-1.5H0z"
                fill="#fff"
              />
            </svg>
          </div>
        </div>
      </section>
      <div className="sm:px-24 px-6">
              <h3 className="text-4xl font-bold text-center mb-10">
                Book a Service
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                {services.map((service) => (
                  <div
                    key={service._id}
                    className="relative bg-white/70 backdrop-blur-xl border border-gray-200 rounded-3xl p-7 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
                  >
                    {/* Subtle top gradient effect */}
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-80"></div>

                    {/* ICON CIRCLE */}
                    <div className="mb-6">
                      <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-blue-50 text-blue-600 text-2xl font-bold shadow-inner">
                        {service.name.charAt(0)}
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-800 mb-3 tracking-tight group-hover:text-blue-600 transition">
                        {service.name}
                      </h4>

                      <p className="text-gray-500 text-sm leading-relaxed mb-6">
                        {service.description ||
                          "Verified professionals available instantly in your location."}
                      </p>
                    </div>

                    {/* CTA */}
                    <button
                      onClick={() => handleGetService(service.name)}
                      className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold"
                    >
                      Get Service →
                    </button>
                  </div>
                ))}
              </div>
            </div>
<section className="relative w-full py-20">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl">

    
   <div className="relative  bg-gradient-to-br from-[#0A192F] via-[#0F2A55] to-[#1A3E7C] text-white p-12 flex flex-col justify-center">

  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="relative z-10">
        <h2 className="text-4xl md:text-5xl font-semibold leading-tight">
          Become a Verified <br />
          <span className="bg-gradient-to-r from-white to-[#4F8CFF] bg-clip-text text-transparent">
            Transportation Partner
          </span>
        </h2>

        <p className="mt-6 text-slate-300 max-w-md text-sm leading-6">
          Register your vehicle and documents to join our trusted network.
          We connect verified transport partners with customers across
          multiple service areas.
        </p>

        <div className="mt-10 space-y-4 text-sm text-slate-300">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
            Government ID Verification
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
            Secure & Fast Approval
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
            Expand Your Business Reach
          </div>
        </div>
      </div>
    </div>

    
    <div className="bg-white p-10 md:p-14">

      <h3 className="text-2xl font-semibold text-slate-800 mb-2">
        Transportation Registration
      </h3>
      <p className="text-slate-500 text-sm mb-8">
        Fill in the required details to get started.
      </p>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="formInput"
        />
         
         <input
  type="email"
  name="email"
  value={formData.email}
  onChange={handleChange}
  placeholder="Email Address"
  className="formInput"
/>
  
        <input
          type="text"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          placeholder="Mobile Number"
          className="formInput"
        />

        <input
          type="text"
          name="pincode"
          value={formData.pincode}
          onChange={handleChange}
          placeholder="Pin Code"
          maxLength={6}
          className="formInput"
        />

        <input
          type="text"
          name="vehicleName"
          value={formData.vehicleName}
          onChange={handleChange}
          placeholder="Vehicle Name"
          className="formInput"
        />

        <input
          type="text"
          name="vehicleNumber"
          value={formData.vehicleNumber}
          onChange={handleChange}
          placeholder="Vehicle Number"
          className="formInput"
        />

        <input
          type="text"
          name="dlNumber"
          value={formData.dlNumber}
          onChange={handleChange}
          placeholder="DL Number"
          className="formInput"
        />

        <input
          type="text"
         name="rcNumber"

          value={formData.rcNumber}

          onChange={handleChange}
          placeholder="Van RC Number"
          className="formInput"
        />

        <input
          type="text"
          name="aadhaarNumber"
          value={formData.aadhaarNumber}
          onChange={handleChange}
          placeholder="Aadhaar Number"
          maxLength={12}
          className="formInput"
        />

        <input
          type="text"
          name="panNumber"
          value={formData.panNumber}
          onChange={handleChange}
          placeholder="PAN Number"
          className="formInput"
        />

       <button
  type="submit"
  disabled={formLoading}
  className="md:col-span-2 bg-gradient-to-r from-[#1C3A70] to-[#112B5B] hover:from-[#243E7F] hover:to-[#0F2550] text-white py-3 rounded-xl font-semibold transition duration-300 disabled:opacity-60"
>
  {formLoading ? "Submitting..." : "Register Now"}
</button>
<button
  type="button"
  onClick={() =>
    window.open(
      import.meta.env.VITE_TRANSPORTER_APP_URL,
      "_blank",
      "noopener,noreferrer"
    )
  }
  className="md:col-span-2 bg-gradient-to-r from-[#1C3A70] to-[#112B5B] hover:from-[#243E7F] hover:to-[#0F2550] text-white py-3 rounded-xl font-semibold transition duration-300 disabled:opacity-60"
>
  Transporter Login
</button>

      </form>
    </div>
  </div>
</section>
      
   
    {authOpen && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl p-6 relative w-full max-w-md">
      
      <button
        onClick={() => setAuthOpen(false)}
        className="absolute top-3 right-4 text-gray-500 hover:text-black"
      >
        ✕
      </button>

 <UserQuickAuth
  onSuccess={() => {
    setAuthOpen(false);

    if (pendingService) {
      setSelectedService(pendingService);
      setServiceModalOpen(true);
      setPendingService(null);
    }
  }}
/>


    </div>
  </div>
)}


      <ProcessSteps steps={transportationStepsData} />
      <NewsletterSection />
      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
      

    </>
  );
};

export default Transportation;
