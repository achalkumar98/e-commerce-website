import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import Summary_API from "./utils/constants";
import Context from "./context";
import { useDispatch } from "react-redux"
import { addUser } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();
  const fetchUserDetails = async () => {
    const dataResponse = await fetch(Summary_API.current_user.url, {
      method: Summary_API.current_user.method,
      credentials: "include",
    });
    const dataApi = await dataResponse.json();
    if(dataApi.success){
      dispatch(addUser(dataApi.data));
    }
  };

  useEffect(() => {
    // user Details
    fetchUserDetails();
  }, []);

  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails,
        }}
      >
        <ToastContainer />

        <div>
          <Header />
          <main className="min-h-[calc(100vh-130px)]">
            <Outlet />
          </main>
          <Footer />
        </div>
      </Context.Provider>
    </>
  );
}

export default App;
