import { useContext, useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayINRCurrency from "../helpers/displayCurrency";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const HorizontalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(6).fill(null);

  const scrollElement = useRef();
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

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };

  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };

  return (
    <div className="container mx-auto px-4 my-6 relative">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>
      <div className="relative">
        {/* Scroll Buttons */}
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg p-2 rounded-full hover:bg-red-600 hover:text-white transition-colors hidden md:flex"
          onClick={scrollLeft}
        >
          <FaAngleLeft />
        </button>
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg p-2 rounded-full hover:bg-red-600 hover:text-white transition-colors hidden md:flex"
          onClick={scrollRight}
        >
          <FaAngleRight />
        </button>

        {/* Product Cards */}
        <div
          className="flex gap-4 md:gap-6 overflow-x-auto overflow-y-hidden scrollbar-none scroll-smooth"
          ref={scrollElement}
        >
          {loading
            ? loadingList.map((_, index) => (
                <div
                  key={index}
                  className="w-[280px] md:w-[320px] h-36 bg-white rounded-lg shadow-md flex animate-pulse"
                >
                  <div className="bg-slate-200 h-full w-32 md:w-36"></div>
                  <div className="flex-1 p-4 flex flex-col justify-between gap-2">
                    <div className="h-5 bg-slate-200 rounded w-3/4"></div>
                    <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                    <div className="flex gap-2">
                      <div className="h-5 bg-slate-200 rounded w-1/2"></div>
                      <div className="h-5 bg-slate-200 rounded w-1/3"></div>
                    </div>
                    <div className="h-8 bg-slate-200 rounded w-full"></div>
                  </div>
                </div>
              ))
            : data.map((product) => (
                <Link
                  key={product._id}
                  to={`/product/${product._id}`}
                  className="w-[280px] md:w-[320px] h-36 bg-white rounded-lg shadow-md flex hover:shadow-xl transition-shadow"
                >
                  <div className="h-full w-32 md:w-36 p-2 flex items-center justify-center bg-slate-100 rounded-l-lg">
                    <img
                      src={product.productImage[0]}
                      alt={product.productName}
                      className="h-full object-contain hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex-1 p-4 flex flex-col justify-between">
                    <h2 className="font-medium text-base md:text-lg line-clamp-1">
                      {product.productName}
                    </h2>
                    <p className="text-slate-500 capitalize">{product.category}</p>
                    <div className="flex gap-2 items-center">
                      <p className="text-red-600 font-semibold">
                        {displayINRCurrency(product.selling)}
                      </p>
                      <p className="line-through text-slate-400">
                        {displayINRCurrency(product.price)}
                      </p>
                    </div>
                    <button
                      onClick={(e) => handleAddToCart(e, product._id)}
                      className="bg-red-600 hover:bg-red-700 text-white py-1 rounded-full text-sm"
                    >
                      Add to Cart
                    </button>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </div>
  );
};

export default HorizontalCardProduct;
