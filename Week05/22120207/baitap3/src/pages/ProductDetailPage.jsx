import Layout from "../components/Layout";
import ProductDetail from "../components/ProductDetail";

const ProductDetailPage = ({
  navigateTo,
  currentProduct,
  setCurrentCategory,
  currentCategory,
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
      <ProductDetail currentProduct={currentProduct} />
    </Layout>
  );
};

export default ProductDetailPage;
