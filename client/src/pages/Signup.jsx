import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("customer");


   const handleSignup = async (e) => {
    e.preventDefault();
    try {  
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/signup",
        { username, email, password, accountType }
      );

      const data = await response.data;

      if (data.success) {
        setUsername("");
        setEmail("");
        setPassword("");
        setAccountType("");
        toast.success(data.message);
        navigate("/customer-login");
      }

      console.log(data);

    } catch (error) {
      toast.error(error.response.data.message);
    }
  }; 

  return (
    <div className="mt-15 min-h-screen flex items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-3xl px-8 py-6 w-full sm:w-[27vw]">
        <h1 className="text-2xl font-bold text-center mb-4">Let's Connect!</h1>
        <form onSubmit={handleSignup}>
          {/* Username */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Username
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="coder123"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="shadow-md rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-black focus:border-black"
            />
          </div>

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

          {/* For Account Selection */}
          <div className="mb-4">
            <label
              htmlFor="accountType"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Select Your Account Type
            </label>
            <select
              className="shadow-md rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-black focus:border-black"
              onChange={(e) => setAccountType(e.target.value)}
            >
              <option value="customer">customer</option>
              <option value="banker">banker</option>
            </select>
          </div>

          {/* Login with Account */}

          <div className="flex items-center justify-end mt-5 mb-5">
            <Link
              className="text-xs text-gray-600 hover:text-gray-800 text-left"
              to={"/customer-login"}
            >
              Log In with Account
            </Link>
          </div>

          <button className="w-full py-2 px-4 rounded-md shadow-md text-sm font-medium text-[#ffffffb8] bg-[#111] hover:bg-[#222]">
            Signup
          </button>
        </form>
      </div>
    </div>
  )
}

export default Signup
