import React from "react";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "./context/AuthProvider";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <AuthProvider>
      <Outlet></Outlet>
      <Toaster position="top-right" richColors duration={1000} />
    </AuthProvider>
  );
};

export default App;
