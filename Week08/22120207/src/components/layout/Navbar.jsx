import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const menuItems = ["Dashboard", "Products", "Orders", "Customers"];
  const [activeTab, setActiveTab] = useState("Dashboard");

  return (
    <div className="pb-12 w-[25%] border-r min-h-screen bg-[#f4f8ff] select-none">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 font-semibold tracking-tight text-slate-500 uppercase">
            Navigation
          </h2>
          <div className="space-y-1 pl-5">
            {menuItems.map((item) => {
              const isActive = activeTab === item;

              return (
                <div key={item}>
                  <Link to={"products"}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      onClick={() => setActiveTab(item)}
                      className={`w-full justify-start font-bold transition-all duration-200 mb-1 hover:cursor-pointer
                    ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md translate-x-2"
                        : "text-slate-500 hover:bg-white hover:text-blue-600 hover:shadow-sm"
                    }`}
                    >
                      {item}
                    </Button>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
