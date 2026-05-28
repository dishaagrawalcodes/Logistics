import { useEffect, useState } from "react";
import api from "../api/axios";
import Profile from "../components/Profile";

const ProviderDashboard = () => {
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch Provider Profile
  const fetchProfile = async () => {
  try {
    const storedProvider = localStorage.getItem("providerInfo");

    if (!storedProvider) {
      setLoading(false);
      return;
    }

    const parsedProvider = JSON.parse(storedProvider);

    const providerId = parsedProvider._id; // ✅ FIXED

    if (!providerId) {
      console.log("Provider ID is missing!");
      setLoading(false);
      return;
    }

    const res = await api.get(`/provider/${providerId}`);

    setProvider(res.data);

    localStorage.setItem(
      "providerInfo",
      JSON.stringify(res.data)
    );

  } catch (error) {
    console.error("Profile fetch error:", error);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return <div className="p-10 text-center">Loading Dashboard...</div>;
  }

  return (
    <div className="space-y-6 p-6">
      {/* 🔹 Display Profile Summary */}
      {provider && (
        <div className="bg-white p-6 rounded-2xl shadow border">
          <h2 className="text-xl font-bold mb-4">Profile Summary</h2>

          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <p><strong>Name:</strong> {provider.name}</p>
            <p><strong>Email:</strong> {provider.email}</p>
            <p><strong>Mobile:</strong> {provider.mobile}</p>
            <p><strong>Address:</strong> {provider.address}</p>

            <p>
              <strong>Pincodes:</strong>{" "}
              {provider.pincodes?.join(", ")}
            </p>

            <p>
              <strong>Services:</strong>{" "}
              {provider.serviceCategories?.join(", ")}
            </p>
          </div>
        </div>
      )}

      {/* 🔹 Send Fresh Data to Profile Component */}
      {provider && (
        <Profile
          provider={provider}
          refreshProfile={fetchProfile}
        />
      )}
    </div>
  );
};

export default ProviderDashboard;
