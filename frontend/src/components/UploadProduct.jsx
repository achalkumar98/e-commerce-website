import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import productCategory from "../helpers/productCategory";

const UploadProduct = ({ onClose }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: "",
    description: "",
    price: "",
    selling: "",
  });

  const handleOnChange = (e) => {};

  return (
    <div className="fixed w-full h-full bg-black/30 backdrop-blur-xs top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg">Upload Product</h2>
          <div
            className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
            onClick={onClose}
          >
            <IoMdClose />
          </div>
        </div>
        <form className="grid p-4 gap-2 overflow-y-scroll h-full">
          <label htmlFor="productName">Product Name : </label>
          <input
            type="text"
            id="productName"
            placeholder="enter product name"
            name="productName"
            value={data.productName}
            onChange={handleOnChange}
            className="p-2 bg-slate-200 border border-gray-100 rounded"
          />

          <label htmlFor="brandName" className="mt-3">
            Brand Name :{" "}
          </label>
          <input
            type="text"
            id="brandName"
            placeholder="enter brand name"
            value={data.brandName}
            name="brandName"
            onChange={handleOnChange}
            className="p-2 bg-slate-200 border border-gray-100 rounded"
          />

          <label htmlFor="category" className="mt-3">
            Categories :{" "}
          </label>
          <select
            value={data.category}
            className="p-2 bg-slate-200 border border-gray-100 rounded"
          >
            {productCategory.map((el, index) => {
              return (
                <option value={el.value} key={el.value + index}>
                  {el.label}
                </option>
              );
            })}
          </select>

            <label htmlFor="productImage" className="mt-3">Product Image :</label>
            <div className="p-2 bg-slate-200 border border-gray-100 rounded h-32 w-full">

            </div>







        </form>
      </div>
    </div>
  );
};

export default UploadProduct;
