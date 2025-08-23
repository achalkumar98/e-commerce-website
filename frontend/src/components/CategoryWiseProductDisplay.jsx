import { useContext, useEffect, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayINRCurrency from "../helpers/displayCurrency";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import Context from "../context";
import scrollTop from "../helpers/scrollTop";

const CategoryWiseProductDisplay = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(12).fill(null);

  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    e.preventDefault();
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const fetchData = async () => {
    setLoading(true);
    const CategoryProduct = await fetchCategoryWiseProduct(category);
    setData(CategoryProduct?.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className="container mx-auto px-4 my-6">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">{heading}</h2>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 overflow-x-auto scrollbar-none scroll-smooth">
        {loading
          ? loadingList.map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-4 animate-pulse"
              >
                <div className="h-48 w-full bg-slate-200 rounded-md mb-4"></div>
                <div className="h-5 bg-slate-200 rounded mb-2"></div>
                <div className="h-4 bg-slate-200 rounded mb-2 w-3/4"></div>
                <div className="flex justify-between gap-2 mt-3">
                  <div className="h-5 bg-slate-200 rounded w-1/2"></div>
                  <div className="h-5 bg-slate-200 rounded w-1/3"></div>
                </div>
                <div className="h-8 bg-slate-200 rounded mt-3 w-full"></div>
              </div>
            ))
          : data.map((product) => (
              <Link
                key={product._id}
                to={"/product/" + product._id}
                onClick={scrollTop}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow flex flex-col"
              >
                <div className="h-48 bg-slate-100 flex items-center justify-center overflow-hidden">
                  {product.productImage[0] ? (
                    <img
                      src={product.productImage[0]}
                      alt={product.productName}
                      className="h-full w-full object-contain hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="text-gray-400">No Image</div>
                  )}
                </div>

                <div className="p-4 flex flex-col gap-2 flex-grow">
                  <h3 className="text-base md:text-lg font-medium line-clamp-2 text-gray-800">
                    {product.productName}
                  </h3>
                  <p className="capitalize text-gray-500">{product.category}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-red-600 font-semibold">
                      {displayINRCurrency(product.selling)}
                    </p>
                    <p className="text-gray-400 line-through">
                      {displayINRCurrency(product.price)}
                    </p>
                  </div>
                  <button
                    onClick={(e) => handleAddToCart(e, product._id)}
                    className="mt-3 bg-red-600 text-white text-sm py-1.5 rounded-full hover:bg-red-700 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default CategoryWiseProductDisplay;
