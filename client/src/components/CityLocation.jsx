import { useEffect, useRef, useState } from "react";
import {
  MapPin,
  Building2,
  Users,
  TrendingUp,
  Navigation,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CityLocations = () => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const statsRef = useRef([]);
  const cardsRef = useRef([]);
  const [animatedStats, setAnimatedStats] = useState({
    totalCities: 0,
    activeRegions: 0,
    customers: 0,
  });

  const stats = {
    totalCities: 93,
    activeRegions: 5,
    customers: 10000,
  };

  // Counter animation
  const animateCounter = (
    target,
    finalValue,
    duration = 2000,
    isCustomers = false,
  ) => {
    let startValue = 0;
    const increment = finalValue / (duration / 16);

    const counter = setInterval(() => {
      startValue += increment;
      if (startValue >= finalValue) {
        clearInterval(counter);
        return finalValue;
      }
      return Math.floor(startValue);
    }, 16);

    return counter;
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(headerRef.current, {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Stats animation with counter
      statsRef.current.forEach((stat, index) => {
        gsap.from(stat, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          delay: 0.3 + index * 0.1,
          ease: "power3.out",
          onStart: () => {
            // Animate counters
            let currentValue = 0;
            const interval = setInterval(() => {
              currentValue += stats.totalCities / 50;
              if (index === 0) {
                setAnimatedStats((prev) => ({
                  ...prev,
                  totalCities: Math.min(
                    Math.floor(currentValue),
                    stats.totalCities,
                  ),
                }));
                if (currentValue >= stats.totalCities) clearInterval(interval);
              }
            }, 30);

            let currentRegion = 0;
            const regionInterval = setInterval(() => {
              currentRegion += stats.activeRegions / 50;
              if (index === 1) {
                setAnimatedStats((prev) => ({
                  ...prev,
                  activeRegions: Math.min(
                    Math.floor(currentRegion),
                    stats.activeRegions,
                  ),
                }));
                if (currentRegion >= stats.activeRegions)
                  clearInterval(regionInterval);
              }
            }, 30);

            let currentCustomers = 0;
            const customerInterval = setInterval(() => {
              currentCustomers += stats.customers / 50;
              if (index === 2) {
                setAnimatedStats((prev) => ({
                  ...prev,
                  customers: Math.min(
                    Math.floor(currentCustomers),
                    stats.customers,
                  ),
                }));
                if (currentCustomers >= stats.customers)
                  clearInterval(customerInterval);
              }
            }, 30);
          },
        });
      });

      // Cards animation with ScrollTrigger
      cardsRef.current.forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
          y: 60,
          opacity: 0,
          duration: 1,
          delay: index * 0.15,
          ease: "power3.out",
        });

        // Animate city tags
        //         const cityTags = card.querySelectorAll('.city-tag');
        //       gsap.from(cityTags, {
        //   x: -20,
        //   opacity: 0,
        //   duration: 0.5,
        //   stagger: 0.03,
        //   delay: 0.2,
        //   ease: 'power2.out'
        // });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const cityData = [
    {
      title: "Odisha",
      icon: Building2,
      gradient: "from-blue-500 to-cyan-500",
      shadowColor: "shadow-blue-200",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      cities: [
        "Angul",
        "Balangir",
        "Balasore",
        "Bargarh",
        "Bhadrak",
        "Boudh",
        "Cuttack",
        "Deogarh",
        "Dhenkanal",
        "Bhubaneswar",
        "Ganjam",
        "Jagatsinghapur",
        "Jajpur",
        "Jharsuguda",
        "Kalahandi",
        "Kandhamal",
        "Kendrapara",
        "Keonjhar",
        "Khordha",
        "Koraput",
        "Malkangiri",
        "Mayurbhanj",
        "Nabarangpur",
        "Nayagarh",
        "Nuapada",
        "Puri",
        "Rayagada",
        "Sambalpur",
        "Subarnapur",
        "Sundargarh",
      ],
    },
    {
      title: "Haryana",
      icon: Navigation,
      gradient: "from-emerald-500 to-teal-500",
      shadowColor: "shadow-emerald-200",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      cities: [
        "Ambala",
        "Bhiwani",
        "Faridabad",
        "Fatehabad",
        "Gurgaon",
        "Hisar",
        "Jhajjar",
        "Jind",
        "Kaithal",
        "Karnal",
        "Kurukshetra",
        "Mahendragarh",
        "Mewat",
        "Palwal",
        "Panchkula",
        "Panipat",
        "Rewari",
        "Rohtak",
        "Sirsa",
        "Sonipat",
        "Yamunanagar",
      ],
    },
    {
      title: "Bihar",
      icon: TrendingUp,
      gradient: "from-orange-500 to-amber-500",
      shadowColor: "shadow-orange-200",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      cities: [
        "Arrah",
        "Bhagalpur",
        "Bihar Sharif",
        "Darbhanga",
        "Gaya",
        "Hajipur",
        "Muzaffarpur",
        "Patna",
        "Purnia",
        "Ranchi",
        "Samastipur",
        "Sasaram",
      ],
    },
    {
      title: "Hyderabad",
      icon: Sparkles,
      gradient: "from-purple-500 to-pink-500",
      shadowColor: "shadow-purple-200",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      cities: [
        "Adilabad",
        "Armoor",
        "Hyderabad",
        "Jagtial",
        "Karimnagar",
        "Khammam",
        "Mahabubnagar",
        "Mancherial",
        "Miryalaguda",
        "Nalgonda",
        "Nizamabad",
        "Ramagundam",
        "Siddipet",
        "Suryapet",
        "Warangal",
      ],
    },
    {
      title: "Delhi NCR",
      icon: Users,
      gradient: "from-rose-500 to-red-500",
      shadowColor: "shadow-rose-200",
      iconBg: "bg-rose-100",
      iconColor: "text-rose-600",
      cities: [
        "Agra",
        "Bharatpur",
        "Chandigarh",
        "Dehradun",
        "Delhi",
        "Ghaziabad",
        "Hapur",
        "Jaipur",
        "Mathura & Vrindavan",
        "Meerut",
        "Noida",
        "Rishikesh",
        "Sikar",
        "Uttarakhand",
      ],
    },
  ];

  return (
    <div ref={containerRef} className="relative w-full  overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96  rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 rounded-full blur-3xl opacity-20 -translate-x-1/2"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-32">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-block">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gray-900 mb-4 sm:mb-6 tracking-tight leading-tight">
              Our Service Network
            </h2>
            <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full"></div>
          </div>

          <p className="mt-6 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Delivering excellence across India with our extensive network of
            service locations
          </p>
        </div>

        {/* Stats Counter */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20 lg:mb-24">
          {[
            {
              label: "Cities Covered",
              value: animatedStats.totalCities,
              icon: MapPin,
              gradient: "from-blue-500 to-cyan-500",
              iconBg: "bg-blue-100",
              iconColor: "text-blue-600",
            },
            {
              label: "Active Regions",
              value: animatedStats.activeRegions,
              icon: Building2,
              gradient: "from-emerald-500 to-teal-500",
              iconBg: "bg-emerald-100",
              iconColor: "text-emerald-600",
            },
            {
              label: "Happy Customers",
              value: `${(animatedStats.customers / 1000).toFixed(0)}K+`,
              icon: Users,
              gradient: "from-purple-500 to-pink-500",
              iconBg: "bg-purple-100",
              iconColor: "text-purple-600",
            },
          ].map((stat, idx) => (
            <div
              key={stat.label}
              ref={(el) => (statsRef.current[idx] = el)}
              className="group relative"
            >
              <div className="relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-gray-200 hover:scale-105">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5">
                  <div
                    className={`flex-shrink-0 p-4 sm:p-5 rounded-2xl ${stat.iconBg} group-hover:scale-110 transition-transform duration-500`}
                  >
                    <stat.icon
                      className={`w-7 h-7 sm:w-8 sm:h-8 ${stat.iconColor}`}
                    />
                  </div>
                  <div className="text-center sm:text-left flex-1">
                    <div
                      className={`text-4xl sm:text-5xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}
                    >
                      {stat.value}
                    </div>
                    <div className="text-sm sm:text-base text-gray-600 font-semibold">
                      {stat.label}
                    </div>
                  </div>
                </div>

                {/* Decorative gradient line */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient} rounded-b-2xl sm:rounded-b-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* City Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {cityData.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                ref={(el) => (cardsRef.current[index] = el)}
                className="group relative"
              >
                {/* Card */}
                <div
                  className={`relative bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl ${item.shadowColor} transition-all duration-500 overflow-hidden border border-gray-100 hover:border-gray-200`}
                >
                  {/* Decorative corner gradient */}
                  <div className="absolute top-0 right-0 w-32 h-32 sm:w-40 sm:h-40 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                    <div
                      className={`w-full h-full bg-gradient-to-br ${item.gradient} rounded-full blur-2xl translate-x-1/2 -translate-y-1/2`}
                    ></div>
                  </div>

                  <div className="relative p-6 sm:p-8 lg:p-10">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
                      <div className="flex items-center gap-4 w-full sm:w-auto">
                        {/* Icon */}
                        <div
                          className={`flex-shrink-0 p-3 sm:p-4 bg-gradient-to-br ${item.gradient} rounded-xl sm:rounded-2xl shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                        >
                          <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight truncate">
                            {item.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-500 font-semibold mt-1">
                            {item.cities.length} locations available
                          </p>
                        </div>
                      </div>

                      {/* Counter Badge */}
                      <div
                        className={`flex-shrink-0 px-4 sm:px-5 py-2 sm:py-3 bg-gradient-to-br ${item.gradient} rounded-xl sm:rounded-2xl shadow-md self-start sm:self-auto`}
                      >
                        <div className="text-xl sm:text-2xl font-black text-white">
                          {item.cities.length}
                        </div>
                      </div>
                    </div>

                    {/* Cities Grid */}

                    <div className="flex flex-wrap gap-2 sm:gap-2.5">
                      {item.cities.map((city, cityIndex) => (
                        <span
                          key={cityIndex}
                          className={`city-tag relative px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-50 text-gray-700 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold border border-gray-200 hover:border-gray-300 transition-all duration-300 cursor-pointer overflow-hidden group/city`}
                        >
                          {/* Hover gradient overlay */}
                          <span
                            className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover/city:opacity-100 transition-opacity duration-300`}
                          ></span>

                          {/* City name */}
                          <span className="relative z-10 group-hover/city:text-white transition-colors duration-300">
                            {city}
                          </span>

                          {/* Shine effect */}
                          <span className="absolute inset-0 -translate-x-full group-hover/city:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent"></span>
                        </span>
                      ))}
                    </div>

                    {/* Bottom section */}
                    <div className="mt-6 sm:mt-8 pt-6 border-t border-gray-100">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                        <span className="text-xs sm:text-sm text-gray-500 font-semibold">
                          Premium Service Coverage
                        </span>
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full bg-gradient-to-r ${item.gradient} animate-pulse`}
                          ></div>
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-xs sm:text-sm font-bold text-gray-700">
                            Active Now
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

       
      </div>
    </div>
  );
};

export default CityLocations;
