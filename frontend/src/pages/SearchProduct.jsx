import { useLocation } from "react-router-dom";
import Summary_API from "../utils/constants";
import { useEffect, useState } from "react";
import VerticalCard from "../components/VerticalCard";

const SearchProduct = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await fetch(Summary_API.searchProduct.url + location.search);
      const dataResponse = await response.json();
      setData(dataResponse.data || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setData([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProduct();
  }, [location]);

  return (
    <div className="container mx-auto p-4">
      {loading && (
        <p className="text-lg text-center py-4">Loading...</p>
      )}

      {!loading && (
        <>
          <p className="text-lg font-semibold my-3">
            Search Results: {data.length}
          </p>

          {data.length === 0 ? (
            <p className="bg-white text-lg text-center p-4 rounded shadow">
              Data Results Not Found...
            </p>
          ) : (
            <VerticalCard loading={loading} data={data} />
          )}
        </>
      )}
    </div>
  );
};

export default SearchProduct;
