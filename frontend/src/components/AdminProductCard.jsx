import { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import displayINRCurrency from "../helpers/displayCurrency";

const AdminProductCard = ({ data, fetchdata }) => {
  const [editProduct, setEditProduct] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-4 w-64 flex flex-col">
      {/* Product Image */}
      <div className="h-52 flex justify-center items-center rounded-xl overflow-hidden bg-gray-50 group">
        <img
          src={data?.productImage[0]}
          alt={data?.productName}
          className="object-contain h-full w-full transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Product Info */}
      <div className="mt-3 flex flex-col flex-grow">
        <h1 className="text-gray-800 font-semibold text-base line-clamp-2">
          {data.productName}
        </h1>

        <div className="flex items-center justify-between mt-3">
          <p className="font-bold text-lg text-gray-900">
            {displayINRCurrency(data.selling)}
          </p>

          <button
            className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-600 hover:text-white transition-colors duration-300"
            onClick={() => setEditProduct(true)}
          >
            <MdModeEditOutline size={18} />
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {editProduct && (
        <AdminEditProduct
          productData={data}
          onClose={() => setEditProduct(false)}
          fetchdata={fetchdata}
        />
      )}
    </div>
  );
};

export default AdminProductCard;
