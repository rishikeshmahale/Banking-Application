import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { login } from "../../store/slices/authSlice.js";
import { useDispatch } from "react-redux";

const CustomerLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/login",
        {
          email,
          password,
        }
      );

      const data = await response.data;

      if (data) {
        toast.success(data.message);
      }

      dispatch(login(data));

      // navigate(`/${data.role}/transactions`);
      navigate("/customer/transactions");
      

      console.log("login" , data);
    } catch (error) {
      // console.log(error.response);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="mt-15 min-h-screen flex items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-3xl px-8 py-6 w-full sm:w-[27vw]">
        <h1 className="text-2xl font-bold text-center mb-4">
          Welcome Customer!
        </h1>
        <form onSubmit={handleLogin}>
          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="abc123@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow-md rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-black focus:border-black"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow-md rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-black focus:border-black"
            />
          </div>

          {/* Signup with Account */}
          <div className="flex items-center justify-end mt-5 mb-5">
            <Link
              className="text-xs text-gray-600 hover:text-gray-800 text-left"
              to={"/signup"}
            >
              Create Account
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 rounded-md shadow-md text-sm font-medium text-[#ffffffb8] bg-[#111] hover:bg-[#222]"
          >
            Log In
          </button>

          <Link to={"/banker-login"} className="text-xs text-gray-600 hover:text-black">Not a Customer? Login as a Banker</Link>
        </form>
      </div>
    </div>
  );
};

export default CustomerLogin;
