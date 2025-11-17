import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { IoArrowBackSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const Customer = () => {
  const [customer, setCustomer] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchCustomerTransactions = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_URL + `/banker/customer/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        console.log(response);

        if (response.data.sucess) {
          setCustomer(response.data?.customer);
          setTransactions(response.data?.transactions);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerTransactions();
  }, [id]);

  if (loading) {
    <p className="p-4 text-gray-600">Loading...</p>;
  }

  if (!customer) {
    return (
      <div className="p-4 w-full flex items-center justify-center">
        <p className="text-gray-600 text-sm bg-yellow-100 border border-yellow-300 px-4 py-2 rounded-md shadow-sm animate-pulse">
          It's taking a while to fetch customer transaction details...
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <Link to="/banker/all-customers">
        <IoArrowBackSharp />
      </Link>

      <h2 className="text-2xl font-semibold">Customer Details</h2>

      <div className="border p-4 rounded bg-gray-50 shadow">
        <p>
          <strong>Name:</strong> {customer.username}
        </p>
        <p>
          <strong>Email:</strong> {customer.email}
        </p>
        <p>
          <strong>Balance:</strong> ₹{customer.balance}
        </p>
      </div>

      <h2 className="text-xl font-semibold mt-4">Transactions</h2>

      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <ul className="space-y-3">
          {transactions.map((transaction) => (
            <li
              key={transaction._id}
              className="border p-3 rounded bg-white shadow-sm flex justify-between"
            >
              <div>
                <p className="font-medium capitalize">{transaction.type}</p>
                <p className="text-sm text-gray-500">
                  {new Date(transaction.createdAt).toLocaleString()}
                </p>
              </div>

              <p
                className={`font-bold ${
                  transaction.type === "deposit"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                ₹{transaction.amount}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Customer;
