import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import productCategory from "../helpers/productCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../helpers/uploadImage";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import Summary_API from "../utils/constants";
import { toast } from "react-toastify";

const UploadProduct = ({ onClose, fetchData }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    selling: "",
  });

  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => ({ ...preve, [name]: value }));
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);
    setData((preve) => ({
      ...preve,
      productImage: [...preve.productImage, uploadImageCloudinary.url],
    }));
  };

  const handleDeleteProductImage = (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);
    setData((preve) => ({ ...preve, productImage: [...newProductImage] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(Summary_API.uploadProduct.url, {
      method: Summary_API.uploadProduct.method,
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();

    if (responseData.success) {
      toast.success(responseData.message);
      onClose();
      fetchData();
    } else {
      toast.error(responseData.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl h-full max-h-[90%] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold">Upload Product</h2>
          <IoMdClose
            className="text-2xl cursor-pointer hover:text-red-600"
            onClick={onClose}
          />
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto p-6 grid gap-4 scrollbar-none"
        >
          {/* Product Name */}
          <div className="grid gap-1">
            <label htmlFor="productName" className="font-medium">
              Product Name:
            </label>
            <input
              id="productName"
              name="productName"
              type="text"
              value={data.productName}
              onChange={handleOnChange}
              placeholder="Enter product name"
              required
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
            />
          </div>

          {/* Brand Name */}
          <div className="grid gap-1">
            <label htmlFor="brandName" className="font-medium">
              Brand Name:
            </label>
            <input
              id="brandName"
              name="brandName"
              type="text"
              value={data.brandName}
              onChange={handleOnChange}
              placeholder="Enter brand name"
              required
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
            />
          </div>

          {/* Category */}
          <div className="grid gap-1">
            <label htmlFor="category" className="font-medium">
              Category:
            </label>
            <select
              id="category"
              name="category"
              value={data.category}
              onChange={handleOnChange}
              required
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
            >
              <option value="">Select Category</option>
              {productCategory.map((el, idx) => (
                <option value={el.value} key={el.value + idx}>
                  {el.label}
                </option>
              ))}
            </select>
          </div>

          {/* Upload Images */}
          <div className="grid gap-1">
            <label className="font-medium">Product Images:</label>
            <label
              htmlFor="uploadImageInput"
              className="h-32 w-full border-2 border-dashed border-gray-300 rounded-md flex flex-col justify-center items-center gap-2 cursor-pointer bg-white shadow-sm hover:bg-gray-50 transition"
            >
              <FaCloudUploadAlt className="text-4xl text-gray-400" />
              <span className="text-gray-500 text-sm">Upload Product Image</span>
              <input
                type="file"
                id="uploadImageInput"
                className="hidden"
                onChange={handleUploadProduct}
              />
            </label>
            {/* Preview */}
            {data.productImage.length > 0 ? (
              <div className="flex flex-wrap gap-2 mt-2">
                {data.productImage.map((img, idx) => (
                  <div key={idx} className="relative group">
                    <img
                      src={img}
                      alt={`product-${idx}`}
                      className="w-20 h-20 object-cover rounded-md cursor-pointer border border-gray-200"
                      onClick={() => {
                        setOpenFullScreenImage(true);
                        setFullScreenImage(img);
                      }}
                    />
                    <MdDelete
                      className="absolute top-1 right-1 text-white bg-red-600 rounded-full p-0.5 hidden group-hover:block cursor-pointer"
                      onClick={() => handleDeleteProductImage(idx)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-red-600 text-xs mt-1">
                *Please upload at least one image
              </p>
            )}
          </div>

          {/* Price & Selling */}
          <div className="grid gap-1 md:grid-cols-2 md:gap-4">
            <div className="grid gap-1">
              <label className="font-medium">Price:</label>
              <input
                type="number"
                name="price"
                value={data.price}
                onChange={handleOnChange}
                required
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
              />
            </div>
            <div className="grid gap-1">
              <label className="font-medium">Selling Price:</label>
              <input
                type="number"
                name="selling"
                value={data.selling}
                onChange={handleOnChange}
                required
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
              />
            </div>
          </div>

          {/* Description */}
          <div className="grid gap-1">
            <label className="font-medium">Description:</label>
            <textarea
              name="description"
              value={data.description}
              onChange={handleOnChange}
              placeholder="Enter product description"
              rows={4}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 bg-white resize-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md shadow-md hover:shadow-lg transition-all mt-4"
          >
            Upload Product
          </button>
        </form>
      </div>

      {/* Full screen image */}
      {openFullScreenImage && (
        <DisplayImage
          imgUrl={fullScreenImage}
          onClose={() => setOpenFullScreenImage(false)}
        />
      )}
    </div>
  );
};

export default UploadProduct;
