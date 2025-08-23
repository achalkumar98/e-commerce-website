import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Summary_API from "../utils/constants";

const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const categoryLoading = new Array(13).fill(null);

  const fetchCategoryProduct = async () => {
    setLoading(true);
    const response = await fetch(Summary_API.categoryProduct.url);
    const datResponse = await response.json();
    setLoading(false);
    setCategoryProduct(datResponse.data);
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between gap-4 overflow-x-auto scrollbar-none scroll-smooth">
        {loading
          ? categoryLoading.map((_, index) => (
              <div
                key={index}
                className="h-16 w-16 md:w-20 md:h-20 rounded-full bg-gray-200 animate-pulse flex-shrink-0"
              ></div>
            ))
          : categoryProduct.map((product) => (
              <Link
                to={`/product-category?category=${product?.category}`}
                key={product?.category}
                className="flex-shrink-0 group"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-100 shadow-sm flex items-center justify-center overflow-hidden p-3 transition-all duration-300 group-hover:shadow-md group-hover:bg-gray-200">
                  <img
                    src={product?.productImage[0]}
                    alt={product?.category}
                    className="h-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <p className="text-center mt-2 text-sm md:text-base capitalize text-gray-700 group-hover:text-red-600">
                  {product?.category}
                </p>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default CategoryList;
