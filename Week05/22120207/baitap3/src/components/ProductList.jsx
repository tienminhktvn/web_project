import Product from "./Product";
import products from "../data/data";

const ProductList = ({ navigateTo, setCurrentProduct, currentCategory }) => {
  return (
    <div className="grid grid-cols-3 gap-4 bg-[#d2dbfd] flex-1 rounded-md p-4">
      {products.map((product) => {
        if (
          (currentCategory !== "" && product.category === currentCategory) ||
          currentCategory === ""
        ) {
          return (
            <Product
              key={product.id}
              data={product}
              navigateTo={navigateTo}
              setCurrentProduct={setCurrentProduct}
            ></Product>
          );
        }
      })}
    </div>
  );
};

export default ProductList;
