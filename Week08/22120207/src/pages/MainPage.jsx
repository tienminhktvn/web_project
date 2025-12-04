import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import { Outlet } from "react-router-dom";

const MainPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header></Header>

      <div className="flex flex-1">
        <Navbar></Navbar>
        <Outlet></Outlet>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default MainPage;
