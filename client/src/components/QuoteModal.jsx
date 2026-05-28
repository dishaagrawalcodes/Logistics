import { useState } from "react";
import { FaTimes, FaPhoneAlt, FaMapMarkerAlt, FaBox } from "react-icons/fa";
import toast from "react-hot-toast";
import api from "../api/axios";

const QuoteModal = ({ open, onClose }) => {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    pickupAddress: "",
    deliveryAddress: "",
    itemDescription: "",
  });

  const [errors, setErrors] = useState({});

  if (!open) return null;

  // Validation functions
  const validateName = (name) => {
    if (!name.trim()) {
      return "Name is required";
    }
    if (name.trim().length < 2) {
      return "Name must be at least 2 characters";
    }
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      return "Name should only contain letters and spaces";
    }
    return "";
  };

  const validateEmail = (email) => {
    if (!email.trim()) {
      return "Email is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const validateMobile = (mobile) => {
    if (!mobile.trim()) {
      return "Phone number is required";
    }
    // Remove spaces and special characters for validation
    const cleanedMobile = mobile.replace(/[\s\-\(\)]/g, "");
    
    // Check if it contains only digits and optional + at start
    if (!/^\+?\d+$/.test(cleanedMobile)) {
      return "Phone number should contain only digits";
    }
    
    // Check length (10 digits for India, or with country code)
    const digitsOnly = cleanedMobile.replace(/^\+/, "");
    if (digitsOnly.length < 10) {
      return "Phone number must be at least 10 digits";
    }
    if (digitsOnly.length > 15) {
      return "Phone number is too long";
    }
    
    return "";
  };

  const validateAddress = (address, fieldName) => {
    if (!address.trim()) {
      return `${fieldName} is required`;
    }
    if (address.trim().length < 2) {
      return `${fieldName} must be at least 2 characters`;
    }
    return "";
  };

  const validateItemDescription = (description) => {
    if (!description.trim()) {
      return "Item description is required";
    }
    if (description.trim().length < 10) {
      return "Please provide a more detailed description (at least 10 characters)";
    }
    if (description.trim().length > 500) {
      return "Description is too long (maximum 500 characters)";
    }
    return "";
  };

  const validateForm = () => {
    const newErrors = {};

    const nameError = validateName(form.name);
    if (nameError) newErrors.name = nameError;

    const emailError = validateEmail(form.email);
    if (emailError) newErrors.email = emailError;

    const mobileError = validateMobile(form.mobile);
    if (mobileError) newErrors.mobile = mobileError;

    const pickupError = validateAddress(form.pickupAddress, "Pickup address");
    if (pickupError) newErrors.pickupAddress = pickupError;

    const deliveryError = validateAddress(form.deliveryAddress, "Delivery address");
    if (deliveryError) newErrors.deliveryAddress = deliveryError;

    const descriptionError = validateItemDescription(form.itemDescription);
    if (descriptionError) newErrors.itemDescription = descriptionError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let error = "";

    switch (name) {
      case "name":
        error = validateName(value);
        break;
      case "email":
        error = validateEmail(value);
        break;
      case "mobile":
        error = validateMobile(value);
        break;
      case "pickupAddress":
        error = validateAddress(value, "Pickup address");
        break;
      case "deliveryAddress":
        error = validateAddress(value, "Delivery address");
        break;
      case "itemDescription":
        error = validateItemDescription(value);
        break;
      default:
        break;
    }

    if (error) {
      setErrors({ ...errors, [name]: error });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    try {
      setLoading(true);

      await api.post("/shipment/create", form);

      toast.success("🚚 Quote request submitted successfully!");

      setForm({
        name: "",
        mobile: "",
        email: "",
        pickupAddress: "",
        deliveryAddress: "",
        itemDescription: "",
      });

      setErrors({});

      onClose();
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4 py-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative bg-white rounded-3xl shadow-2xl
          w-full max-w-2xl my-auto
          transform transition-all duration-300 ease-out
          animate-fade-in-up
        "
      >
        {/* Header Section */}
        <div className="relative bg-gradient-to-r from-[#5D04A6] to-[#0448B9] rounded-t-3xl px-6 py-8 sm:px-8 sm:py-10">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/80 hover:text-white 
                     bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all duration-200
                     hover:rotate-90 transform"
            aria-label="Close modal"
          >
            <FaTimes className="text-lg" />
          </button>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
              <FaBox className="text-3xl text-white" />
            </div>
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              Get a Free Quote
            </h3>
            <p className="text-amber-50 text-sm sm:text-base max-w-md mx-auto">
              Fill in your details below and our team will get back to you within 24 hours
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="px-6 py-8 sm:px-8 sm:py-10">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Input */}
            <div className="form-group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your full name"
                required
                className={`w-full px-4 py-3 border-2 rounded-xl 
                         focus:ring-4 focus:ring-amber-100
                         transition-all duration-200 outline-none
                         placeholder:text-gray-400
                         ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-amber-500'}`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Email and Mobile Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="form-group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="your@email.com"
                  required
                  className={`w-full px-4 py-3 border-2 rounded-xl 
                           focus:ring-4 focus:ring-amber-100
                           transition-all duration-200 outline-none
                           placeholder:text-gray-400
                           ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-amber-500'}`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div className="form-group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  name="mobile"
                  type="tel"
                  value={form.mobile}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="+91 98765 43210"
                  required
                  className={`w-full px-4 py-3 border-2 rounded-xl 
                           focus:ring-4 focus:ring-amber-100
                           transition-all duration-200 outline-none
                           placeholder:text-gray-400
                           ${errors.mobile ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-amber-500'}`}
                />
                {errors.mobile && (
                  <p className="mt-1 text-sm text-red-600">{errors.mobile}</p>
                )}
              </div>
            </div>

            {/* Pickup Address */}
            <div className="form-group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FaMapMarkerAlt className="text-amber-600" />
                Pickup Address <span className="text-red-500">*</span>
              </label>
              <input
                name="pickupAddress"
                value={form.pickupAddress}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter pickup location"
                required
                className={`w-full px-4 py-3 border-2 rounded-xl 
                         focus:ring-4 focus:ring-amber-100
                         transition-all duration-200 outline-none
                         placeholder:text-gray-400
                         ${errors.pickupAddress ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-amber-500'}`}
              />
              {errors.pickupAddress && (
                <p className="mt-1 text-sm text-red-600">{errors.pickupAddress}</p>
              )}
            </div>

            {/* Delivery Address */}
            <div className="form-group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FaMapMarkerAlt className="text-green-600" />
                Delivery Address <span className="text-red-500">*</span>
              </label>
              <input
                name="deliveryAddress"
                value={form.deliveryAddress}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter delivery location"
                required
                className={`w-full px-4 py-3 border-2 rounded-xl 
                         focus:ring-4 focus:ring-amber-100
                         transition-all duration-200 outline-none
                         placeholder:text-gray-400
                         ${errors.deliveryAddress ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-amber-500'}`}
              />
              {errors.deliveryAddress && (
                <p className="mt-1 text-sm text-red-600">{errors.deliveryAddress}</p>
              )}
            </div>

            {/* Item Description */}
            <div className="form-group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Item Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="itemDescription"
                value={form.itemDescription}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Describe what you need to move (e.g., Household items, Office equipment, Bike, etc.)"
                required
                rows={4}
                className={`w-full px-4 py-3 border-2 rounded-xl 
                         focus:ring-4 focus:ring-amber-100
                         transition-all duration-200 outline-none resize-none
                         placeholder:text-gray-400
                         ${errors.itemDescription ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-amber-500'}`}
              />
              {errors.itemDescription && (
                <p className="mt-1 text-sm text-red-600">{errors.itemDescription}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full bg-gradient-to-r from-[#0448B9] to-[#5D04A6]
                hover:from-[#0b3c8b] hover:to-[#500290]
                text-white py-4 rounded-xl font-bold text-lg
                shadow-lg hover:shadow-xl
                transform hover:scale-[1.02] active:scale-[0.98]
                transition-all duration-200
                disabled:opacity-60 disabled:cursor-not-allowed
                disabled:transform-none
                flex items-center justify-center gap-2
              "
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  Submit Request
                  <span className="text-xl">→</span>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">
                Or call us directly
              </span>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <a
              href="tel:+919xxxxxxxxxx"
              className="inline-flex items-center gap-3 px-6 py-3 
                       bg-green-50 hover:bg-green-100 
                       text-green-700 font-semibold rounded-xl
                       transition-all duration-200 
                       border-2 border-green-200 hover:border-green-300
                       group"
            >
              <div className="bg-green-500 text-white p-2 rounded-full 
                            group-hover:scale-110 transition-transform duration-200">
                <FaPhoneAlt className="text-sm" />
              </div>
              <span className="text-lg">+91 9xxxxxxxxxx</span>
            </a>
            <p className="text-xs text-gray-500 mt-3">
              Available Mon-Sat, 9 AM - 7 PM
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default QuoteModal;