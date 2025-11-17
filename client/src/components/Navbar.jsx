import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { IoLogOut } from "react-icons/io5";
import TransactionButtons from "./TransactionButtons.jsx";
import { logout } from "../../store/slices/authSlice.js";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, role } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout Successfull");
    // alert("logout successful")
    navigate("/");
  };

  return (
    // <nav
    //   className="w-full h-20 fixed top-0 left-0 right-0 z-30 bg-white shadow-md 
    //   flex flex-col sm:flex-row justify-between items-start sm:items-center px-5 py-3"
    // >

    //   {/* Logo and our site name */}
    //   <div className="flex justify-between items-center">
    //     <img src="/bankinglogo.png" alt="logo" className="w-[50px]" />
    //     <Link to={"/"} className="font-bold text-3xl">
    //       MiniBank
    //     </Link>
    //   </div>

    //   <ul className="flex gap-5 text-lg font-semibold text-gray-400 ml-5 sm:ml-0">
    //     {/* if not authenticated then signup and login buttons will appear, if authenticated with role customer then deposit, withdraw and logout buttons will appear else only disply logout button to banker role  */}
    //     {!isAuthenticated ? (
    //       <>
    //         <Link
    //           to={"/customer-login"}
    //           className="hover:text-black cursor-pointer sm:p-2"
    //         >
    //           Log In
    //         </Link>

    //         <Link
    //           to={"/signup"}
    //           className="hover:text-black cursor-pointer sm:p-2"
    //         >
    //           Sign up
    //         </Link>
    //       </>
    //     ) : isAuthenticated && role === "customer" ? (
    //       <>
    //         <TransactionButtons />
    //         <li
    //           onClick={handleLogout}
    //           className="hover:text-black cursor-pointer sm:p-2 h-4"
    //         >
    //           <IoLogOut /> Logout
    //         </li>
    //       </>
    //     ) : (
    //       <li
    //         onClick={handleLogout}
    //         className="flex justify-center items-center hover:text-black cursor-pointer sm:p-2 h-4"
    //       >
    //         <IoLogOut /> Logout
    //       </li>
    //     )}
    //   </ul>
    // </nav>
    
    <nav
      className="w-full h-auto sm:h-20 fixed top-0 left-0 right-0 z-30 bg-white shadow-md 
      flex flex-col sm:flex-row justify-between sm:items-center items-start px-5 py-3 gap-4"
    >
      {/* Logo Section */}
      <div className="flex justify-between items-center w-full sm:w-auto">
        <div className="flex items-center gap-3">
          <img src="/bankinglogo.png" alt="logo" className="w-[50px]" />
          <Link to={"/"} className="font-bold text-3xl">
            MiniBank
          </Link>
        </div>
      </div>

      {/* Menu Section */}
      <ul
        className="
        flex flex-col sm:flex-row 
        gap-3 sm:gap-5 
        text-lg font-semibold text-gray-400 
        w-full sm:w-auto
      "
      >
        {/* If NOT Logged In */}
        {!isAuthenticated ? (
          <>
            <Link
              to={"/customer-login"}
              className="hover:text-black cursor-pointer p-2 text-center sm:text-left"
            >
              Log In
            </Link>

            <Link
              to={"/signup"}
              className="hover:text-black cursor-pointer p-2 text-center sm:text-left"
            >
              Sign up
            </Link>
          </>
        ) : (
          <>
            {/* CUSTOMER OPTIONS */}
            {role === "customer" && (
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                <TransactionButtons />
              </div>
            )}

            {/* LOGOUT */}
            <li
              onClick={handleLogout}
              className="hover:text-black cursor-pointer p-2 flex items-center gap-2 justify-center sm:justify-start"
            >
              <IoLogOut /> Logout
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
