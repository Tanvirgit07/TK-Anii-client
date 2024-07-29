import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { GrLogout } from "react-icons/gr";
import { FcApproval } from "react-icons/fc";
import { AiOutlineBars } from "react-icons/ai";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoIosSend } from "react-icons/io";
import { FaHandHoldingUsd, FaOutdent } from "react-icons/fa";
import { VscHistory } from "react-icons/vsc";
import { CiCircleList, CiSaveUp1 } from "react-icons/ci";
import { TbTransactionRupee } from "react-icons/tb";

const Sidebar = () => {
  const [isActive, setActive] = useState(false);
  const [userRole, setUserRole] = useState(""); // State to hold user role
  console.log(userRole);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        // Decode token to get user email or other details
        const decoded = jwtDecode(token);
        const email = decoded.email;

        // Fetch user details from backend
        const response = await axios.get(
          `http://localhost:5000/sideUser/${email}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUserRole(response.data.role); // Set user role from response
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleToggle = () => {
    setActive(!isActive);
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Remove token and user data from local storage
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Redirect to the login page
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden">
        <Link
          to="/dashboard"
          className="flex h-14 font-semibold rounded-md justify-center items-center shadow-md text-2xl my-auto "
        >
          <div className="w-full">
            <div className="btn w-full text-xl bg-green-200">
              <p>
                <img
                  className="w-7 h-7"
                  src="https://static-00.iconduck.com/assets.00/square-cash-icon-512x512-392jabay.png"
                  alt=""
                />
                {/* <IoHome className="text-3xl" /> */}
              </p>
              Balance
            </div>
          </div>
        </Link>
        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200 "
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <Link
            to="/dashboard"
            className="flex h-14 font-semibold rounded-md justify-center items-center shadow-md text-2xl my-auto"
          >
            <div className="w-full">
              <div className="btn w-full text-xl bg-emerald-400">
                <p>
                  <img
                    className="w-8 h-8"
                    src="https://static-00.iconduck.com/assets.00/square-cash-icon-512x512-392jabay.png"
                    alt=""
                  />
                  {/* <IoHome className="text-3xl" /> */}
                </p>
                Balance
              </div>
            </div>
          </Link>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav>
              {userRole === "User" || userRole === 'Admin' && (
                <NavLink
                  to="user-info"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                      isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
                    }`
                  }
                >
                  <FaHandHoldingUsd className="w-5 h-5" />
                  <span className="mx-4 font-medium">Send Money</span>
                </NavLink>
              )}

              {userRole === "User" || userRole === 'Admin' && (
                <NavLink
                  to="cash-out"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                      isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
                    }`
                  }
                >
                  <IoIosSend className="w-5 h-5" />
                  <span className="mx-4 font-medium">Cash Out</span>
                </NavLink>
              )}

              {userRole === "User" || userRole === 'Admin' && (
                <NavLink
                  to="cash-in-request"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                      isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
                    }`
                  }
                >
                  <FaOutdent className="w-5 h-5" />
                  <span className="mx-4 font-medium">Cash In</span>
                </NavLink>
              )}

              {userRole === "User" && (
                <NavLink
                  to="transaction"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                      isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
                    }`
                  }
                >
                  <VscHistory className="w-5 h-5" />
                  <span className="mx-4 font-medium">History</span>
                </NavLink>
              )}

              {userRole === "Agent" && (
                <NavLink
                  to="cash-in-approve"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                      isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
                    }`
                  }
                >
                  <FcApproval className="w-5 h-5" />
                  <span className="mx-4 font-medium">Cash In Approve</span>
                </NavLink>
              )}

              {userRole === "Agent" && (
                <NavLink
                  to="agent-history"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                      isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
                    }`
                  }
                >
                  <CiSaveUp1 className="w-5 h-5" />
                  <span className="mx-4 font-medium">Agent History</span>
                </NavLink>
              )}

              {userRole === "Admin" && (
                <NavLink
                  to="Users"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                      isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
                    }`
                  }
                >
                  <CiCircleList className="w-5 h-5" />
                  <span className="mx-4 font-medium">Users List</span>
                </NavLink>
              )}
              {userRole === "Admin" && (
                <NavLink
                  to="all-transaction"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                      isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
                    }`
                  }
                >
                  <TbTransactionRupee className="w-5 h-5" />
                  <span className="mx-4 font-medium">All Transactions</span>
                </NavLink>
              )}
            </nav>
          </div>
        </div>

        <div>
          <hr />

          {/* Profile Menu */}

          <button
            onClick={handleLogout}
            className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />
            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
