import { useState } from "react";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [currentProduct, setCurrentProduct] = useState();
  const [currentCategory, setCurrentCategory] = useState("");
  const [highlight, setHighlight] = useState("");

  const navigateTo = (pageName) => {
    setCurrentPage(pageName);
  };

  return (
    <>
      {currentPage === "home" && (
        <HomePage
          navigateTo={navigateTo}
          setCurrentProduct={setCurrentProduct}
          currentCategory={currentCategory}
          setCurrentCategory={setCurrentCategory}
          highlight={highlight}
          setHighlight={setHighlight}
        />
      )}
      {currentPage === "productDetail" && (
        <ProductDetailPage
          navigateTo={navigateTo}
          currentProduct={currentProduct}
          currentCategory={currentCategory}
          setCurrentCategory={setCurrentCategory}
          highlight={highlight}
          setHighlight={setHighlight}
        />
      )}
    </>
  );
}

export default App;
