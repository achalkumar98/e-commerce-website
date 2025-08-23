import { useLocation, useNavigate } from "react-router-dom";
import productCategory from "../helpers/productCategory";
import { useEffect, useState } from "react";
import VerticalCard from "../components/VerticalCard";
import Summary_API from "../utils/constants";

const CategoryProduct = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryListinArray = urlSearch.getAll("category");

  const urlCategoryListObject = {};
  urlCategoryListinArray.forEach((el) => {
    urlCategoryListObject[el] = true;
  });

  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
  const [filterCategoryList, setFilterCategoryList] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(Summary_API.filterProduct.url, {
        method: Summary_API.filterProduct.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ category: filterCategoryList }),
      });
      const dataResponse = await response.json();
      setData(dataResponse?.data || []);
    } catch (err) {
      console.error("Failed to fetch category products:", err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCategory = (e) => {
    const { value, checked } = e.target;
    setSelectCategory((prev) => ({
      ...prev,
      [value]: checked,
    }));
  };

  const handleOnChangeSortBy = (e) => {
    const { value } = e.target;
    setSortBy(value);

    if (value === "asc") {
      setData((prev) => [...prev].sort((a, b) => a.selling - b.selling));
    }

    if (value === "dsc") {
      setData((prev) => [...prev].sort((a, b) => b.selling - a.selling));
    }
  };

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory)
      .filter((categoryKeyName) => selectCategory[categoryKeyName]);
    setFilterCategoryList(arrayOfCategory);

    const urlFormat = arrayOfCategory.map((el) => `category=${el}`).join("&");
    navigate("/product-category?" + urlFormat);
  }, [selectCategory]);

  useEffect(() => {
    fetchData();
  }, [filterCategoryList]);

  return (
    <div className="container mx-auto p-4">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden flex justify-between items-center mb-2">
        <p className="font-medium text-lg text-slate-800">
          Search Results: {data.length}
        </p>
        <button
          className="px-3 py-1 border border-slate-400 rounded bg-white"
          onClick={() => setShowMobileFilters(!showMobileFilters)}
        >
          {showMobileFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {/* Mobile Filters */}
      {showMobileFilters && (
        <div className="bg-white p-4 mb-4 rounded shadow-lg lg:hidden">
          <div className="mb-4">
            <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
              Sort by
            </h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === "asc"}
                  onChange={handleOnChangeSortBy}
                  value="asc"
                />
                <label>Price - Low to High</label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === "dsc"}
                  onChange={handleOnChangeSortBy}
                  value="dsc"
                />
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>

          <div>
            <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
              Category
            </h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              {productCategory.map((categoryName) => (
                <div key={categoryName?.value} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="category"
                    checked={!!selectCategory[categoryName?.value]}
                    value={categoryName?.value}
                    id={categoryName?.value}
                    onChange={handleSelectCategory}
                  />
                  <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                </div>
              ))}
            </form>
          </div>
        </div>
      )}

      {/* Desktop Layout */}
      <div className="hidden lg:grid grid-cols-[200px_1fr] gap-4">
        <div className="bg-white p-2 min-h-[calc(100vh-140px)] overflow-y-scroll">
          {/* Sort */}
          <div className="mb-4">
            <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
              Sort by
            </h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === "asc"}
                  onChange={handleOnChangeSortBy}
                  value="asc"
                />
                <label>Price - Low to High</label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === "dsc"}
                  onChange={handleOnChangeSortBy}
                  value="dsc"
                />
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>

          {/* Category */}
          <div>
            <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
              Category
            </h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              {productCategory.map((categoryName) => (
                <div key={categoryName?.value} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="category"
                    checked={!!selectCategory[categoryName?.value]}
                    value={categoryName?.value}
                    id={categoryName?.value}
                    onChange={handleSelectCategory}
                  />
                  <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                </div>
              ))}
            </form>
          </div>
        </div>

        {/* Product Listing */}
        <div className="px-4">
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="h-72 bg-slate-200 rounded animate-pulse"
                  ></div>
                ))}
            </div>
          )}

          {!loading && data.length === 0 && (
            <p className="bg-white text-lg text-center p-4 rounded">
              No products found for selected category.
            </p>
          )}

          {!loading && data.length > 0 && <VerticalCard data={data} loading={loading} />}
        </div>
      </div>

      {/* Mobile Product Listing */}
      <div className="lg:hidden">
        {loading && (
          <div className="grid grid-cols-2 gap-4">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="h-72 bg-slate-200 rounded animate-pulse"
                ></div>
              ))}
          </div>
        )}

        {!loading && data.length === 0 && (
          <p className="bg-white text-lg text-center p-4 rounded">
            No products found for selected category.
          </p>
        )}

        {!loading && data.length > 0 && <VerticalCard data={data} loading={loading} />}
      </div>
    </div>
  );
};

export default CategoryProduct;
