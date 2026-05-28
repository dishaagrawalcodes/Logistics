import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Branch from "./pages/Branch";
import Pincode from "./pages/Pincode";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";
import Shipment from "./pages/Shipment";
import DriverManagement from "./pages/DriverManagement";
import AdminProviderReview from "./pages/AdminProviderReview";
import AdminEventReview from "./pages/AdminEventReview";
import ServicesAdmin from "./pages/ServicesAdmin";
import AdminTransportReview from "./pages/AdminTransportReview";
function App() {
  return (
    <BrowserRouter>
    <Toaster position="top-center" />
      <Routes>

        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute />}>

          <Route element={<AdminLayout />}>

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/branch" element={<Branch />} />
            <Route path="/pincode" element={<Pincode />} />
            <Route path="/shipment" element={<Shipment />} />
            <Route path="/drivers" element={<DriverManagement />} />
            <Route path="/providers" element={<AdminProviderReview />} />
            <Route path="/events" element={<AdminEventReview />} />
            <Route path="/admin/services" element={<ServicesAdmin />} />
            <Route path="/transport" element={<AdminTransportReview />} />
          </Route>

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
