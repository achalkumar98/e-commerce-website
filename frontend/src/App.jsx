import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import Summary_API from "./utils/constants";
import Context from "./context";
import { useDispatch } from "react-redux";
import { addUser } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);

  const fetchUserDetails = async () => {
    const dataResponse = await fetch(Summary_API.current_user.url, {
      method: Summary_API.current_user.method,
      credentials: "include",
    });
    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      dispatch(addUser(dataApi.data));
    }
  };

  const fetchUserAddToCart = async () => {
    const dataResponse = await fetch(Summary_API.addToCartProductCount.url, {
      method: Summary_API.addToCartProductCount.method,
      credentials: "include",
    });
    const dataApi = await dataResponse.json();
    setCartProductCount(dataApi?.data?.count);
  };

  useEffect(() => {
    // user Details
    fetchUserDetails();
    // user Cart product
    fetchUserAddToCart();
  }, []);

  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails,
          cartProductCount, // Current user Add to cart product count
          fetchUserAddToCart,
        }}
      >
        <ToastContainer position="top-center" />

        <div>
          <Header />
          <main className="min-h-[calc(100vh-130px)] pt-16">
            <Outlet />
          </main>
          <Footer />
        </div>
      </Context.Provider>
    </>
  );
}

export default App;
