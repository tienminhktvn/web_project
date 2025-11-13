import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import { useState } from "react";

const App = () => {
  const [searchKeyword, setSearchKeyword] = useState("");

  return (
    <div className="flex flex-col p-3 gap-4 h-screen">
      <Navbar setSearchKeyword={setSearchKeyword}></Navbar>

      <div className="flex flex-1 gap-3">
        <Sidebar></Sidebar>
        <MainContent searchKeyword={searchKeyword}></MainContent>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default App;
