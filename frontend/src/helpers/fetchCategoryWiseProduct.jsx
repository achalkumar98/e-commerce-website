import Summary_API from "../utils/constants";

const fetchCategoryWiseProduct = async (category) => {
  const response = await fetch(Summary_API.categoryWiseProduct.url, {
    method: Summary_API.categoryWiseProduct.method,
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      category: category,
    }),
  });


  const dataResponse = await response.json();

  return dataResponse;
};

export default fetchCategoryWiseProduct;
