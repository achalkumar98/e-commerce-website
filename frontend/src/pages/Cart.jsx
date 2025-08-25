import { useContext, useEffect, useState } from "react";
import Summary_API from "../utils/constants";
import Context from "../context";
import displayINRCurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const context = useContext(Context);
  const loadingCart = new Array(4).fill(null);

  const fetchData = async () => {
    try {
      const response = await fetch(Summary_API.addToCartProductView.url, {
        method: Summary_API.addToCartProductView.method,
        credentials: "include",
        headers: { "content-type": "application/json" },
      });
      const responseData = await response.json();
      if (responseData.success) setData(responseData.data);
    } catch (err) {
      console.error("Failed to fetch cart data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateQuantity = async (id, qty) => {
    try {
      const response = await fetch(Summary_API.updateCartProduct.url, {
        method: Summary_API.updateCartProduct.method,
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ _id: id, quantity: qty }),
      });
      const result = await response.json();
      if (result.success) fetchData();
    } catch (err) {
      console.error("Failed to update quantity", err);
    }
  };

  const deleteCartProduct = async (id) => {
    try {
      const response = await fetch(Summary_API.deleteCartProduct.url, {
        method: Summary_API.deleteCartProduct.method,
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ _id: id }),
      });
      const result = await response.json();
      if (result.success) {
        fetchData();
        context.fetchUserAddToCart();
      }
    } catch (err) {
      console.error("Failed to delete cart product", err);
    }
  };

  const handlePayment = async () => {
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
    try {
      const response = await fetch(Summary_API.payment.url, {
        method: Summary_API.payment.method,
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ cartItems: data }),
      });
      const result = await response.json();
      if (result?.sessionId) {
        const { error } = await stripe.redirectToCheckout({ sessionId: result.sessionId });
        if (error) console.error(error);
      }
    } catch (err) {
      console.error("Payment error", err);
    }
  };

  const totalQty = data.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = data.reduce(
    (sum, item) => sum + item.quantity * item.productId.selling,
    0
  );

  return (
    <div className="px-4 md:px-6 py-6 max-w-7xl mx-auto">
      {!loading && data.length === 0 && (
        <p className="text-center py-8 bg-slate-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded shadow">
          🛒 No items in your cart yet
        </p>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Cart Items */}
        <div className="flex-1 flex flex-col gap-4">
          {loading
            ? loadingCart.map((_, idx) => (
                <div
                  key={idx}
                  className="h-32 w-full bg-slate-200 dark:bg-gray-700 rounded shadow animate-pulse"
                />
              ))
            : data.map((product) => (
                <div
                  key={product._id}
                  className="bg-slate-50 dark:bg-gray-900 rounded-lg shadow hover:shadow-xl transition-shadow duration-300 grid grid-cols-[100px_1fr] md:grid-cols-[128px_1fr]"
                >
                  <div className="p-2 flex items-center justify-center bg-slate-100 dark:bg-gray-800 rounded-l-lg">
                    <img
                      src={product.productId.productImage?.[0] || '/fallback.jpg'}
                      alt={product.productId.productName}
                      className="object-contain h-24 md:h-32 hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>

                  <div className="p-4 flex flex-col justify-between relative">
                    <button
                      onClick={() => deleteCartProduct(product._id)}
                      className="absolute top-2 right-2 text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white p-2 rounded-full transition-colors"
                      aria-label="Delete product"
                    >
                      <MdDelete />
                    </button>

                    <div>
                      <h2 className="text-gray-800 dark:text-gray-200 font-medium text-lg line-clamp-1">
                        {product.productId.productName}
                      </h2>
                      <p className="capitalize text-gray-500 dark:text-gray-400">
                        {product.productId.category}
                      </p>
                    </div>

                    <div className="flex justify-between mt-2">
                      <p className="text-red-600 dark:text-red-400 font-semibold">
                        {displayINRCurrency(product.productId.selling)}
                      </p>
                      <p className="text-gray-700 dark:text-gray-200 font-semibold">
                        {displayINRCurrency(product.productId.selling * product.quantity)}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() =>
                          product.quantity > 1 &&
                          updateQuantity(product._id, product.quantity - 1)
                        }
                        className="w-8 h-8 border border-red-600 dark:border-red-400 text-red-600 dark:text-red-400 rounded hover:bg-red-600 hover:text-white transition-colors"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="text-gray-800 dark:text-gray-200 font-medium">
                        {product.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(product._id, product.quantity + 1)
                        }
                        className="w-8 h-8 border border-red-600 dark:border-red-400 text-red-600 dark:text-red-400 rounded hover:bg-red-600 hover:text-white transition-colors"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
        </div>

        {/* Summary */}
        {data.length > 0 && (
          <div className="w-full max-w-sm bg-slate-50 dark:bg-gray-900 rounded-lg shadow p-4 flex flex-col gap-4">
            {loading ? (
              <div className="h-36 bg-slate-200 dark:bg-gray-700 rounded animate-pulse" />
            ) : (
              <>
                <h2 className="text-white bg-red-600 dark:bg-red-500 px-4 py-2 rounded">
                  Summary
                </h2>

                <div className="flex justify-between text-gray-700 dark:text-gray-200 font-medium mt-2">
                  <p>Total Quantity</p>
                  <p>{totalQty}</p>
                </div>
                <div className="flex justify-between text-gray-700 dark:text-gray-200 font-medium">
                  <p>Total Price</p>
                  <p>{displayINRCurrency(totalPrice)}</p>
                </div>

                <div className="flex-grow" />

                <button
                  onClick={handlePayment}
                  className="mt-1 w-full bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white py-2 rounded transition-colors"
                >
                  Proceed to Payment
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
