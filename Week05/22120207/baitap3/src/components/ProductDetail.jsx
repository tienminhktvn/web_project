import Button from "./Button";
import { getImgSrc } from "../helpers/string";

const ProductDetail = ({ currentProduct }) => {
  const imgSrc = getImgSrc(currentProduct.id);

  return (
    <div className="bg-[#d2dbfd] rounded-md p-4 flex-1 flex flex-row gap-5">
      <img
        src={imgSrc}
        alt={currentProduct.id}
        className="max-w-lg max-h-lvh"
      />

      <div className="flex flex-col gap-8">
        <h1 className="font-bold text-4xl">{currentProduct.title}</h1>
        <p className="">{currentProduct.description}</p>
        <h1 className="font-bold text-2xl">{`Price: $${currentProduct.price}`}</h1>

        <div>
          <Button
            text={"Add to Cart"}
            className="text-white bg-green-700 p-2 px-3 rounded-md"
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
