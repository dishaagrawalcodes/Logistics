import React, { useEffect, useState } from "react";
import {
  Truck,
  Users,
  MapPin,
  FileCheck,
  ShieldCheck,
  Calendar,
} from "lucide-react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate=useNavigate()
  const [stats, setStats] = useState(null);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await API.get("/transport/stats");
       
 setMeta(data);
        
        

        setStats([
  {
    title: "Monthly Revenue",
    value: data.monthlyRevenue,
    icon: Truck,
  },
  {
    title: "Total Customers",
    value: data.totalCustomers,
    icon: Users,
  },
  {
    title: "Total Shipments",
    value: data.totalShipments,
    icon: MapPin,
  },
  {
    title: "Account Status",
    value: data.transportDetails.status === "approved" ? "Approved" : "Pending",
    icon: FileCheck,
  },
]);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);
   
  useEffect(() => {
  if (meta) {
    console.log(meta);
  }
}, [meta]);
     
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Welcome, {meta?.transportDetails.name}
          </h1>
          <p className="text-sm text-gray-500">
            Manage your transport operations efficiently.
          </p>
        </div>

        <div className={`px-4 py-2 rounded-xl text-sm font-medium 
          ${meta?.status === "approved"
            ? "bg-emerald-100 text-emerald-600"
            : "bg-yellow-100 text-yellow-600"}`}
        >
          {meta?.transportDetails.status?.toUpperCase()}
        </div>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats?.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition group"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">{item.title}</p>
                <h2 className="text-2xl font-bold mt-1 text-slate-800">
                  {item.value}
                </h2>
              </div>

              <div className="p-3 rounded-xl bg-slate-100 group-hover:bg-emerald-500 transition">
                <item.icon
                  size={24}
                  className="text-slate-700 group-hover:text-white transition"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* LOWER SECTION */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* MEMBER INFO */}
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Account Information
          </h2>

          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-center gap-3">
              <Calendar size={18} className="text-emerald-500" />
              <span>
                Member Since:{" "}
                {new Date(meta?.transportDetails.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <ShieldCheck size={18} className="text-emerald-500" />
              <span className="">
                Account Status: <b className="uppercase">{meta?.transportDetails.status}</b>
              </span>
            </div>
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white 
        rounded-2xl shadow-md p-6 flex flex-col justify-between">

          <div>
            <h2 className="text-lg font-semibold">
              Quick Actions
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Manage your transport quickly.
            </p>
          </div>

          <div className="space-y-3 mt-6">
            <button
              onClick={() => window.location.href = "/profile"}
              className="w-full py-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 transition font-medium"
            >
              View Profile
            </button>

            <button
              onClick={() => navigate( "/dashboard")}
              className="w-full py-3 rounded-lg bg-slate-700 hover:bg-slate-600 transition"
            >
              Dashboard
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
