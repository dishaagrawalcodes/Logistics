import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";



gsap.registerPlugin(ScrollTrigger);


const founder ="https://i.ibb.co/hJ4S1zg1/freepik-a-highquality-3d-cartoon-avatar-portrait-of-a-frie-90319.png"
const cto ="https://i.ibb.co/DDGtfG3M/freepik-frontfacing-3d-cartoon-avatar-of-friendly-adult-ma-90323.png"
const delivery="https://i.ibb.co/CpqxS8Wb/freepik-3d-cartoon-avatar-portrait-of-a-friendly-adult-wom-90326.png"
const relation="https://i.ibb.co/pr0PwK2x/freepik-highdetail-3d-avatar-soft-studio-lighting-light-bl-90324.png"
const operations="https://i.ibb.co/219LzXw0/freepik-highquality-3d-cartoon-avatar-portrait-of-a-friend-90321.png"

const teamData = [
  {
    name: "Sanjib Mahapatra",
    role: "Founder",
    img: founder,
    description: "Sanjib is the visionary founder of our company, driving strategic growth and innovation in the logistics sector. With over a decade of experience, he focuses on creating efficient systems and fostering a culture of excellence."
  },
  {
    name: "Binod Kumar Nayak",
    role: "CTO",
    img: cto,
    description: "Binod leads our technology initiatives, ensuring that our platform remains cutting-edge and reliable. She specializes in building scalable systems and innovative solutions that support the company's rapid growth."
  },
  {
    name: "Swati Mahanty",
    role: "Swati Head",
    img: delivery,
    description: "Suresh oversees all delivery operations, ensuring timely and efficient logistics management. His expertise in supply chain optimization guarantees that our services meet the highest standards of reliability."
  },
  {
    name: "Amit Saha",
    role: "Relation Manager",
    img: relation,
    description: "Amit manages client and partner relationships, building trust and long-term collaborations. He ensures seamless communication and customer satisfaction across all our business operations."
  },
  {
    name: "Gayatri Mishra",
    role: "Operations Head",
    img: operations,
    description: "Gayatri is responsible for daily operations, streamlining processes, and optimizing team performance. His focus on efficiency and quality helps the company deliver exceptional service consistently."
  },
];


const ManagementTeam = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    cardsRef.current.forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900">
            Our Management Team
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-500 max-w-lg mx-auto">
            Meet the leaders driving our logistics excellence
          </p>
        </div>

        {/* Team Layout */}
        <div className="flex flex-col gap-16">
          {teamData.map((member, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="flex flex-col md:flex-row items-center gap-8"
            >
              {/* Image */}
              <img
                src={member.img}
                alt={member.name}
                className="w-full max-w-sm rounded-xl object-cover"
              />

              {/* Content */}
              <div className="max-w-xl">
                <h3 className="text-2xl font-semibold text-gray-900">
                  {member.name}
                </h3>

                <p className="text-sm text-indigo-600 font-medium uppercase mt-1">
                  {member.role}
                </p>

                <p className="text-sm sm:text-base text-slate-500 mt-4 leading-relaxed">
                  {member.description}
                </p>

                {/* Accent bullets (optional but matches example style) */}
                <div className="flex flex-col gap-4 mt-6">
                  <div className="flex items-center gap-3">
                    <div className="size-9 flex items-center justify-center bg-indigo-50 border border-indigo-200 rounded">
                      ⚡
                    </div>
                    <p className="text-sm text-slate-600">
                      Strategic leadership & execution
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="size-9 flex items-center justify-center bg-indigo-50 border border-indigo-200 rounded">
                      🎯
                    </div>
                    <p className="text-sm text-slate-600">
                      Focused on quality & growth
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};


export default ManagementTeam;
