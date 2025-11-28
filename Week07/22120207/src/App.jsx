import React from "react";
import AuthPage from "./pages/AuthPage";
import { Toaster } from "@/components/ui/sonner";
import { useAuth } from "./context/AuthContext";
import MainPage from "./pages/MainPage";

const App = () => {
  const { user } = useAuth();

  return (
    <div>
      {user ? <MainPage /> : <AuthPage />}

      <Toaster position="top-right" richColors duration={1000} />
    </div>
  );
};

export default App;
