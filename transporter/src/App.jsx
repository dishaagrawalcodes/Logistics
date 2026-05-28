import React from 'react'
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Login from './pages/Login';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import TransportRequests from './pages/TransportRequests';

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
              <Route path="/profile" element={<Profile />} />
              <Route path='/request' element={<TransportRequests/>}/>
              
             
           
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App