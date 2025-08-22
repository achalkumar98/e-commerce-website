import { useContext } from "react";
import displayINRCurrency from "../helpers/displayCurrency";
import scrollTop from "../helpers/scrollTop";
import Context from "../context";
import addToCart from "../helpers/addToCart";
import { Link } from "react-router-dom";

const VerticalCard = ({ loading, data = [] }) => {
  const loadingList = new Array(13).fill(null);
  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4 md:gap-6 p-2 justify-center overflow-x-auto scrollbar-none scroll-smooth transition-all">
      {(loading ? loadingList : data).map((product, index) => (
        <Link
          key={product?._id || index}
          to={product?._id ? `/product/${product._id}` : "#"}
          className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group min-w-[280px] md:min-w-[300px]"
          onClick={scrollTop}
        >
          <div className="h-48 flex justify-center items-center bg-slate-50 overflow-hidden">
            {loading ? (
              <div className="h-full w-full bg-slate-200 animate-pulse" />
            ) : (
              <img
                src={product.productImage[0]}
                alt={product?.productName}
                className="object-scale-down h-full w-full group-hover:scale-110 transition-transform duration-300 mix-blend-multiply"
              />
            )}
          </div>

          <div className="p-4 grid gap-2">
            {loading ? (
              <>
                <div className="h-5 bg-slate-200 rounded-full"></div>
                <div className="h-4 w-2/3 bg-slate-200 rounded-full"></div>
                <div className="flex gap-3">
                  <div className="h-5 w-1/2 bg-slate-200 rounded-full"></div>
                  <div className="h-5 w-1/2 bg-slate-200 rounded-full"></div>
                </div>
                <div className="h-8 bg-slate-200 rounded-full"></div>
              </>
            ) : (
              <>
                <h2 className="font-semibold text-base md:text-lg text-gray-800 line-clamp-1">
                  {product.productName}
                </h2>
                <p className="capitalize text-sm text-gray-500">{product.category}</p>
                <div className="flex gap-3 items-center">
                  <p className="text-red-600 font-bold text-lg">
                    {displayINRCurrency(product.selling)}
                  </p>
                  <p className="text-gray-400 line-through text-sm">
                    {displayINRCurrency(product.price)}
                  </p>
                </div>
                <button
                  className="mt-2 text-sm bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all duration-300"
                  onClick={(e) => handleAddToCart(e, product._id)}
                >
                  Add to Cart
                </button>
              </>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default VerticalCard;
