import React, { useEffect, useState } from "react";
import { Bell, ClipboardList, CheckCircle, XCircle } from "lucide-react";
import { getDashboardStats, getLabourRequests } from "../api/serviceRequestApi";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  // Stats for cards
  const [statsData, setStatsData] = useState({
    newRequests: 0,
    accepted: 0,
    rejected: 0,
    total: 0,
  });

  // Recent activity list
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getDashboardStats();
        setStatsData(res.data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      }
    };

    const fetchRecentActivity = async () => {
      try {
        const res = await getLabourRequests();
        // Take latest 5 requests for recent activity
        const activity = res.data.slice(0, 5).map((req) => ({
          label: `${req.status === "accepted" ? "Accepted" : req.status === "rejected" ? "Rejected" : "New"} ${req.service} request`,
          time: new Date(req.createdAt).toLocaleDateString("en-GB"), // simple date
          color:
            req.status === "accepted"
              ? "text-emerald-600"
              : req.status === "rejected"
              ? "text-rose-600"
              : "text-blue-600",
        }));
        setRecentActivity(activity);
      } catch (error) {
        console.error("Failed to fetch recent activity", error);
      }
    };

    fetchStats();
    fetchRecentActivity();
  }, []);

  const stats = [
    { label: "New Requests", value: statsData.newRequests, icon: Bell, color: "bg-blue-500" },
    { label: "Accepted", value: statsData.accepted, icon: CheckCircle, color: "bg-emerald-500" },
    { label: "Rejected", value: statsData.rejected, icon: XCircle, color: "bg-rose-500" },
    { label: "Total Requests", value: statsData.total, icon: ClipboardList, color: "bg-indigo-500" },
  ];

  return (
    <div className="p-4 md:p-6 pb-24 max-w-6xl mx-auto">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-black text-slate-800">Welcome back 👋</h1>
        <p className="text-slate-500 text-sm">Here’s what’s happening with your service requests today</p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((item, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-md border border-slate-200 p-4 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${item.color}`}>
              <item.icon size={22} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-semibold">{item.label}</p>
              <p className="text-xl font-black text-slate-800">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* QUICK ACTIONS & RECENT ACTIVITY */}
      <div className="grid md:grid-cols-2 gap-6 py-4">
        {/* QUICK ACTIONS */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-5">
          <h3 className="font-black text-lg mb-2">Quick Actions</h3>
          <p className="text-sm text-slate-500 mb-4">Manage your requests quickly</p>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/request")}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-xl font-bold text-sm"
            >
              View Requests
            </button>
            <button
              onClick={() => navigate("/profile")}
              className="flex-1 bg-slate-200 hover:bg-slate-300 py-2 rounded-xl font-bold text-sm"
            >
              Update Profile
            </button>
          </div>
        </div>

        {/* RECENT ACTIVITY */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-5">
          <h3 className="font-black text-lg mb-3">Recent Activity</h3>

          <ul className="space-y-3 text-sm">
            {recentActivity.length === 0 && (
              <li className="text-slate-400">No recent activity</li>
            )}
            {recentActivity.map((act, idx) => (
              <li key={idx} className="flex justify-between">
                <span className="text-slate-600">{act.label}</span>
                <span className={`font-semibold ${act.color}`}>{act.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
