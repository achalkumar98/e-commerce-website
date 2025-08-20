import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Summary_API from "../utils/constants";

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    selling: "",
  });

  const params = useParams();

  const [loading, setLoading] = useState(true);

  const productImageListLoading = new Array(4).fill(null);

  const [activeImage, setActiveImage] = useState("");

  console.log("product id", params);

  const fetchProductDetails = async () => {
    setLoading(true);
    const response = await fetch(Summary_API.productDetails.url, {
      method: Summary_API.productDetails.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        productId: params?.id,
      }),
    });

    setLoading(false);

    const dataResponse = await response.json();

    setData(dataResponse?.data);
    setActiveImage(dataResponse?.data.productImage[0]);
  };

  console.log("data", data);

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
        {/* Product Image */}
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">

          <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200">
            <img src={activeImage} className="h-full w-full object-scale-down mix-blend-multiply" />
          </div>

          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col overflow-x-auto overflow-y-hidden scrollbar-none scroll-smooth h-full">
                {productImageListLoading.map((el) => {
                  return <div className="h-20 w-20 bg-slate-200 rounded animate-pulse" key={"loadingImage"}></div>;
                })}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-x-auto overflow-y-hidden scrollbar-none scroll-smooth h-full">
                {data?.productImage?.map((imageURL, index) => {
                  return <div className="h-20 w-20 bg-slate-200 rounded p-1" key={imageURL}>
                    <img 
                    src={imageURL} 
                    className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer" 
                    onMouseEnter={()=>handleMouseEnterProduct(imageURL)}
                    onClick={()=>handleMouseEnterProduct(imageURL)}
                    />
                  </div>
                })}
              </div>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div>
        <p className="bg-red-200 text-red-600 px-2 rounded-full">{data?.brandName}</p>
        <h2 className="text-2xl lg:text-4xl font-medium">{data?.productName}</h2>
        <p className="capitailize text-slate-400">{data?.category}</p>

        
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
