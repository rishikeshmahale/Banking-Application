import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  
  const { username } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // funtion to fetch all customers
   const fetchCustomers = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_URL + "/banker/all-customers",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        if (response.data.success) {
          setCustomers(response.data.customers);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load customers");
      }
    };

  useEffect(() => {
   
    fetchCustomers();

  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">
        Hey {username}, here are the Customers!
      </h2>

      {customers.length === 0 ? (
        <p>No customers found.</p>
      ) : (
        <ul className="space-y-3">
          {customers.map((customer) => (
            <li
              key={customer._id}
              onClick={() =>
                navigate(`/banker/all-customers/${customer._id}`)
              }
              className="border p-3 rounded bg-gray-50 shadow-sm cursor-pointer hover:bg-gray-100 transition"
            >
              <p className="font-medium">Name: {customer.username}</p>
              <p className="text-sm text-gray-600">Email: {customer.email}</p>
              <p className="text-sm text-gray-600 capitalize">
                Type: {customer.accountType}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Customers;
