import { useState } from "react";
import ROLE from "../utils/role";
import { IoMdClose } from "react-icons/io";
import Summary_API from "../utils/constants";
import { toast } from "react-toastify";

const ChangeUserRole = ({ name, email, role, userId, onClose, callFunc }) => {
  const [userRole, setUserRole] = useState(role);

  const handleOnChangeSelect = (e) => {
    setUserRole(e.target.value);
  };

  const updateUserRole = async () => {
    const fetchResponse = await fetch(Summary_API.updateUserData.url, {
      method: Summary_API.updateUserData.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ userId, role: userRole }),
    });

    const responseData = await fetchResponse.json();

    if (responseData.success) {
      toast.success(responseData.message);
      onClose();
      callFunc();
    } else {
      toast.error(responseData.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 mx-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-gray-700 hover:text-red-600 transition-colors"
        >
          <IoMdClose />
        </button>

        <h2 className="text-xl font-semibold mb-4">Change User Role</h2>

        <p className="mb-1 font-medium">
          Name: <span className="font-normal">{name}</span>
        </p>
        <p className="mb-4 font-medium">
          Email: <span className="font-normal">{email}</span>
        </p>

        <div className="flex items-center justify-between mb-6">
          <label className="font-medium">Role:</label>
          <select
            value={userRole}
            onChange={handleOnChangeSelect}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            {Object.values(ROLE).map((el) => (
              <option value={el} key={el}>
                {el}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={updateUserRole}
          className="w-full py-2 px-4 bg-red-600 text-white font-medium rounded-full hover:bg-red-700 transition-colors"
        >
          Update Role
        </button>
      </div>
    </div>
  );
};

export default ChangeUserRole;
