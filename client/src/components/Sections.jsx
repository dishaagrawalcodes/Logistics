import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, MapPin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const branchOffices = [
  {
    city: "Head Office",
    address: " Logistics Express\nPlot 654, Cuttack Road,\nBomikhal, Bhubaneswar-751006",
    email: "info@logistics.in",
    phone: "+91-9xxxxxxxxxx (TOLL FREE)",
  },
  {
    city: "Raipur Branch Office",
    address: "House, No.474, Basant Vihar Colony\nGate No.1, Gondwara, Raipur (CG) Pin 492001",
    email: "info@logistics.in",
    phone: "+91-9xxxxxxxxxx (TOLL FREE)",
  },
  {
    city: "Patna, Bihar Branch Office",
    address: "Dhalai road new vigrahpur,\nNear Smudayak Bhavan Mithapur, Patna 800001",
    email: "info@logistics.in",
    phone: "+91-9xxxxxxxxxx (TOLL FREE)",
  },
  {
    city: "Ranchi Branch Office",
    address: "Anandpuri, Chowk, Vidyanagar Road,\nHarmu, Ranchi, Jharkhand-834002",
    email: "info@logistics.in",
    phone: "+91-9xxxxxxxxxx (TOLL FREE)",
  },
  {
    city: "Surat Branch Office",
    address: "Sachin Chowk, Oscar Building,\nSurat, Gujarat",
    email: "info@logistics.in",
    phone: "+91-9xxxxxxxxxx (TOLL FREE)",
  },
  {
    city: "Gurgaon Branch Office",
    address: "Lane No 26, Palam Bihar,\nNear Krishna Chowk, Gurgaon, Haryana",
    email: "info@logistics.in",
    phone: "+91-9xxxxxxxxxx (TOLL FREE)",
  },
  {
    city: "Bangalore Branch Office",
    address: "Plot 86, Sunkal Farm, Adugodi\nBangalore-560030",
    email: "info@logistics.in",
    phone: "+91-9xxxxxxxxxx (TOLL FREE)",
  },
  {
    city: "Chandigarh Branch Office",
    address: "House No 180/28, Near Gurukul School\nManimajara, Chandigarh-160101",
    email: "info@logistics.in",
    phone: "+91-9xxxxxxxxxx (TOLL FREE)",
  },
];

const Section = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: i * 0.15, // stagger effect
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 text-center mb-12">
          Branch Offices
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {branchOffices.map((office, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className=" rounded-2xl shadow-md p-6 hover:shadow-xl transition transform duration-300 hover:-translate-y-1"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-red-600" /> {office.city}
              </h3>
              <p className="text-gray-600 whitespace-pre-line mb-2">{office.address}</p>
              <p className="text-gray-600 mb-1 flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-600" />
                {office.email}
              </p>
              <p className="text-gray-600 flex items-center gap-2">
                <Phone className="w-4 h-4 text-green-600" />
                {office.phone}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section;
