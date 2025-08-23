import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import productCategory from "../helpers/productCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../helpers/uploadImage";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import Summary_API from "../utils/constants";
import { toast } from "react-toastify";

const AdminEditProduct = ({ onClose, productData, fetchdata }) => {
  const [data, setData] = useState({
    ...productData,
    productImage: productData?.productImage || [],
  });

  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);
    setData((prev) => ({
      ...prev,
      productImage: [...prev.productImage, uploadImageCloudinary.url],
    }));
  };

  const handleDeleteProductImage = (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);
    setData((prev) => ({ ...prev, productImage: [...newProductImage] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(Summary_API.updateProduct.url, {
      method: Summary_API.updateProduct.method,
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (responseData.success) {
      toast.success(responseData?.message);
      onClose();
      fetchdata();
    }

    if (responseData.error) {
      toast.error(responseData?.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {/* Modal Box */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-3 border-b">
          <h2 className="font-semibold text-lg text-gray-800">✏️ Edit Product</h2>
          <button
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-red-600"
          >
            <IoMdClose />
          </button>
        </div>

        {/* Scrollable Form */}
        <form
          className="flex-1 overflow-y-auto px-6 py-4 space-y-5"
          onSubmit={handleSubmit}
        >
          {/* Product Name */}
          <div>
            <label className="font-medium text-sm">Product Name</label>
            <input
              type="text"
              name="productName"
              value={data.productName}
              onChange={handleOnChange}
              className="mt-1 p-2 w-full rounded-lg bg-gray-100 border focus:ring-2 focus:ring-red-500 outline-none"
              required
            />
          </div>

          {/* Brand Name */}
          <div>
            <label className="font-medium text-sm">Brand Name</label>
            <input
              type="text"
              name="brandName"
              value={data.brandName}
              onChange={handleOnChange}
              className="mt-1 p-2 w-full rounded-lg bg-gray-100 border focus:ring-2 focus:ring-red-500 outline-none"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="font-medium text-sm">Category</label>
            <select
              name="category"
              value={data.category}
              onChange={handleOnChange}
              className="mt-1 p-2 w-full rounded-lg bg-gray-100 border focus:ring-2 focus:ring-red-500 outline-none"
              required
            >
              <option value="">Select Category</option>
              {productCategory.map((el, index) => (
                <option key={el.value + index} value={el.value}>
                  {el.label}
                </option>
              ))}
            </select>
          </div>

          {/* Product Images */}
          <div>
            <label className="font-medium text-sm">Product Images</label>
            <label
              htmlFor="uploadImageInput"
              className="mt-2 flex flex-col items-center justify-center h-28 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-red-400"
            >
              <FaCloudUploadAlt className="text-3xl text-gray-500" />
              <p className="text-xs text-gray-500">Upload Product Image</p>
              <input
                type="file"
                id="uploadImageInput"
                className="hidden"
                onChange={handleUploadProduct}
              />
            </label>
            <div className="flex flex-wrap gap-3 mt-3">
              {data?.productImage?.map((el, index) => (
                <div key={index} className="relative group">
                  <img
                    src={el}
                    alt={el}
                    className="w-20 h-20 object-cover rounded-md border cursor-pointer"
                    onClick={() => {
                      setOpenFullScreenImage(true);
                      setFullScreenImage(el);
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteProductImage(index)}
                    className="absolute top-1 right-1 p-1 rounded-full bg-red-600 text-white opacity-0 group-hover:opacity-100"
                  >
                    <MdDelete size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Price & Selling */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-medium text-sm">Price</label>
              <input
                type="number"
                name="price"
                value={data.price}
                onChange={handleOnChange}
                className="mt-1 p-2 w-full rounded-lg bg-gray-100 border focus:ring-2 focus:ring-red-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="font-medium text-sm">Selling Price</label>
              <input
                type="number"
                name="selling"
                value={data.selling}
                onChange={handleOnChange}
                className="mt-1 p-2 w-full rounded-lg bg-gray-100 border focus:ring-2 focus:ring-red-500 outline-none"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="font-medium text-sm">Description</label>
            <textarea
              name="description"
              rows={3}
              value={data.description}
              onChange={handleOnChange}
              className="mt-1 p-2 w-full rounded-lg bg-gray-100 border focus:ring-2 focus:ring-red-500 outline-none resize-none"
            />
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-3 border-t bg-gray-50 flex justify-end">
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-5 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700"
          >
            Update Product
          </button>
        </div>
      </div>

      {openFullScreenImage && (
        <DisplayImage
          onClose={() => setOpenFullScreenImage(false)}
          imgUrl={fullScreenImage}
        />
      )}
    </div>
  );
};

export default AdminEditProduct;
