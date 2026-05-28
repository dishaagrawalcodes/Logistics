import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../api/axios";
import { FileText, Upload } from "lucide-react";

const OttMembershipForm = () => {
  const [successModal, setSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);

  const [labourData, setLabourData] = useState({
    name: "",
    email: "",
    mobile: "",
    pincode: "",
    address: "",
    serviceCategory: "",
    aadhaarFront: null,
    aadhaarBack: null,
  });

  /* ================= FETCH SERVICES ================= */

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get("/services/type/home");
        setServices(res.data);
      } catch (error) {
        toast.error("Failed to load services");
      }
    };

    fetchServices();
  }, []);

  /* ================= CHANGE HANDLER ================= */

  const handleLabourChange = (e) => {
    const { name, value, files } = e.target;

    setLabourData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  /* ================= VALIDATION ================= */

  const validateLabour = () => {
    if (
      !labourData.name ||
      !labourData.email ||
      !labourData.mobile ||
      !labourData.pincode ||
      !labourData.serviceCategory
    )
      return "All mandatory fields are required";

    if (labourData.mobile.length < 10)
      return "Enter valid phone number";

    return null;
  };

  /* ================= SUBMIT ================= */

  const handleLabourSubmit = async (e) => {
    e.preventDefault();

    const error = validateLabour();
    if (error) return toast.error(error);

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", labourData.name);
      formData.append("email", labourData.email);
      formData.append("mobile", labourData.mobile);
      formData.append("pincode", labourData.pincode);
      formData.append("address", labourData.address);
      formData.append("serviceCategory", labourData.serviceCategory);

      if (labourData.aadhaarFront) {
        formData.append("aadhaarFront", labourData.aadhaarFront);
      }

      if (labourData.aadhaarBack) {
        formData.append("aadhaarBack", labourData.aadhaarBack);
      }

      await api.post("/provider/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccessModal(true);

      setLabourData({
        name: "",
        email: "",
        mobile: "",
        pincode: "",
        address: "",
        serviceCategory: "",
        aadhaarFront: null,
        aadhaarBack: null,
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-gray-50 rounded-2xl shadow-lg px-8 py-10">

        {/* ICON */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 bg-[#211bcf] rounded-2xl flex items-center justify-center text-white text-2xl shadow">
            🏪
          </div>
        </div>

        {/* TITLE */}
        <h2 className="text-3xl font-bold text-center mb-2">
          Member Registration
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Submit your details & documents — Admin will approve your account.
        </p>

        <form
          onSubmit={handleLabourSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >

          {/* FULL NAME */}
          <div>
            <label className="label">Full Name</label>
            <input
              name="name"
              value={labourData.name}
              onChange={handleLabourChange}
              placeholder="Your name"
              className="input"
            />
          </div>

          {/* PHONE */}
          <div>
            <label className="label">Phone</label>
            <input
              name="mobile"
              value={labourData.mobile}
              onChange={handleLabourChange}
              placeholder="9876543210"
              className="input"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              value={labourData.email}
              onChange={handleLabourChange}
              placeholder="your@email.com"
              className="input"
            />
          </div>

          {/* SERVICE CATEGORY */}
          <div>
            <label className="label">Service Category</label>
            <select
              name="serviceCategory"
              value={labourData.serviceCategory}
              onChange={handleLabourChange}
              className="input"
            >
              <option value="">Select Service Category</option>
              {services.map((service) => (
                <option key={service._id} value={service.name}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>

          {/* PINCODE */}
          <div>
            <label className="label">Pincode</label>
            <input
              name="pincode"
              value={labourData.pincode}
              onChange={handleLabourChange}
              placeholder="110011"
              className="input"
              maxLength={6}
            />
          </div>

          {/* AADHAAR FRONT */}
          <div>
            <label className="label">Aadhaar Front</label>

            <label className="relative cursor-pointer">
              <input
                type="file"
                accept="image/*"
                name="aadhaarFront"
                onChange={handleLabourChange}
                className="hidden"
              />
              <div className="input flex items-center gap-3 text-gray-500 hover:border-[#211bcf] transition">
                <Upload size={18} className="text-[#211bcf]" />
                <span>
                  {labourData.aadhaarFront
                    ? labourData.aadhaarFront.name
                    : "Upload Aadhaar Front"}
                </span>
              </div>
            </label>

            {labourData.aadhaarFront && (
              <div className="relative mt-3">
                <img
                  src={URL.createObjectURL(labourData.aadhaarFront)}
                  alt="Aadhaar Front"
                  className="h-28 rounded-lg border object-cover"
                />
                <button
                  type="button"
                  onClick={() =>
                    setLabourData((prev) => ({
                      ...prev,
                      aadhaarFront: null,
                    }))
                  }
                  className="absolute top-1 right-1 bg-black text-white text-xs px-2 py-1 rounded-full"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          {/* AADHAAR BACK */}
          <div>
            <label className="label">Aadhaar Back</label>

            <label className="relative cursor-pointer">
              <input
                type="file"
                accept="image/*"
                name="aadhaarBack"
                onChange={handleLabourChange}
                className="hidden"
              />
              <div className="input flex items-center gap-3 text-gray-500 hover:border-[#211bcf] transition">
                <Upload size={18} className="text-[#211bcf]" />
                <span>
                  {labourData.aadhaarBack
                    ? labourData.aadhaarBack.name
                    : "Upload Aadhaar Back"}
                </span>
              </div>
            </label>

            {labourData.aadhaarBack && (
              <div className="relative mt-3">
                <img
                  src={URL.createObjectURL(labourData.aadhaarBack)}
                  alt="Aadhaar Back"
                  className="h-28 rounded-lg border object-cover"
                />
                <button
                  type="button"
                  onClick={() =>
                    setLabourData((prev) => ({
                      ...prev,
                      aadhaarBack: null,
                    }))
                  }
                  className="absolute top-1 right-1 bg-black text-white text-xs px-2 py-1 rounded-full"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          {/* ADDRESS */}
          <div className="md:col-span-2">
            <label className="label">Address</label>
            <textarea
              name="address"
              value={labourData.address}
              onChange={handleLabourChange}
              rows={3}
              className="input"
            />
          </div>

          {/* SUBMIT */}
          <button
            disabled={loading}
            className="md:col-span-2 mt-4 bg-[#211bcf] text-white py-3 rounded-xl font-semibold hover:bg-[#0e0a7a] transition disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
      {successModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-white w-[95%] max-w-3xl rounded-2xl p-8 relative animate-fadeIn">
              {/* CLOSE */}
              <button
                onClick={() => setSuccessModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
              >
                ✕
              </button>

              {/* CONTENT */}
              <div className="text-center">
                <div className="text-5xl mb-4">✅</div>
                <h2 className="text-3xl font-bold mb-3">
                  Submission Successful
                </h2>
                <p className="text-gray-600 text-lg">
                  Your application has been submitted successfully.
                  <br />
                  Admin will review and approve shortly.
                </p>

                <button
                  onClick={() => setSuccessModal(false)}
                  className="mt-8 bg-[#211bcf] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#0e0a7a]"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      {/* TAILWIND HELPERS */}
      <style>{`
      .input {
        width: 100%;
        border-radius: 14px;
        border: 1px solid #e5e7eb;
        padding: 12px 14px;
        font-size: 14px;
        outline: none;
        transition: all 0.2s;
      }
      .input:focus {
        border-color: #10b981;
        box-shadow: 0 0 0 2px #211bcf;
      }
      .label {
        display: block;
        margin-bottom: 6px;
        font-size: 14px;
        font-weight: 500;
        color: #374151;
      }
    `}</style>
    </div>
  );
};

export default OttMembershipForm;
