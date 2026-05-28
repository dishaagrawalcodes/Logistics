import React from "react";
import { motion } from "framer-motion";
import { Package, ChevronRight } from "lucide-react";

const Services = ({ services, onBook, bookingId }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {services.map((service) => (
        <motion.div
          key={service._id}
          whileHover={{ y: -5 }}
          className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col group"
        >
          <div className="mb-4">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
              <Package size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{service.name}</h3>
            <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
              {service.description}
            </p>
          </div>

          <button
  onClick={() => onBook(service)}
  disabled={bookingId === service._id}
  className={`mt-auto w-full py-3.5 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 ${
    bookingId === service._id
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-gray-900 hover:bg-blue-600 text-white group-hover:shadow-lg"
  }`}
>
  {bookingId === service._id ? "Booking..." : "Book Service"}
  <ChevronRight size={18} />
</button>

        </motion.div>
      ))}
    </motion.div>
  );
};

export default Services;