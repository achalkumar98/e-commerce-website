import { useEffect, useState } from "react";
import Summary_API from "../utils/constants";
import { toast } from "react-toastify";
import { MdModeEdit } from "react-icons/md";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import ChangeUserRole from "../components/ChangeUserRole";

dayjs.extend(utc);
dayjs.extend(timezone);

const AllUsers = () => {
  const [allUser, setAllUsers] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    name: "",
    email: "",
    role: "",
    _id: "",
  });

  const fetchAllUsers = async () => {
    const fetchData = await fetch(Summary_API.allUser.url, {
      method: Summary_API.allUser.method,
      credentials: "include",
    });

    const dataResponse = await fetchData.json();

    if (dataResponse.success) {
      setAllUsers(dataResponse.data);
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="bg-white pb-4">
      <table className="w-full userTable">
        <thead>
          <tr className="bg-black text-white">
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allUser.map((el, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{el?.name}</td>
                <td>{el?.email}</td>
                <td>{el?.role}</td>
                <td>
                  {dayjs
                    .utc(el?.createdAt)
                    .tz("Asia/Kolkata")
                    .format("D MMMM YYYY, h:mm A")}
                </td>
                <td>
                  <button
                    className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-400 hover:text-white"
                    onClick={() => {
                    setUpdateUserDetails(el)
                    setOpenUpdateRole(true)
                  }}
                  >
                    <MdModeEdit />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {openUpdateRole && (
        <ChangeUserRole
          onClose={() => setOpenUpdateRole(false)}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          callFunc={fetchAllUsers}
        />
      )}
    </div>
  );
};

export default AllUsers;
