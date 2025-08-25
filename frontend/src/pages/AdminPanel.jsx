import { useEffect } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ROLE from "../utils/role";

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="min-h-[calc(100vh-130px)] md:flex hidden bg-gray-50">
      {/* Sidebar */}
      <aside className="bg-white min-h-full w-full max-w-60 shadow-lg flex flex-col">
        {/* User info */}
        <div className="h-32 flex flex-col justify-center items-center border-b border-gray-200 p-4">
          <div className="text-5xl relative flex justify-center mb-2">
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                alt={user?.name}
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <FaRegCircleUser />
            )}
          </div>
          <p className="capitalize text-lg font-semibold">{user?.name}</p>
          <p className="text-xs text-gray-500">{user?.role}</p>
        </div>

        {/* Navigation */}
        <nav className="grid p-4">
          <Link
            to="all-users"
            className="px-2 py-1 rounded hover:bg-red-100 transition-colors"
          >
            All Users
          </Link>
          <Link
            to="all-products"
            className="px-2 py-1 rounded hover:bg-red-100 transition-colors"
          >
            All Products
          </Link>
          <Link
            to="all-orders"
            className="px-2 py-1 rounded hover:bg-red-100 transition-colors"
          >
            All Orders
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 w-full h-full p-4 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
