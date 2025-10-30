import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Layout = ({
  children,
  navigateTo,
  setCurrentCategory,
  currentCategory,
  highlight,
  setHighlight,
}) => {
  return (
    <div className="flex flex-col gap-2 p-2 min-h-screen">
      <Navbar
        navigateTo={navigateTo}
        setCurrentCategory={setCurrentCategory}
        setHighlight={setHighlight}
      />

      <div className="flex flex-row flex-1">
        <Sidebar
          currentCategory={currentCategory}
          setCurrentCategory={setCurrentCategory}
          navigateTo={navigateTo}
          highlight={highlight}
          setHighlight={setHighlight}
        />
        {children}
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
