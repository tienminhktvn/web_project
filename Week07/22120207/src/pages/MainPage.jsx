import { useState } from "react";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Product from "@/components/layout/Product";
import Navbar from "@/components/layout/Navbar";
import Profile from "@/components/layout/Profile";

const MainPage = () => {
  const [currentView, setCurrentView] = useState("dashboard");

  const handleNavigate = (view) => {
    setCurrentView(view);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header onNavigate={handleNavigate}></Header>

      <div className="flex flex-1">
        <Navbar onNavigate={handleNavigate} activeView={currentView}></Navbar>
        {currentView === "profile" ? <Profile /> : <Product />}
      </div>

      <Footer></Footer>
    </div>
  );
};

export default MainPage;
