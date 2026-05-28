import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../api/axios";

const TransportServiceForm = ({ open, onClose, selectedService }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    pickupAddress: "",
    deliveryAddress: "",
    pincode: "",
    service: "",
  });

  const [loading, setLoading] = useState(false);

  // Auto select service when modal opens
  useEffect(() => {
    if (selectedService) {
      setFormData((prev) => ({
        ...prev,
        service: selectedService,
      }));
    }
  }, [selectedService]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const {
      name,
      email,
      phone,
      pickupAddress,
      deliveryAddress,
      pincode,
    } = formData;

    if (
      !name ||
      !email ||
      !phone ||
      !pickupAddress ||
      !deliveryAddress ||
      !pincode
    ) {
      return "All fields are required";
    }

    if (!/^\d{10}$/.test(phone))
      return "Enter valid 10 digit mobile number";

    if (!/\S+@\S+\.\S+/.test(email))
      return "Enter valid email address";

    if (!/^\d{6}$/.test(pincode))
      return "Enter valid 6 digit pincode";

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validate();
    if (error) return toast.error(error);

    try {
      setLoading(true);

      await api.post("/transport-requests/request", formData);

      toast.success("Transport request submitted 🚚");

      setFormData({
        name: "",
        email: "",
        phone: "",
        pickupAddress: "",
        deliveryAddress: "",
        pincode: "",
        service: selectedService,
      });

      onClose();
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Submission failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl p-8 relative animate-fadeIn">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 text-lg"
        >
          ✕
        </button>

        <h3 className="text-2xl font-bold mb-6">
          Book {selectedService}
        </h3>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="formInput"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="formInput"
          />

          <input
            type="text"
            name="phone"
            placeholder="Mobile"
            value={formData.phone}
            onChange={handleChange}
            className="formInput"
          />

          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            maxLength={6}
            value={formData.pincode}
            onChange={handleChange}
            className="formInput"
          />

          <input
            type="text"
            name="pickupAddress"
            placeholder="Pickup Address"
            value={formData.pickupAddress}
            onChange={handleChange}
            className="formInput md:col-span-2"
          />

          <input
            type="text"
            name="deliveryAddress"
            placeholder="Delivery Address"
            value={formData.deliveryAddress}
            onChange={handleChange}
            className="formInput md:col-span-2"
          />

          {/* Service Auto Selected */}
          <input
            type="text"
            name="service"
            value={formData.service}
            readOnly
            className="formInput md:col-span-2 bg-gray-100 cursor-not-allowed"
          />

          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
          >
            {loading ? "Submitting..." : "Confirm Booking"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransportServiceForm;
