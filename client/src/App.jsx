import Header from "./components/Header";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import EventManagement from "./pages/EventManagement";
import PackerMover from "./pages/PackerMover";
import Transportation from "./pages/Transportation";
import Membership from "./pages/Membership";
import AboutUs from "./pages/AboutUs";
import ContactPage from "./pages/ContactPage";
import ScrollToTop from "./components/ScrollToTop";
import CityWisePackers from "./pages/CityWisePackers";
import Blog from "./pages/Blog";
import BlogDetails from "./pages/BlogDetails";
import { Toaster } from "react-hot-toast";
import ShipmentTracking from "./pages/ShipmentTracking";
import ServicePage from "./pages/ServicePage";
import CityPackersPage from "./pages/CityPackersPage";


function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Toaster position="top-center" />
      <ScrollToTop/>
      <Routes>
        
        <Route path="/" element={<Home />} />
         <Route path="/event-management" element={<EventManagement />} />
      <Route path="/packer-mover" element={<PackerMover />} />
      <Route path="/transportation" element={<Transportation />} />
      <Route path="/membership" element={<Membership />} /> 
      <Route path="/about"   element={<AboutUs/>}/>
      <Route path="/contact" element={<ContactPage/>}/>
      <Route path="/city-packers" element={<CityWisePackers/>}/>
      <Route path="/blog" element={<Blog/>}/>
      <Route path="/blog/:_id" element={<BlogDetails />} />
      <Route path="/track" element={<ShipmentTracking/>}/>
      <Route path="/service/:slug" element={<ServicePage />} />
       <Route path="/packers-movers/:city" element={<CityPackersPage />}/>
     </Routes>


      <Footer />
    </div>
  );
}

export default App;
