import Button from "./Button";
import { getImgSrc } from "../helpers/string";

const Product = ({ data, navigateTo, setCurrentProduct }) => {
  const imgSrc = getImgSrc(data.id);

  return (
    <div className="bg-white rounded-md">
      <div className="p-2 min-h-[400px] flex flex-col">
        <img src={imgSrc} alt={data.id} className="w-64 h-64 mx-auto mb-2" />
        <h1 className="font-bold">{data.title}</h1>
        <p className="truncate text-sm">{data.description}</p>
      </div>

      <div className="border-t p-3 flex justify-center items-center">
        <Button
          onClick={() => {
            navigateTo("productDetail");
            setCurrentProduct(data);
          }}
          text={"Xem chi tiết"}
          className="text-white bg-blue-500 p-2 rounded-md"
        ></Button>
      </div>
    </div>
  );
};

export default Product;
