import { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import Summary_API from "../utils/constants";
import AdminProductCard from "../components/AdminProductCard";

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async () => {
    try {
      const response = await fetch(Summary_API.allProduct.url);
      const dataResponse = await response.json();
      setAllProduct(dataResponse?.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <div className="p-4">
      {/* Header */}
      <div className="bg-white py-2 px-4 flex justify-between items-center shadow rounded-lg">
        <h2 className="font-bold text-lg">All Products</h2>
        <button
          className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full"
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Product
        </button>
      </div>

      {/* Product List */}
      <div className="flex flex-wrap gap-6 py-4 h-[calc(100vh-190px)] overflow-y-auto">
        {allProduct.length > 0 ? (
          allProduct.map((product, index) => (
            <AdminProductCard
              key={product._id || index}
              data={product}
              fetchdata={fetchAllProduct}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center w-full mt-10">
            No products found.
          </p>
        )}
      </div>

      {/* Upload Product Modal */}
      {openUploadProduct && (
        <UploadProduct
          onClose={() => setOpenUploadProduct(false)}
          fetchData={fetchAllProduct}
        />
      )}
    </div>
  );
};

export default AllProducts;
