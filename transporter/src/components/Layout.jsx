import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="bg-slate-100 min-h-screen">
      <Sidebar />

      <div className="md:ml-64 transition-all duration-300">
        <Header />

        <main className="p-6">
          <Outlet/>
        </main>
      </div>
    </div>
  );
};

export default Layout;
