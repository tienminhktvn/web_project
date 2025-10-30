import Layout from "../components/Layout";
import ProductList from "../components/ProductList";

const HomePage = ({
  navigateTo,
  setCurrentProduct,
  currentCategory,
  setCurrentCategory,
  highlight,
  setHighlight,
}) => {
  return (
    <Layout
      navigateTo={navigateTo}
      setCurrentCategory={setCurrentCategory}
      currentCategory={currentCategory}
      highlight={highlight}
      setHighlight={setHighlight}
    >
      <ProductList
        navigateTo={navigateTo}
        setCurrentProduct={setCurrentProduct}
        currentCategory={currentCategory}
      />
    </Layout>
  );
};

export default HomePage;
