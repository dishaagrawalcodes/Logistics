import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

import LabourRequests from "./pages/LabourRequests";
import ProviderDashboard from "./pages/ProviderDashboard";
import { Toaster } from "react-hot-toast";


function App() {
  return (
    <BrowserRouter>
    <Toaster position="top-center" />
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Login />} />

        {/* PROTECTED ADMIN ROUTES */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<ProviderDashboard />} />
              <Route path="/request" element={<LabourRequests/>}/>
             
           
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
