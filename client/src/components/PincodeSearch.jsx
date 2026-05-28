import { useState, useEffect, useRef } from "react";
import api from "../api/axios";
import { IoSearchSharp } from "react-icons/io5";

const PincodeSearch = ({ variant = "light" }) => {
  const [pincode, setPincode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const containerRef = useRef(null);
  const debounceRef = useRef(null);

  // allow only numbers + max 6 digits
  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 6) {
      setPincode(value);
      setError("");
    }
  };

  /* ================= AUTO FETCH WITH DEBOUNCE ================= */
  useEffect(() => {
    if (pincode.length !== 6) {
      setResult(null);
      return;
    }

    // debounce
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        setLoading(true);
        setError("");

        const res = await api.get(`/pincode/check/${pincode}`);
        setResult(res.data);
      } catch (err) {
        setResult(null);
        setError(
          err.response?.data?.message ||
            "Service not available for this pincode"
        );
      } finally {
        setLoading(false);
      }
    }, 500); // 👈 delay (adjust if needed)

    return () => clearTimeout(debounceRef.current);
  }, [pincode]);

  /* ================= CLICK OUTSIDE TO CLOSE ================= */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target)
      ) {
        setResult(null);
        setError("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-sm">
      {/* INPUT */}
      <div className="relative">
        <input
          type="text"
          value={pincode}
          onChange={handleChange}
          placeholder="Enter Pincode"
          className={`w-full pl-4 pr-10 py-2 text-sm rounded-md outline-none
            ${
              variant === "dark"
                ? "bg-white/10 text-white border border-white/20 placeholder-gray-300"
                : "bg-white border border-gray-300 text-slate-800"
            }`}
        />

        <IoSearchSharp
          className={`absolute right-3 top-1/2 -translate-y-1/2 size-5
            ${variant === "dark" ? "text-gray-300" : "text-gray-500"}`}
        />
      </div>

      {/* STATUS */}
      {loading && (
        <p className="mt-2 text-xs text-blue-500">Checking service...</p>
      )}

      {error && (
        <p className="mt-2 text-xs text-red-500 ">{error}</p>
      )}

      {/* RESULT */}
      {result && (
        <div className="absolute left-0 right-0 mt-2 z-50 rounded-md border bg-white shadow-lg p-3">
          <p className="text-sm font-semibold text-slate-700 mb-2">
            Service Available
          </p>

          {result.map((item) => (
            <div
              key={item._id}
              className="text-xs text-slate-600 border-t pt-2"
            >
              <p>
                <strong>Branch:</strong> {item.branchId.branchName}
              </p>
              <p>
                <strong>Address:</strong> {item.branchId.address}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`font-semibold ${
                    item.chargeable
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {item.chargeable ? "Paid Service" : "Free Service"}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PincodeSearch;
