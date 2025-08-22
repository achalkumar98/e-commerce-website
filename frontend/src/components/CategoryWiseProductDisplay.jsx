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
  const loadingList = new Array(13).fill(null);

  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const fetchData = async () => {
    setLoading(true);
    const CategoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);
    setData(CategoryProduct?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 my-10">
      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 pb-2">
        {heading}
      </h2>

      {/* Product Grid */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,300px))] justify-center gap-4 md:gap-6 overflow-x-auto scrollbar-none scroll-smooth transition-all">
        {loading
          ? loadingList.map((_, index) => (
              <div
                key={index}
                className="w-full min-w-[280px] md:min-w-[300px] max-w-[280px] md:max-w-[300px] bg-white rounded-2xl shadow-md overflow-hidden animate-pulse"
              >
                <div className="bg-slate-200 h-48 flex justify-center items-center"></div>
                <div className="p-4 grid gap-3">
                  <h2 className="h-5 bg-slate-200 rounded-full"></h2>
                  <p className="h-4 bg-slate-200 rounded-full w-2/3"></p>
                  <div className="flex gap-3">
                    <p className="h-5 bg-slate-200 rounded-full w-1/2"></p>
                    <p className="h-5 bg-slate-200 rounded-full w-1/2"></p>
                  </div>
                  <button className="h-8 bg-slate-200 rounded-full"></button>
                </div>
              </div>
            ))
          : data.map((product, index) => (
              <Link
                key={product?._id || index}
                to={"/product/" + product?._id}
                className="w-full min-w-[280px] md:min-w-[300px] max-w-[280px] md:max-w-[300px] bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
                onClick={scrollTop}
              >
                {/* Product Image */}
                <div className="bg-slate-50 h-48 flex justify-center items-center overflow-hidden">
                  <img
                    src={product?.productImage[0]}
                    alt={product?.productName}
                    className="object-scale-down h-full transition-transform duration-300 group-hover:scale-110 mix-blend-multiply"
                  />
                </div>

                {/* Product Details */}
                <div className="p-4 grid gap-2">
                  <h2 className="font-semibold text-base md:text-lg text-gray-800 line-clamp-1">
                    {product?.productName}
                  </h2>
                  <p className="capitalize text-sm text-gray-500">
                    {product?.category}
                  </p>
                  <div className="flex gap-3 items-center">
                    <p className="text-red-600 font-bold text-lg">
                      {displayINRCurrency(product?.selling)}
                    </p>
                    <p className="text-gray-400 line-through text-sm">
                      {displayINRCurrency(product?.price)}
                    </p>
                  </div>
                  <button
                    className="mt-2 text-sm bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full transition-colors duration-300 shadow-sm hover:shadow-md"
                    onClick={(e) => handleAddToCart(e, product?._id)}
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
