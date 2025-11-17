import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";

const CustomerTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);

  const { username } = useSelector((state) => state.auth);

  //  function to fetch the customer jtransactions
  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/customer-transactions",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      setTransactions(response.data.transactions);
      setBalance(response.data.balance);
    } catch (error) {
      // toast.error("Failed to fetch transactions");
      toast.error(error.response?.data?.message);
      console.log(error);
    }
  };

  useEffect(() => {
    // this function will run immediately once
    fetchTransactions();

    // here i had to implement polling, it will run every 3 seconds and will fetch transactions too using fetchTransactions function
    const interval = setInterval(() => {
      fetchTransactions();
    }, 3000);

    // cleanup function to eliminate interval on unmount
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Hello <span className="text-blue-600">{username}</span>, here are your
        recent transactions!
      </h2>

      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-4 mb-6">
        <h3 className="text-lg font-medium text-gray-700 mb-2">Your Balance</h3>
        <p className="text-2xl font-bold text-green-600">₹ {balance}</p>
      </div>

      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-4">
        <h3 className="text-lg font-medium text-gray-700 mb-3">Transactions</h3>

        {transactions.length === 0 ? (
          <p className="text-gray-500 text-sm">No transactions found.</p>
        ) : (
          <ul className="space-y-3">
            {transactions.map((transaction) => {
              const isDeposit = transaction.type === "deposit";

              return (
                <li
                  key={transaction._id}
                  className="border rounded-md p-3 bg-gray-50 flex justify-between items-center"
                >
                  <div>
                    <p
                      className={`font-semibold capitalize ${
                        isDeposit ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {isDeposit ? "Deposit" : "Withdrawal"}
                    </p>

                    <p className="text-xs text-gray-500">
                      {new Date(transaction.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <p
                    className={`text-lg font-bold ${
                      isDeposit ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    ₹ {transaction.amount}
                  </p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CustomerTransactions;
